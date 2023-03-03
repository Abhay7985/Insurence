import { Spin } from 'antd';
import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import HenceforthIcons from '../assets/icons/HenceforthIcons'
import { GlobalContext } from '../context/Provider';
import henceforthApi from '../utils/henceforthApi';

interface AmenitiesInterface {
    id: number,
    amenity: string,
    checked?: boolean
}

const EditExtraAmenities = () => {
    const match = useMatch("boat/:id/extraamenities/edit")
    const { authState, Toast } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useState<Array<AmenitiesInterface>>([])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        let items = {
            extra_amenity: state.filter((res) => res.checked === true).map((res) => res.id)
        }
        try {
            if (items.extra_amenity.length) {
                setLoading(true)
                let apiRes = await henceforthApi.Boat.edit(match?.params.id as string, items)
                Toast.success(apiRes.message)
                window?.history?.back()
            } else {
                Toast.error("Please Select Amenities")
            }
        } catch (error) {
            Toast.error(error)

        } finally {
            setLoading(false)
        }
    }

    const handleChecked = (b: boolean, index: number) => {
        const item = state
        item[index]['checked'] = b
        setState([...item])
    };


    const initialiseDetails = async () => {
        henceforthApi.setToken(authState?.access_token)
        try {

            let res = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            return res
        } catch (error) {
        }
    }


    const initialiseAmenities = async () => {
        try {
            setLoading(true)
            let rowData: Array<AmenitiesInterface> = []
            let amenitiesRes = await henceforthApi.Boat.boatAmenities()
            let amenitiesData = amenitiesRes.data
            let boatRes = await initialiseDetails()
            let boatData = boatRes.data

            amenitiesData.forEach((element: AmenitiesInterface) => {
                const item = boatData.amenities.find((res: AmenitiesInterface) => res.id == element.id)
                rowData.push({
                    id: element.id,
                    amenity: element.amenity,
                    checked: item?.id === element?.id
                })

            });
            setState(rowData)
        } catch (error) {
        }
        finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        initialiseAmenities()
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
                                        <h2>Edit Amenities</h2>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="edit-amenties d-flex justify-content-between flex-wrap flex-sm-nowrap gap-3">
                                        <div className="row gy-4">
                                            {state.map((res: AmenitiesInterface, index: number) =>
                                                <div className="col-12 col-lg-12" key={index}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" checked={res.checked} onChange={(e) => handleChecked(e.target.checked, index)} id={"amenity" + res.amenity} />
                                                        <label className="form-check-label" htmlFor={"amenity" + res.amenity}>
                                                            {res?.amenity}
                                                        </label>
                                                    </div>
                                                </div>)}
                                        </div>
                                        <div className="save-btn align-self-end">
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
