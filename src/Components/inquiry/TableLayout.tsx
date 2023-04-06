import TableHeading from "../TableHeading"
import boatImage from '../../assets/images/boat_four.png'
import HenceforthIcons from '../../assets/icons/HenceforthIcons';
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Badge, Button, Dropdown, MenuProps, Modal, Spin } from "antd";
import henceofrthEnums from "../../utils/henceofrthEnums";
import henceforthApi from "../../utils/henceforthApi";
import { GlobalContext } from "../../context/Provider";
import { useMatch } from "react-router-dom";
import henceforthValidations from "../../utils/henceforthValidations";





const Tablelayout = (props: any) => {
    const [modal2Open, setModal2Open] = useState(false);

    const match = useMatch('/inquiry/:type/:page')

    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const handleStatus = async (id: number, status: string) => {
        const items = {
            status
        }
        setLoading(true)
        try {
            const apiRes = await henceforthApi.Inquiry.inquiryStatus(id, items)
            Toast.success(apiRes.message)
            await props.initialise()
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (id: any) => {
        setLoading(true)
        try {
            const apiRes = await henceforthApi.Inquiry.deleteInquiry(id)
            Toast.success(apiRes.message)
            await props.initialise()
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    const StatusItem = (res: any) => {
        return [
            {
                key: '1',
                label: (
                    <span>
                        Change Status
                    </span>
                ),
                children: [
                    {
                        key: '11',
                        label: (
                            <span>
                                {henceofrthEnums.InquiryStatus.open}
                            </span>
                        ),
                        icon: <Badge color={henceofrthEnums.InquiryColor.open} />,
                        onClick: () => handleStatus(res.id, henceofrthEnums.InquiryStatus.open),
                        disabled: henceofrthEnums.InquiryStatus.open === res?.status
                    },
                    {
                        key: '12',
                        label: (
                            <span>
                                {henceofrthEnums.InquiryStatus.resolved}
                            </span>
                        ),
                        icon: <Badge color={henceofrthEnums.InquiryColor.resolved} />,
                        onClick: () => handleStatus(res.id, henceofrthEnums.InquiryStatus.resolved),
                        disabled: henceofrthEnums.InquiryStatus.resolved === res?.status

                    },
                    {
                        key: '13',
                        label: (
                            <span>
                                {henceofrthEnums.InquiryStatus.booked}
                            </span>
                        ),
                        icon: <Badge color={henceofrthEnums.InquiryColor.booked} />,
                        onClick: () => handleStatus(res.id, henceofrthEnums.InquiryStatus.booked),
                        disabled: henceofrthEnums.InquiryStatus.booked === res?.status

                    },
                    {
                        key: '14',
                        label: (
                            <span>
                                {henceofrthEnums.InquiryStatus.cancel}
                            </span>
                        ),
                        icon: <Badge color={henceofrthEnums.InquiryColor.cancel} />,
                        onClick: () => handleStatus(res.id, henceofrthEnums.InquiryStatus.cancel),
                        disabled: henceofrthEnums.InquiryStatus.cancel === res?.status

                    },
                ],

            },
            {
                key: '2',
                label: (
                    <span>
                        Delete Inquiry
                    </span>
                ),
                onClick: () => onDelete(res.id),

            }

        ]
    }

    const headings = [
        "SR. NO.",
        "BOAT NAME",
        "ROUTE",
        "PRICE",
        "DATE",
        "Extra's",
        // "ENQUIRY VIA",
        "STATUS",
        "ACTION"
    ]


    return <Spin spinning={loading} className='h-100'>
        <TableHeading Array={headings}>
            {Array.isArray(props?.data) && props?.data?.map((res: any, index: number) =>
                <tr>
                    <th>{Number(match?.params.page) == 0 ? index + 1 : (Number(match?.params.page) - 1) * props.per_page + (index + 1)}</th>
                    <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            <div className="boat-image">
                                <img src={res.cover_image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.cover_image}` : boatImage} alt="img" className='img-fluid' />
                            </div>
                            <p>{res.boat_name}</p>
                        </div>
                    </td>
                    <td>{res.route_name}</td>
                    <td>{henceforthValidations.BrazilianReal(res.installments !== 0 ? `${res.price}x${res.installments}` : res.price)}</td>
                    <td>{moment(res.inquiry_date).format("DD/MM/YYYY")}</td>
                    <td> <button className=' d-flex gap-2 align-items-center btn p-0 border-0 text-dark' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onMouseOver={() => props.setExtras(res?.inquiry_extra_amenity)}>
                        {/* <HenceforthIcons.Email /> */}
                        <span className='text-decoration-underline'>{henceforthValidations.BrazilianReal(res.inquiry_extra_amenity?.filter((res: any) => res.quantity > 0).map(((respo: any) => { return respo.price })).reduce((a: number, b: any) => a + b, 0))}</span>
                        <HenceforthIcons.ChevronRight />
                    </button></td>
                    {/* <td>
                        <div className="boats d-flex gap-2 align-items-center">
                            {res.inquiry_mode == "whatsapp" ? <Fragment>
                                <HenceforthIcons.Whatsapp />
                                <span>{res.inquiry_mode}</span>
                            </Fragment> :
                                <button className=' d-flex gap-2 align-items-center btn p-0 border-0 text-dark' data-bs-toggle="modal" data-bs-target="#emailInquiryModal" onMouseOver={() => props.setInquiryData(res)}>
                                    <HenceforthIcons.Email />
                                    <span className='text-decoration-underline'>{res.inquiry_mode}</span>
                                    <HenceforthIcons.ChevronRight />
                                </button>
                                
                                }

                        </div>
                    </td> */}
                    <td>{res.status}</td>
                    <td>
                        <ul className="d-flex align-items-center gap-2">
                            <li>
                                <Dropdown menu={{ items: StatusItem(res), }}>
                                    <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                                </Dropdown>
                            </li>
                            <li>
                                <button className="border-0 h-100 p-0 rounded-circle" title="information" data-bs-toggle="modal" data-bs-target="#emailInquiryModal"
                                    onMouseOver={() => props.setInquiryData(res)}><HenceforthIcons.Info /></button>
                            </li>
                        </ul>


                    </td>
                </tr>

            )}
        </TableHeading>
        <Modal
            title=""
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
        >
            <h6>Name:</h6><p></p>
            <h6>email:</h6><p></p>
            <h6>phone:</h6><p></p>
            <h6>inquiry_mode:</h6><p></p>
            {/* <p>some contents...</p> */}
        </Modal>
    </Spin>
}
export default Tablelayout