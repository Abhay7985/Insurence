import { Calendar } from 'antd'
import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import HenceforthIcons from '../assets/icons/HenceforthIcons';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const ProviderCalender = () => {

  const [hideShow, setHideShow] = useState(true)

  const initialise=async()=>{
       try{
        
       }catch(error){

       }finally{

       }
  }
  const toggleHandler = (pass: boolean) => {
    setHideShow(false)
}
const toggleHandler2 = (passed: Boolean) => {
    setHideShow(true)
}
  
  useEffect(()=>{
    initialise()
  },[])



  return (
    <>
      {/* Calender-section */}
      <section className="calender-section px-3">
        <div className="container-fluid">
          <div className="row bg-white">
            {/* calender */}
            <div className="col-lg-9 px-0 boat-calender py-5">
              <div className="row">
                <div className="col-12">
                  <div className="select-date px-sm-4 d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap gap-2">
                    <Select
                      defaultValue="Morning Panoramic"
                      style={{ width: '100%' }}
                      onChange={handleChange}
                      options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                      ]}
                    />
                    <div className="edit-pricing px-sm-4">
                      <button className='btn text-yellow p-0 border-0 text-decoration-underline text-nowrap fw-bold d-flex align-items-center'>
                        <HenceforthIcons.EditPencil />
                        <span>Edit pricing & availability</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <Calendar />
                </div>
              </div>
            </div>
    
            <div className="col-lg-3 px-0">
              <div className="sidebar-calender py-4">
                <div className="cross px-4" role="button" onClick={() => toggleHandler(false)}>
                  <HenceforthIcons.Cross />
                </div>
                  
                <div className="edit-date border-bottom px-4 py-4">
                  <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center'>
                    <span>Edit Date</span>
                    <HenceforthIcons.ChevronRight />
                  </button>
                </div>
                <div className="edit-date border-bottom px-4 py-4">
                  <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center'>
                    <span>Edit Tuesday</span>
                    <HenceforthIcons.ChevronRight />
                  </button>
                </div>
                <div className="Available px-4 py-4 border-bottom">
                  <h6 className='fs-16 mb-3'>Available</h6>
                  <p>Price for Panorâmico Manhã - 9 às 13hrs (4 hours AM)</p>
                  <p className='mt-2 mb-4 fw-semibold'>$30 <span className='fw-normal fs-14 px-2'>or</span>10x in $4</p>
                  <p className='mb-2'>Price for Panorâmico Pôr do Sol - 14:30 às 18:30 (4 hours PM)</p>
                  <p className='fw-semibold'>$30 <span className='fw-normal fs-14 px-2'>or</span>10x in $4</p>
                </div>
                {/* edit-tuesday */}
                <div className="edit-tuesday py-4 border-bottom">
                  <div className="edit-tuesday-header py-4 border-bottom px-4">
                    <h5 className='mb-3'>Edit Tuesday</h5>
                    <div className="available d-flex justify-content-between align-items-center">
                      <p> Available</p>
                      <div className="form-check form-switch">
                        <input className="form-check-input form-check-toggle" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                      </div>
                    </div>
                  </div>
                  {/* edit-pricing */}
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
                </div>
                {/* edit-date */}
                <div className="edit-tuesday py-4 border-bottom">
                  <div className="edit-tuesday-header py-4 border-bottom px-4">
                    <h5 className='mb-3'>Tue, 29 Nov 2022</h5>
                    <div className="available d-flex justify-content-between align-items-center">
                      <p> Available</p>
                      <div className="form-check form-switch">
                        <input className="form-check-input form-check-toggle" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                      </div>
                    </div>
                  </div>
                  {/* edit-pricing */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProviderCalender
