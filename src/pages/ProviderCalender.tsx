import { Calendar, Spin } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Select } from 'antd';
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import henceforthApi from '../utils/henceforthApi';
import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import moment from 'moment';
import mim, { Dayjs } from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Provider';
import CalendarSideBar from './CalenderSideBar';


const ProviderCalender = () => {
  const { Toast } = React.useContext(GlobalContext)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const uRLSearchParams = new URLSearchParams(location.search);
  const [state, setState] = useState({
    data: [] as any
  })


  const [listData, getListedData] = useState({
    data: []
  })

  const queryDate = moment(Number(uRLSearchParams.get('available_date')))

  console.log("dAY", queryDate.format('YYYY/MM/DD'))

  const initialiseBoatLists = async () => {
    try {
      let apiRes = await henceforthApi.Boat.getBoatListing("")
      setState(apiRes.data)

    } catch (error) {
      console.log(error)
    } finally {

    }
  }



  const dateCellRender = (value: Dayjs) => {
    // 
    const listDatas = listData.data.find((res: any) => res.day === value.date() && queryDate.month() === value.month()) as any;
    if (!listDatas) {
      return <></>
    }
    return (
      <ul className="events" onClick={() => handleQuery("show_sidebar", "on")}>
        <li key={value.date()}>
          <Badge status={'success' as BadgeProps['status']} text={`${listDatas?.price ? listDatas?.price : ""}`} />
          <Badge status={'success' as BadgeProps['status']} text={`${listDatas?.description ? listDatas?.description : ""}`} />

        </li>
        {/* ))} */}
      </ul>
    );
  };

  const handleQuery = (key: string, value: string) => {
    uRLSearchParams.set(key, value)
    if (uRLSearchParams.has("edit")) {
      uRLSearchParams.delete("edit")
    }
    navigate({ search: uRLSearchParams.toString() })
  }

  const initialiseCalendarData = async () => {
    const boat_id = uRLSearchParams.get("boat_id")
    if (boat_id) {
      setLoading(true)
      try {
        let apiRes = await henceforthApi.Calender.dateCalender(boat_id, queryDate.month(), queryDate.year(),)
        getListedData(apiRes)
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    initialiseBoatLists()
  }, [])
  React.useEffect(() => {
    initialiseCalendarData()
  }, [uRLSearchParams.get("boat_id"), uRLSearchParams.get("available_date"),])
  return (
    <Spin spinning={loading}>
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
                      value={uRLSearchParams.get("boat_id") || ""}
                      style={{ width: '100%' }}
                      onChange={(value) => handleQuery('boat_id', value)}
                      options={[{ value: "", label: "Select manufacturer" }, ...state?.data?.map((res: any) => { return { value: `${res?.id}`, label: res.name } })]}
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
                  <Calendar dateCellRender={dateCellRender} onSelect={(e: any) => handleQuery('available_date', `${moment(e.$d).valueOf()}`)} />
                </div>
              </div>
            </div>
            {uRLSearchParams.get("show_sidebar") == "on" &&
              <CalendarSideBar />
            }
            {/* Side bAR */}
            {/* <div className="col-lg-3 px-0">
              <div className="sidebar-calender py-4">
                <div className="cross px-4" role="button" >
                  <HenceforthIcons.Cross />
                </div>

                <div className="edit-date border-bottom px-4 py-4">
                  <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center'>
                    <span>Edit Date</span>
                    <HenceforthIcons.ChevronRight />
                  </button>
                </div>
                <div className="edit-date border-bottom px-4 py-4">
                  <button className='btn border-0 p-0 d-flex justify-content-between w-100 align-items-center' onClick={getweekDay}>
                    <span>Edit {queryDate.format('dddd')}</span>
                    <HenceforthIcons.ChevronRight />
                  </button>
                </div>
                <div className="Available px-4 py-4 border-bottom">
                  <h6 className='fs-16 mb-3'>Available</h6>
                  <ul>
                    {sideData.map((res: any) => {
                      return (
                        <>
                          <li>{res.route_name}</li>
                          <li>{res.price} or {res.installments}x in {res.installment_price} </li>
                        </>
                      )
                    })}

                  </ul>
                </div>
                <div className="edit-tuesday py-4 border-bottom">
                  <div className="edit-tuesday-header py-4 border-bottom px-4">
                    <h5 className='mb-3'>Edit {queryDate.format('dddd')}</h5>
                    <div className="available d-flex justify-content-between align-items-center">
                      <p> Available</p>
                      <div className="form-check form-switch">
                        <input className="form-check-input form-check-toggle" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                      </div>
                    </div>
                  </div>

                  <div className="px-4">
                    <div className="row justify-content-center justify-content-lg-end gy-4 py-4">
                      <h6 className='fs-16'>Pricing</h6>
                      {weekDay.map((res: any, index: number) => {
                        return <Weeklisting {...res} index={index} handleChange={handleChange} />

                      })}
                      <div className="col-12">
                        <button className='btn btn-yellow px-4 rounded-2' onClick={onSubmit}>Done</button>
                      </div>

                    </div>
                  </div>
                </div>
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
                  <DateListingPrice />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </Spin>
  )
}

export default ProviderCalender
