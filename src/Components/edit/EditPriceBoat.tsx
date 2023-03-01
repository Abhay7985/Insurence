import { Spin } from "antd"
import React, { useState } from "react"
import { GlobalContext } from "../../context/Provider"
import { RouteDataInterface } from "../../interfaces"
import henceforthApi from "../../utils/henceforthApi"


const EditPriceBoat = (props: any) => {
    const { Toast } = React.useContext(GlobalContext)

    const [state, setState] = React.useState({
        prices: [],
        ...props,
    })
    const [isExpended, setIsExpended] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [dataRoute, setDataRoute] = React.useState<Array<RouteDataInterface>>([])
    
    const handleChange = async (name: string, value: any, index: number) => {
        if (name === "price" && isNaN(value)) return
        if (name === "installments" && isNaN(value)) return
        if (name === "installment_price" && isNaN(value)) return
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
        const data = items.price_boat

        if (data.length) {
            let _is_true = true
            data.forEach(element => {
                if (!element.price) {
                    _is_true = false
                    Toast.error(`Please enter price`)
                    // Toast.error(`Please enter price of ${element.route_name}`)
                    return
                }
                if (!element.installments) {
                    _is_true = false
                    Toast.error(`Please enter installments`)
                    // Toast.error(`Please enter installments of ${element.route_name}`)
                    return
                }
                if (!element.installment_price) {
                    _is_true = false
                    Toast.error(`Please enter installment price`)
                    // Toast.error(`Please enter installment price of ${element.route_name}`)
                    return
                }
            });
            if (_is_true) {
                try {
                    setLoading(true)
                    const apiRes = await henceforthApi.Boat.edit(state.id, items)
                    Toast.success(apiRes.message)
                    setIsExpended(false)
                    setState({
                        ...state,
                        prices: stateData
                    })
                    await props.initialise()

                } catch (error) {
                    Toast.error(error)
                } finally {
                    setLoading(false)
                }
            }
        } else {
            Toast.error(`Please select routes`)
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


    return <div className="Pricing bg-white mb-4" id="price_tab">
        <div className="photo-header d-flex justify-content-between mb-3 flex-wrap">
            <h4>Pricing</h4>
            <div className="edit-photo ps-4" >
                {isExpended ?
                    <button className='btn p-0 border-0 text-yellow fw-bold' type="button" onClick={() => { setIsExpended(false); setState(props) }}>Cancel</button> :
                    <button className='btn p-0 border-0 text-yellow fw-bold' type="button" onClick={() => setIsExpended(true)}>Edit</button>}
            </div>
        </div>

        {isExpended ?
            <form className="row justify-content-center justify-content-lg-end gy-4 py-4" onSubmit={onSubmit} id="calender_tab">
                <Spin spinning={loading}>

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
                                            <input type="text" className="form-control px-2" id="exampleInputEmail1" placeholder='Enter price' name="price" value={res.price} onChange={(e) => handleChange(e.target.name, e.target.value.replace(/[^0-9\.]/g, ""), index)} />
                                        </div>
                                        <div className="ps-sm-4">
                                            <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                            <div className="price-input d-flex gap-3 align-items-center">
                                                <input type="text" className="form-control" placeholder='Enter installments' name="installments" value={res.installments} onChange={(e) => handleChange(e.target.name, e.target.value.replace(/[^0-9\.]/g, ""), index)} />
                                                <span>*</span>
                                                <input type="text" className="form-control" placeholder='Enter price' name="installment_price" value={res.installment_price} onChange={(e) => handleChange(e.target.name, e.target.value.replace(/[^0-9\.]/g, ""), index)} />
                                                <span>=</span>
                                                <input type="text" className="form-control" placeholder='' value={(res?.installments || 0) * (res?.installment_price || 0)} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    )}
                </Spin>

                <div className="col-12">
                    <button className='btn btn-yellow px-4 rounded-2' type="submit" disabled={loading}>Save</button>
                </div>
            </form> : state?.prices?.map((res: any) =>
                <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1 mb-2">
                    <div className="listing-content" key={res.id}>
                        <h6 className='mb-2'>{res?.route}</h6>
                        <p>${res?.price} <span className='fs-14'>or</span> {res?.installments} in ${res?.installment_price}</p>
                    </div>
                </div>)}
    </div>
    // </Spin>
}
export default EditPriceBoat