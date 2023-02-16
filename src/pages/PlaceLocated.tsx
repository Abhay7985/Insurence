import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import bannerImage from '../assets/images/image_two.png';
import locationIcon from '../assets/icons/current_location.svg';
import React, { Fragment, useRef, useState } from "react";
import { GlobalContext, NEXT_PUBLIC_GOOGLE_API_KEY } from "../context/Provider";
import { Checkbox, Select, Space, Spin, Switch } from "antd";
import BackNextLayout from "../Components/boat/BackNextLayout";
import henceforthApi from "../utils/henceforthApi";
import CountryCodeJson from '../utils/CountryCode.json'
import { NumberValidation } from "../utils/henceforthValidations";

function PlaceLocated() {

    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/place`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const placeInputRef = useRef(null as any);

    const { Toast } = React.useContext(GlobalContext)
    const [inputFocued, setInputFocused] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [form, setForm] = React.useState({
        location_address: "",
        latitude: 0,
        longitude: 0,
    })
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
     const name=e.target.name
     const value=e.target.value
        if(name === "postCode" && !NumberValidation(value)) return
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
                    latitude: form.latitude,
                    longitude: form.longitude,
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
            let apiRes = await henceforthApi.Boat.create(items)
            Toast.success(apiRes.message)

            navigate({
                pathname: `/boat/${match?.params.id}/amenities`,
                search: uRLSearchParams.toString()
            })

        } catch (error: any) {
            // Toast.error(error)

            if (error.response.body.message.address1) return Toast.error(error.response.body.message.address1[0])
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
            country: value
        })
    };


    const requestCurrenctLocation = () => {
        console.log('requestCurrenctLocation called');
        try {
            navigator.geolocation.getCurrentPosition((successCallback) => {
                console.log("Latitude is :", successCallback.coords.latitude);
                console.log("Longitude is :", successCallback.coords.longitude);


                setForm({
                    ...form,
                    latitude: successCallback.coords.latitude,
                    longitude: successCallback.coords.longitude
                })

            }, (errorCallback) => {
                console.log('errorCallback', errorCallback.message);

            });

        } catch (error) {
            console.log('requestCurrenctLocation error', error);

        }
    }

    function loadGoogleMapScript(callback: any) {
        if (
            typeof (window as any).google === "object" &&
            typeof (window as any).google.maps === "object"
        ) {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }
    const initPlaceAPI = () => {
        loadGoogleMapScript(() => {
            if (placeInputRef) {
                let autocomplete = new (window as any).google.maps.places.Autocomplete(
                    placeInputRef.current
                );
                new (window as any).google.maps.event.addListener(
                    autocomplete,
                    "place_changed",
                    () => {
                        let place = autocomplete?.getPlace();
                        let formatAddress = place.formatted_address
                        const address = place.address_components
                        let latitude = place.geometry?.location.lat();
                        let longitude = place.geometry?.location.lng();

                        setForm({
                            ...form,
                            latitude,
                            longitude
                        })
                    }
                );
            }

        });
    };

    React.useEffect(initPlaceAPI, []);

    return (
        <Spin spinning={loading} >
            <section className="select-passenger-section h-100">
                <div className="container-fluid h-100">
                    <form className="row h-100" onSubmit={onSubmit}>
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row gy-2 justify-content-center justify-content-lg-end pb-5 pb-lg-0">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title'>Where is your place located?</h3>
                                    </div>
                                    {form.latitude == 0 ? <Fragment>
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
                                                <input type="text" className="form-control" id='input5' placeholder='Enter City' name="state" value={state.state} onChange={handleState} />
                                            </div>
                                        </div>
                                        <div className="col-11 col-lg-11">
                                            <div className="mb-2 mb-sm-3">
                                                <label htmlFor="input5" className="form-label">Postcode (optional)</label>
                                                <input type="text" className="form-control" id='input5' placeholder='Enter postcode' value={state.postCode}  name="postCode" onChange={handleState} />
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
                                                            defaultValue="Enter country / region"
                                                            onChange={handleChange}
                                                            style={{ width: '100%' }}
                                                            options={CountryCodeJson.map((res) => { return { value: res.code, label: res.name } })}

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
                            <div className="banner-image border">
                                <img src={bannerImage} alt="" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Spin>
    )
}

export default PlaceLocated
