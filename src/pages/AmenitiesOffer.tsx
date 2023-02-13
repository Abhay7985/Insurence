import React from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';

const AmenitiesOffer = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/amenities`)
    const uRLSearchParams = new URLSearchParams(location.search)

    const { Toast } = React.useContext(GlobalContext)

    const onSubmit = async (e: any) => {
        e.preventDefault()
        // uRLSearchParams.set("manufacturer_id", manufacturer_id)
        navigate({
            pathname: `/boat/${match?.params.id}/photos`,
            search: uRLSearchParams.toString()
        })

    }

    return (
        <>
            {/* Aminities-offer */}
            <section className="Confirm-address-section">
                <div className="container-fluid">
                    <form className="row" onSubmit={onSubmit}>
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-4">
                                    <div className="col-11 col-lg-11 mb-4">
                                        <h3 className='banner-title pb-3'>What amenities do you offer?</h3>
                                        <p>You will be able to add more amenities in your write up for your listing.</p>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check1" />
                                            <label className="form-check-label" htmlFor="check1">
                                                Blanket
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check2" />
                                            <label className="form-check-label" htmlFor="check2">
                                                Conditioner
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check3" />
                                            <label className="form-check-label" htmlFor="check3">
                                                Sheet
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check4" />
                                            <label className="form-check-label" htmlFor="check4">
                                                Toilet paper
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check5" />
                                            <label className="form-check-label" htmlFor="check5">
                                                Soap
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check6" />
                                            <label className="form-check-label" htmlFor="check6">
                                                Towel
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check7" />
                                            <label className="form-check-label" htmlFor="check7">
                                                Pilow
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check8" />
                                            <label className="form-check-label" htmlFor="check8">
                                                Shampoo
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check9" />
                                            <label className="form-check-label" htmlFor="check9">
                                                Wine House
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check10" />
                                            <label className="form-check-label" htmlFor="check10">
                                                Hot Water
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check11" />
                                            <label className="form-check-label" htmlFor="check11">
                                                Amplifier
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="check12" />
                                            <label className="form-check-label" htmlFor="check12">
                                                Anchor
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <BackNextLayout />
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

export default AmenitiesOffer
