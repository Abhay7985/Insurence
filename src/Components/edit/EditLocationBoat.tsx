import { Input, Select, Spin } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import CountryCodeJson from '../../utils/CountryCode.json'
import { NumberValidation } from "../../utils/henceforthValidations"
import LanchaPlaces from './../../utils/LanchaPlaces.json'
import { location } from "../../pages/PlaceLocated"

const defaultProps = {
    center: {
        lat: 20.593683,
        lng: 78.962883
    },
    zoom: 11
};
const EditLocationBoat = ({ ...props }: any) => {
    const { Toast } = React.useContext(GlobalContext)
    const placeInputRef = useRef(null as any);
    const [form, setForm] = React.useState(defaultProps)
    const [locationId, setLocationId] = React.useState(0)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [address, setAddress] = useState({
        data: []
    } as location)
    const [state, setState] = React.useState({
        id: 1,
        address1: "",
        address2: "",
        city: "",
        boat_id: "",
        state: "",
        postcode: "",
        country: "",
        show_location: 1,
        created_at: "",
        updated_at: "",
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleChange = async ({ name, value }: any) => {
        if (name === "postCode" && !NumberValidation(value)) return
        setState((state: any) => {
            return {
                ...state,
                [name]: value
            }
        })

    }
    const initaliseLocation = async () => {
        try {
            let apiRes = await henceforthApi.Location.getLoctaion()
            setAddress(apiRes)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const items = {
            // address: {
            //     address1: state.address1,
            //     address2: state.address2,
            //     city: state.city,
            //     state: state.state,
            //     postcode: state.postcode,
            //     country: state.country,
            // }
            location: {
                location: {
                    latitude: lat,
                    longitude: lng
                },
                location_id: address?.data[+locationId]?.id
            }
        }
        setLoading(true)
        try {
            // if (!state.address1) {
            //     return Toast.error("Please Enter Street Address")
            // }
            // if (!state.city.trim()) {
            //     return Toast.error("Please Enter city ")
            // }
            // if (!state.state.trim()) {
            //     return Toast.error("Please Enter State ")
            // }
            // if (!state.postcode.trim()) {
            //     return Toast.error("Please Enter postcode ")
            // }


            // if (state.address1 && state.city && state.state && state.postcode && state.country) {
            //     const apiRes = await henceforthApi.Boat.edit(state.boat_id, items)
            //     Toast.success(apiRes.message)
            //     setIsExpended(false)
            //     await props.initialise()
            // } else {
            //     Toast.error("Enter Complete Address")
            // }

            const apiRes = await henceforthApi.Boat.edit(state.id, items)
            Toast.success(apiRes.message)
            setIsExpended(false)
            await props.initialise()
        }

        catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }
    const setLoactionsFromLatlng = (address: Array<any>, formatAddress: string, lat: number, lng: number, cityName: string) => {
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

        // let latlng = new (window as any).google.maps.LatLng(
        //     form.center.lat,
        //     form.center.lng
        // )
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
        setState((state: any) => {
            return {
                ...state,
                address1: items?.full_address ? items?.full_address : '',
                address2: items?.street_number ? items?.street_number : '',
                flat: items?.street_number ? items?.street_number : items?.apartment_number ? items?.apartment_number : '',
                city: items?.city ? items?.city : '',
                state: items?.state ? items?.state : '',
                postcode: items?.pin_code ? items?.pin_code : '',
                country: items?.country ? items?.country : '',
            }
        })
    }
    function loadGoogleMapScript(callback: any) {
        if (
            typeof (window as any).google === "object" &&
            typeof (window as any).google.maps === "object"
        ) {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDL3YG2rrntEN8bLoQtln4K26PeNiBklDU&libraries=places`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }

    const initPlaceAPI = () => {
        loadGoogleMapScript(() => {
            // if (placeInputRef) {
            //     let autocomplete = new (window as any).google.maps.places.Autocomplete(
            //         placeInputRef.current
            //     );
            //     new (window as any).google.maps.event.addListener(
            //         autocomplete,
            //         "place_changed",
            //         () => {
            //             let place = autocomplete.getPlace();
            //             let formatAddress = place.formatted_address
            //             const address = place.address_components
            //             setLoactionsFromLatlng(address, formatAddress, place.geometry?.location.lat(), place.geometry?.location.lng(), "")
            //         }
            //     );

            // }

        });
    };

    const getLocationName = async (lat: number, lng: number, cityName: string) => {
        let address: any
        let latlng = new (window as any).google.maps.LatLng(
            lat,
            lng
        )
        var geocoder = new (window as any).google.maps.Geocoder()
        geocoder.geocode({ latLng: latlng }, async (results: any, status: any) => {
            address = results[0].address_components
            setLoactionsFromLatlng(address, '', lat, lng, cityName)
        })
    }


    useEffect(() => {
        if (isExpended) {
            initPlaceAPI()
            initaliseLocation()
        }
    }, [isExpended])
    useEffect(() => {
        initaliseLocation()
    }, [])
    // console.log(props?.location_id?.find((res:any)=>res?.location_id))
    // console.log(address.)
    console.log('address', props)
    console.log("lat", lat)
    console.log("lng", lng)

    return <Spin spinning={loading} className='h-100' >
        <div className="Location bg-white Pricing mt-5" id='location_tab'>
            <div className="photo-header d-flex justify-content-between mb-4" >
                <h4>Location</h4>
            </div>
            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                <form className="listing-content w-100" onSubmit={onSubmit}>
                    <div className="edit-location mb-2">
                        <div className="d-flex justify-content-between">

                        <h6>Address</h6>
                        <div className="edit-photo ps-4" >
                            {isExpended ?
                                <button type="button" className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                                <button type="button" className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
                        </div>
                        </div>
                        {!isExpended&&<p>{props.location_title}</p>}

                    </div>
                    {isExpended ?
                        <div className="edit-input mt-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="address mb-3">
                                        {/* <label htmlFor="ddd" className="form-label">Street address</label><br />
                                        <input placeholder="House name/number +street /road" id="ddd" className="form-control" value={state.address1} name="address1" onChange={(e) => handleChange(e.target)} /> */}
                                        {/* <label>Title</label> */}
                                        <Select
                                            defaultValue={props.location_title}
                                            style={{ width: '100%' }}
                                            onChange={(value) => {
                                                setForm({
                                                    ...form,
                                                    center: {
                                                        ...form.center,
                                                        lat: +address.data[+value].location.latitude ? +address.data[+value].location.latitude : defaultProps.center.lat,
                                                        lng: +address.data[+value].location.longitude ? +address.data[+value].location.longitude : defaultProps.center.lng,
                                                    },
                                                    zoom: 12
                                                })
                                                setLocationId(+value)
                                                setLat(+address.data[+value].location.latitude)
                                                setLng(+address.data[+value].location.longitude)
                                                getLocationName(address.data[+value].location.latitude, address.data[+value].location.longitude, '')
                                            }}
                                            options={address?.data?.map((res, index: number) => { return { value: index, label: res.title } })}
                                        />



                                    </div>
                                </div>


                                {/* <div className="col-12">
                                    <div className="address mb-3">
                                        <label htmlFor="input1" className="form-label">Flat, suite. (Optional)</label>
                                        <input placeholder="Flat, suite, building access code" className="form-control" id="input1" value={state.address2} name="address2" onChange={(e) => handleChange(e.target)} />
                                    </div>
                                </div> */}

                                {/* {state.city && */}
                                {/* <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">City</label>
                                        <input placeholder="Enter City" className="form-control" value={state.city} name="city" onChange={(e) => handleChange(e.target)} />
                                        <Select
                                            defaultValue="select"
                                            value={state.city}
                                            style={{ width: '100%' }}
                                            onChange={(value) => {
                                                setForm({
                                                    ...form,
                                                    center: {
                                                        ...form.center,
                                                        lat: +address.data[+value].location.latitude ? +address.data[+value].location.latitude : defaultProps.center.lat,
                                                        lng: +address.data[+value].location.longitude ? +address.data[+value].location.longitude : defaultProps.center.lng,
                                                    },
                                                    zoom: 12
                                                })
                                                getLocationName(address.data[+value].location.latitude, address.data[+value].location.longitude, '')
                                            }}
                                            options={address?.data?.map((res, index: number) => { return { value: index, label: res.location_name } })}
                                        />
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">State</label>
                                        <input placeholder="Enter State" className="form-control" value={state.state} name="state" disabled />
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">Postcode</label>
                                        <input placeholder="Enter Postcode" value={state.postcode} className="form-control" name="postcode" onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }} disabled />
                                    </div>
                                </div> */}
                                <div className="col-lg-6">
                                    {/* <div className="address mb-3">
                                        <label className="form-label">Country</label>
                                        <div className="select">
                                            <Select
                                                showSearch
                                                className='w-100'
                                                // defaultValue={state.country ? state.country : "Enter country / region"}
                                                value={state.country ? state.country : "Enter country / region"}
                                                onChange={(e) => handleChange({
                                                    name: 'country',
                                                    value: CountryCodeJson.find(res => res.name == e)?.code
                                                })}
                                                options={CountryCodeJson.map((res) => { return { value: res.name, label: res.name } })}
                                            />
                                        </div>
                                    </div> */}
                                    {/* <div className="address mb-3">
                                        <label className="form-label">Country</label>
                                        <input placeholder="Enter Country" className="form-control" value={state.country} name="state" disabled />
                                    </div> */}
                                </div>
                            </div>
                            <div className="save-btn pt-2">
                                <button className='btn btn-yellow rounded-2' type="submit" >Save</button>
                            </div>
                        </div> :
                        <p>{state.address1}</p>
                    }
                </form>
            </div>
        </div>
    </Spin>
}
export default EditLocationBoat