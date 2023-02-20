import { useLocation, useMatch, useNavigate } from "react-router-dom";
import bannerImage from '../assets/images/image_two.png';
import locationIcon from '../assets/icons/current_location.svg';
import React, { Fragment, useRef, useState } from "react";
import { GlobalContext, NEXT_PUBLIC_GOOGLE_API_KEY } from "../context/Provider";
import { Select, Space, Spin, Switch } from "antd";
import BackNextLayout from "../Components/boat/BackNextLayout";
import henceforthApi from "../utils/henceforthApi";
import CountryCodeJson from '../utils/CountryCode.json'
import { NumberValidation } from "../utils/henceforthValidations";
import HenceforthGoogleMap from "../utils/henceforthGoogleMap";
const defaultProps = {
    center: {
        lat: 20.593683,
        lng: 78.962883
    },
    zoom: 11
};

function PlaceLocated() {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/place`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const placeInputRef = useRef(null as any);
    const googleMapRef = useRef() as any
    const { Toast } = React.useContext(GlobalContext)
    const [inputFocued, setInputFocused] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [form, setForm] = React.useState(defaultProps)

    const [state, setState] = useState({
        street: "",
        flat: "",
        city: "",
        state: "",
        postCode: "",
        country: "",
        showLocation: false,
    })

    const handleState = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "postCode" && !NumberValidation(value)) return
        setState({
            ...state,
            [name]: value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let items = {
            location: {
                location: {
                    latitude: form.center.lat,
                    longitude: form.center.lng,
                },
                boat_id: match?.params.id
            },
            address: {
                address1: state.street,
                address2: state.flat,
                city: state.city,
                state: state.state,
                postcode: state.postCode,
                country: state.country,
                show_location: state.showLocation,
                boat_id: match?.params.id
            }
        }
        try {
            setLoading(true)
            if (!form.center.lat && !form.center.lng) {
                Toast.error("Enter Location")

            } else if (!state.street) {
                Toast.error("Enter Street")
            } else if (!state.flat) {
                Toast.error("Enter Flat Name")
            }
            else if (!state.city) {
                Toast.error("Enter City Name")

            } else if (!state.state) {
                Toast.error("Enter State Name")
            } 
            // else if (!state.postCode) {
            //     Toast.error("Enter Postcode")
            // }
            else if (!state.country) {
                Toast.error("Enter Country")
            }
            else {
                let apiRes = await henceforthApi.Boat.create(items)
                Toast.success(apiRes.message)
                navigate({
                    pathname: `/boat/${match?.params.id}/amenities`,
                    search: uRLSearchParams.toString()
                })
            }
        } catch (error: any) {
            // Toast.error(error)
            if (error.response.body.message.address1) return Toast.error(`Please Enter Street`)
            if (error.response.body.message.city) return Toast.error(error.response.body.message.city[0])
            if (error.response.body.message.country) return Toast.error(error.response.body.message.country[0])
            if (error.response.body.message.postcode) return Toast.error(error.response.body.message.postcode[0])
            if (error.response.body.message.state) return Toast.error(error.response.body.message.state[0])
        } finally {
            setLoading(false)
        }
    }

    const onChange = (value: any) => {
        setState({
            ...state,
            showLocation: value
        })
    };

    const handleChange = (value: string) => {
        setState({
            ...state,
            country: CountryCodeJson.find(res => res.name == value)?.code as string
        })
    };

    const onKeyDown = (keyEvent: any) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const requestCurrenctLocation = () => {
        console.log('requestCurrenctLocation called');
        try {
            navigator.geolocation.getCurrentPosition((successCallback) => {
                console.log("Latitude is :", successCallback.coords.latitude);
                console.log("Longitude is :", successCallback.coords.longitude);

                getLocationName(successCallback.coords.latitude, successCallback.coords.longitude)
            }, (errorCallback) => {
                console.log('errorCallback', errorCallback.message);

            });

        } catch (error) {
            console.log('requestCurrenctLocation error', error);

        }
    }


    const getLocationName = async (lat: number, lng: number) => {
        let address: any
        let latlng = new (window as any).google.maps.LatLng(
            lat,
            lng
        )
        var geocoder = new (window as any).google.maps.Geocoder()
        geocoder.geocode({ latLng: latlng }, async (results: any, status: any) => {
            address = results[0].address_components
            setLoactionsFromLatlng(address, '', lat, lng)
        })
    }

    const setLoactionsFromLatlng = (address: Array<any>, formatAddress: string, lat: number, lng: number) => {
        let items: any = {}
        if (Array.isArray(address) && address.length > 0) {
            let zipIndex = address.findIndex(res => res.types.includes("postal_code"))
            let administrativeAreaIndex = address.findIndex(res => res.types.includes("administrative_area_level_1", "political"))
            let localityIndex = address.findIndex(res => res.types.includes("locality", "political"))
            let countryIndex = address.findIndex(res => res.types.includes("country", "political"))
            let premiseIndex = address.findIndex(res => res.types.includes("premise", "street_number"))
            let sublocality1 = address.findIndex(res => res.types.includes('sublocality_level_1', 'sublocality', 'political'))
            let sublocality2 = address.findIndex(res => res.types.includes('sublocality_level_2', 'sublocality', 'political'))
            let route = address.findIndex(res => res.types.includes('route'))
            let subpremise = address.findIndex(res => res.types.includes('subpremise'))
            let street_number = address.findIndex(res => res.types.includes('street_number'))
            if (zipIndex > -1) {
                items.pin_code = address[zipIndex]?.long_name
              }
              if (administrativeAreaIndex > -1) {
                items.state = address[administrativeAreaIndex]?.long_name
              }
              if (localityIndex > -1) {
                items.city = address[localityIndex]?.long_name
              }
              if (countryIndex > -1) {
                items.country = address[countryIndex]?.long_name
              }
              if (premiseIndex > -1) {
                items.apartment_number = address[premiseIndex]?.long_name
              }
              items.full_address = formatAddress
              items.sublocality1 = address[sublocality1]?.long_name
              items.sublocality2 = address[sublocality2]?.long_name
              items.subpremise = address[subpremise]?.long_name
              items.route = address[route]?.long_name
              items.street_number = address[street_number]?.long_name
        }

        let latlng = new (window as any).google.maps.LatLng(
            form.center.lat,
            form.center.lng
        )
        let zoom = 12
        if (items?.country && items?.state && items?.city && items?.sublocality1 && (items?.sublocality2 || items?.route) && (items?.subpremise || items?.street_number)) zoom = 18
        if (items?.country && items?.state && items?.city && items?.sublocality1 && (items?.sublocality2 || items?.route) && items?.subpremise === undefined && items?.street_number === undefined) zoom = 18
        if (items?.country && items?.state && items?.city && items?.sublocality1 === undefined && items?.sublocality2 === undefined) zoom = 15
        if (items?.country && items?.state && items?.city === undefined && items?.sublocality1 === undefined && items?.sublocality2 === undefined) zoom = 8
        if (items?.country && items?.state === undefined && items?.city === undefined && items?.sublocality1 === undefined && items?.sublocality2 === undefined) zoom = 5
        setForm((form) => {
            return {
                ...form,
                center: {
                    ...form.center,
                    lat,
                    lng
                },
                zoom
            }
        })
        setState((state) => {
            return {
                ...state,
                street: items?.route,
                flat: items?.street_number ? items?.street_number : items?.apartment_number,
                city: items?.city,
                state: items?.state,
                postCode: items?.pin_code,
                country: items?.country,
            }
        })
    }

    const initPlaceAPI = () => {
        if (placeInputRef) {
            let autocomplete = new (window as any).google.maps.places.Autocomplete(
                placeInputRef.current
            );
            new (window as any).google.maps.event.addListener(
                autocomplete,
                "place_changed",
                () => {
                    let place = autocomplete.getPlace();
                    let formatAddress = place.formatted_address
                    const address = place.address_components
                    setLoactionsFromLatlng(address, formatAddress, place.geometry?.location.lat(), place.geometry?.location.lng())
                }
            );
        }


    };



    const onGoogleApiLoaded = ({ map, maps, ref }: any) => {
        initPlaceAPI()
    }
    console.log('googleMapRef', googleMapRef?.current)
    console.log('form', form)

    return (
        <Spin spinning={loading} className='h-100' >
            <section className="select-passenger-section h-100">
                <div className="container-fluid h-100">
                    <form className="row h-100" onSubmit={onSubmit} onKeyDown={onKeyDown}>
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row gy-2 justify-content-center justify-content-lg-end pb-5 pb-lg-0">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title'>Where is your place located?</h3>
                                    </div>
                                    {form.center.lng == defaultProps.center.lng ? <Fragment>
                                        <div className="col-11 col-lg-11">
                                            <input type="text" ref={placeInputRef} className="form-control" placeholder="Enter your address" onFocus={() => setInputFocused(true)} onBlur={() => setTimeout(() => setInputFocused(false), 100)} />

                                            {inputFocued && <div className="location border mt-1 d-flex gap-3 align-items-center nav-link" onClick={requestCurrenctLocation}>
                                                <div className="location-icon">
                                                    <img src={locationIcon} alt="icon" className="img-fluid" />
                                                </div>
                                                <p>Use my current location</p>
                                            </div>}
                                        </div></Fragment> : <Fragment>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-2 mb-sm-3">
                                                <label htmlFor="input1" className="form-label">Street</label>
                                                <input type="text" className="form-control" id='input1' value={state.street} placeholder='Enter street' name="street" onChange={handleState} />
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-2 mb-sm-3">
                                                <label htmlFor="input4" className="form-label">Flat, Suite, etc. (optional)</label>
                                                <input type="text" className="form-control" id='input4' placeholder='Enter flat, suite, etc.' value={state.flat} name="flat" onChange={handleState} />
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-2 mb-sm-3">
                                                <label htmlFor="input5" className="form-label">City</label>
                                                <input type="text" className="form-control" id='input5' placeholder='Enter City' value={state.city} name="city" onChange={handleState} />
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-2 mb-sm-3">
                                                <label htmlFor="input5" className="form-label">State (optional)</label>
                                                <input type="text" className="form-control" id='input5' placeholder='Enter State' name="state" value={state.state} onChange={handleState} />
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-2 mb-sm-3">
                                                <label htmlFor="input5" className="form-label">Postcode (optional)</label>
                                                <input type="text" className="form-control" id='input5' placeholder='Enter postcode' value={state.postCode} name="postCode" onChange={handleState} />
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-5">
                                                <label htmlFor="input2" className="form-label">Country / Region</label>
                                                <div className="category">
                                                    <Space direction="vertical" style={{ width: '100%' }}>
                                                        <Select
                                                            showSearch
                                                            size={'middle'}
                                                            defaultValue={state.country ? state.country : "Enter country / region"}
                                                            onChange={handleChange}
                                                            style={{ width: '100%' }}
                                                            autoClearSearchValue={true}
                                                            options={CountryCodeJson.map((res) => { return { value: res.name, label: res.name } })}

                                                        />
                                                    </Space>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-3 d-flex justify-content-between align-items-start">
                                                <div className="specific-location">
                                                    <h4 className='mb-2'>Show your specific location</h4>
                                                    <p>Make it clear to guests where your place is located. <a href="#">We'll only share your address after they've made a reservation.</a></p>
                                                </div>
                                                <div className="form-check form-switch ps-sm-5">
                                                    <Switch size="small" defaultChecked onChange={onChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>}
                                </div>
                            </div>
                            <BackNextLayout />
                        </div>
                        <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                            {/* <div className="banner-image border">
                                <img src={bannerImage} alt="" />
                            </div> */}
                            <div style={{ height: '100vh', width: '50%', position:'fixed'}}>
                                <HenceforthGoogleMap
                                    ref={googleMapRef}
                                    defaultCenter={defaultProps.center}
                                    center={form.center}
                                    zoom={form.zoom}
                                    defaultZoom={defaultProps.zoom}
                                    onGoogleApiLoaded={onGoogleApiLoaded}


                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Spin>
    )
}

export default PlaceLocated
