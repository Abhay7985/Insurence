import { Input } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMatch } from 'react-router-dom';
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import profile from '../assets/images/banner_one.png';
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';
import Spinner from './common/AntSpinner';
import loginSuccess from '../context/actions/auth/loginSuccess';

interface profile {
  name: string,
  photo: any,
  email: string
}

const Profile = () => {
  const { authState, loading, setLoading, authDispatch } = React.useContext(GlobalContext)
  henceforthApi.setToken(authState?.access_token)
  const match = useMatch('/profile')
  console.log(authState?.access_token)
  const [state, setState] = useState({
    name: authState.name,
    email: authState.email,
    image: authState.image
  })
  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null)
  const [emailShow, setEmailShow] = useState(false)
  const fileRef: any = useRef();
  const fileupload = async (file: any) => {
    try {
      const apiRes = await henceforthApi.Common.do_spaces_file_upload("image", file)
      let data = apiRes
      return data.image
    } catch (error) {
      console.log(error)
    }
  }

  const imageUpload = async (e: any) => {
    setLoading(true)
    let file = e.target.files[0]
    console.log(file)
    try {
      const image = await fileupload(file)
      const item = {
        photo: image
      }
      let apiRes = await henceforthApi.Auth.editProfile(item)
      loginSuccess(apiRes.update)(authDispatch)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onChnageName = async () => {
    setLoading(true)
    try {
      const item = {
        name: state.name
      }
      let apiRes = await henceforthApi.Auth.editProfile(item)
      loginSuccess(apiRes.update)(authDispatch)
      setShow(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const onChnageEmail = async () => {
    try {
      const item = {
        email: state.email
      }
      let apiRes = await henceforthApi.Auth.editProfile(item)
      loginSuccess(apiRes.update)(authDispatch)
    } catch (error) {

    } finally {

    }
  }
  const onChangeNameHide = () => {
    if (show) {
      setShow(false)
      setState({
        ...state,
        name: ""
      })
    }
    else {
      setShow(true)

    }
  }
  const onChangeEmailHide = () => {
    if (emailShow) {
      setEmailShow(false)
      setState({
        ...state,
        name: ""
      })
    }
    else {
      setEmailShow(true)

    }
  }
  const onhandleChnage = (e: any) => {
    console.log(e)
    let name = e.target.name
    let value = e.target.value
    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <>
      {/* profile-section */}
      <section className='profile-section py-5'>
        <div className="container">
          <div className="row gy-4 justify-content-between">
            <div className="col-12 mb-2" onClick={() => window.history.back()}>
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
                  <img src={authState.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${authState.image}` : profile} alt="img" className='img-fluid' />
                </div>
                <div className="profile-btn text-center">
                  <input type="file" onChange={imageUpload} id='profileUpload' />
                  <button className='btn btn-yellow px-4' role="button" disabled={loading}>{loading ? <Spinner /> : "Update photo"}</button>
                </div>
              </div>
            </div>
            {/* user-details */}
            <div className="col-lg-6">
              <div className="user-details">
                {/* name */}
                <div className="name d-flex justify-content-between mb-4">
                  <div className="user-info w-100">
                    <div className="label d-flex justify-content-between mb-2">
                      <label htmlFor="" className='fw-bold'>Name</label><br />
                      <div className="edit-user ps-4">
                        <button className='btn border-0 text-yellow fw-bold p-0 text-capitalize' onClick={onChangeNameHide}>{show === true ? "cancel" : "Edit"}</button>
                      </div>
                    </div>
                    {show === false ? authState.name : ""}
                    {/* edit-name */}
                    {show === true ?
                      <div className="edit-input">
                        <Input type="text" defaultValue={authState.name} name="name" className="form-control w-100 mt-3 mb-4" placeholder="Enter name" onChange={onhandleChnage} />
                        <div className="save-btn">
                          <button className='btn btn-yellow' onClick={onChnageName} disabled={loading}>{loading ? <Spinner /> : "Save"}</button>
                        </div>
                      </div> : ""}
                  </div>
                  <div className="edit-user ps-4">
                    <button className='btn border-0 text-yellow fw-bold p-0' onClick={onChangeNameHide}>{show === true ? "Cancel" : "Edit"}</button>
                  </div>
                </div>
                {/* email */}

                <div className="name d-flex justify-content-between">
                  <div className="user-info w-100">
                    <div className="label d-flex justify-content-between mb-2">
                      <label htmlFor="editemail" className='fw-bold'>Email</label><br />
                      <div className="edit-user ps-4">
                        <button className='btn border-0 text-yellow fw-bold p-0 text-capitalize' onClick={onChangeEmailHide} >{emailShow === true ? "cancel" : "Edit"}</button>
                      </div>
                    </div>
                    {emailShow === false ? authState.email : ""}
                    {/* edit-email */}
                    {emailShow === true ?
                      <div className="edit-input">
                        <Input type="email" defaultValue={authState.email} name="email" className="form-control w-100 mt-3 mb-4" placeholder="Enter email" onChange={onhandleChnage} />
                        <div className="save-btn">
                          <button className='btn btn-yellow' onClick={onChnageEmail}>Save</button>
                        </div>
                      </div> : ""}
                  </div>
                  <div className="edit-user ps-4">
                    <button className='btn border-0 text-yellow fw-bold p-0' onClick={onChangeEmailHide} >{emailShow === true ? "Cancel" : "Edit"}</button>
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
