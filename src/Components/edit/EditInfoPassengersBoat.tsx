import { Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"

import increase from '../../assets/icons/add_circle_outline.svg';
import decrease from '../../assets/icons/remove_circle_outline.svg';

const EditInfoPassengersBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        name: "",
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleChange = async ({ name, value }: any) => {
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
            boatinfo: {
                passenger_day: state.passenger_day,
                passenger_night: state.passenger_night,
                bedrooms: state.bedrooms,
                bathrooms: state.bathrooms
            }
        }
        setLoading(true)
        try {
            const apiRes = await henceforthApi.Boat.edit(state.id, items)
            Toast.success(apiRes.message)
            setIsExpended(false)
            await props.initialise()
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)

        }
    }

    return <Spin spinning={loading} >
        <div className="photo-header d-flex justify-content-between border px-4 py-4 rounded-1">
            <div className="edit-address w-100">
                <div className="d-flex justify-content-between mb-2" >
                    <h6 className=''>Passengers & Bedrooms</h6>
                    {isExpended ?
                        <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                        <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
                </div>
                {isExpended ?
                    <form className="row gy-2" onSubmit={onSubmit}>
                        <div className="col-7">
                            <div className="add-passenger d-flex justify-content-between align-items-center">
                                <p>Number of Passengers (Day)</p>
                                <div className="add-btn">
                                    <ul className='d-flex gap-1 align-items-center'>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'passenger_day', value: state.passenger_day - 1 })} disabled={state.passenger_day === 1}>
                                                <img src={decrease} alt="icon" />
                                            </button>
                                        </li>
                                        <li>
                                            <input type="text" className='form-control' value={state.passenger_day} />
                                        </li>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'passenger_day', value: state.passenger_day + 1 })}>
                                                <img src={increase} alt="icon" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="add-passenger d-flex justify-content-between align-items-center">
                                <p>Number of Passengers (Night)</p>
                                <div className="add-btn">
                                    <ul className='d-flex gap-1 align-items-center'>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'passenger_night', value: state.passenger_night - 1 })} disabled={state.passenger_night === 1}>
                                                <img src={decrease} alt="icon" />
                                            </button>
                                        </li>
                                        <li>
                                            <input type="text" className='form-control' value={state.passenger_night} />
                                        </li>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'passenger_night', value: state.passenger_night + 1 })}>
                                                <img src={increase} alt="icon" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="add-passenger d-flex justify-content-between align-items-center">
                                <p>Number of Bedrooms</p>
                                <div className="add-btn">
                                    <ul className='d-flex gap-1 align-items-center'>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'bedrooms', value: state.bedrooms - 1 })} disabled={state.bedrooms === 1}>
                                                <img src={decrease} alt="icon" />
                                            </button>
                                        </li>
                                        <li>
                                            <input type="text" className='form-control' value={state.bedrooms} />
                                        </li>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'bedrooms', value: state.bedrooms + 1 })}>
                                                <img src={increase} alt="icon" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="add-passenger d-flex justify-content-between align-items-center">
                                <p>Number of Bathrooms</p>
                                <div className="add-btn">
                                    <ul className='d-flex gap-1 align-items-center'>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'bathrooms', value: state.bathrooms - 1 })} disabled={state.bathrooms === 1}>
                                                <img src={decrease} alt="icon" />
                                            </button>
                                        </li>
                                        <li>
                                            <input type="text" className='form-control' value={state.bathrooms} />
                                        </li>
                                        <li>
                                            <button className='btn border-0' type="button" onClick={() => handleChange({ name: 'bathrooms', value: state.bathrooms + 1 })}>
                                                <img src={increase} alt="icon" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="save-btn pt-2">
                                <button className='btn btn-yellow rounded-2' type="submit">Save</button>
                            </div>
                        </div>
                    </form> :
                    <div className="listing-content">
                        <p className='mb-2'>Passengers(Day): {state.passenger_day}</p>
                        <p className='mb-2'>Passengers(Night): {state.passenger_night}</p>
                        <p className='mb-2'>Bedrooms: {state.bedrooms}</p>
                        <p className='mb-2'>Bathrooms: {state.bathrooms}</p>
                    </div>}
            </div>
        </div>
    </Spin>
}
export default EditInfoPassengersBoat