import React, { useEffect, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';


const BoatPrice = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/price`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)
    const [routes, setRoutes] = useState([])
    const [state, setState] = useState({
        price: "",
        installments: "",
        date: "",
        priceing_date: "",
        route: "",
        installment_price: ""
    })

    const handleState = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    console.log(state);
    

    const onSubmit = async (e: any) => {
        e.preventDefault()

        let items = {

        }

        navigate({
            pathname: `/boat/${match?.params.id}/inquiry`,
            search: uRLSearchParams.toString()
        })

    }

    const boatroutes = async () => {
        try {
            let res = await henceforthApi.Boat.boatRoutes()
            setRoutes(res.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        boatroutes()
    }, [])

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
                                    <div className="col-11 col-lg-11">
                                        {/* <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-1" />
                                            <label className="form-check-label" htmlFor="boat-check-1">
                                                Panorâmico Manhã - 9 às 13hrs (4 hours AM)
                                            </label>
                                        </div> */}
                                        <div className="row justify-content-end py-3">
                                            <div className="col-md-12">
                                                <div className="mb-3 ps-sm-4">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" value={""} name='price' placeholder='Enter price' onChange={handleState} />
                                                </div>
                                                <div className="ps-sm-4">
                                                    <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                                    <div className="price-input d-flex gap-3 align-items-center">
                                                        <input type="text" className="form-control" placeholder='Enter installments' name='installments' onChange={handleState} />
                                                        <span>*</span>
                                                        <input type="text" className="form-control" placeholder='Enter price' name='installment_price' onChange={handleState}/>
                                                        <span>=</span>
                                                        <input type="text" className="form-control" value={Number(state.installments) / Number(state.installment_price) } placeholder='$00' disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {routes.map((e: any) =>
                                        <div className="col-11 col-lg-11" key={e.id}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="boat-check-2" />
                                                <label className="form-check-label" htmlFor="boat-check-2">
                                                    {e.route_name}
                                                </label>
                                            </div>
                                        </div>
                                    )}
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
