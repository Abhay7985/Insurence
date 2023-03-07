import { Spin } from 'antd';
import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';
import henceforthValidations from '../utils/henceforthValidations';
import { amenities } from './Extra';

interface AmenitiesInterface {
    id: number,
    amenity: string,
    checked?: boolean
}

const EditExtraAmenities = () => {
    const match = useMatch("boat/:id/extra/edit")
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const [ExtraOffers, setExtraOffers] = useState<Array<amenities>>([])
    const [extra, setExtra] = useState<Array<number>>([])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let items = {
   
                extra_amenity: extra
        }
        try {
            if (extra.length) {
                setLoading(true)
                let apiRes = await henceforthApi.Boat.edit(match?.params.id as string, items)
                Toast.success(apiRes.message)
                window?.history?.back()
            } else {
                Toast.error("Please select Amenities")
            }
        } catch (error) {
            Toast.error(error)

        } finally {
            setLoading(false)
        }
    }


    const handleChecked = (e: any) => {
        let prev = extra;
        let value = e.target.value
        let itemIndex = prev.indexOf(+value);
        if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
        } else {
            prev.push(+value);
        }
        setExtra([...prev]);
    };

    const initialiseDetails = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {

            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            return res
        } catch (error) {
        }
    }
    const handleAmenities = async () => {
        setLoading(true)
        try {
            let apiRes = await initialiseDetails()
            let res = await henceforthApi.Boat.extraAmenities()
            console.log(res);
            setExtra(apiRes.data.extra_amenity.map((res: any) => { return res.id  }))
            // let apiResEdit = res?.data?.map((res: any) => { return { ...res, checked: apiRes.data.extra_amenity.some((resp: any) => resp.id === res.id) } })
            setExtraOffers(res.data)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    // const initialiseAmenities = async () => {
    //     try {
    //         setLoading(true)
    //         let rowData: Array<AmenitiesInterface> = []
    //         let amenitiesRes = await henceforthApi.Boat.boatAmenities()
    //         let amenitiesData = amenitiesRes.data
    //         let boatRes = await initialiseDetails()
    //         let boatData = boatRes.data

    //         amenitiesData.forEach((element: AmenitiesInterface) => {
    //             const item = boatData.amenities.find((res: AmenitiesInterface) => res.id == element.id)
    //             rowData.push({
    //                 id: element.id,
    //                 amenity: element.amenity,
    //                 checked: item?.id === element?.id
    //             })

    //         });
    //         setState(rowData)
    //     } catch (error) {
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }
console.log(extra);

    React.useEffect(() => {
        handleAmenities()
    }, [])

    return (
        <Spin spinning={loading} className='h-100'>
            <section className="edit-amenities py-5 h-100">
                <div className="container h-100">
                    <form className="row h-100" onSubmit={onSubmit}>
                        <div className="col-md-6">
                            <div className="row gy-4 h-100">
                                <div className="col-12" onClick={() => window?.history.back()}>
                                    <HenceforthIcons.LeftArrow />
                                </div>
                                <div className="col-lg-12">
                                    <div className="title">
                                        <h2>Edit Extra's</h2>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="edit-amenties  gap-3">
                                        <div className="row gy-4">
                                            {ExtraOffers.map((e: any, index: number) =>
                                                <div className="col-12 col-lg-11" key={index}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" checked={extra.includes(e.id)} value={e?.id} onChange={(e: any) => handleChecked(e)} id={`check1${index}`} />
                                                        <label className="form-check-label" htmlFor={`check1${index}`}>
                                                            {e?.extra_amenity} - <span className='text-dark'>{henceforthValidations.BrazilianReal(e?.price)}</span>
                                                        </label>
                                                    </div>
                                                </div>)}
                                        </div>
                                        <div className="save-btn d-flex justify-content-end mt-5 align-self-end">
                                            <button className="btn btn-yellow text-nowrap" type='submit'>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Spin>
    )
}

export default EditExtraAmenities
