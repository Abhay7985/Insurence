import HenceforthIcons from "../../assets/icons/HenceforthIcons"

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className='footer'>
                <div className="container">
                    <div className="row gy-4 justify-content-lg-between">
                        <div className="col-md-11 text-center">
                            <h5>Subscribe to our newsletter</h5>
                        </div>
                        <div className="col-lg-11">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-lg-5">
                                    <div className="subscribe mx-auto">
                                        <div className="input-group mb-3 form-control p-0 rounded-pill">
                                            <input type="text" className="form-control border-0 rounded-pill" placeholder="Enter your email" />
                                            <button className="btn btn-yellow rounded-pill px-4 m-1" type="button" id="button-addon2">Subscribe</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <ul >
                                <li>
                                    <div className="footer-logo">
                                        <a href="#"> <HenceforthIcons.FooterLogo /></a>

                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-2">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">Contact Us</a>
                                </li>

                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-2">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link">Terms & Conditions</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">FAQs</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-2">
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
                        <div className="col-sm-6 col-md-4 col-lg-2">
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
