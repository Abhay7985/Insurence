import { Spin } from "antd";
import React from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import HenceforthIcons from "../assets/icons/HenceforthIcons";
import uploadIcon from '../assets/icons/upload_photo.svg';
import BoatPhotoPreview from "../Components/row/BoatPhotoPreview";
import BoatPhotoView from "../Components/row/BoatPhotoView";
import { GlobalContext } from "../context/Provider";
import henceforthApi from "../utils/henceforthApi";
interface ImageResType {
    image: string,
    order: number,
}
const EditImage = () => {
    const match = useMatch("boat/:id/photos/edit")
    const { authState, Toast } = React.useContext(GlobalContext)
    const [spinning, setSpinning] = React.useState(false)
    const [selectedFiles, setSelectedFiles] = React.useState<Array<any>>([])
    const [photos, setPhotos] = React.useState<Array<ImageResType>>([])
    const [state, setState] = React.useState({
        cover_image: ""
    })

    const addFiles = (rowData: Array<any>) => {
        setSelectedFiles([...selectedFiles, ...rowData])
    }
    const removeFiles = (index: number) => {
        const data = selectedFiles
        data.splice(index, 1)
        setSelectedFiles([...data])
    }
    const onSelectFiles = (files: any) => {
        let rowData = [] as any
        for (let i = 0; i < files.length; i++) {
            rowData.push({ file: files[i], loading: false })
        }
        addFiles(rowData)
    }

    const uploadImages = async () => {
        const rowData = [] as any
        await Promise.all(
            selectedFiles.map(async (imageRes: any) => {
                try {
                    const apiRes = await henceforthApi.Boat.imageUpload('image', imageRes.file)
                    rowData.push(apiRes.image)
                } catch (error) {

                }
            })
        )
        return [...rowData, ...photos.map((res) => res.image)]
    }
    const uploadImage = async () => {
        try {

            setSpinning(true)
            const photos = await uploadImages()
            let items = {
                photos: photos.map((res) => { return { photo: res } })
            }
            if (photos.length >= 5) {
                let res = await henceforthApi.Boat.edit(match?.params.id as string, items)
                window.history.back()
            } else {
                Toast.error("Add Atleast 5 Images")
            }

        } catch (error) {
            Toast.error(error)
        } finally {
            setSpinning(false)
        }

    }
    const initialiseCover = async (img: any) => {
        let items = {
            cover_photo: img
        }
        try {
            let res = await henceforthApi.Boat.edit(match?.params.id as string, items)
            Toast.success(res.message)
            initialiseImuges()
        } catch (error) {

        }
    }

    const removeImage = async (index: number) => {
        debugger
        const data = photos
        data.splice(index, 1)
        setPhotos([...data])
    }

    const initialiseImuges = async () => {
        try {
            setSpinning(true)

            const apiRes = await henceforthApi.Boat.viewBoatDetails(match?.params.id)
            setState(apiRes.data)
            console.log('apiRes', apiRes);
            setPhotos(apiRes.data.photos)
        } catch (error) {
            Toast.error(error)
        } finally {
            setSpinning(false)
        }
    }

    React.useEffect(() => {
        initialiseImuges()
    }, [])


    return (
        <Spin spinning={spinning}>
            {/* Edit-image section */}
            <section className="edit-image py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="row gy-4">
                                <div className="col-12" onClick={() => window.history.back()}>
                                    <HenceforthIcons.LeftArrow />
                                </div>
                                <div className="col-lg-12">
                                    <div className="title d-flex justify-content-between align-items-center py-3">
                                        <h2>Edit Image</h2>
                                        <div className="save-btn">
                                            <button className="btn btn-yellow" type="button" onClick={uploadImage}>Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="upload-image">
                                        <input type="file" className='form-control' id='upload-icon' onChange={(e) => onSelectFiles(e.target.files)} multiple />
                                        <label>
                                            <div className="upload-icon text-center mb-2">
                                                <img src={uploadIcon} alt="upload" className='img-fluid' />
                                            </div>
                                            <button className='btn btn-outline-yellow'>Uploads Photos</button>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row gy-4">
                                        {selectedFiles.map((res: any, index: number) =>
                                            <BoatPhotoPreview {...res} index={index} onRemove={() => removeFiles(index)} />
                                        )}
                                        {photos?.map((res: any, index: number) =>
                                            <BoatPhotoView {...res} index={index} onRemove={() => { removeImage(index) }} initialiseCover={initialiseCover} cover_image={state.cover_image} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Spin>
    )
}

export default EditImage
