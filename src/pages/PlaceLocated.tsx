import { Link } from "react-router-dom";
import bannerImage from '../assets/images/image_two.png';
import locationIcon from '../assets/icons/current_location.svg';

function PlaceLocated() {
    return (
        //  Select-passenger 
        <section className="select-passenger-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column ">
                            <div className="row gy-2 justify-content-center justify-content-lg-end pb-5 pb-lg-0">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title'>Where is your place located?</h3>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <input type="text" className="form-control" placeholder="Enter your address" />
                                    <Link to='' className="location border mt-1 d-flex gap-3 align-items-center nav-link">
                                        <div className="location-icon">
                                            <img src={locationIcon} alt="icon" className="img-fluid" />
                                        </div>
                                        <p>Use my current location</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="row banner-footer border-top mt-auto justify-content-end">
                                <div className="col-11 col-lg-11">
                                    <ul className='d-flex justify-content-between'>
                                        <li>
                                            <Link to='/select-passenger' className='btn back-btn border-0'>Back</Link>
                                        </li>
                                        <li>
                                            <Link to='/confirm-address' className='btn btn-yellow px-3'>Next</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                        <div className="banner-image border">
                            <img src={bannerImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlaceLocated
