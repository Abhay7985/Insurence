import React from 'react'
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import profile from '../assets/images/banner_one.png';

const Profile = () => {
  return (
    <>
      {/* profile-section */}
      <section className='profile-section py-5'>
        <div className="container">
          <div className="row gy-4 justify-content-between">
            <div className="col-12 mb-2">
              <HenceforthIcons.LeftArrow />
            </div>
            <div className="col-12 mb-2">
              <div className="title">
                <h2>Profile</h2>
              </div>
            </div>
            {/* user-profile */}
            <div className="col-lg-5">
              <div className="user-profile">
                <div className="profile-image mx-auto">
                  <img src={profile} alt="img" className='img-fluid' />
                </div>
                <div className="profile-btn text-center">
                  <button className='btn btn-yellow px-4'>Update photo</button>
                </div>
              </div>
            </div>
            {/* user-details */}
            <div className="col-lg-6">
              <div className="user-details">
                {/* name */}
                <div className="name d-flex justify-content-between mb-4">
                  <div className="user-info w-100">
                    <label htmlFor="" className='fw-bold mb-2'>Name</label>
                    <p>John Deo</p>
                    {/* edit-name */}
                    <div className="edit-input">
                      <input type="text" className="form-control w-100 my-3" id="editIm" placeholder="Enter name" />
                      <div className="save-btn">
                        <button className='btn btn-yellow'>Save</button>
                      </div>
                    </div>
                  </div>
                  <div className="edit-user ps-4">
                    <button className='btn border-0 text-yellow fw-bold p-0'>Edit</button>
                  </div>
                </div>
                {/* email */}
                <div className="name d-flex justify-content-between">
                  <div className="user-info w-100">
                    <label htmlFor="editemail" className='fw-bold mb-2'>Email</label>
                    <p>johndoe123@gmail.com</p>
                    {/* edit-email */}
                    <div className="edit-input">
                      <input type="email" className="form-control w-100 my-3" id="editemail" placeholder="Enter email" />
                      <div className="save-btn">
                        <button className='btn btn-yellow'>Save</button>
                      </div>
                    </div>
                  </div>
                  <div className="edit-user ps-4">
                    <button className='btn border-0 text-yellow fw-bold p-0'>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
