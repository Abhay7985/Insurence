import { Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"

const EditSecurityBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        rules: "",
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleChange = async ({ name, value }: any) => {
        setState((state: any) => {
            return {
                ...state,
                [name]: value
            }
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const items = {
            safety_question: {
                rules: state.rules
            }
        }
        setLoading(true)
        try {
            const apiRes = await henceforthApi.Boat.edit(state.id, items)
            Toast.success(apiRes.message)
            setIsExpended(false)
            await props.initialise()
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }


    return <Spin spinning={loading} >
        <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
            <div className="edit-listing">
                <h6 className='mb-2'>Rules and Security</h6>
                {isExpended ?
                    <form className="edit-input mt-4" onSubmit={onSubmit}>
                        <textarea className='form-control' placeholder="Enter rules" value={state.rules} name="rules" onChange={(e) => handleChange(e.target)} ></textarea>
                        <div className="save-btn mt-4">
                            <button className='btn btn-yellow rounded-2' type="submit">Save</button>
                        </div>
                    </form> :
                    <div className="listing-content">
                        <p>{state.rules}</p>
                    </div>
                }
            </div>
            <div className="edit-photo ps-4" >
                {isExpended ?
                    <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                    <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
            </div>
        </div>
    </Spin>
}
export default EditSecurityBoat