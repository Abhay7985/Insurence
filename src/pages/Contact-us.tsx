import TextArea from "antd/es/input/TextArea";
import { stat } from "fs/promises";
import { Fragment, useContext, useState } from "react";
import { FALSE } from "sass";
import { GlobalContext } from "../context/Provider";
import { contactUs } from "../interfaces";
import henceforthApi from "../utils/henceforthApi";
import ContactImage from "../assets/images/image_three.png";
import { Button, Form, Input, Select } from 'antd';
import CountryCode from "../utils/CountryCode.json"
import Spinner from "./common/AntSpinner";
type CountryCodeType = {
    name: string,
    flag: string,
    code: string,
    dial_code: string
}
const { Option } = Select;

const Contact = () => {
    const [form] = Form.useForm();
    const { Toast, loading, setLoading } = useContext(GlobalContext)
    const [state, setState] = useState({} as contactUs)
    const [country, setCountry] = useState('')

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                showSearch
                value={country}
                defaultValue="+91"
                onChange={(e: any) => setCountry(e)} >
                {CountryCode.map((res: CountryCodeType) => <Option value={res.dial_code} key={res.dial_code}>{res.dial_code}</Option>)}
            </Select>
        </Form.Item>
    );


    const handleSubmit = async (even: any) => {
        const { email, message, name, phone, prefix } = even
        if (!name.trim()) {
            Toast.error('Please enter name')
        }
        if (!email.trim()) {
            Toast.error('Please enter email')
        }
        if (!email.includes("@") || !email.includes('.com')) {
            Toast.error("Please enter a valid email")
        }
        if (!phone.trim()) {
            Toast.error('Please enter phone number')
        }
        if (!message.trim()) {
            Toast.error('Please enter message')
        }
        setLoading(true)
        const phoneNo = `${prefix ? prefix : "+91"}${phone}`
        try {
            let apiRes = await henceforthApi.Common.contact_us({ name, email, phone: phoneNo, message })
            Toast.success(apiRes.message)
        } catch (error) {
        } finally {
            form.resetFields()
            setLoading(false)

            
        }
    }
    return (
        <Fragment>
            <head>
                <title>Contact-us</title>
            </head>
            <section className='contact-us-section py-5'>
                <div className="container">
                    <div className="row pb-4">
                        {/* title */}
                        <div className="col-12">
                            <div className="text-center">
                                <h1 className='contact-title'>Contact Us</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row py-5 justify-content-between">
                        {/* contact-image */}
                        <div className="col-md-6 col-lg-6 h-100">
                            <div className="contact-image">
                                <img src={ContactImage} className='img-fluid' alt='img' />
                            </div>
                        </div>
                        {/* contact-form */}
                        <div className="col-md-6 col-lg-5">
                            <Form form={form} onFinish={handleSubmit} className="contact-form">
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Name</label>
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your name!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder="Enter name" />
                                    </Form.Item>
                                    {/* <Input placeholder='Enter name' /> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Email</label>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Please enter a valid email',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input placeholder='Enter Email' />
                                    </Form.Item>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Phone</label>
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input addonBefore={prefixSelector}
                                            style={{ width: '100%' }} placeholder='Enter phone number' className='phone-input' />
                                    </Form.Item>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="" className='form-label'>Message</label>
                                    <Form.Item name="message"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your message!',
                                            },
                                        ]}
                                        hasFeedback >
                                        <TextArea rows={4} placeholder="Write your message" />
                                    </Form.Item>
                                </div>
                                <div className="contact-btn">
                                    <button className='btn btn-yellow px-4 py-2' type="submit" disabled={loading}>{loading ? <Spinner/> :"Submit"}</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default Contact;