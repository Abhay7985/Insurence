import bannerImage from '../assets/images/image_two.png';
import increase from '../assets/icons/add_circle_outline.svg';
import decrease from '../assets/icons/remove_circle_outline.svg';
import { Link } from 'react-router-dom';

const SelectPassenger = () => {
    return (
        <>
            {/* Select-passenger */}
            <section className="select-passenger-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row gy-2 justify-content-center justify-content-lg-end pb-5 pb-lg-0">
                                    <div className="col-11 col-lg-11">
                                        <h3 className='banner-title'>Please select passengers & bedrooms</h3>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Passengers (Day)</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={1} />
                                                    </li>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Passengers (Night)</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={1} />
                                                    </li>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Bedrooms</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={1} />
                                                    </li>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                            <p>Number of Bathrooms</p>
                                            <div className="add-btn">
                                                <ul className='d-flex gap-1 align-items-center'>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={decrease} alt="icon" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <input type="text" className='form-control' value={1} />
                                                    </li>
                                                    <li>
                                                        <button className='btn border-0'>
                                                            <img src={increase} alt="icon" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row banner-footer border-top mt-auto justify-content-end">
                                    <div className="col-11 col-lg-11">
                                        <ul className='d-flex justify-content-between'>
                                            <li>
                                                <Link to='/boat-details' className='btn back-btn border-0'>Back</Link>
                                            </li>
                                            <li>
                                                <Link to='/place-located' className='btn btn-yellow px-3'>Next</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 pe-lg-0">
                            <div className="banner-image border">
                                <img src={bannerImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default SelectPassenger;