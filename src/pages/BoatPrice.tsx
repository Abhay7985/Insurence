import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_six.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';
import { NumberValidation } from '../utils/henceforthValidations';

interface RouteData {
    price?: number,
    selected?: boolean
    installments?: number,
    date?: string,
    priceing_date?: string,
    route_id: number,
    installment_price: number,
    route_name: string,
}

const BoatPrice = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/price`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)
    const [spinning, setSpinning] = React.useState(false)

    const [routes, setRoutes] = useState<Array<RouteData>>([])
    const [index, setIndex] = useState<number>(0)

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const items = {
            price_boat: {
                boat_id: match?.params.id,
                route_prices: routes.filter(((res: any) => res.selected == true)).map((res: any) => {
                    return {
                        route_id: res.id,
                        price: res.price,
                        route_name: res.route_name,
                        installments: res.installments,
                        installment_price: res.installment_price
                    }
                })
            }
        }
        const data = items.price_boat.route_prices
        if (data.length) {
            let _is_true = true
            data.forEach(element => {
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
                    setSpinning(true)
                    let res = await henceforthApi.Boat.create(items)
                    Toast.success(res.message)
                    navigate({
                        pathname: `/boat/${match?.params.id}/inquiry`,
                        search: uRLSearchParams.toString()
                    })

                } catch (error) {
                    Toast.error(error)
                } finally {
                    setSpinning(false)
                }
            }
        } else {
            Toast.error(`Please select routes`)
        }

    }

    const boatRoutes = async () => {
        setSpinning(true)

        try {
            let res = await henceforthApi.Boat.boatRoutes()
            setRoutes(res.data)
        } catch (error) {
            console.log(error);
        } finally {
            setSpinning(false)
        }
    }

    useEffect(() => {
        boatRoutes()
    }, [])

    const handleChange = async (name: string, value: any, index: number) => {
        console.log('name,value', name, value)
        if (name === "price" && !NumberValidation(value)) return
        if (name === "installments" && !NumberValidation(value)) return
        if (name === "installment_price" && !NumberValidation(value)) return

        const data = routes[index] as any
        if (typeof value == "boolean") {
            data.selected = value
        }

        data[name] = value
        setRoutes([...routes])
    }



    return (
        <Spin spinning={spinning}>
            <section className="Confirm-address-section h-100">
                <div className="container-fluid h-100">
                    <form className="row h-100" onSubmit={onSubmit}>
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-3 gy-sm-4 pb-5">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title pb-3'>Price your boat.</h3>
                                    </div>
                                    {routes.map((res: any, index: number) =>
                                        <div className="col-11 col-lg-11" key={res.id}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value={res.id} checked={res.selected} id={`boat-check-1${index}`} onChange={(e: any) => handleChange(e.target.name, e.target.checked, index)} />
                                                <label className="form-check-label" htmlFor={`boat-check-1${index}`}>
                                                    {res.route_name}
                                                </label>
                                            </div>
                                            {res.selected && <div className="row justify-content-end py-3">
                                                <div className="col-md-12">
                                                    <div className="mb-3 ps-sm-4">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                                        <input type="text" className="form-control" id="exampleInputEmail1" name='price' placeholder='Enter price' value={res.price ? res.price : ''} onChange={(e) => handleChange(e.target.name, e.target.value, index)} />
                                                    </div>
                                                    <div className="ps-sm-4">
                                                        <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                                        <div className="price-input d-flex gap-3 align-items-center">
                                                            <input type="text" className="form-control" placeholder='Enter installments' name='installments' onChange={(e) => handleChange(e.target.name, e.target.value, index)} />
                                                            <span>*</span>
                                                            <input type="text" className="form-control" placeholder='Enter price' name='installment_price' onChange={(e) => handleChange(e.target.name, e.target.value, index)} />
                                                            <span>=</span>
                                                            <input type="text" className="form-control" placeholder='$00' value={Number(res?.installments || 0) * Number(res?.installment_price || 0)} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>)}
                                </div>
                                <BackNextLayout buttonName="Finish" />
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                            <div className="banner-image border">
                                <img src={bannerImage} alt="" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Spin>
    )
}

export default BoatPrice;
