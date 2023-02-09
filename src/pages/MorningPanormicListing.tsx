import React from 'react'
import increase from '../assets/icons/add_circle_outline.svg';
import decrease from '../assets/icons/remove_circle_outline.svg';
import { Input, Select } from 'antd';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const MorningPanormicListing = () => {
    return (
        <>
            {/* morning-panormic-listing */}
            <section className='morning-panormic-listing'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-box d-flex align-items-start py-5 gap-3">
                                <div className="nav flex-column nav-pills bg-white h-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    {/* Listing accordian */}
                                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                        {/* Listing accordian */}
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Listing Details
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body text-start">
                                                        <ul>
                                                            <li>
                                                                <a href="#" className='nav-link'>Photos</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className='nav-link'>Listing basics</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className='nav-link'>Amenities</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className='nav-link'>Location</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className='nav-link'>Boat & passengers</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                    {/* Pricing and Availability */}
                                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                        {/* Pricing and Availability */}
                                        <div className="accordion" id="pricingAccordian">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#pricing" aria-expanded="true" aria-controls="pricing">
                                                        Pricing and Availability
                                                    </button>
                                                </h2>
                                                <div id="pricing" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#pricingAccordian">
                                                    <div className="accordion-body text-start">
                                                        <ul>
                                                            <li>
                                                                <a href="#" className='nav-link'>Pricing</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className='nav-link'>Calender availability</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                    {/* Rules & Includes */}
                                    <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                        {/* Rules & Includes */}
                                        <div className="accordion" id="RulesAccordian">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rules" aria-expanded="true" aria-controls="rules">
                                                        Rules & Includes
                                                    </button>
                                                </h2>
                                                <div id="rules" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#RulesAccordian">
                                                    <div className="accordion-body text-start">
                                                        <ul>
                                                            <li>
                                                                <a href="#" className='nav-link'>Rules</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="tab-content w-100" id="v-pills-tabContent">
                                    {/* Listing accordian */}
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                        {/* photos */}
                                        <div className="photos Pricing bg-white mb-4">
                                            <div className="photo-header d-flex justify-content-between">
                                                <h4>Photos (5)</h4>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                            {/* photo-slider */}
                                        </div>
                                        {/* Listing-basics */}
                                        <div className="Listing-basics bg-white Pricing mb-4">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Listing basics</h4>
                                            </div>
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                <div className="listing-content w-100">
                                                    <h6 className='mb-2'>Listing Title</h6>
                                                    <p>Morning Panoramic</p>
                                                    {/* edit-email */}
                                                    <div className="edit-input">
                                                        <input type="email" className="form-control w-100 my-3" id="editemail" placeholder="Enter email" />
                                                        <div className="save-btn">
                                                            <button className='btn btn-yellow rounded-2'>Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="edit-photo ps-4">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Amenities */}
                                        <div className="Listing-basics bg-white Pricing mb-4">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Amenities</h4>
                                            </div>
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                <div className="listing-content">
                                                    <h6 className='mb-2'>Amenities</h6>
                                                    <div className="amenities-list d-flex gap-5">
                                                        <ul>
                                                            <li>Sheet</li>
                                                            <li>Shampoo</li>
                                                            <li>Towel</li>
                                                        </ul>
                                                        <ul>
                                                            <li>Sheet</li>
                                                            <li>Shampoo</li>
                                                            <li>Towel</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Location */}
                                        <div className="Location bg-white Pricing mb-4">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Location</h4>
                                            </div>
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                <div className="listing-content w-100">
                                                    <h6 className='mb-2'>Address</h6>
                                                    <p>Angra dos Reis - Rio de Janeiro</p>
                                                    {/* edit-email */}
                                                    <div className="edit-input mt-3">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Street address</label>
                                                                    <Input placeholder="House name/number +street /road" />
                                                                </div>
                                                            </div>


                                                            <div className="col-12">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Flat, suite. (Optional)</label>
                                                                    <Input placeholder="Flat, suite, building access code" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">City</label>
                                                                    <Input placeholder="Enter City" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">State</label>
                                                                    <Input placeholder="Enter State" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Postcode</label>
                                                                    <Input placeholder="Enter Postcode" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Country</label>
                                                                    <Input placeholder="Enter Country" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="save-btn">
                                                            <button className='btn btn-yellow rounded-2'>Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="edit-photo ps-4">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Boat & passengers */}
                                        <div className="boat-passengers bg-white Pricing">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Boat & passengers</h4>
                                            </div>
                                            <div className="photo-header d-flex justify-content-between border px-4 py-4 rounded-1 mb-3">
                                                <div className="edit-details">
                                                    <div className="listing-content">
                                                        <h6 className='mb-3'>Boat Detail</h6>
                                                        <p className='mb-2'>Category: Speedboat</p>
                                                        <p className='mb-2'>Manufacturer: ACM</p>
                                                        <p className='mb-2'>Model: 2014</p>
                                                        <p className='mb-2'>Size: 25 feet</p>

                                                    </div>
                                                    {/* edit */}
                                                    <div className="edit-input mt-3">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Category</label>
                                                                    <div className="select">
                                                                        <Select
                                                                            defaultValue="Speedboat"
                                                                            className='w-100'
                                                                            onChange={handleChange}
                                                                            options={[
                                                                                { value: 'jack', label: 'Jack' },
                                                                                { value: 'lucy', label: 'Lucy' },
                                                                                { value: 'Yiminghe', label: 'yiminghe' },
                                                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                                                            ]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Manufacturer</label>
                                                                    <div className="select">
                                                                        <Select
                                                                            defaultValue="ACM"
                                                                            className='w-100'
                                                                            onChange={handleChange}
                                                                            options={[
                                                                                { value: 'jack', label: 'Jack' },
                                                                                { value: 'lucy', label: 'Lucy' },
                                                                                { value: 'Yiminghe', label: 'yiminghe' },
                                                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                                                            ]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="col-12">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Model</label>
                                                                    <Input placeholder="2014" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="address mb-3">
                                                                    <label className="form-label">Size</label>
                                                                    <Input placeholder="Size" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="save-btn pt-3">
                                                            <button className='btn btn-yellow rounded-2'>Save</button>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                            <div className="photo-header d-flex justify-content-between border px-4 py-4 rounded-1">
                                             <div className="edit-address">
                                             <div className="listing-content">
                                                    <h6 className='mb-3'>Passengers & Bedrooms</h6>
                                                    <p className='mb-2'>Category: Speedboat</p>
                                                    <p className='mb-2'>Manufacturer: ACM</p>
                                                    <p className='mb-2'>Model: 2014</p>
                                                    <p className='mb-2'>Size: 25 feet</p>
                                                </div>
                                                <div className="row gy-2 pt-2">
                                                    <div className="col-7">
                                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                                            <p>Number of Passengers (Day)</p>
                                                            <div className="add-btn">
                                                                <ul className='d-flex gap-1 align-items-center'>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={decrease} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <input type="text" className='form-control' value={1} />
                                                                    </li>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={increase} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                                            <p>Number of Passengers (Night)</p>
                                                            <div className="add-btn">
                                                                <ul className='d-flex gap-1 align-items-center'>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={decrease} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <input type="text" className='form-control' value={1} />
                                                                    </li>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={increase} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                                            <p>Number of Bedrooms</p>
                                                            <div className="add-btn">
                                                                <ul className='d-flex gap-1 align-items-center'>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={decrease} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <input type="text" className='form-control' value={1} />
                                                                    </li>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={increase} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="add-passenger d-flex justify-content-between align-items-center">
                                                            <p>Number of Bathrooms</p>
                                                            <div className="add-btn">
                                                                <ul className='d-flex gap-1 align-items-center'>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={decrease} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <input type="text" className='form-control' value={1} />
                                                                    </li>
                                                                    <li>
                                                                        <button className='btn border-0'>
                                                                            <img src={increase} alt="icon" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="save-btn pt-3">
                                                            <button className='btn btn-yellow rounded-2'>Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                             </div>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Pricing and Availability */}
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        {/* Pricing */}
                                        <div className="Pricing bg-white mb-4">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Pricing</h4>
                                            </div>
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                <div className="listing-content">
                                                    <h6 className='mb-2'>Price for Panorâmico Manhã - 9 às 13hrs (4 hours AM)</h6>
                                                    <p>$30 <span className='fs-14'>or</span> 10x in $4</p>
                                                </div>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                            {/* edit-pricing */}
                                            <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
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
                                                                    <input type="email" className="form-control" placeholder='Enter installments' />
                                                                    <span>*</span>
                                                                    <input type="email" className="form-control" placeholder='Enter price' />
                                                                    <span>=</span>
                                                                    <input type="email" className="form-control" placeholder='$00' disabled />
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
                                                    <button className='btn btn-yellow px-4 rounded-2'>Save</button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Calender availability */}
                                        <div className="Calender-availability bg-white p-4 ">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Calender availability</h4>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Open calender</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Rules & Includes */}
                                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        {/* Rules */}
                                        <div className="roules Pricing bg-white mb-4">
                                            <div className="photo-header d-flex justify-content-between mb-3">
                                                <h4>Rules</h4>
                                            </div>
                                            {/* smoking */}
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1 mb-3">
                                                <div className="listing-content">
                                                    <h6 className='mb-2'>Smoking Allowed</h6>
                                                    <p>No</p>
                                                </div>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                            {/* pets */}
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1 mb-3">
                                                <div className="listing-content">
                                                    <h6 className='mb-2'>Pets Allowed</h6>
                                                    <p>No</p>
                                                </div>
                                                <div className="edit-photo">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
                                            </div>
                                            {/* Rules and Security */}
                                            <div className="photo-header d-flex justify-content-between border px-4 py-3 rounded-1">
                                                <div className="listing-content">
                                                    <h6 className='mb-2'>Rules and Security</h6>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in nunc vel purus sollicitudin fringilla in vel odio. Proin nec lobortis nulla.</p>
                                                </div>
                                                <div className="edit-photo ps-4">
                                                    <button className='btn p-0 border-0 text-yellow fw-bold'>Edit</button>
                                                </div>
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

export default MorningPanormicListing
