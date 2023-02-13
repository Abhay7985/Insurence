import { Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"

const EditBasicBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        name: "",
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
            boat: {
                name: state.name
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
        <div className="Listing-basics bg-white Pricing mb-4">
            <div className="photo-header d-flex justify-content-between mb-3">
                <h4>Listing basics</h4>
            </div>
            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1" >
                <div className="listing-content w-100">
                    <h6 className='mb-2'>Listing Title</h6>
                    {isExpended ?
                        <form className="edit-input" onSubmit={onSubmit}>
                            <input type="text" className="form-control w-100 my-3" id="boatname" placeholder="Enter boat name" value={state.name} name="name" onChange={(e) => handleChange(e.target)} />
                            <div className="save-btn" >
                                <button className='btn btn-yellow rounded-2' type="submit" id='amenities_tab' >Save</button>
                            </div>
                        </form> :
                        <p>{state?.name}</p>
                    }

                </div>
                <div className="edit-photo ps-4" >
                    {isExpended ?
                        <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                        <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
                </div>
            </div>
        </div>
    </Spin>
}
export default EditBasicBoat