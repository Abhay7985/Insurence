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
            boatinfo: {
                name: state.name
            }
        }
        setLoading(true)
        try {
            if(state.name.trim()){
                const apiRes = await henceforthApi.Boat.edit(state.id, items)
                Toast.success(apiRes.message)
                setIsExpended(false)
                await props.initialise()
        }else{
            Toast.error("Enter Listing Title")
        }
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)

        }
    }


    return <Spin spinning={loading} className='h-100' >
        <div className="Listing-basics bg-white Pricing mb-4">
            <div className="photo-header d-flex justify-content-between mb-3 flex-wrap">
                <h4>Listing basics</h4>
            </div>
            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1" >
                <div className="listing-content w-100">
                    <div className="listing-title d-flex justify-content-between mb-2 flex-wrap">
                        <h6>Listing Title</h6>
                        <div className="edit-photo ps-4" >
                            {isExpended ?
                                <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                                <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
                        </div>
                    </div>
                    {isExpended ?
                        <form className="edit-input" onSubmit={onSubmit}>
                            <input type="text" className="form-control w-100 my-3" id="boatname" placeholder="Enter boat name" value={state.name} name="name" onChange={(e) => handleChange(e.target)} />
                            <div className="save-btn pt-2" >
                                <button className='btn btn-yellow rounded-2' type="submit" id='amenities_tab' >Save</button>
                            </div>
                        </form> :
                        <p id='amenities_tab'>{state?.name}</p>
                    }

                </div>

            </div>
        </div>
    </Spin>
}
export default EditBasicBoat