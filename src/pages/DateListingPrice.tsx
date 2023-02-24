const DateListingPrice = () => {
    return (
        <>
            <div className="px-4">
                <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
                    <h6 className='fs-16'>Pricing</h6>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="boat-check-1" />
                            <label className="form-check-label" htmlFor="boat-check-1">
                                Panorâmico Manhã - 9 às 13hrs (4 hours AM)
                            </label>
                        </div>
                        <div className="row justify-content-end py-3">
                            <div className="col-md-12">
                                <div className="mb-3 ps-sm-4">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Price (cash)</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter price' />
                                </div>
                                <div className="ps-sm-4">
                                    <label htmlFor="exampleInputEmail2" className="form-label">Price (installments)</label>
                                    <div className="price-input d-flex gap-3 align-items-center">
                                        <input type="email" className="form-control" value="10" />
                                        <span>*</span>
                                        <input type="email" className="form-control" value="$4" />
                                        <span>=</span>
                                        <input type="email" className="form-control" disabled value="$40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="boat-check-2" />
                            <label className="form-check-label" htmlFor="boat-check-2">
                                Panorâmico Pôr do Sol - 14:30 às 18:30 (4 hours PM)
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="boat-check-3" />
                            <label className="form-check-label" htmlFor="boat-check-3">
                                Panorâmico 2hrs (2 hours tour)
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="boat-check-4" />
                            <label className="form-check-label" htmlFor="boat-check-4">
                                Panorâmico Pôr do sol + Noturno 14 às 20hrs (6 hours PM) - Panorâmico Completo - 10 às 18hrs (Full day panoramic tour - 8 hours)
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="boat-check-5" />
                            <label className="form-check-label" htmlFor="boat-check-5">
                                Panorâmico Noturno - 20 à meia noite (night time tour)
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="boat-check-6" />
                            <label className="form-check-label" htmlFor="boat-check-6">
                                Roteiro Ilha dos Frades - 10 às 18hrs (Island tour 1)
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className='btn btn-yellow px-4 rounded-2'>Done</button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default DateListingPrice;