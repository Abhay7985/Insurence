import signinBanner from '../../assets/images/login_image.png';
import logo from '../../assets/icons/logo_header.svg';
import eye from '../../assets/icons/visibility_on.svg';
import cutEye from '../../assets/icons/visibility_off.svg';

const SignIn = () => {
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
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Email address" />
                  </div>
                </div>
                <div className="col-11 col-lg-8">
                  <div className="input-group mb-3 form-control p-0">
                    <input type="password" className="form-control border-0" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                    <span className="input-group-text bg-transparent border-0" id="basic-addon1">
                      <img src={eye} alt="icon" className='img-fluid' />
                      <img src={cutEye} alt="icon" className='img-fluid' />
                    </span>
                  </div>
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
