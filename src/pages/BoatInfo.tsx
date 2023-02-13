import bannerImage from '../assets/images/image_one.png';
import React, { useEffect, useState } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Select, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from '../context/Provider';

const BoatInfo = () => {
    const { authState } = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [size, setSize] = useState<SizeType>('middle')
    const [state, setState] = React.useState({
        category: [],
        manufacturer: []
    })
    const [boatName, setBoatName] = useState('')
    const [boatModel, setBoatModel] = useState('')
    const [boatSize, setBoatSize] = useState('')
    const [category_id, setCategoryId] = useState("")
    const [manufacturer_id, setManufacturerId] = useState("")


    const onSubmit = async (e: any) => {
        henceforthApi.setToken(authState?.access_token)

        e.preventDefault()
        const uRLSearchParams = new URLSearchParams()
        uRLSearchParams.set("name", boatName)
        uRLSearchParams.set("model", boatModel)
        uRLSearchParams.set("size", boatSize)
        uRLSearchParams.set("category_id", category_id)
        uRLSearchParams.set("manufacturer_id", manufacturer_id)

        navigate({
            pathname: '/boat/passenger-bedrooms',
            search: uRLSearchParams.toString()
        })

    }

    const initialise = async () => {
        try {
            const category = await henceforthApi.Boat.category()
            const manufacturer = await henceforthApi.Boat.manufacturer()
            setState({
                category: category.data,
                manufacturer: manufacturer.data
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        initialise()
    }, [])



    return (
        // boat-details
        <section className="boat-details-section">
            <div className="container-fluid">
                <form className="row" onSubmit={onSubmit}>
                    <div className="col-lg-6">
                        <div className="banner-content h-100 d-flex flex-column ">
                            <div className="row justify-content-center justify-content-lg-end">
                                <div className="col-11 col-lg-11">
                                    <h3 className='banner-title'>Please enter the details of the boat</h3>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input1" className="form-label">Boat Name</label>
                                        <input type="text" className="form-control" id='input1' placeholder='Enter boat name' value={boatName} onChange={(e) => setBoatName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input2" className="form-label">Category</label>
                                        <div className="category">
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Select
                                                    size={size}
                                                    defaultValue={category_id}
                                                    onChange={setCategoryId}
                                                    style={{ width: '100%' }}
                                                    options={[{ value: "", label: "Select" }, ...state?.category?.map((res: any) => { return { value: res?.id, label: res.category } })]}
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
                                                    defaultValue={manufacturer_id}
                                                    onChange={setManufacturerId}
                                                    style={{ width: '100%' }}
                                                    options={[{ value: "", label: "Select" }, ...state?.manufacturer?.map((res: any) => { return { value: res?.id, label: res.manufacturer } })]}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input4" className="form-label">Model</label>
                                        <input type="text" className="form-control" id='input4' placeholder='Enter model' value={boatModel} onChange={(e) => setBoatModel(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-11 col-lg-11">
                                    <div className="mb-3">
                                        <label htmlFor="input5" className="form-label">Size</label>
                                        <input type="text" className="form-control" id='input5' placeholder='Enter size (in feet)' value={boatSize} onChange={(e) => setBoatSize(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row banner-footer border-top mt-auto justify-content-end">
                                <div className="col-11 col-lg-11">
                                    <ul className='d-flex justify-content-between'>
                                        <li>
                                            <button type='button' onClick={() => window.history.back()} className='btn back-btn border-0'>Back</button>
                                        </li>
                                        <li>
                                            <button type='submit' className='btn btn-yellow px-3'>Next</button>
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
                </form>
            </div>
        </section>
    )
}

export default BoatInfo
