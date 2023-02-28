import { Calendar, Spin } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Select } from 'antd';
import HenceforthIcons from '../assets/icons/HenceforthIcons';
import henceforthApi from '../utils/henceforthApi';
import { Badge } from 'antd';
import type { BadgeProps } from 'antd';
import moment, { isDate, months, monthsShort } from 'moment';
import mim, { Dayjs } from 'dayjs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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


console.log(moment().subtract(1,'day').valueOf())
  const dateCellRender = (value: Dayjs) => {
    const listDatas = listData.data.find((res: any) => res.day === value.date() && queryDate.month() === value.month()) as any;
    if (!listDatas) {
      return <></>
    }
    return (
      <ul className="events" onClick={() => handleQuery("show_sidebar", "on")}>
        <li key={value.date()}>
          <Badge status={'warning' as BadgeProps['status']} text={listDatas?.price ? <span className={moment().subtract(1,'day').valueOf()<=moment(value.toString()).valueOf()? '':'text-secondary'}>{listDatas?.price}</span> : <></>} />
          <Badge status={'warning' as BadgeProps['status']} text={listDatas?.description ? <span className={moment().subtract(1,'day').valueOf()<=moment(value.toString()).valueOf() ? '' :'text-secondary'}>{listDatas?.description }</span> : <></>}/>

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
        let apiRes = await henceforthApi.Calender.dateCalender(boat_id, queryDate.month()+1, queryDate.year(),)
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
  }, [uRLSearchParams.get("boat_id"), uRLSearchParams.get("available_date"),uRLSearchParams.get("edit")])
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
                      <button className='btn text-yellow p-0 border-0 text-decoration-underline text-nowrap fw-bold d-flex align-items-center' disabled={!uRLSearchParams.has("boat_id")}>
                        <Link to={`/boat/${uRLSearchParams.get("boat_id")}/inquiry/edit/price#price_tab`}>
                          <HenceforthIcons.EditPencil />
                          <span>Edit pricing & availability</span>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <Calendar dateCellRender={dateCellRender} disabledDate={(date) => {
                    if (date.endOf('d').valueOf() < Date.now()){return true;}return false;
                  }}  onSelect={(e: any) => handleQuery('available_date', `${moment(e.$d).valueOf()}`)}  />
                </div>
              </div>
            </div>
            {uRLSearchParams.get("show_sidebar") == "on" &&
              <CalendarSideBar />
            }
          </div>
        </div>
      </section>
    </Spin>
  )
}

export default ProviderCalender
