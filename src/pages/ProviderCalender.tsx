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
import Weeklisting from './WeekListing';
import DateListingPrice from './DateListingPrice';
import Item from 'antd/es/list/Item';
import { GlobalContext } from '../context/Provider';
import CalendarSideBar from './CalenderSideBar';

interface RouteDataInterface {
  id: number,
  route_name: string,
  selected?: boolean,
  price?: number,
  installments?: number,
  installment_price?: number
}

const ProviderCalender = () => {
  const { Toast } = React.useContext(GlobalContext)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [hideshow,setHideShow]=useState(false)
  const uRLSearchParams = new URLSearchParams(location.search);
  // const [hideshow, setHideshow] = useState(false)
  const [state, setState] = useState({
    data: [] as any
  })
  const [sideData, setSideData] = useState([] as any)

  const [weekDay, setWeekDay] = useState([] as any)
  const [editData, setEditData] = useState(
    {
      available_day: "",
      available: true,
      route_prices: [
        {
          route_id: Number(),
          price: Number(),
          installments: Number(),
          installment_price: Number()
        }
      ]
    }
  )
  const [listData, getListedData] = useState({
    data: []
  })
  const [stateEdit, setStateEdit] = React.useState({
    prices: [],
    // ...props,
  })
  const queryDate = moment(Number(uRLSearchParams.get('available_date')))

  console.log("dAY", queryDate.format('YYYY/MM/DD'))

  const initialiseBoatLists = async () => {
    try {
      let apiRes = await henceforthApi.Boat.getBoatListing("")
      handleQuery('boat_id', apiRes.data.data[0].id)
      setState(apiRes.data)

    } catch (error) {
      console.log(error)
    } finally {

    }
  }
  const getSidebarValue = async (id: string) => {
  
    if (id) {
      const date = queryDate.format("YYYY/MM/DD")
      console.log(date, 'date')
      try {
        let apiRes = await henceforthApi.Calender.viewPrice(id, date)
        setSideData(apiRes.data)
      } catch (error) {

      } finally {

      }
    }

  }

  const onSubmit = async () => {
    const stateData: any = weekDay.filter(((res: any) => res.selected == true)).map((res: any) => {
      return {
        available_day: res.day,
        route_id: res.id,
        price: res.price,
        installments: res.installments,
        installment_price: res.installment_price
      }
    })
    console.log(stateData)
    const items = {
      available_day: queryDate.format('DD'),
      available: true,
      route_prices: weekDay.filter(((res: any) => res.selected == true)).map((res: any) => {
        return {
          route_id: res.id,
          price: res.price,
          installments: res.installments,
          installment_price: res.installment_price
        }
      })
    }
    const data = items.route_prices
    if (data.length) {
      let _is_true = true
      data.forEach((element: any) => {
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
          // setLoading(true)
          const apiRes = await henceforthApi.Calender.editDayPrice(uRLSearchParams.get("boat_id") as string, items)
          Toast.success(apiRes.message)
          // setIsExpended(false)
          setEditData({
            ...editData,
            route_prices: stateData
          })
          // await props.initialise()

        } catch (error) {
          // Toast.error(error)
        } finally {
          // setLoading(false)
          setEditData({
            route_prices: [
              {
                route_id: "",
                price: "",
                installments: "",
                installment_price: ""
              }
            ]
          } as any)

        }
      }
    } else {
      // Toast.error(`Please select routes`)
    }
  }

  const dateCellRender = (value: Dayjs) => {
    // 
    const listDatas = listData.data.find((res: any) => res.day === value.date() && queryDate.month() === value.month()) as any;
    console.log('listDatas?.id', listDatas)
    if (!listDatas) {
      return <></>
    }
    return (
      <ul className="events" onClick={() => {getSidebarValue(uRLSearchParams.get("boat_id") as string);setHideShow(true ? true :false)}}>
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
    navigate({ search: uRLSearchParams.toString() })
  }

  const initialiseCalendarData = async () => {
    setLoading(true)
    const boat_id = uRLSearchParams.get("boat_id")
    if (boat_id) {

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
  console.log(weekDay)
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
                      value={uRLSearchParams.get("boat_id")}
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
            
            {hideshow===true ?  
            <CalendarSideBar sideData={sideData} />
            :""}
            
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
