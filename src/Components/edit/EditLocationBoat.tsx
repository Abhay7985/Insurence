import { Input, Select, Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import CountryCodeJson from '../../utils/CountryCode.json'
import { NumberValidation } from "../../utils/henceforthValidations"

const EditLocationBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

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

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const items = {
            address: {
                address1: state.address1,
                address2: state.address2,
                city: state.city,
                state: state.state,
                postcode: state.postcode,
                country: state.country,
            }
        }
        setLoading(true)
        try {
            if (state.address1 && state.city && state.state && state.postcode && state.country) {
                const apiRes = await henceforthApi.Boat.edit(state.boat_id, items)
                Toast.success(apiRes.message)
                setIsExpended(false)
                await props.initialise()
            } else {
                Toast.error("Enter Complete Address")
            }

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }


    return <Spin spinning={loading} >
        <div className="Location bg-white Pricing mb-4">
            <div className="photo-header d-flex justify-content-between mb-3" id='location_tab'>
                <h4>Location</h4>
            </div>
            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                <form className="listing-content w-100" onSubmit={onSubmit}>
                    <div className="edit-location d-flex justify-content-between mb-2">
                        <h6>Address</h6>
                        <div className="edit-photo ps-4" >
                            {isExpended ?
                                <button type="button" className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                                <button type="button" className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
                        </div>
                    </div>
                    {isExpended ?
                        <div className="edit-input mt-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="address mb-3">
                                        <label className="form-label">Street address</label>
                                        <Input placeholder="House name/number +street /road" value={state.address1} name="address1" onChange={(e) => handleChange(e.target)} />
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="address mb-3">
                                        <label className="form-label">Flat, suite. (Optional)</label>
                                        <Input placeholder="Flat, suite, building access code" value={state.address2} name="address2" onChange={(e) => handleChange(e.target)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">City</label>
                                        <Input placeholder="Enter City" value={state.city} name="city" onChange={(e) => handleChange(e.target)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">State</label>
                                        <Input placeholder="Enter State" value={state.state} name="state" onChange={(e) => handleChange(e.target)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">Postcode</label>
                                        <Input placeholder="Enter Postcode" value={state.postcode} name="postcode" onChange={(e) => handleChange(e.target)} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="address mb-3">
                                        <label className="form-label">Country</label>
                                        <div className="select">
                                            <Select
                                                defaultValue={state.country}
                                                showSearch
                                                className='w-100'
                                                onChange={(e) => handleChange({
                                                    name: 'country',
                                                     value:CountryCodeJson.find(res => res.name == e)?.code
                                                })}
                                                options={CountryCodeJson.map((res) => { return { value: res.name, label: res.name } })}
                                            />
                                        </div>
                                    </div>
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