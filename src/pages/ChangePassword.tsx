import React from 'react'
import HenceforthIcons from '../assets/icons/HenceforthIcons'

const ChangePassword = () => {
    return (
        <>
            {/* Change password section */}
            <section className="change-password py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12 mb-2">
                            <HenceforthIcons.LeftArrow />
                        </div>
                        <div className="col-12 mb-2">
                            <div className="title">
                                <h2>Change Password</h2>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="name d-flex justify-content-between mb-4">
                                <div className="user-info w-100">
                                    <label htmlFor="" className='fw-bold mb-2'>Password</label>
                                    <p>Last updated 9 months ago</p>
                                    {/* edit-email */}
                                    <div className="edit-input py-3">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Current password</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput2" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput3" className="form-label">New password</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput3" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="exampleFormControlInput4" className="form-label">Confirm password</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput4" />
                                        </div>
                                        <div className="save-btn">
                                            <button className='btn btn-yellow px-4 py-2'>Updated password</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-user ps-4">
                                    <button className='btn border-0 text-yellow fw-bold p-0'>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChangePassword
