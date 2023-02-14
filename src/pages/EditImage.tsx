import HenceforthIcons from "../assets/icons/HenceforthIcons";
import uploadIcon from '../assets/icons/upload_photo.svg';
import BoatPhotoView from "../Components/row/BoatPhotoView";

const EditImage = () => {
    return (
        <>
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
                                            <button className="btn btn-yellow">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="upload-image">
                                        <input type="file" className='form-control zIndex-5 position-relative' id='upload-icon' />
                                        <label htmlFor="upload-icon">
                                            <div className="upload-icon text-center mb-2">
                                                <img src={uploadIcon} alt="upload" className='img-fluid' />
                                            </div>
                                            <button className='btn btn-outline-yellow'>Uploads Photos</button>
                                        </label>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row gy-4">
                                        <BoatPhotoView />
                                        <BoatPhotoView />
                                        <BoatPhotoView />
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

export default EditImage
