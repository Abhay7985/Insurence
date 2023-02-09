import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/icons/logo_header.svg'
import { GlobalContext } from '../../context/Provider'
import { Button } from 'antd';
const Header = () => {
    const { authState, logOutNow } = useContext(GlobalContext)
    const location = useLocation()
    return (
        <div className="container custom-container px-md-0">
            <nav className="navbar py-3">
                <Link className="navbar-brand" to={`/`}>
                    <img src={logo} alt="img" className='img-fluid' />
                </Link>
                {location.pathname !== "/boat/add/info" &&
                    <form className="d-flex" role="search">
                        {authState.access_token ?
                            <ul className='d-flex gap-2 flex-wrap'>
                                <li>
                                    <Button htmlType="submit" className="btn btn-yellow h-100" >Profile</Button>
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
        </div>
    )
}

export default Header
