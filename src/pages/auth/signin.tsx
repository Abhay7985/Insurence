import signinBanner from '../../assets/images/login_image.png';
import logo from '../../assets/icons/logo_header.svg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
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
            <form action="#" className="signin-form h-100 d-flex flex-column justify-content-center">
              <div className="row justify-content-center">
                <div className="col-11 col-lg-8">
                  <h3>Log In</h3>
                </div>
                <div className="col-11 col-lg-8">
                  <div className="mb-3">
                  <Input placeholder="Email address" />
                  </div>
                </div>
                <div className="col-11 col-lg-8 mb-3">
                  <Input.Password
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </div>
                <div className="col-11 col-lg-8">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-11 col-lg-8">
                  <div className="login-btn">
                    <button className='btn btn-yellow w-100'>Log In</button>
                  </div>
                </div>
              </div>
            </form>
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
