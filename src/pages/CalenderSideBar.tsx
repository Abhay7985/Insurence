import React, { Fragment, useEffect, useState } from 'react'
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import henceforthApi from '../utils/henceforthApi';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Weeklisting from './WeekListing';
import { GlobalContext } from '../context/Provider';
import Spinner from './common/AntSpinner';
import { Spin } from 'antd';
import { avaiableprice } from '../interfaces';
import henceforthValidations from '../utils/henceforthValidations';
import henceforthDate from '../utils/henceforthDate';

interface RouteDataInterface {
    id: number,
    available?: number,
    route_name: string,
    selected?: boolean,
    price?: number,
    installments?: number,
    installment_price?: number
}

const CalendarSideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { Toast } = React.useContext(GlobalContext)

    const uRLSearchParams = new URLSearchParams(location.search);

    const [loading, setLoading] = useState(false)
    const [spinningCheckbox, setSpinningCheckbox] = useState(false)
    const [routeDatas, setRouteData] = React.useState<Array<RouteDataInterface>>([])

    const [state, setState] = React.useState({
        prices: [],
        available: false
    })

    const queryDate = moment(Number(uRLSearchParams.get('available_date')))
    const handleQuery = (key: string, value: string) => {
        if (value) {
            uRLSearchParams.set(key, value)
        } else {
            if (uRLSearchParams.has("edit")) {
                uRLSearchParams.delete("edit")
            } else {
                uRLSearchParams.delete(key)
            }
        }
        navigate({ search: uRLSearchParams.toString() })
    }

    const handleChange = async (name: string, value: any, index: number) => {

        console.log('debugger');

        if (name === "price" && isNaN(value)) return
        if (name === "installments" && isNaN(value)) return
        if (name === "installment_price" && isNaN(value)) return
        const data = routeDatas[index] as any
        if (typeof value == "boolean") {
            data.selected = value
        }
        data[name] = value
        setRouteData([...routeDatas])

    }
    const getBoatPrice = async () => {
        const date = queryDate.format("YYYY/MM/DD")
        const queryDate1 = moment(Number(uRLSearchParams.get('available_date')))
        console.log(date, "date");

        let apiRes: any
        if (uRLSearchParams.get('edit') === 'date') {
            apiRes = await henceforthApi.Calender.getDatePrice(uRLSearchParams.get("boat_id") as string, date)
        } else if (uRLSearchParams.get('edit') === 'week') {
            apiRes = await henceforthApi.Calender.getWeekPrice(uRLSearchParams.get("boat_id") as string, queryDate1.weekday() as any)
        } else {
            apiRes = await henceforthApi.Calender.viewPrice(uRLSearchParams.get("boat_id") as string, date)
        }
        setState({
            ...state,
            prices: apiRes.data,
            available: apiRes.holiday === 1 ? false : true,
            
        })
        return apiRes
    }

    // console.log(queryDate1.weekday(),"queryDate1.weekday")

    const onSubmit = async (b: boolean, isOpen: boolean, isSpinning: boolean, run: string) => {
        let items = {} as any
        try {
            if (run !== 'switch') {

                const routePrices = routeDatas.filter(((res: any) => res.selected == true))
                const queryDate = moment(Number(uRLSearchParams.get('available_date')))
                items = {
                    available: b,
                    route_prices: routePrices?.length ? routePrices.map((res: any) => {
                        return {
                            route_id: res.id,
                            price: Number(res.price),
                            installments: Number(res.installments),
                            installment_price: Number(res.installment_price)
                        }
                    }) : null
                } as any
                if (uRLSearchParams.get("edit") == "date") {
                    items.available_date = queryDate.format('YYYY/MM/DD')
                } else {
                    items.available_day = queryDate.weekday()
                }
                const data = items?.route_prices
                if (Array.isArray(data) && data.length) {
                    data.forEach((element: any) => {
                        if (!element.price) throw `Please enter price`
                        if (!element.installments) throw `Please enter installments`
                        if (!element.installment_price) throw `Please enter`
                    });
                }
            }
            setLoading(true)
            setSpinningCheckbox(isSpinning)
            let apiRes: any
            const check = uRLSearchParams.get("edit") == "date"
            if (run === 'switch') {
                items[`available_${check ? 'date' : 'day'}`] = check ? queryDate.format('YYYY/MM/DD') : queryDate.weekday()
                items['holiday'] = b === false?1:0
                apiRes = await henceforthApi.Calender.switchDatePrice(check ? 'date' : 'day', uRLSearchParams.get("boat_id") as string, items)
            }
            else if (check) {
                apiRes = await henceforthApi.Calender.editDatePrice(uRLSearchParams.get("boat_id") as string, items)
            } else {
                apiRes = await henceforthApi.Calender.editWeekPrice(uRLSearchParams.get("boat_id") as string, items)
            }
            getBoatPrice()
            Toast.success(apiRes.message)
            if (isOpen) {
                handleQuery("edit", "")
            } else {
                // await getBoatPrice()
            }

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
            setSpinningCheckbox(false)
        }
        // }
    }

    const initialiseRoutes = async () => {
        try {
            const apiRes = await henceforthApi.Admin.routes()
            await getSidebarValue(apiRes.data)
        } catch (error) {

        }
    }


    const getSidebarValue = async (routes: Array<any>) => {
        try {
            let rowData: Array<RouteDataInterface> = []
            let apiRes = await getBoatPrice()
            routes?.forEach((element: RouteDataInterface) => {
                const findData: any = apiRes?.data?.find((res: any) => res.route_id === element.id)
                if (findData) {
                    rowData.push({
                        id: element.id,
                        route_name: element.route_name,
                        selected: !!findData?.available,
                        installment_price: findData.installment_price,
                        installments: findData.installments,
                        price: findData.price
                    })
                } else {
                    rowData.push(element)
                }
            });
            console.log('rowData', rowData);
            setRouteData([...rowData])

        } catch (error) {

        }
    }
    React.useEffect(() => {

    }, [])
    React.useEffect(() => {
        initialiseRoutes()

    }, [uRLSearchParams.get("edit"), uRLSearchParams.get("available_date")])
    console.log('routeDatas', routeDatas);

    return (
        <div className="col-lg-3 px-0">
            <div className="sidebar-calender py-4">
                <div className="cross px-4" role="button" onClick={() => handleQuery('show_sidebar', "")}>
                    <HenceforthIcons.Cross />
                </div>
                {!uRLSearchParams.has("edit") &&
                    <Fragment>

                        <div className="edit-date border-bottom px-4 py-4">
                            <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={() => handleQuery('edit', "date")}>
                                <span>Edit Date</span>
                                <HenceforthIcons.ChevronRight />
                            </button>
                        </div>

                        <div className="edit-date border-bottom px-4 py-4">

                            <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={() => handleQuery('edit', "week")}>
                                <span>Edit {henceforthDate.getWeekName(queryDate.weekday())}</span>
                                <HenceforthIcons.ChevronRight />
                            </button>
                        </div>
                    </Fragment>}

                {uRLSearchParams.has("edit") &&
                    <div className="edit-tuesday py-4 border-bottom">
                        <Spin spinning={spinningCheckbox}>

                            <div className="edit-tuesday-header py-4 border-bottom px-4">
                                {uRLSearchParams.get("edit") == "date" ?
                                    <h5 className='mb-3'>{queryDate.format('ddd, DD MMM YYYY')}</h5> :
                                    <h5 className='mb-3'>Edit {henceforthDate.getWeekName(queryDate.weekday())}</h5>}
                                <div className="available d-flex justify-content-between align-items-center">
                                    <p> Availability</p>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input form-check-toggle px-1" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={state?.available} onChange={(e) => onSubmit(e.target.checked, false, true, "switch")} />
                                    </div>
                                </div>
                            </div>
                        </Spin>

                        <div className="px-4">
                            <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
                                <h6 className='fs-16'>Pricing</h6>
                                {routeDatas.map((res: any, index: number) => {
                                    return <Weeklisting {...res} handleChange={(name: string, checked: any) => handleChange(name, checked, index)} />

                                })}
                                <div className="col-12">
                                    <button className='btn btn-yellow px-4 rounded-2' disabled={loading} onClick={() => onSubmit(state?.available, true, false, "done")}>{loading ? <Spinner /> : "Done"}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                {!uRLSearchParams.has("edit") &&
                    <div className="Available px-4 py-4 border-bottom">
                        <p className='fs-16 mb-3'>Available</p>
                        <ul>
                            {state?.prices?.map((res: avaiableprice) => {
                                // if (res.available) {

                                    return (

                                        <div className='mb-3'>
                                            <li>{res.route_name}</li>
                                            <li>{henceforthValidations.BrazilianReal(res.price)} or {res.installments}x in {henceforthValidations.BrazilianReal(res.installment_price)} </li>
                                        </div>
                                    )
                                // }
                            })}

                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}
export default CalendarSideBar;