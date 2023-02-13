import { Input, Select, Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"

const EditInfoBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        model: "",
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
    const [categories_list, setCategoriesList] = React.useState([])
    const [manufactures_list, setManufactureresList] = React.useState([])

    const handleChange = async ({ name, value }: any) => {
        debugger
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

    const initialise = async () => {
        try {
            const category = await henceforthApi.Boat.category()
            const manufacturer = await henceforthApi.Boat.manufacturer()
            setCategoriesList(category.data)
            setManufactureresList(manufacturer.data)
        } catch (error) {

        }
    }
    React.useEffect(() => {
        initialise()
    }, [])
    return <Spin spinning={loading} >
        <div className="photo-header d-flex justify-content-between border px-4 py-4 rounded-1 mb-3">
            <div className="edit-details">
                {isExpended ?
                    <form className="edit-input mt-3" onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Category</label>
                                    <div className="select">
                                        <Select
                                            defaultValue={state.category_id}
                                            className='w-100'
                                            onChange={(category_id) => handleChange({ category_id })}
                                            options={categories_list?.map((res: any) => { return { value: res?.id, label: res.category } })}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Manufacturer</label>
                                    <div className="select">
                                        <Select
                                            className='w-100'
                                            defaultValue={state.manufacturer_id}
                                            onChange={(manufacturer_id) => handleChange({ manufacturer_id })}
                                            options={manufactures_list?.map((res: any) => { return { value: res?.id, label: res.manufacturer } })}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Model</label>
                                    <Input placeholder="Model" value={state.model} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Size</label>
                                    <Input placeholder="Size" value={state.size} />
                                </div>
                            </div>
                        </div>
                        <div className="save-btn pt-2">
                            <button className='btn btn-yellow rounded-2' type="submit">Save</button>
                        </div>
                    </form> :
                    <div className="listing-content">
                        <h6 className='mb-3'>Boat Detail</h6>
                        <p className='mb-2'>Category: {state.category_id}</p>
                        <p className='mb-2'>Manufacturer: {state.manufacturer_id}</p>
                        <p className='mb-2'>Model: {state.model}</p>
                        <p className='mb-2'>Size: {state.size} feet</p>

                    </div>}
            </div>

            <div className="edit-photo ps-4" >
                {isExpended ?
                    <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                    <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
            </div>
        </div>
    </Spin>
}
export default EditInfoBoat