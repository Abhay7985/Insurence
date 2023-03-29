import React, { useEffect, useState } from 'react'
import { Badge, Dropdown, Input, MenuProps } from 'antd';
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
import henceofrthValidations from "../utils/henceforthValidations";
import { message, Popconfirm } from 'antd';
import henceforthValidations from '../utils/henceforthValidations';



const EditBoatDetails = () => {


    const match = useMatch(`boat/:id/inquiry/edit/:type`)
    const location = useLocation()
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        amenities: [],
        extra_amenity: [],
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
        location_title:"",
        photos: [],
        prices: [],
        rules: "",
        size: "",
        smoking_allowed: 0,
        status: "",
        step: "",
        updated_at: "",
        location_id:0,
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
                Toast.success(henceofrthValidations.capFirst(apiRes.message))
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
        setLoading(true)
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
        // if(location.hash){ window.location.hash=""}
        initialise(true)
    }, [match?.params.id])


    const deleteListing = async (id: any) => {
        try {
            setLoading(true)
            

            const apiRes = await henceforthApi.Boat.deleteBoat(id)
            Toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            Toast.error(error)
        } finally {
            // setOpen(false);
            setLoading(false);
        }

    }

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
        slidesToShow: state.photos.length >= 4 ? 4 : state.photos.length,
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
    console.log(state.location_title)
    return (
        <section className='morning-panormic-listing py-5' >
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-5">
                        <div className="title d-flex justify-content-between flex-wrap">
                            <h2>{state.name}</h2>
                            <div className="list-btn d-flex gap-3 flex-wrap">
                                <a href="#" className='d-flex gap-2 align-items-center text-dark me-3'>
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
                                    <button className='btn btn-outline-yellow fw-600'>Preview Listing</button>
                                </Link>
                                {/* <button className='btn btn-outline-red d fw-600' onClick={() => deleteListing(match?.params.id)}>
                                        <HenceforthIcons.DeleteRed />
                                        <span className='ms-2 align-middle'>Delete Listing</span>
                                    </button> */}
                                <Popconfirm
                                    title="Delete the Details"
                                    description="Are you sure"
                                    okText="Yes"
                                    // open={open}
                                    okButtonProps={{ loading: loading }}
                                    placement="bottom"
                                    okType="danger"
                                    cancelText="No"
                                    onConfirm={() => {
                                        deleteListing(match?.params.id)
                                    }}

                                >
                                    <a href="#" className="btn btn-outline-red d fw-600">
                                        {/* <img src={resetIcon} alt="icon" /> */}
                                        <span className="ms-2">Delete Listing </span>
                                    </a>
                                </Popconfirm>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="tab-box row">
                            {/* tabs */}
                            <div className='col-md-3'>
                                <div className='bg-white h-100 tab-nav'>
                                    <div className="nav flex-column nav-pills bg-white" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        {/* Listing accordian */}
                                        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                            {/* Listing accordian */}
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <Link to={`/boat/${match?.params.id}/inquiry/edit/${henceofrthEnums.EditType.details}#photos_tab`} className="accordion-button">
                                                            Listing Details
                                                        </Link>
                                                    </h2>
                                                    <div className={`accordion-collapse ${match?.params.type == henceofrthEnums.EditType.details ? 'collapse show' : 'collapse'}`}>
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
                                                                    <a href="#extraamenities_tab" className={`${location.hash === '#extraamenities_tab' ? 'active-tab' : ''} nav-link`}>Extra's</a>
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
                                                    <Link to={`/boat/${match?.params.id}/inquiry/edit/${henceofrthEnums.EditType.price}#price_tab`} className="accordion-button">
                                                        Pricing and Availability
                                                    </Link>

                                                </h2>
                                                <div className={`accordion-collapse ${match?.params.type == henceofrthEnums.EditType.price ? 'collapse show' : 'collapse'}`}>
                                                    <div className="accordion-body text-start">
                                                        <ul>
                                                            <li>
                                                                <a href="#price_tab" className={`${location.hash === '#price_tab' ? 'active-tab' : ''} nav-link`}>Pricing</a>
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
                                                    <Link to={`/boat/${match?.params.id}/inquiry/edit/${henceofrthEnums.EditType.rules}#rules_tab`} className="accordion-button">
                                                        Rules & Includes
                                                    </Link>
                                                </h2>
                                                <div className={`accordion-collapse ${match?.params.type == henceofrthEnums.EditType.rules ? 'collapse show' : 'collapse'}`}>
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
                                </div>
                            </div>
                            {/* content  */}
                            <div className='col-md-9'>
                                <div className="tab-content w-100" id="v-pills-tabContent">
                                    {match?.params.type == henceofrthEnums.EditType.details &&
                                        <div className=" ">
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
                                                <div className={`slider-box mt-4 ${state.photos.length ? 'd-block' : 'd-none'}`}>
                                                    <Slider {...settings}>
                                                        {state.photos.map((res: any, index: number) => <div className='slider-inner'>
                                                            <PhotoSlider {...res} />
                                                        </div>)}
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
                                                                    {state?.amenities.length ? state?.amenities?.map((e: any) => <li>{e.amenity}</li>) : <li>No Amenities found</li>}
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
                                            {state.name &&
                                                <div className="Listing-basics bg-white Pricing mb-4" id='extraamenities_tab'>
                                                    <div className="photo-header d-flex justify-content-between mb-3">
                                                        <h4>Extra's</h4>
                                                    </div>
                                                    <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                        <div className="listing-content">
                                                            <h6 className='mb-2'>Extra's</h6>
                                                            <div className="amenities-list d-flex gap-5">
                                                                <ul>
                                                                    {state?.extra_amenity.length ? state?.extra_amenity?.map((e: any) => <li className='text-capitalize'>{e.extra_amenity} - ${henceforthValidations.BrazilianReal(e.price)}</li>) : <li>No Extra's found</li>}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="edit-photo">
                                                            <Link to={`/boat/${match?.params.id}/extra/edit`}>
                                                                <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>}
                                            {/* Location */}
                                            {state.location_title &&
                                                
                                                <EditLocationBoat {...state} initialise={initialise} />
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
                                    }
                                    {match?.params.type == henceofrthEnums.EditType.price &&
                                        <div >
                                            {state.name && state.prices &&
                                                <EditPriceBoat {...state} initialise={initialise} />
                                            }


                                            <div className="Calender-availability bg-white p-4 ">
                                                <div className="photo-header d-flex justify-content-between mb-3 flex-wrap">
                                                    <h4>Calender availability</h4>
                                                    <div className="edit-photo">
                                                        <Link to={`/calender?boat_id=${match.params.id}`}>
                                                            <button className='btn p-0 border-0 text-yellow fw-bold'>Open calender</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {match?.params.type == henceofrthEnums.EditType.rules && state.name &&

                                        <div className="roules Pricing bg-white mb-4" id="rules_tab">
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
                                    {/* </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // </Spin>
    )
}

export default EditBoatDetails
