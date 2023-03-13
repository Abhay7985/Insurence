import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_three.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

interface amenities {
    id: number,
    amenity: string
}

const AmenitiesOffer = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/amenities`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const [amenities, setAmenities] = useState<Array<number>>([])
    const [amenitiesOffers, setAmenitiesOffers] = useState<Array<amenities>>([])

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


    const handleAmenities = async () => {
        try {
            let res = await henceforthApi.Boat.boatAmenities()
            console.log(res);
            setAmenitiesOffers(res.data)
        } catch (error) {
        }
    }
    const deleteQuery = () => {
        uRLSearchParams.delete("action")
        navigate({
            search: uRLSearchParams.toString()
        })
    }
    const saveAndExit = async (b: boolean) => {
        let items = {
            amenities: {
                boat_id: Number(match?.params.id),
                amenities: amenities
            }
        }

        try {
            if (amenities.length > 0) {
                setLoading(true)
                let apiRes = await henceforthApi.Boat.create(items)
                Toast.success(apiRes.message)
                if (b) navigate(`/`, { replace: true })
                else navigate({
                    // pathname: `/boat/${match?.params.id}/photos`,
                    pathname: `/boat/${match?.params.id}/extra`,
                    search: uRLSearchParams.toString()
                })

            } else {
                Toast.error("Enter Amenities")
                deleteQuery()
            }
        } catch (error: any) {
            deleteQuery()
            if (error.response.body.message.amenities) return Toast.error(error.response.body.message.amenities[0])
        } finally {
            setLoading(false)
        }
    }
    const onSubmit = async (e: any) => {
        e.preventDefault()
        saveAndExit(false)
    }
    useEffect(() => {
        if (uRLSearchParams.get("action") === "save_and_exit") {
            saveAndExit(true)
        }
    }, [uRLSearchParams.get("action")])

    useEffect(() => {
        handleAmenities()
    }, [])

    return (
        <section className="Confirm-address-section h-100 px-2 px-md-0">
            <div className="container-fluid h-100">
                <form className="row h-100 place-layout" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <Spin spinning={loading}>
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-3 gy-sm-4">
                                    <div className="col-12 col-lg-11 mb-2 mb-md-4">
                                        <h3 className='banner-title pb-3'>What amenities do you offer?</h3>
                                        <p>You will be able to add more amenities in your write up for your listing.</p>
                                    </div>
                                    {amenitiesOffers.map((e: any, index: number) =>
                                        <div className="col-12 col-lg-11" key={index}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value={e?.id} onChange={(e: any) => handleChecked(e)} id={`check1${index}`} />
                                                <label className="form-check-label" htmlFor={`check1${index}`}>
                                                    {e?.amenity}
                                                </label>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </Spin>
                        <BackNextLayout />
                    </div>
                    <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                        <div className="banner-image border">
                            <img src={bannerImage} alt="" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AmenitiesOffer
