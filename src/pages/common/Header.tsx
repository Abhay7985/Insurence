import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo_header.svg'
import { GlobalContext } from '../../context/Provider'

const Header = () => {
    const { authState } = useContext(GlobalContext)
    return (
        <div className="container custom-container px-md-0">
            <nav className="navbar py-3">
                <Link className="navbar-brand" to={`/`}>
                    <img src={logo} alt="img" className='img-fluid' />
                </Link>
                <div className="d-flex" role="search">
                    <ul className='d-flex gap-2 flex-wrap'>
                        <li>
                            <button className="btn btn-outline-dark">Help</button>
                        </li>
                        <li>
                            <button className="btn btn-yellow">Save & Exit</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
