import signinBanner from '../../assets/images/login_image.png';
import logo from '../../assets/icons/logo_header.svg';
import { Input, Form, Button, Checkbox } from 'antd';
import React from 'react';
import henceforthApi from '../../utils/henceforthApi';
import { GlobalContext } from '../../context/Provider';
import loginSuccess from '../../context/actions/auth/loginSuccess';
import Spinner from '../common/AntSpinner';

const SignIn = () => {
  const { loading, setLoading, authDispatch,success,handleError } = React.useContext(GlobalContext)
  const [state, setSate] = React.useState({
    email: "",
    password: "",
  })

  const onhandleSubmit = async () => {
    setLoading(true)
    const data = {
      email: state.email,
      password: state.password
    }
    try {
      let apiRes = await henceforthApi.Auth.login(data)
      loginSuccess({ ...apiRes.data, access_token: apiRes.token })(authDispatch)
      console.log('apiRes', apiRes)
      henceforthApi.setToken(apiRes?.token)

      success(apiRes.message)
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleInput = (e: any) => {
    let name = e.target.name
    let value = e.target.value
    setSate({
      ...state,
      [name]: value
    })
  }

  return (
    // signin-section
    <section className='signin-section position-relative'>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-md-10 col-10 position-absolute py-4 ps-md-0">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          {/* form-section */}
          <div className="col-sm-8 col-md-6 col-lg-6 px-0">
            <Form onFinish={onhandleSubmit} className="signin-form h-100 d-flex flex-column justify-content-center">
              <div className="row justify-content-center">
                <div className="col-11 col-lg-8">
                  <h3>Log In</h3>
                </div>
                <div className="col-11 col-lg-8">
                  <div className="mb-3">
                    <Form.Item
                      name='Username'
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input placeholder="Email address" value={state.email} name='email' onChange={handleInput} />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-11 col-lg-8 mb-3">
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      placeholder="password"
                      name='password'
                      value={state.password}
                      onChange={handleInput}
                    />
                  </Form.Item>
                </div>
                <div className="col-11 col-lg-8">
                  <div className="form-check ps-0">
                    <Form.Item name="remember" valuePropName="checked" >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-11 col-lg-8">
                  <Form.Item >
                    <div className="login-btn">
                      <Button htmlType="submit" className='btn btn-yellow w-100 h-100'>{loading ? <Spinner /> : "Log In"}</Button>
                    </div>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
          {/* image-section */}
          <div className="col-md-6 col-lg-6 px-0">
            <div className="signin-banner d-none d-md-block">
              <img src={signinBanner} alt="img" className='img-fluid h-100' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn
