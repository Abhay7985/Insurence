import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Select, Input, Space } from 'antd';
import TableHeading from '../Components/TableHeading';
import boatImage from '../assets/images/boat_four.png'
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import search from '../assets/icons/search.svg'
import { useMatch } from 'react-router-dom';


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onChange = (key: string) => {
    console.log(key);
};
const headings = [
    "SR. NO.",
    "BOAT NAME",
    "ROUTE",
    "PRICE",
    "DATE",
    "ENQUIRY VIA",
    "STATUS",
    "ACTION"
]
const items: TabsProps['items'] = [
    {
        key: '1',
        label: `All`,
        children: <TableHeading Array={headings}>
            <tr>
                <th>01</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>Morning Panoramic</p>
                    </div>
                </td>
                <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                <td>$30</td>
                <td>24/06/2020</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <HenceforthIcons.Whatsapp />
                        <p>Whatsapp</p>
                    </div>
                </td>
                <td>Resolved</td>
                <td>
                    <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                </td>
            </tr>
            <tr>
                <th>02</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>Morning Panoramic</p>
                    </div>
                </td>
                <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                <td>$30</td>
                <td>24/06/2020</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center" >
                        <button className=' d-flex gap-2 align-items-center btn p-0 border-0 text-dark' data-bs-toggle="modal" data-bs-target="#emailInquiryModal">
                            <HenceforthIcons.Email />
                            <span className='text-decoration-underline'>Email</span>
                            <HenceforthIcons.ChevronRight />
                        </button>
                    </div>
                </td>
                <td>Resolved</td>
                <td>
                    <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                </td>
            </tr>
            <tr>
                <th>03</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>Morning Panoramic</p>
                    </div>
                </td>
                <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                <td>$30</td>
                <td>24/06/2020</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <HenceforthIcons.Whatsapp />
                        <p>Whatsapp</p>
                    </div>
                </td>
                <td>Open</td>
                <td>
                    <button className='btn border-0 p-0'>
                        <HenceforthIcons.ThreeDot />
                    </button>
                </td>
            </tr>
        </TableHeading>,
    },
    {
        key: '2',
        label: `Resolved`,
        children:
            <TableHeading Array={headings}>
                <tr>
                    <th>01</th>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            <div className="boat-image">
                                <img src={boatImage} alt="img" className='img-fluid' />
                            </div>
                            <p>Morning Panoramic</p>
                        </div>
                    </td>
                    <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                    <td>$30</td>
                    <td>24/06/2020</td>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            <HenceforthIcons.Whatsapp />
                            <p>Whatsapp</p>
                        </div>
                    </td>
                    <td>Resolved</td>
                    <td>
                        <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                    </td>
                </tr>
                <tr>
                    <th>02</th>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            <div className="boat-image">
                                <img src={boatImage} alt="img" className='img-fluid' />
                            </div>
                            <p>Morning Panoramic</p>
                        </div>
                    </td>
                    <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                    <td>$30</td>
                    <td>24/06/2020</td>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center" >
                            <button className=' d-flex gap-2 align-items-center btn p-0 border-0 text-dark' data-bs-toggle="modal" data-bs-target="#emailInquiryModal">
                                <HenceforthIcons.Email />
                                <span className='text-decoration-underline'>Email</span>
                                <HenceforthIcons.ChevronRight />
                            </button>
                        </div>
                    </td>
                    <td>Resolved</td>
                    <td>
                        <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                    </td>
                </tr>
                <tr>
                    <th>03</th>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            <div className="boat-image">
                                <img src={boatImage} alt="img" className='img-fluid' />
                            </div>
                            <p>Morning Panoramic</p>
                        </div>
                    </td>
                    <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                    <td>$30</td>
                    <td>24/06/2020</td>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            <HenceforthIcons.Whatsapp />
                            <p>Whatsapp</p>
                        </div>
                    </td>
                    <td>Open</td>
                    <td>
                        <button className='btn border-0 p-0'>
                            <HenceforthIcons.ThreeDot />
                        </button>
                    </td>
                </tr>
            </TableHeading>,
    },
    {
        key: '3',
        label: `Open`,
        children: <TableHeading Array={headings}>
            <tr>
                <th>01</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>Morning Panoramic</p>
                    </div>
                </td>
                <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                <td>$30</td>
                <td>24/06/2020</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <HenceforthIcons.Whatsapp />
                        <p>Whatsapp</p>
                    </div>
                </td>
                <td>Resolved</td>
                <td>
                    <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                </td>
            </tr>
            <tr>
                <th>02</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>Morning Panoramic</p>
                    </div>
                </td>
                <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                <td>$30</td>
                <td>24/06/2020</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center" >
                        <button className=' d-flex gap-2 align-items-center btn p-0 border-0 text-dark' data-bs-toggle="modal" data-bs-target="#emailInquiryModal">
                            <HenceforthIcons.Email />
                            <span className='text-decoration-underline'>Email</span>
                            <HenceforthIcons.ChevronRight />
                        </button>
                    </div>
                </td>
                <td>Resolved</td>
                <td>
                    <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                </td>
            </tr>
            <tr>
                <th>03</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>Morning Panoramic</p>
                    </div>
                </td>
                <td>Panorâmico Manhã - 9 às 13hrs (4 hours AM)</td>
                <td>$30</td>
                <td>24/06/2020</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <HenceforthIcons.Whatsapp />
                        <p>Whatsapp</p>
                    </div>
                </td>
                <td>Open</td>
                <td>
                    <button className='btn border-0 p-0'>
                        <HenceforthIcons.ThreeDot />
                    </button>
                </td>
            </tr>
        </TableHeading>,
    },
];

const Inquiry = () => {
    const match=useMatch('/inquiry/:id')
    return (
        <>
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
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
        </>
    )
}

export default Inquiry
