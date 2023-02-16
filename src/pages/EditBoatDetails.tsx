import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Input, MenuProps, Select, Space, Spin } from 'antd';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';
import BasicListing from '../Components/edit/EditBasicBoat';
import InfoPassengersBoat from '../Components/edit/EditInfoPassengersBoat';
import EditInfoBoat from '../Components/edit/EditInfoBoat';
import EditLocationBoat from '../Components/edit/EditLocationBoat';
import EditPriceBoat from '../Components/edit/EditPriceBoat';
import EditRuleSmokingAllowed from '../Components/edit/EditRuleSmokingAllowed';
import EditRulePetsAllowed from '../Components/edit/EditRulePetsAllowed';
import EditSecurityBoat from '../Components/edit/EditSecurityBoat';
import henceofrthEnums from '../utils/henceofrthEnums';
import Slider from "react-slick";
import PhotoSlider from './common/PhotoSlider';



const EditBoatDetails = () => {


    const match = useMatch(`boat/:id/inquiry/edit`)
    const location = useLocation()
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = useState({
        amenities: [],
        bathrooms: 0,
        bedrooms: 0,
        category_id: 0,
        cover_image: "",
        created_at: "",
        id: "",
        location: "",
        manufacturer_id: "",
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
            id: 0,
            address1: "",
            address2: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            show_location: 1,
            created_at: "",
            updated_at: ""
        }
    })

    const handleStatus = async (status: string) => {
        try {
            const items = {
                status
            }
            setLoading(true)
            try {
                const apiRes = await henceforthApi.Boat.status(state.id, items)
                Toast.success(apiRes.message)
                await initialise(true)
            } catch (error) {
                Toast.error(error)
            } finally {
                setLoading(false)
            }
        } catch (error) {

        }
    }

    const initialise = async (b: boolean) => {
        setLoading(b)
        henceforthApi.setToken(authState?.access_token)
        try {
            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            setState(res.data);

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialise(true)
    }, [match?.params.id])

    const StatusItem: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    {henceofrthEnums.OrderStatus.list}
                </span>
            ),
            icon: <Badge color={henceofrthEnums.OrderColor.listed} />,
            onClick: () => handleStatus(henceofrthEnums.OrderStatus.listed),
            disabled: henceofrthEnums.OrderStatus.listed === state?.status

        },
        {
            key: '2',
            label: (
                <span>
                    {henceofrthEnums.OrderStatus.unlist}
                </span>
            ),
            icon: <Badge color={henceofrthEnums.OrderColor.unlisted} />,
            onClick: () => handleStatus(henceofrthEnums.OrderStatus.unlisted),
            disabled: henceofrthEnums.OrderStatus.unlisted === state?.status

        }

    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Spin spinning={loading} >
            <section className='morning-panormic-listing py-5' >
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <div className="title d-flex justify-content-between">
                                <h2>Morning Panoramic</h2>
                                <div className="list-btn d-flex gap-4">
                                    <a href="#" className='d-flex gap-2 align-items-center text-dark'>
                                        <Dropdown menu={{ items: StatusItem }}>
                                            <Badge color={state?.status == henceofrthEnums.OrderStatus.listed ?
                                                henceofrthEnums.OrderColor.listed :
                                                state?.status == henceofrthEnums.OrderStatus.unlisted ?
                                                    henceofrthEnums.OrderColor.unlisted :
                                                    henceofrthEnums.OrderColor.draft}
                                                text={state?.status} />
                                        </Dropdown>
                                    </a>
                                    <Link to={`/boat/${match?.params.id}/inquiry`}>
                                        <button className='btn btn-outline-yellow'>Preview Listing</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="tab-box row">
                                {/* tabs */}
                                <div className='col-md-3'><div className='bg-white h-100'>
                                    <div className="nav flex-column nav-pills bg-white" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        {/* Listing accordian */}
                                        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                            {/* Listing accordian */}
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            Listing Details
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body text-start">
                                                            <ul>
                                                                <li>
                                                                    <a href="#photos_tab" className={`${location.hash === '#photos_tab' ? 'active-tab' : ''} nav-link`}>Photos</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#listing_tab" className={`${location.hash === '#listing_tab' ? 'active-tab' : ''} nav-link`}>Listing basics</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#amenities_tab" className={`${location.hash === '#amenities_tab' ? 'active-tab' : ''} nav-link`}>Amenities</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#location_tab" className={`${location.hash === '#location_tab' ? 'active-tab' : ''} nav-link`}>Location</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#passengers_tab" className={`${location.hash === '#passengers_tab' ? 'active-tab' : ''} nav-link`}>Boat & passengers</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                        {/* Pricing and Availability */}
                                        <div className="accordion" id="pricingAccordian">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#pricing" aria-expanded="true" aria-controls="pricing">
                                                        Pricing and Availability
                                                    </button>
                                                </h2>
                                                <div id="pricing" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#pricingAccordian">
                                                    <div className="accordion-body text-start">
                                                        <ul>
                                                            <li>
                                                                <a href="#pricing_tab" className={`${location.hash === '#pricing_tab' ? 'active-tab' : ''} nav-link`}>Pricing</a>
                                                            </li>
                                                            <li>
                                                                <Link to={`/calender`} className="nav-link">Calender availability</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Rules & Includes */}
                                        <div className="accordion" id="RulesAccordian">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rules" aria-expanded="true" aria-controls="rules">
                                                        Rules & Includes
                                                    </button>
                                                </h2>
                                                <div id="rules" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#RulesAccordian">
                                                    <div className="accordion-body text-start">
                                                        <ul>
                                                            <li>
                                                                <a href="#rules_tab" className={`${location.hash === '#rules_tab' ? 'active-tab' : ''} nav-link`}>Rules</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>
                                {/* content  */}
                               <div className='col-md-9'>
                               <div className="tab-content w-100" id="v-pills-tabContent">
                                    {/* Listing accordian */}
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                        {/* photos */}
                                        <div className="photos Pricing bg-white mb-4" >
                                            <div className="photo-header d-flex justify-content-between">
                                                <h4>Photos ({state.photos.length})</h4>
                                                <div className="edit-photo" id='listing_tab'>
                                                    <Link to={`/boat/${match?.params.id}/photos/edit`} >
                                                        <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                    </Link>
                                                </div>
                                            </div>
                                            {/* photo-slider */}
                                            <div className="slider-box mt-4">
                                                <Slider {...settings}>
                                                    <div className='slider-inner'>
                                                        <PhotoSlider />
                                                    </div>
                                                    <div className='slider-inner'>
                                                        <PhotoSlider />
                                                    </div>
                                                    <div className='slider-inner'>
                                                        <PhotoSlider />
                                                    </div>
                                                    <div className='slider-inner'>
                                                        <PhotoSlider />
                                                    </div>
                                                    <div className='slider-inner'>
                                                        <PhotoSlider />
                                                    </div>
                                                    <div className='slider-inner'>
                                                        <PhotoSlider />
                                                    </div>
                                                </Slider>
                                            </div>
                                        </div>
                                        {/* Listing-basics */}
                                        {state.name &&
                                            <BasicListing {...state} initialise={initialise} />
                                        }
                                        {/* Amenities */}
                                        {state.name &&

                                            <div className="Listing-basics bg-white Pricing mb-4">
                                                <div className="photo-header d-flex justify-content-between mb-3">
                                                    <h4>Amenities</h4>
                                                </div>
                                                <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                    <div className="listing-content">
                                                        <h6 className='mb-2'>Amenities</h6>
                                                        <div className="amenities-list d-flex gap-5">
                                                            <ul>
                                                                {state?.amenities?.map((e: any) => <li>{e.amenity}</li>)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="edit-photo">
                                                        <Link to={`/boat/${match?.params.id}/amenities/edit`}>
                                                            <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>}
                                        {/* Location */}
                                        {state.name &&
                                            <EditLocationBoat {...state.address} initialise={initialise} />
                                        }
                                        {/* Boat & passengers */}
                                        {state.name &&
                                            <div className="boat-passengers bg-white Pricing" id="passengers_tab">
                                                <div className="photo-header d-flex justify-content-between mb-3">
                                                    <h4>Boat & passengers</h4>
                                                </div>
                                                <EditInfoBoat {...state} initialise={initialise} />
                                                <InfoPassengersBoat {...state} initialise={initialise} />

                                            </div>
                                        }

                                    </div>
                                    {/* Pricing and Availability */}
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        {/* Pricing */}

                                        {/* edit-pricing */}
                                        {state.name && state.prices &&
                                            <EditPriceBoat {...state} initialise={initialise} />
                                        }

                                        {/* Calender availability */}
                                        <div className="Calender-availability bg-white p-4 ">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Calender availability</h4>
                                                <div className="edit-photo">
                                                    <Link to={`/calender`}>
                                                        <button className='btn p-0 border-0 text-yellow fw-bold'>Open calender</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Rules & Includes */}
                                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        {/* Rules */}
                                        {state.name &&

                                            <div className="roules Pricing bg-white mb-4">
                                                <div className="photo-header d-flex justify-content-between mb-3">
                                                    <h4>Rules</h4>
                                                </div>
                                                {/* smoking */}
                                                <EditRuleSmokingAllowed {...state} initialise={initialise} />
                                                {/* pets */}
                                                <EditRulePetsAllowed {...state} initialise={initialise} />
                                                {/* Rules and Security */}
                                                <EditSecurityBoat {...state} initialise={initialise} />
                                            </div>
                                        }
                                    </div>

                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spin>
    )
}

export default EditBoatDetails
