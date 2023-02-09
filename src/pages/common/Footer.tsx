import HenceforthIcons from "../../assets/icons/HenceforthIcons"

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className='footer'>
                <div className="container">
                    <div className="row gy-4 justify-content-md-center">
                        <div className="col-12 text-center">
                            <h5>Subscribe to our newsletter</h5>
                        </div>
                        <div className="col-lg-9">
                            <div className="subscribe mx-auto w-75">
                                <div className="input-group mb-3 form-control p-0 rounded-pill">
                                    <input type="text" className="form-control border-0 rounded-pill" placeholder="Enter your email" />
                                    <button className="btn btn-yellow rounded-pill px-4 m-1" type="button" id="button-addon2">Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <ul >
                                <li>
                                    <div className="footer-logo">
                                        <a href="#"> <HenceforthIcons.FooterLogo /></a>
                                        <a href="#" className="nav-link mt-4 fs-12">&copy; 2023 lancha salvador, Inc.</a>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">Contact Us</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">Terms & Conditions</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">FAQs</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <ul>
                                <li>
                                    <a href="#" className="nav-link">
                                        <HenceforthIcons.Facebook />
                                        <span>Facebook</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">
                                        <HenceforthIcons.Instagram />
                                        <span>Instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">
                                        <HenceforthIcons.Youtube />
                                        <span>Youtube</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link">
                                        <HenceforthIcons.Tiktok />
                                        <span>Youtube</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    )
}

export default Footer
