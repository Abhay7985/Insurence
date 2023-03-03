import { Spin } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useMatch, useParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { GlobalContext } from "../context/Provider";
import henceforthApi from "../utils/henceforthApi";


interface socialDetails {
    id: number,
    page_name: string,
    title: string,
    image: string,
    description: string,
    created_at: string,
    updated_at: string
}
const SocialPage = () => {
    const match = useMatch(":type")
    const { type } = useParams()
    const { authState, Toast } = useContext(GlobalContext)

    const page = type == "term" ? "term-conditions" : type == "aboutUs" ? "about-us" : "";
    const [state, setState] = useState({} as socialDetails)
    const [loading, setLoading] = useState(false)

    const initData = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.social.socialContent(String(page))
            setState(apiRes.data)
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initData()
    }, [page])
    return (
        <Fragment>
            <Spin spinning={loading}>
                {/* About us */}
                <section className='social-section py-5'>
                    <div className="container">
                    <div className='common-card mb-4 border-0 card-spacing p-0'>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="fw-semibold mb-4">{page}</h2>
                              
                                            <div className="social-image mb-4">
                                                <img src={state.image ? `${henceforthApi.FILES.imageOriginal(state.image, "")}` : ""} className="w-100" alt='img' />
                                            </div>
                                            <p>{state.description ? state.description : "Not Data Found"}</p>
                                        </div>
                                
                                </div>
                            </div>
                    </div>
                </section>
               
            </Spin>
        </Fragment>

    )
}
export default SocialPage
