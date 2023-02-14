import React, { useState } from 'react';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';
import BackNextLayout from '../Components/boat/BackNextLayout';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

const SafetyQuestions = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const match = useMatch(`boat/:id/safety-question`)
    const uRLSearchParams = new URLSearchParams(location.search)
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = useState({
        smoking_allowed: 0 as number,
        pets_allowed: 0 as number,
        rules: ""

    })

    console.log(state.smoking_allowed);
    

    const handleState = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let items = {
            safety_question: {
                boat_id: match?.params.id,
                smoking_allowed: Number(state.smoking_allowed),
                pets_allowed: Number(state.pets_allowed),
                rules: state.rules
            }
        }
        try {
            let res = await henceforthApi.Boat.create(items)
            Toast.success(res.message)
            navigate({
                pathname: `/boat/${match?.params.id}/price`,
                search: uRLSearchParams.toString()
            })
        } catch (error) {
        }
    }

    return (
        <section className="Confirm-address-section">
            <div className="container-fluid">
                <form className="row" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column ">
                            <div className="row justify-content-center justify-content-lg-end gy-4 pb-5">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title pb-3'>Just a few safety questions?</h3>
                                </div>
                                <div className="col-11 col-lg-11 mb-4">
                                    <h4 className='mb-3'>Smoking Allowed</h4>
                                    <div className="form-check mb-2"   >
                                        <input className="form-check-input form-check-radio" onChange={handleState} type="radio" value={1} name="smoking_allowed" id="radio1" />
                                        <label className="form-check-label" htmlFor="radio1">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input form-check-radio" type="radio" onChange={handleState} value={0}  name="smoking_allowed" id="radio2" />
                                        <label className="form-check-label" htmlFor="radio2">
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11 mb-4">
                                    <h4 className='mb-3'>Pets Allowed</h4>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input form-check-radio" type="radio" onChange={handleState} value={1} name="pets_allowed" id="radio4" />
                                        <label className="form-check-label" htmlFor="radio4">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input form-check-radio" type="radio" onChange={handleState} value={0} name="pets_allowed" id="radio5" />
                                        <label className="form-check-label" htmlFor="radio5">
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11 mb-5">
                                    <h4 className='mb-2'>Rules and Security</h4>
                                    <p className='mb-3'>Set additional and vessel safety rules.</p>
                                    <div className="form-floating">
                                        <textarea className="form-control text-area" placeholder="Type here..." id="floatingTextarea" onChange={(e: any) => setState({ ...state, rules: e.target.value })}></textarea>
                                        <label htmlFor="floatingTextarea">Type here...</label>
                                    </div>
                                </div>
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
    )
}

export default SafetyQuestions
