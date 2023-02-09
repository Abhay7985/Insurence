import { Calendar } from 'antd'
import React from 'react'
import { Select } from 'antd';
import HenceforthIcons from '../assets/icons/HenceforthIcons';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const ProviderCalender = () => {
  return (
    <>
      {/* Calender-section */}
      <section className="calender-section">
        <div className="container-fluid">
          <div className="row">
            {/* calender */}
            <div className="col-lg-9 px-0 border-end py-5">
              <div className="row">
                <div className="col-12">
                  <div className="select-date px-4 d-flex justify-content-between align-items-center">
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
                    <div className="edit-pricing px-4">
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
            <div className="col-lg-3">
              <div className="sidebar-calender">
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProviderCalender
