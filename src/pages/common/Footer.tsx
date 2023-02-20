import HenceforthIcons from "../../assets/icons/HenceforthIcons"
import { Button, Checkbox, Form, Input } from 'antd';
import henceforthApi from "../../utils/henceforthApi";
import { stat } from "fs/promises";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/Provider";
import { error } from "console";
import Spinner from "./AntSpinner";
import { Link } from "react-router-dom";

const Footer = () => {
    const { Toast, loading, setLoading } = useContext(GlobalContext)
    const [state, setState] = useState("")

    const onSubmit = async () => {
        debugger
        setLoading(true)
        const item = {
            email: state
        }
        try {
            if (!state.trim()) {
               return Toast.error("Please Enter Email")
            }
            let apiRes = await henceforthApi.Subscribe.subscribe(item)
            Toast.success(apiRes.message)
        } catch (error) {
            Toast.error(error)
        } finally {
            setState("")
            setLoading(false)

        }
    }

    return (
        <>
            {/* Footer */}
            <footer className='footer'>
                <div className="container">
                    <div className="row gy-3 gy-sm-4 justify-content-lg-between">
                        <div className="col-md-11 text-center">
                            <h5>Subscribe to our newsletter</h5>
                        </div>
                        <div className="col-lg-11">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-lg-5">
                                    <div className="subscribe mx-auto">
                                        <Form onFinish={onSubmit}>
                                            <div className="input-group mb-3 form-control p-0 rounded-pill">
                                                <Input type="text" className="form-control border-0 rounded-pill" value={state} name="email" placeholder="Enter your email"
                                                    onChange={(e: any) => setState(e.target.value)} />
                                                <Button className="btn btn-yellow rounded-pill px-4 m-2 h-100" htmlType="submit" id="button-addon2">{loading ? <Spinner/>:"Subscribe" }</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <ul >
                                <li>
                                    <div className="footer-logo">
                                        <a href="#"> <HenceforthIcons.FooterLogo /></a>

                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link">About Us</a>
                                </li>
                                <li>
                                    <Link to="/contact" className="nav-link" role="button">Contact Us</Link>
                                </li>

                            </ul>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link">Terms & Conditions</a>
                                </li>
                                <li>
                                    <Link to="/faq" className="nav-link">FAQs</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center gap-3">
                                        <div className="facebook-icon text-center ms-1">
                                            <HenceforthIcons.Facebook />
                                        </div>
                                        <span>Facebook</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center gap-2">
                                        <HenceforthIcons.Instagram />
                                        <span className="ms-1">Instagram</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center gap-3">
                                        <HenceforthIcons.Youtube />
                                        <span>Youtube</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link d-flex align-items-center gap-3">
                                        <HenceforthIcons.Tiktok />
                                        <span className="ms-1">Tiktok</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid copyright">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="text-white fs-12"> &copy; 2023 lancha salvador, Inc.</p>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    )
}

export default Footer
