import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import profile from '../assets/images/banner_one.png';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

interface profile{
  name:string,
  image:any,
  email:string
}

const Profile = () => {
  const { authState } = React.useContext(GlobalContext)
  henceforthApi.setToken(authState?.access_token)
  console.log(authState?.access_token)
  const [state,setState]=useState({}as profile)
  const [nameHide,setNameHide]=useState(false)
  const initialse=async()=>{
    try{
      let apiRes=await henceforthApi.Auth.profile()  
      setState(apiRes.data)
       console.log(apiRes)
    }catch(error){
      console.log(error)
    }
  } 
  const onChangename=()=>{
    setNameHide(true)
    
  }
  const onhandleChnage=(e:any)=>{
  let name=e.target.name
  let value=e.target.value
  setState({
    ...state,
    [name]:value
  })
  }
  useEffect(()=>{
    initialse()
  },[])
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
                  <img src={state.image ?`${henceforthApi.API_FILE_ROOT_SMALL}${state.image}`: profile} alt="img" className='img-fluid' />
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
                    <label htmlFor="" className='fw-bold mb-2'>Name</label><br/>
                    {nameHide===false? "John Deo":"" }
                    {/* edit-name */}
                    {nameHide===true ? 
                    <div className="edit-input">
                      <Input type="text" value={state.name} name="name" className="form-control w-100 my-3"  placeholder="Enter name" onChange={onhandleChnage}  />
                      <div className="save-btn">
                        <button className='btn btn-yellow'>Save</button>
                      </div>
                    </div>:""}
                  </div>
                  <div className="edit-user ps-4">
                    <button className='btn border-0 text-yellow fw-bold p-0' onClick={onChangename}>{nameHide===true? "cancel":"Edit" }</button>
                  </div>
                </div>
                {/* email */}
                <div className="name d-flex justify-content-between">
                  <div className="user-info w-100">
                    <label htmlFor="editemail" className='fw-bold mb-2'>Email</label>
                    <p>admin@gmial.com</p>
                    {/* edit-email */}
                    <div className="edit-input">
                      <Input type="email" value={state.email} name="email" className="form-control w-100 my-3"  placeholder="Enter email" onChange={onhandleChnage} />
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
