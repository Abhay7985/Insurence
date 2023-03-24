import { useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../../assets/icons/logo_header.svg'
import { GlobalContext } from '../../context/Provider'
import React from "react";
import placeholder from '../../assets/images/placeholder.png'
import { Button, Divider, Dropdown, MenuProps, Avatar } from "antd";
import henceforthApi from '../../utils/henceforthApi';
import moment from 'moment';

const Header = () => {
    const { authState, logOutNow } = useContext(GlobalContext)
    const location = useLocation()
    const uRLSearchParams = new URLSearchParams(location.search)
    const navigate = useNavigate()
    const { id } = useParams()
    const menuStyle = {
        boxShadow: 'none',
    };

    const initialise = async (e: any) => {
        e.preventDefault()

        uRLSearchParams.set("action", "save_and_exit")
        navigate({
            search: uRLSearchParams.toString()
        })
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to="/profile" className='nav-link'>
                    Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="change-password" className='nav-link'>
                    Change password
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to="" onClick={logOutNow} className='nav-link'>
                    Log Out
                </Link>
            ),
        },

    ];
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg py-0">
                <Link className="navbar-brand" to={`/`}>
                    <img src={logo} alt="img" className='img-fluid' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">

                    <form className="d-flex" role="search" onSubmit={initialise}>
                        {authState.access_token &&
                            <ul className='d-flex flex-column flex-lg-row flex-wrap align-items-center gap-3 gap-lg-5 mt-3 mt-lg-0'>
                                <li>
                                    <Link to='/' className={`nav-link ${location.pathname=="/" ? "active":"" } `}>Boats</Link>
                                </li>
                                <li>
                                    <Link to={`inquiry/all/1`} className={`nav-link${location.pathname.startsWith("/inquiry") ? " active":"" }`}>Inquiry</Link>
                                </li>
                                <li>
                                    <Link to={`/calender?available_date=${moment().valueOf()}`} className={`nav-link ${location.pathname.startsWith("/calender") ? "active":"" }`}>Calender</Link>
                                </li>
                                <li>
                                    <Dropdown menu={{ items }}
                                        dropdownRender={(menu) => (
                                            <div >
                                                {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                                <Divider style={{ margin: 0 }} />
                                            </div>
                                        )}
                                        arrow className="btnn h-100">
                                        <Button><Avatar style={{ backgroundColor: '#FF9100' }} icon={<img src={henceforthApi.FILES.imageOriginal(authState.image, placeholder)} />} />&nbsp;{authState?.name}</Button>
                                    </Dropdown>
                                </li>
                            </ul>}
                    </form>
                </div>

            </nav>
        </div>
    )
}

export default Header
