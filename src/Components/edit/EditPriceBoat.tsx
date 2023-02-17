import { Spin } from "antd"
import React, { useState } from "react"
import { GlobalContext } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import { NumberValidation } from "../../utils/henceforthValidations"

interface RouteDataInterface {
    id: number,
    route_name: string,
    selected?: boolean,
    price?: number,
    installments?: number,
    installment_price?: number
}

const EditPriceBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        prices: [],
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [dataRoute, setDataRoute] = React.useState<Array<RouteDataInterface>>([])
    const [index , setIndex] = useState<number>(0)
console.log(props);

    const handleChange = async (name: string, value: any, index: number) => {
        setIndex(index)
        if(name === "price" && !NumberValidation(value)) return
        if(name === "installments" && !NumberValidation(value)) return
        if(name === "installment_price" && !NumberValidation(value)) return
        const data = dataRoute[index] as any
        if (typeof value == "boolean") {
            data.selected = value
        }
        data[name] = value
        setDataRoute([...dataRoute])

    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const stateData = dataRoute.filter((res => res.selected == true)).map((res) => {
            return {
                route_id: res.id,
                route: res.route_name,
                price: res.price,
                installments: res.installments,
                installment_price: res.installment_price
            }
        })
        const items = {
            price_boat: dataRoute.filter((res => res.selected == true)).map((res) => {
                return {
                    route_id: res.id,
                    price: res.price,
                    installments: res.installments,
                    installment_price: res.installment_price
                }
            })
        }

        setLoading(true)
        try {
            if (!dataRoute[index]?.selected) {
                Toast.error("Select Routes")
            } else if (!dataRoute[index]?.price) {
                Toast.error("Add Price")
            } else if (!dataRoute[index]?.installments || !dataRoute[index]?.installment_price) {
                Toast.error("Add Installments")
            }else{

                const apiRes = await henceforthApi.Boat.edit(state.id, items)
                Toast.success(apiRes.message)
                setIsExpended(false)
                setState({
                    ...state,
                    prices: stateData
                })
            }
            await props.initialise()
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)

        }
    }

    const initialiseRoutes = async () => {
        try {
            const apiRes = await henceforthApi.Admin.routes()
            let rowData: Array<RouteDataInterface> = []

            apiRes.data.forEach((element: RouteDataInterface) => {
                const findData = state.prices.find((res: any) => res.route_id === element.id)
                if (findData) {
                    rowData.push({
                        id: element.id,
                        route_name: element.route_name,
                        selected: true,
                        installment_price: findData.installment_price,
                        installments: findData.installments,
                        price: findData.price
                    })
                } else {
                    rowData.push(element)
                }
            });

            setDataRoute(rowData)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        initialiseRoutes()
    }, [])


    return <Spin spinning={loading}>
        <div className="Pricing bg-white mb-4">
            <div className="photo-header d-flex justify-content-between mb-3">
                <h4>Pricing</h4>
            </div>

            {isExpended ?
                <form className="row justify-content-center justify-content-lg-end gy-4 py-4" onSubmit={onSubmit} id="calender_tab">
                    {dataRoute.map((res: RouteDataInterface, index: number) =>
                        <div className="col-12" key={res.id}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={res.selected} onChange={(e) => handleChange(e.target.name, e.target.checked, index)} />
                                <label className="form-check-label" htmlFor="boat-check-1">
                                    {res.route_name}
                                </label>
                            </div>
                            {res.selected &&
                                <div className="row justify-content-end py-3">
                                    <div className="col-md-12">
                                        <div className="mb-3 ps-sm-4">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter price' name="price" value={res.price} onChange={(e) => handleChange(e.target.name, e.target.value, index)} />
                                        </div>
                                        <div className="ps-sm-4">
                                            <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                            <div className="price-input d-flex gap-3 align-items-center">
                                                <input type="text" className="form-control" placeholder='Enter installments' name="installments" value={res.installments} onChange={(e) => handleChange(e.target.name, e.target.value, index)} />
                                                <span>*</span>
                                                <input type="text" className="form-control" placeholder='Enter price' name="installment_price" value={res.installment_price} onChange={(e) => handleChange(e.target.name, e.target.value, index)} />
                                                <span>=</span>
                                                <input type="text" className="form-control" placeholder='' value={(res?.installments || 0) * (res?.installment_price || 0)} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    )}
                    <div className="col-12">
                        <button className='btn btn-yellow px-4 rounded-2' type="submit">Save</button>
                    </div>
                </form> :
                <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                    {state?.prices?.map((res: any) =>
                        <div className="listing-content" key={res.id}>
                            <h6 className='mb-2'>{res?.route}</h6>
                            <p>${res?.price} <span className='fs-14'>or</span> {res?.installments} in ${res?.installment_price}</p>
                        </div>)}
                    <div className="edit-photo ps-4" >
                        {isExpended ?
                            <button className='btn p-0 border-0 text-yellow fw-bold' type="button" onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                            <button className='btn p-0 border-0 text-yellow fw-bold' type="button" onClick={() => setIsExpended(true)}>Edit</button>}
                    </div>
                </div>}
        </div>
    </Spin>
}
export default EditPriceBoat