import React from 'react'
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import { Button, Form, Input } from 'antd';
import henceforthApi from '../utils/henceforthApi';
import { GlobalContext } from '../context/Provider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Spinner from './common/AntSpinner';

const ChangePassword = () => {
    const [editEnable, setEditEnable] = React.useState(false)
    const { loading, setLoading, authDispatch, Toast } = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const handleSubmit = async (even: any) => {
        setLoading(true)
        const { current_password, new_password } = even
        try {
            let apiRes = await henceforthApi.Auth.changePassword({ current_password, new_password })
            Toast.success(apiRes.message)
            navigate('/profile')
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Change password section */}
            <section className="change-password py-5 px-2 px-sm-0">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12 mb-2">
                            <a href='#' onClick={() => window.history.back()}>
                                <HenceforthIcons.LeftArrow />
                            </a>
                        </div>
                        <div className="col-12 mb-2">
                            <div className="title">
                                <h2>Change Password</h2>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="name d-flex justify-content-between mb-4">
                                <div className="user-info w-100">
                                    <div className="label d-flex justify-content-between">
                                        <label htmlFor="" className='fw-bold mb-2 text-dark-black'>Password</label>
                                        <div className="edit-user ps-4">
                                            <button className='btn border-0 text-yellow fw-bold p-0' onClick={() => setEditEnable(!editEnable)}>{editEnable ? 'Cancel' : 'Update'}</button>
                                        </div>
                                    </div>
                                    {!editEnable ? <p>Last updated 9 months ago</p> :""  }
                                    
                                    {/* edit-email */}
                                    <Form onFinish={handleSubmit}>
                                        {editEnable ?
                                            <div className="edit-input py-3">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput2" className="form-label">Current password</label>
                                                    <Form.Item
                                                        name="current_password"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your password!',
                                                            },
                                                        ]}
                                                        hasFeedback
                                                    >
                                                        <Input.Password className='w-100' />
                                                    </Form.Item>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput3" className="form-label">New password</label>
                                                    <Form.Item
                                                        name="new_password"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your password!',
                                                            },
                                                        ]}
                                                        hasFeedback
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="exampleFormControlInput4" className="form-label">Confirm password</label>
                                                    <Form.Item
                                                        name="confirm_password"
                                                        dependencies={['new_password']}
                                                        hasFeedback
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please confirm your password!',
                                                            },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    if (!value || getFieldValue('new_password') === value) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                                },
                                                            }),
                                                        ]}
                                                    >
                                                        <Input.Password />
                                                    </Form.Item>
                                                </div>
                                                <div className="save-btn">
                                                    <Button htmlType='submit' className='btn btn-yellow px-4 py-2 h-100' disabled={loading}>{loading ? <Spinner /> : "Update Password"}</Button>
                                                </div>
                                            </div> : ""}
                                    </Form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChangePassword
