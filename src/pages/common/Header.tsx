import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/icons/logo_header.svg'
import { GlobalContext } from '../../context/Provider'
import { Button } from 'antd';
import profile from '../../assets/images/image_two.png';

const Header = () => {
    const { authState, logOutNow } = useContext(GlobalContext)
    const location = useLocation()
    return (
        <>
            <header className='.header'>


                {/* <div className="container custom-container px-md-0">
                    <nav className="navbar py-3">
                        <Link className="navbar-brand" to={`/`}>
                            <img src={logo} alt="img" className='img-fluid' />
                        </Link>
                        {location.pathname !== "/boat/add/info" &&
                            <form className="d-flex" role="search">
                                {authState.access_token ?
                                    <ul className='d-flex gap-2 flex-wrap align-items-center gap-5'>
                                        <li>
                                            <Link to='' className='nav-link'>Boats</Link>
                                        </li>
                                        <li>
                                            <Link to='' className='nav-link'>Inquiry</Link>
                                        </li>
                                        <li>
                                            <Link to='' className='nav-link'>Calender</Link>
                                        </li>
                                        <li>
                                            <Button htmlType="submit" className="btn h-100 rounded d-flex gap-3 align-items-center border" >
                                                <div className="profile-image">
                                                    <img src={profile} alt="img" className='img-fluid' />
                                                </div>
                                                <span className='text-yellow'>John Doe</span>
                                            </Button>
                                        </li>
                                    </ul> :
                                    <ul className='d-flex gap-2 flex-wrap'>

                                        <li>
                                            <button className="btn btn-outline-dark" type="submit">Help</button>
                                        </li>
                                        <li>
                                            <Button htmlType="submit" className="btn btn-yellow" onClick={logOutNow}>Save & Exit</Button>
                                        </li>
                                    </ul>}
                            </form>}
                    </nav>
                </div> */}
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <Link className="navbar-brand" to={`/`}>
                            <img src={logo} alt="img" className='img-fluid' />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            {location.pathname !== "/boat/add/info" &&
                                <form className="d-flex" role="search">
                                    {authState.access_token ?
                                        <ul className='d-flex flex-wrap align-items-center gap-5'>
                                            <li>
                                                <Link to='' className='nav-link'>Boats</Link>
                                            </li>
                                            <li>
                                                <Link to='' className='nav-link'>Inquiry</Link>
                                            </li>
                                            <li>
                                                <Link to='' className='nav-link'>Calender</Link>
                                            </li>
                                            <li>
                                                <Button htmlType="submit" className="btn h-100 rounded d-flex gap-3 align-items-center border" >
                                                    <div className="profile-image">
                                                        <img src={profile} alt="img" className='img-fluid' />
                                                    </div>
                                                    <span className='text-yellow'>John Doe</span>
                                                </Button>
                                            </li>
                                        </ul> :
                                        <ul className='d-flex gap-2 flex-wrap'>
                                            <li>
                                                <button className="btn btn-outline-dark" type="submit">Help</button>
                                            </li>
                                            <li>
                                                <Button htmlType="submit" className="btn btn-yellow" onClick={logOutNow}>Save & Exit</Button>
                                            </li>
                                        </ul>}
                                </form>}
                        </div>

                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header
