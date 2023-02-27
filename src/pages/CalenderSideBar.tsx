import { Calendar, Spin } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Select } from 'antd';
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import henceforthApi from '../utils/henceforthApi';
import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import moment from 'moment';
import mim, { Dayjs } from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import Weeklisting from './WeekListing';
import DateListingPrice from './DateListingPrice';
import Item from 'antd/es/list/Item';
import { GlobalContext } from '../context/Provider';
import Spinner from './common/AntSpinner';

const CalendarSideBar = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)
    const location = useLocation()
    const [weekDay, setWeekDay] = useState([] as any)
    const [weekDate, setWeekDate] = useState([] as any)
    const [hideshow, setHideShow] = useState(false)
    const [loading,setLoading]=useState(false)
    const [day, setDay] = useState(true)
    const [date, setDate] = useState(true)
    const [editDate, setEditDate] = useState({
        available_day: "",
        available: true,
        route_prices: [
            {
                route_id: Number(),
                price: Number(),
                installments: Number(),
                installment_price: Number()
            }
        ]
    })
    const [editData, setEditData] = useState(
        {
            available_day: "",
            available: true,
            route_prices: [
                {
                    route_id: Number(),
                    price: Number(),
                    installments: Number(),
                    installment_price: Number()
                }
            ]
        }
    )
    const uRLSearchParams = new URLSearchParams(location.search);
    const queryDate = moment(Number(uRLSearchParams.get('available_date')))
    console.log("date", queryDate.format('ddd DD MM YYYY'))
    const getweekDay = async () => {
        setDay(false)
        setDate(true)
        try {
            let apiRes = await henceforthApi.Calender.weekDay(uRLSearchParams.get("boat_id") as string, queryDate.format('DD'))
            setWeekDay(apiRes.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getweekDate = async () => {
        setDate(false)
        setDay(true)
        try {
            let apiRes = await henceforthApi.Calender.datePrice(uRLSearchParams.get("boat_id") as string, queryDate.format('YYYY/MM/DD'))
            setWeekDate(apiRes.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = async (name: string, value: any, index: number) => {
        if (name === "price" && isNaN(value)) return
        if (name === "installments" && isNaN(value)) return
        if (name === "installment_price" && isNaN(value)) return
        const data = weekDay[index] as any
        if (typeof value == "boolean") {
            data.selected = value
        }
        data[name] = value
        setWeekDay([...weekDay])

    }
    const handleChange1 = async (name: string, value: any, index: number) => {
        if (name === "price" && isNaN(value)) return
        if (name === "installments" && isNaN(value)) return
        if (name === "installment_price" && isNaN(value)) return
        // const data = weekDay[index] as any
        const Weekdate = weekDate[index] as any
        if (typeof value == "boolean") {
            Weekdate.selected = value
        }
        Weekdate[name] = value
        setWeekDate([...weekDate])

    }

    const onSubmit = async () => {
        const stateData: any = weekDay.filter(((res: any) => res.selected == true)).map((res: any) => {
            return {
                available_day: res.day,
                route_id: res.id,
                price: res.price,
                installments: res.installments,
                installment_price: res.installment_price
            }
        })
        console.log(stateData)
        const items = {
            available_day: queryDate.format('DD'),
            available: true,
            route_prices: weekDay.filter(((res: any) => res.selected == true)).map((res: any) => {
                return {
                    route_id: res.id,
                    price: res.price,
                    installments: res.installments,
                    installment_price: res.installment_price
                }
            })
        }
        const data = items.route_prices
        if (data.length) {
            let _is_true = true
            data.forEach((element: any) => {
                if (!element.price) {
                    _is_true = false
                    Toast.error(`Please enter price`)
                    // Toast.error(`Please enter price of ${element.route_name}`)
                    return
                }
                if (!element.installments) {
                    _is_true = false
                    Toast.error(`Please enter installments`)
                    // Toast.error(`Please enter installments of ${element.route_name}`)
                    return
                }
                if (!element.installment_price) {
                    _is_true = false
                    Toast.error(`Please enter installment price`)
                    // Toast.error(`Please enter installment price of ${element.route_name}`)
                    return
                }
            });
            if (_is_true) {
                try {
                    setLoading(true)
                    const apiRes = await henceforthApi.Calender.editDayPrice(uRLSearchParams.get("boat_id") as string, items)
                    Toast.success(apiRes.message)
                    // setIsExpended(false)
                    setEditData({
                        ...editData,
                        route_prices: stateData
                    })
                    setHideShow(true)
                    // await props.initialise()

                } catch (error) {
                    // Toast.error(error)
                } finally {
                    setLoading(false)
                    setEditData({
                        route_prices: [
                            {
                                route_id: "",
                                price: "",
                                installments: "",
                                installment_price: ""
                            }
                        ]
                    } as any)

                }
            }
        } else {
            // Toast.error(`Please select routes`)
        }
    }
    const onSubmitDate = async () => {
        const stateData: any = weekDate.filter(((res: any) => res.selected == true)).map((res: any) => {
            return {
                available_day: res.day,
                route_id: res.id,
                price: res.price,
                installments: res.installments,
                installment_price: res.installment_price
            }
        })
        console.log(stateData)
        const items = {
            available_day: queryDate.format('DD'),
            available: true,
            route_prices: weekDate.filter(((res: any) => res.selected == true)).map((res: any) => {
                return {
                    route_id: res.id,
                    price: res.price,
                    installments: res.installments,
                    installment_price: res.installment_price
                }
            })
        }
        const data = items.route_prices
        if (data.length) {
            let _is_true = true
            data.forEach((element: any) => {
                if (!element.price) {
                    _is_true = false
                    Toast.error(`Please enter price`)
                    // Toast.error(`Please enter price of ${element.route_name}`)
                    return
                }
                if (!element.installments) {
                    _is_true = false
                    Toast.error(`Please enter installments`)
                    // Toast.error(`Please enter installments of ${element.route_name}`)
                    return
                }
                if (!element.installment_price) {
                    _is_true = false
                    Toast.error(`Please enter installment price`)
                    // Toast.error(`Please enter installment price of ${element.route_name}`)
                    return
                }
            });
            if (_is_true) {
                try {
                    setLoading(true)
                    const apiRes = await henceforthApi.Calender.editDayPrice(uRLSearchParams.get("boat_id") as string, items)
                    Toast.success(apiRes.message)
                    // setIsExpended(false)
                    setEditDate({
                        ...editDate,
                        route_prices: stateData
                    })
                    setHideShow(true)
                    // await props.initialise()

                } catch (error) {
                    // Toast.error(error)
                } finally {
                    setLoading(false)
                   

                }
            }
        } else {
            // Toast.error(`Please select routes`)
        }
    }

    return (
        <>
            {hideshow === false ?
                <div className="col-lg-3 px-0">
                    <div className="sidebar-calender py-4">
                        <div className="cross px-4" role="button">
                            <HenceforthIcons.Cross />
                        </div>
                        {
                            day && 
                            <div className="edit-date border-bottom px-4 py-4">
                                <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={getweekDate}>
                                    <span>Edit Date</span>
                                    <HenceforthIcons.ChevronRight />
                                </button>
                            </div>}
                        {
                            date &&

                            <div className="edit-date border-bottom px-4 py-4">
                                <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={getweekDay}>
                                    <span>Edit {queryDate.format('dddd')}</span>
                                    <HenceforthIcons.ChevronRight />
                                </button>
                            </div>}
                        {
                            day && date &&
                            <div className="Available px-4 py-4 border-bottom">
                                <h6 className='fs-16 mb-3'>Available</h6>
                                <ul>
                                    {props.sideData.map((res: any) => {
                                        return (
                                            <>
                                                <li>{res.route_name}</li>
                                                <li>{res.price} or {res.installments}x in {res.installment_price} </li>
                                            </>
                                        )
                                    })}

                                </ul>
                            </div>}
                        {/* edit-tuesday */}
                        {!day &&
                            <div className="edit-tuesday py-4 border-bottom">

                                <div className="edit-tuesday-header py-4 border-bottom px-4">
                                    <h5 className='mb-3'>Edit {queryDate.format('dddd')}</h5>
                                    <div className="available d-flex justify-content-between align-items-center">
                                        <p> Available</p>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input form-check-toggle" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                    </div>
                                </div>
                                {/* edit-pricing */}

                                <div className="px-4">
                                    <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
                                        <h6 className='fs-16'>Pricing</h6>
                                        {weekDay.map((res: any, index: number) => {
                                            return <Weeklisting {...res} index={index} handleChange={handleChange} />

                                        })}
                                        <div className="col-12">
                                            <button className='btn btn-yellow px-4 rounded-2' disabled={loading} onClick={onSubmit}>{loading ? <Spinner/>:"Done" }</button>
                                        </div>

                                    </div>
                                </div>
                            </div>}
                        {/* edit-date */}
                        {!date &&
                            <div className="edit-tuesday py-4 border-bottom">
                                <div className="edit-tuesday-header py-4 border-bottom px-4" role="button"  >
                                    <h5 className='mb-3'>{queryDate.format('ddd DD MM YYYY')}</h5>
                                    <div className="available d-flex justify-content-between align-items-center">
                                        <p> Available</p>
                                    </div>
                                </div>
                                <div className="px-4">
                                    <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
                                        <h6 className='fs-16'>Pricing</h6>
                                        {weekDate.map((res: any, index: number) => {
                                            return <DateListingPrice {...res} index={index} handleChange1={handleChange1} />

                                        })}
                                        <div className="col-12">
                                            <button className='btn btn-yellow px-4 rounded-2' disabled={loading} onClick={onSubmitDate}>{loading ? <Spinner/> :"Done"  }</button>
                                        </div>
                                    </div>
                                </div>

                                {/* edit-date-pricing */}
                                {/* <DateListingPrice /> */}
                            </div>}
                    </div>
                </div> : ""}
        </>
    )
}
export default CalendarSideBar;