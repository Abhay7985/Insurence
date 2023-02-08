import HenceforthIcons from '../assets/icons/HenceforthIcons'

const EditAmenities = () => {
    return (
        <>
            {/* Edit-amenties section */}
            <section className="edit-amenities py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row gy-4">
                                <div className="col-12">
                                    <HenceforthIcons.LeftArrow />
                                </div>
                                <div className="col-lg-12">
                                    <div className="title d-flex justify-content-between align-items-center py-3 flex-wrap gap-2">
                                        <h2>Edit Amenities</h2>
                                        <div className="save-btn">
                                            <button className="btn btn-yellow">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row gy-4">
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check1" />
                                                <label className="form-check-label" htmlFor="check1">
                                                    Blanket
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check2" />
                                                <label className="form-check-label" htmlFor="check2">
                                                    Conditioner
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check3" />
                                                <label className="form-check-label" htmlFor="check3">
                                                    Sheet
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check4" />
                                                <label className="form-check-label" htmlFor="check4">
                                                    Toilet paper
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check5" />
                                                <label className="form-check-label" htmlFor="check5">
                                                    Soap
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check6" />
                                                <label className="form-check-label" htmlFor="check6">
                                                    Towel
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check7" />
                                                <label className="form-check-label" htmlFor="check7">
                                                    Pilow
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check8" />
                                                <label className="form-check-label" htmlFor="check8">
                                                    Shampoo
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check9" />
                                                <label className="form-check-label" htmlFor="check9">
                                                    Wine House
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check10" />
                                                <label className="form-check-label" htmlFor="check10">
                                                    Hot Water
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check11" />
                                                <label className="form-check-label" htmlFor="check11">
                                                    Amplifier
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="check12" />
                                                <label className="form-check-label" htmlFor="check12">
                                                    Anchor
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditAmenities
