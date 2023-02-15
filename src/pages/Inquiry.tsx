import React from 'react';
import { Spin, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Select, Input, Space } from 'antd';
import search from '../assets/icons/search.svg'
import { useMatch, useNavigate } from 'react-router-dom';
import Tablelayout from '../Components/inquiry/TableLayout';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from '../context/Provider';

const Inquiry = () => {
    const match = useMatch('/inquiry/:type/:page')
    const navigate = useNavigate()
    const { authState, Toast } = React.useContext(GlobalContext)

    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState({
        current_page: 0,
        data: [],
        per_page: 10
    })


    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChangeQuery = (path: string) => {
        navigate(`/inquiry/${path}/1`)
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `All`,
            children: <Tablelayout {...state} />
        },
        {
            key: '2',
            label: `Resolved`,
            children: <Tablelayout  {...state} />

        },
        {
            key: '3',
            label: `Open`,
            children: <Tablelayout  {...state} />
        },
    ];

    const initialise = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.Inquiry.pagination()
            setState(apiRes.data)

        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        initialise()
    }, [match?.params.type, match?.params.page])

    return (
        <Spin spinning={loading} >
            {/* inquiry section */}
            <section className='inquiry-section py-5'>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12">
                            <div className="title d-flex justify-content-between align-items-center">
                                <h2>Inquiry</h2>
                                <Select
                                    defaultValue="All"
                                    style={{ width: 150 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'All', label: 'All' },
                                        { value: 'Whatsapp', label: 'Whatsapp' },
                                        { value: 'Email', label: 'Email' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 form-control p-0 rounded-pill w-auto">
                                <span className="input-group-text bg-transparent border-0" id="basic-addon1">
                                    <img src={search} alt="icon" />
                                </span>
                                <input type="text" className="form-control border-0 ps-0 rounded-pill" placeholder="Search..." />
                            </div>
                        </div>
                        <div className="col-12">
                            <Tabs defaultActiveKey="1" items={items} onChange={onChangeQuery} />
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="emailInquiryModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title w-100 text-center" id="exampleModalLabel">Enquire via Email</h6>
                            <button type="button" className="btn-close fs-12 shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-sm-4 py-4">
                            <div className="row gy-4">
                                <div className="col-lg-6">
                                    <div className="inquiry-name">
                                        <h6 className='mb-2'>Name</h6>
                                        <p>John Deo</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="inquiry-name">
                                        <h6 className='mb-2'>Phone No.</h6>
                                        <p>+91-9654123752</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="inquiry-name">
                                        <h6 className='mb-2'>Email</h6>
                                        <p>johndoe123@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer px-sm-4">
                            <button type="button" className="btn btn-yellow w-100 py-2">Resolve this Enquiry</button>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default Inquiry
