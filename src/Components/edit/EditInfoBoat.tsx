import { Input, Select, Spin } from "antd"
import React from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import { NumberValidation } from "../../utils/henceforthValidations"

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
    const [boatExtension, setBoatExtension] = React.useState(props.size.includes('feet') || props.size.includes('inches') ? props.size.split(" ")[1] : '')

    const handleChange = async ({ name, value }: any) => {
        if (name === "size" && !NumberValidation(value)) return
        setState((state: any) => {
            return {
                ...state,
                [name]: value
            }
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        if(!boatExtension) return Toast.error("please select feet/inches")
        const items = {
            boatinfo: {
                category_id: state.category_id,
                manufacturer_id: state.manufacturer_id,
                model: state.model,
                size: (state.size.includes('feet') || state.size.includes('inches'))&&(props.size.split(" ")[1]===boatExtension&& props.size.split(" ")[0]===state.size)  ? state.size : `${state.size}${boatExtension.includes(" ")? boatExtension:` ${boatExtension}`}`,
            }
        }
        setLoading(true)
        try {
            if (state.category_id && state.manufacturer_id && state.model.trim() && state.size.trim()) {
                const apiRes = await henceforthApi.Boat.edit(state.id, items)
                Toast.success(apiRes.message)
                setIsExpended(false)
                await props.initialise()
            } else {
                Toast.error("Enter Complete Boat Details")
            }
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
    return <Spin spinning={loading} className='h-100' >
        <div className="photo-header d-flex justify-content-between border px-4 py-4 rounded-1 mb-3" >
            <div className="edit-details w-100">

                <div className="d-flex justify-content-between mb-2" >
                    <h6 className=''>Boat Detail</h6>
                    {isExpended ?
                        <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                        <button className='btn p-0 border-0 text-yellow fw-bold' onClick={() => setIsExpended(true)}>Edit</button>}
                </div>
                {isExpended ?
                    <form className="edit-input" onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Category</label>
                                    <div className="select">
                                        <Select
                                            defaultValue={state.category_id}
                                            className='w-100'
                                            onChange={(category_id) => handleChange({ name: 'category_id', value: category_id })}
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
                                            onChange={(manufacturer_id) => handleChange({ name: 'manufacturer_id', value: manufacturer_id })}
                                            options={manufactures_list?.map((res: any) => { return { value: res?.id, label: res.manufacturer } })}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Model</label>
                                    <Input placeholder="Model" value={state.model} name="model" onChange={(e) => handleChange(e.target)} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="address mb-3">
                                    <label className="form-label">Size</label>
                                    <div className='d-flex'>
                                        {/* <input type="text" className="form-control" id='input5' placeholder={`Enter size ${boatExtension?`(in${boatExtension})`:''}`} value={boatSize} onChange={(e) => { setBoatSize(e.target.value.replace(/[^.0-9]/g, "")) }} /> */}
                                        <Input placeholder={`Enter size ${boatExtension?`(in${boatExtension})`:''}`} value={state.size.includes('feet') || state.size.includes('inches') ? state?.size?.split(" ")[0] : state.size} name="size" onChange={(e) => handleChange(e.target)} />
                                        <Select
                                            size="large"
                                            value={boatExtension}
                                            onChange={setBoatExtension}
                                            style={{ width: '12%' }}
                                            options={[{ value: " feet", label: "feet" }, { value: " inches", label: "inches" },]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="save-btn pt-2">
                            <button className='btn btn-yellow rounded-2' type="submit">Save</button>
                        </div>
                    </form> :
                    <div className="listing-content">
                        {/* <h6 className='mb-3'>Boat Detail</h6> */}
                        <p className='mb-2'>Category: {props.category}</p>
                        <p className='mb-2'>Manufacturer: {props.manufacturer}</p>
                        <p className='mb-2'>Model: {props.model}</p>
                        <p className='mb-2'>Size: {props.size.includes('feet') || props.size.includes('inches') ? props.size : `${props.size} feet`} </p>

                    </div>}
            </div>


        </div>
    </Spin>
}
export default EditInfoBoat