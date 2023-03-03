import { Collapse, Spin } from "antd";
import { Fragment, useEffect, useState } from "react";
import henceforthApi from "../utils/henceforthApi";
interface faqListing {
    id: number,
    title: string,
    description: string,
    created_at: string,
    updated_at: string
}
const FaqPage = () => {
    const { Panel } = Collapse
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        data: [] as Array<faqListing>
    })
    const initailse = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.Common.faq()
            setState(apiRes)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        initailse()
    }, [])
    return (
        <Fragment>
            <Spin spinning={loading}>
                <head>
                    <title>Faqs</title>
                </head>
                <section className="faq-section py-5 px-2 px-sm-0">
                    <div className="container">
                        <div className="row gy-5">
                            {/* title */}
                            <div className="col-12">
                                <div className="text-center">
                                    <h1 className='contact-title'>FAQs</h1>
                                </div>
                            </div>

                            <div className="col-12 py-4">
                                {Array.isArray(state?.data) && state?.data.map((res: faqListing, index: number) => {
                                    return <Collapse key={res.id} defaultActiveKey={[index]}>
                                        <Panel header={res.title} key={index}>
                                            <p dangerouslySetInnerHTML={{ __html: res.description }}></p>
                                        </Panel>
                                    </Collapse>
                                })}
                            </div>

                        </div>
                    </div>
                </section>
            </Spin>
        </Fragment>
    )
}
export default FaqPage;