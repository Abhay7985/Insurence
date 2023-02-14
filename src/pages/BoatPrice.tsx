import React, { useEffect, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

interface RouteData {
    price: number,
    selected?: boolean
    installments: number,
    date: string,
    priceing_date: string,
    route_id: number,
    installment_price: number,
}

const BoatPrice = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/price`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)
    const [state, setState] = useState<Array<RouteData>>([])
    const [routes, setRoutes] = useState([])

    const handleState = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value

        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        let items = {

        }

        navigate({
            pathname: `/boat/${match?.params.id}/inquiry`,
            search: uRLSearchParams.toString()
        })

    }

    const boatRoutes = async () => {
        try {
            let res = await henceforthApi.Boat.boatRoutes()
            setRoutes(res.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        boatRoutes()
    }, [])

    const handleChange = async (name: string, value: boolean, index: number) => {  
        // const arr: any = []
        // arr.splice(2, 0, {...state,selected:value});
        // // arr[index].push([{...state,selected:value}])

        // console.log(arr);
    }


   


    return (
        <>
            {/* Boat-Price */}
            <section className="Confirm-address-section">
                <div className="container-fluid">
                    <form className="row" onSubmit={onSubmit}>
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-4 pb-5">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title pb-3'>Price your boat.</h3>
                                    </div>
                                    {routes.map((res: any, index: number) =>
                                        <div className="col-11 col-lg-11">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value={res.id} checked={res.selected} id="boat-check-1" onChange={(e: any) => handleChange(e.target.name , e.target.checked, index)} />
                                                <label className="form-check-label" htmlFor="boat-check-1">
                                                    {res.route_name}
                                                </label>
                                            </div>
                                            {<div className="row justify-content-end py-3">
                                                <div className="col-md-12">
                                                    <div className="mb-3 ps-sm-4">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                                        <input type="text" className="form-control" id="exampleInputEmail1" name='price' placeholder='Enter price' onChange={handleState} />
                                                    </div>
                                                    <div className="ps-sm-4">
                                                        <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                                        <div className="price-input d-flex gap-3 align-items-center">
                                                            <input type="text" className="form-control" placeholder='Enter installments' name='installments' onChange={handleState} />
                                                            <span>*</span>
                                                            <input type="text" className="form-control" placeholder='Enter price'  name='installments_price' onChange={handleState}/>
                                                            <span>=</span>
                                                            <input type="text" className="form-control" placeholder='$00' value={""} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>)}
                                    {/* <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-2" />
                                            <label className="form-check-label" htmlFor="boat-check-2">
                                                Panorâmico Pôr do Sol - 14:30 às 18:30 (4 hours PM)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-3" />
                                            <label className="form-check-label" htmlFor="boat-check-3">
                                                Panorâmico 2hrs (2 hours tour)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-4" />
                                            <label className="form-check-label" htmlFor="boat-check-4">
                                                Panorâmico Pôr do sol + Noturno 14 às 20hrs (6 hours PM) - Panorâmico Completo - 10 às 18hrs (Full day panoramic tour - 8 hours)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-5" />
                                            <label className="form-check-label" htmlFor="boat-check-5">
                                                Panorâmico Noturno - 20 à meia noite (night time tour)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-6" />
                                            <label className="form-check-label" htmlFor="boat-check-6">
                                                Roteiro Ilha dos Frades - 10 às 18hrs (Island tour 1)
                                            </label>
                                        </div>
                                    </div> */}

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
        </>
    )
}

export default BoatPrice;
