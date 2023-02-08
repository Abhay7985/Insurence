import bannerImage from '../assets/images/image_one.png';
import { useState } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Select, Space } from 'antd';
import { Link } from 'react-router-dom';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const BoatInfo = () => {
    const [size, setSize] = useState<SizeType>('middle')
    return (
        // boat-details
        <section className="boat-details-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column ">
                            <div className="row justify-content-center justify-content-lg-end">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title'>Please enter the details of the boat</h3>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Boat Name</label>
                                        <input type="text" className="form-control" id='input1' placeholder='Enter boat name' />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Category</label>
                                        <div className="category">
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Select
                                                    size={size}
                                                    defaultValue="Select category"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                // options={options}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input3" className="form-label">Manufacturer</label>
                                        <div className="category">
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Select
                                                    size={size}
                                                    defaultValue="Select manufacturer"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                // options={options}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Model</label>
                                        <input type="text" className="form-control" id='input4' placeholder='Enter model' />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Size</label>
                                        <input type="text" className="form-control" id='input5' placeholder='Enter size (in feet)' />
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
                                            <Link to='/boat/id/passenger-bedrooms' className='btn btn-yellow px-3'>Next</Link>
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
    )
}

export default BoatInfo
