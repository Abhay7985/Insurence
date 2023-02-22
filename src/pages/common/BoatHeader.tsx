import { useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../../assets/icons/logo_header.svg'
import { GlobalContext } from '../../context/Provider'
import { Button } from "antd";

const BoatHeader = () => {
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
                        {location.pathname !== "/boat/add/info" &&

                            <ul className='d-flex gap-2 flex-wrap'>
                                <li>
                                    <button className="btn btn-outline-dark" type="button">Help</button>
                                </li>
                                <li>
                                    <Button htmlType="submit" className="btn btn-yellow h-100" >Save & Exit</Button>
                                </li>
                            </ul>}
                    </form>
                </div>

            </nav>
        </div>
    )
}

export default BoatHeader