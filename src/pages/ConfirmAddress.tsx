import bannerImage from '../assets/images/image_one.png';
import { useState } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Select, Space } from 'antd';
import { Link } from 'react-router-dom';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const ConfirmAddress = () => {
    const [size, setSize] = useState<SizeType>('middle')
    return (
        // Confirm-address
        <section className="Confirm-address-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column ">
                            <div className="row justify-content-center justify-content-lg-end">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title'>Confirm your address</h3>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Street</label>
                                        <input type="text" className="form-control" id='input1' placeholder='Enter state' />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Flat, Suite, etc. (optional)</label>
                                        <input type="text" className="form-control" id='input4' placeholder='Enter flat, suite, etc.' />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">City</label>
                                        <input type="text" className="form-control" id='input5' placeholder='Enter City' />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Postcode (optional)</label>
                                        <input type="text" className="form-control" id='input5' placeholder='Enter postcode' />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-5">
                                        <label htmlFor="input2" className="form-label">Country / Region</label>
                                        <div className="category">
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Select
                                                    size={size}
                                                    defaultValue="Enter country / region"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                // options={options}
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
                                            <input className="form-check-input py-2" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row banner-footer border-top mt-auto justify-content-end">
                                <div className="col-11 col-lg-11">
                                    <ul className='d-flex justify-content-between'>
                                        <li>
                                            <Link to='/place-located' className='btn back-btn border-0'>Back</Link>
                                        </li>
                                        <li>
                                            <Link to='/select-passenger' className='btn btn-yellow px-3'>Next</Link>
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

export default ConfirmAddress;
