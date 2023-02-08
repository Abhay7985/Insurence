import { Link } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';

const BoatPrice = () => {
    return (
        <>
            {/* Boat-Price */}
            <section className="Confirm-address-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-4 pb-5">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title pb-3'>Price your boat.</h3>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="boat-check-1" />
                                            <label className="form-check-label" htmlFor="boat-check-1">
                                                Panorâmico Manhã - 9 às 13hrs (4 hours AM)
                                            </label>
                                        </div>
                                        <div className="row justify-content-end py-3">
                                            <div className="col-md-12">
                                                <div className="mb-3 ps-sm-4">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter price' />
                                                </div>
                                                <div className="ps-sm-4">
                                                    <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                                    <div className="price-input d-flex gap-3 align-items-center">
                                                        <input type="email" className="form-control" placeholder='Enter installments' />
                                                        <span>*</span>
                                                        <input type="email" className="form-control" placeholder='Enter price' />
                                                        <span>=</span>
                                                        <input type="email" className="form-control" placeholder='$00' disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
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
                                    </div>

                                </div>
                                <div className="row banner-footer border-top mt-auto justify-content-end ">
                                    <div className="col-11 col-lg-11">
                                        <ul className='d-flex justify-content-between'>
                                            <li>
                                                <Link to='/safety-question' className='btn back-btn border-0'>Back</Link>
                                            </li>
                                            <li>
                                                <Link to='/morning-panormic' className='btn btn-yellow px-3'>Finish</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                            <div className="banner-image border">
                                <img src={bannerImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BoatPrice;
