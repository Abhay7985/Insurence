const DateListingPrice = (props:any) => {

    return  <div className="px-4">
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={props.selected} id={`route_name` + props.index}
                            onChange={(e) => props.handleChange(e.target.name, e.target.checked, props.index)} />
                        <label className="form-check-label" htmlFor={`route_name` + props.index}>
                            {props.route_name}
                        </label>
                    </div>
                    {
                        props.selected &&

                        <div className="row justify-content-end py-3">
                            <div className="col-md-12">
                                <div className="mb-3 ps-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                    <input type="price" className="form-control" id="exampleInputEmail1"
                                     placeholder='Enter price' name="price" value={props.price} 
                                     onChange={(e) => props.handleChange1(e.target.name, e.target.value.replace(/[^0-9\.]/g, ""), props.index)} />
                                </div>
                                <div className="ps-sm-4">
                                    <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                    <div className="price-input d-flex gap-3 align-items-center">
                                        <input type="email" className="form-control" name="installments" value={props.installments} onChange={(e) => props.handleChange(e.target.name, e.target.value.replace(/[^0-9\.]/g, ""), props.index)} />
                                        <span>*</span>
                                        <input type="email" className="form-control" name="installment_price" value={props.installment_price} onChange={(e) => props.handleChange(e.target.name, e.target.value.replace(/[^0-9\.]/g, ""), props.index)} />
                                        <span>=</span>
                                        <input type="email" className="form-control"  value={(props?.installment_price || 0) * (props?.installment_price || 0)} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
    
}
export default DateListingPrice;