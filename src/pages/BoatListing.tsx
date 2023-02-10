import addIcon from '../assets/icons/plus_white.svg'
import search from '../assets/icons/search.svg'
import boatImage from '../assets/images/boat_four.png'
import { Select, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import henceforthApi from '../utils/henceforthApi';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { boatListingData } from '../interfaces';
import { GlobalContext } from '../context/Provider';
import PaginationLayout from '../Components/PaginationLayout';




const BoatListing = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { authState } = React.useContext(GlobalContext)
    const urlSearchParams = new URLSearchParams(location.search)

    const [state, setState] = useState({
        current_page: 0,
        data: [] as Array<boatListingData>,
        from: 1,
        total: 0,
        per_page: 0
    })

    const handleChange = (value: string) => {
        if (value) {
            urlSearchParams.set('status', value)
        } else {
            urlSearchParams.delete(`status`)
        }
        navigate({ search: urlSearchParams.toString() })
    };

    const handleSearch = (name: string, value: any) => {
        if (value) {
            urlSearchParams.set(name, value)
        } else {
            urlSearchParams.delete(name)
        }
        navigate({ search: urlSearchParams.toString() })
    }

    const boatListing = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {
            let res = await henceforthApi.Boat.getBoatListing(
                urlSearchParams.toString()
            )
            setState(res.data)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        boatListing()
    }, [urlSearchParams.toString()])

    let dotColor = [
        { status: "listed", color: "green" },
        { status: "unlisted", color: "" },
        { status: "draft", color: "red" },

    ]

    const onChangePagination = (value: string) => {
        if (value) {
            urlSearchParams.set('page', value)
        } 
        else {
            urlSearchParams.delete('page')
        }
        navigate({ search: urlSearchParams.toString() })
    }

    return (
        <>
            {/* Boat-listing */}
            <section className="boat-listing py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12 mb-3">
                            <div className="boat-listing-header d-flex justify-content-between">
                                <h2>{state.total} Boats</h2>
                                <div className="add-boat-btn">
                                    <Link to={`/boat/add/info`} className='nav-link'>
                                        <button className='btn btn-yellow d-flex align-items-center gap-2'>
                                            <img src={addIcon} alt="icon" className='img-fluid' height='15px' width="15px" />
                                            <span>Add New Boat</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="boat-listing-header d-flex justify-content-between align-items-center">
                                <div className="input-group mb-3 form-control p-0 rounded-pill w-auto">
                                    <span className="input-group-text bg-transparent border-0" id="basic-addon1">
                                        <img src={search} alt="icon" />
                                    </span>
                                    <input type="text" className="form-control border-0 ps-0 rounded-pill" name='search' placeholder="Search..." value={urlSearchParams.get('search') as string} onChange={(e: any) => handleSearch(e.target.name, e.target.value)} />
                                </div>
                                <div className="add-boat-btn">
                                    <Select
                                        defaultValue="Listing status"
                                        value={urlSearchParams.has("status") ? urlSearchParams.get("status") : "0"}
                                        style={{ width: 150 }}
                                        onChange={handleChange}
                                        options={[
                                            { value: '0', label: 'All' },
                                            { value: '1', label: 'Listed' },
                                            { value: '2', label: 'Unlisted' },
                                            { value: '3', label: 'Draft' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* table */}
                        <div className="col-12 table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='thead'>
                                        <th scope="col">SR. NO.</th>
                                        <th scope="col">BOATS</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">LAST MODIFIED</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state?.data?.map((e: any, index: number) =>
                                        <tr>
                                            <th scope="row">{Number(urlSearchParams.get("page"))==0 ? index + 1 : (Number(urlSearchParams.get("page")) - 1) * state.per_page + (index + 1)}</th>
                                            <td >
                                                <div className="boats d-flex gap-2 align-items-center" key={index}>
                                                    <div className="boat-image">
                                                        {/* <img src={e.image ? `${""}` : boatImage} alt="img" className='img-fluid' /> */}
                                                        <img src={boatImage} alt="img" className='img-fluid' />
                                                    </div>
                                                    <p>{e?.name}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="status d-flex align-items-center">
                                                    <div className={`status-dot bg-${dotColor.find(res => res.status === e?.status)?.color}`}></div>
                                                    <div className="ms-1">
                                                        <p>{e?.status}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{e?.price}</td>
                                            <td>{moment(e?.updated_at).format('MMMM Do')}</td>
                                            <td>view/edit</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <PaginationLayout
                                count={state.total}
                                data={state.data}
                                limit={state.per_page}
                                page={Number(urlSearchParams.has('page') ? urlSearchParams.get('page') : "1") }
                                loading={false}
                                onPageChange={(page: any) => onChangePagination(page)}
                            />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}


export default BoatListing
