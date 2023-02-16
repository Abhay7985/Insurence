import leftArrow from '../assets/icons/arrow_back.svg';
import BannerImage from '../assets/images/boat_one.png';
import petIcon from '../assets/images/pet.png';
import smoking from '../assets/images/cigar.png';
import currentLocation from '../assets/icons/exact_location.svg';
import { DatePickerProps, Spin } from 'antd';
import { DatePicker, Space } from 'antd';
import henceforthApi from '../utils/henceforthApi';
import { Link, useMatch } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/Provider';
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import HenceforthGoogleMap from '../utils/henceforthGoogleMap';

const defaultProps = {
    center: {
        lat: 10.99835602,
        lng: 77.01502627
    },
    zoom: 11
};
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const BoatDetails = () => {

    const match = useMatch(`boat/:id/inquiry`)
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
const googleMapRef=useRef() as any
    const [state, setState] = useState({
        amenities: [],
        bathrooms: 0,
        bedrooms: 0,
        category: "",
        category_id: 0,
        cover_image: "",
        created_at: "",
        id: "",
        location: {} as any,
        manufacturer: "",
        manufacturer_id: "",
        minimum_price: "",
        model: "",
        name: "",
        passenger_day: "",
        passenger_night: "",
        pets_allowed: 0,
        photos: [],
        prices: [],
        rules: "",
        size: "",
        smoking_allowed: 0,
        status: "",
        step: "",
        updated_at: "",
        address: {
            address1: ""
        }
    })

    const initialise = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {
            setLoading(true)
            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            setState(res.data);

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialise()
    }, [match?.params.id])

    const createMerker = (position: google.maps.LatLng | google.maps.LatLngLiteral, map: google.maps.Map, icon?: any) => {
        return new google.maps.Marker({
          position,
          map,
          draggable: false,
          label:{text:state.name , color :"#FFFFFF"},
          icon: icon,
        });
      }
    const onGoogleApiLoaded = ({ map, maps, ref }: any) => {
        let latlng = new (window as any).google.maps.LatLng(
            state.location.latitude,
            state.location.longitude
          )
          createMerker(latlng,map)
        map.addListener("click", (event: google.maps.MapMouseEvent) => {
     
        });
    }

    return (
        <Spin spinning={loading} >
            <section className="morning-panormic py-4">
                <div className="container">
                    {/* banner-row */}
                    <div className="row">
                        <div className="col-12">
                            <div className="boat-header d-flex justify-content-between">
                                <div className="title">
                                    <div className="left-arrow" onClick={() => window?.history.back()}>
                                        <HenceforthIcons.DetailBack />
                                    </div>
                                    <h3 className='mt-4 mb-2'>{state.name}</h3>
                                    <p>{state.category} • {state?.address?.address1}</p>
                                </div>
                                <div className="share-btn align-self-end d-flex gap-2 align-items-center">
                                    <HenceforthIcons.Share />
                                    <Link to='' className='text-black'>Share</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row gy-4 py-4 ms-0">
                                <div className="col-md-6 ps-0">
                                    <div className="morning-banner">
                                        <img src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.cover_image}`} alt="img" className='img-fluid' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row gy-2 h-100">
                                        {state?.photos?.map((res: any) =>
                                            <>
                                                <div className="col-6 ps-0">
                                                    <div className="boat-group-image h-100">
                                                        <img src={res.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.image}` : BannerImage} alt="img" className='img-fluid w-100 h-100' />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>

                                    {/* <div className="row gy-2">
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                        <div className="col-6 ps-0">
                                            <div className="morning-banner">
                                                <img src={BannerImage} alt="img" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-row */}
                    <div className="row gy-4">
                        {/* content */}
                        <div className="col-lg-6 col-xl-7">
                            <div className="morning-content">
                                <div className="content-title border-bottom pb-4">
                                    <h4 className='mb-2'>{state.size}-foot speedboat for up to {state.passenger_day} passengers</h4>
                                    <p>{state.passenger_day} passengers day • {state.passenger_night} passengers overnight • {state.bedrooms} rooms • {state.bathrooms} bathrooms</p>
                                </div>
                                {/* aminities */}
                                <div className="aminities border-bottom py-3 py-sm-4">
                                    <h4 className='mb-2'>Amenities</h4>
                                    <div className="aminities-list d-flex gap-5">
                                        <ul>
                                            {state?.amenities?.map((e: any, index: number) => <li key={index}>{e?.amenity}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                {/* Itineraries rules */}
                                <div className="Itineraries-rules border-bottom py-3 py-sm-4">
                                    <h4 className='mb-2'>Itineraries rules</h4>
                                    <ul>
                                        <li className='d-flex gap-3 align-items-center'>
                                            <div className="pet-image">
                                                <img src={petIcon} alt="icon" className='img-fluid' />
                                            </div>
                                            <p>Pets are {state?.pets_allowed === 0 ? 'not allowed' : "allowed"}</p>
                                        </li>
                                        <li className='d-flex gap-3 align-items-center'>
                                            <div className="smoking">
                                                <img src={smoking} alt="icon" className='img-fluid' />
                                            </div>
                                            <p>Smoking is {state?.smoking_allowed === 0 ? 'not allowed' : "allowed"}</p>
                                        </li>
                                        <li>
                                            <p>{state?.rules}</p>
                                        </li>
                                    </ul>

                                </div>
                                {/* Location */}
                                <div className="Location py-4">
                                    <h4 className='mb-4'>Location</h4>
                                 
                                    <div style={{ height: '100vh', width: '100%' }}>
                                        <HenceforthGoogleMap
                                            ref={googleMapRef}
                                            defaultCenter={state.location}
                                            // center={onAddressChanged.center}
                                            zoom={defaultProps.zoom}
                                            defaultZoom={defaultProps.zoom}
                                            onGoogleApiLoaded={onGoogleApiLoaded}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* price-card */}
                        <div className="col-lg-6 col-xl-5">
                            <div className="price-card px-4 py-4">
                                <h4 className='mb-3'>From ${state.minimum_price}</h4>
                                <div className="select-date">
                                    <DatePicker onChange={onChange} />
                                </div>
                                {/* price-list-1 */}
                                {state?.prices?.map((e: any, index: number) => {
                                    return (
                                        <>
                                            <div className="price-list py-3 border-bottom" key={e?.id}>
                                                <div className="price-list-title d-flex justify-content-between mb-2">
                                                    <p>{e?.date}</p>
                                                    <p className='fw-bold'>${e?.price}<span className='fw-normal fs-14 px-1'>or</span> {e?.installments}x in ${e?.installment_price}</p>
                                                </div>
                                                <div className="price-list-title d-flex justify-content-between">
                                                    <p className='fs-14'>{e?.route}</p>
                                                    <div className="choose-btn align-self-end">
                                                        <button className='btn btn-yellow fs-14 py-0'>Choose</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spin>
    )
}

export default BoatDetails
