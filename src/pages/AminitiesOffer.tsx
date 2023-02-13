import React, { useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

const AminitiesOffer = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/aminities`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast, authState } = React.useContext(GlobalContext)
    const [amenities, setAmenities] = useState<Array<number>>([])

    const handleChecked = (e: any) => {
        let prev = amenities;
        let value = e.target.value
        let itemIndex = prev.indexOf(value);
        if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
        } else {
            prev.push(value);
        }
        setAmenities([...prev]);
    };

    console.log(amenities);


    const onSubmit = async (e: any) => {
        e.preventDefault()
        // uRLSearchParams.set("manufacturer_id", manufacturer_id)
        let items = {
            amenities: {
                boat_id: Number(match?.params.id),
                amenities: amenities
            }
        }
        try {
            let apiRes = await henceforthApi.Boat.create(items)
            Toast.success(apiRes.message)

            navigate({
                pathname: `/boat/${match?.params.id}/photos`,
                search: uRLSearchParams.toString()
            })
            
        } catch (error) {   
        }
    }

    const amenitiesOffers = [
        { id: 1, offer: "Blanket" },
        { id: 2, offer: "Conditioner" },
        { id: 3, offer: "Sheet" },
        { id: 4, offer: "Toilet paper" },
        { id: 5, offer: "Soap" },
        { id: 6, offer: "Towel" },
        { id: 7, offer: "Pilow" },
        { id: 8, offer: "Shampoo" },
        { id: 9, offer: "Wine House" },
        { id: 10, offer: "Hot Water" },
        { id: 11, offer: "Amplifier" },
        { id: 12, offer: "Anchor" },

    ]
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
                                    {amenitiesOffers.map((e: any) =>
                                        <div className="col-11 col-lg-11">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value={e.id} onChange={(e: any)=>handleChecked(e)} id="check1" />
                                                <label className="form-check-label" htmlFor="check1">
                                                    {e.offer}
                                                </label>
                                            </div>
                                        </div>)}
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

export default AminitiesOffer
