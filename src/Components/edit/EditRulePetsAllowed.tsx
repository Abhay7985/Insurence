import { Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"

const EditRulePetsAllowed = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        pets_allowed: 0,
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)


    const handleChange = (pets_allowed: number) => {
        setState({
            ...state,
            pets_allowed
        })

    }
    const onSubmit = async (e: any) => {
        e.preventDefault()
        const items = {
            safety_question: {
                pets_allowed: state.pets_allowed === 1,
            },
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
    return <Spin spinning={loading} ><div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1 mb-3">
        <form className="edit-field" onSubmit={onSubmit}>
            <h6 className='mb-2'>Pets Allowed</h6>
            {isExpended ?
                <div className="edit-input mt-2">
                    <div className="form-check mb-2">
                        <input className="form-check-input form-check-radio" type="radio" name="pets_allowedRadioDefault" checked={state.pets_allowed === 1} onChange={() => handleChange(1)} />
                        <label className="form-check-label" htmlFor="smoking">
                            Yes
                        </label>
                    </div>
                    <div className="form-check mb-4">
                        <input className="form-check-input form-check-radio" type="radio" name="pets_allowedRadioDefault" checked={state.pets_allowed === 0} onChange={() => handleChange(0)} />
                        <label className="form-check-label" htmlFor="smoking2">
                            No
                        </label>
                    </div>
                    <div className="save-btn">
                        <button className='btn btn-yellow rounded-2' type="submit">Save</button>
                    </div>
                </div> :
                <div className="listing-content">
                    <p>{state.pets_allowed ? 'Yes' : 'No'}</p>
                </div>
            }
        </form>
        <div className="edit-photo ps-4" >
            {isExpended ?
                <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
        </div>
    </div>
    </Spin>
}

export default EditRulePetsAllowed