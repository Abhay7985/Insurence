import HenceforthIcons from "../assets/icons/HenceforthIcons";
import bannerImage from '../assets/images/image_one.png';
import uploadImage from '../assets/images/banner_one.png';
import uploadIcon from '../assets/icons/upload_photo.svg';
import editIcon from '../assets/icons/edit_pencil.svg';
import deleteIcon from '../assets/icons/delete.svg';

const EditImage = () => {
    return (
        <>
            {/* Edit-image section */}
            <section className="edit-image py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="row gy-4">
                                <div className="col-12">
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
                                        <input type="file" className='form-control' id='upload-icon' />
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
                                        <div className="col-md-6">
                                            <div className="uploaded-image position-relative">
                                                <div className="upload-images">
                                                    <img src={uploadImage} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="modify-image d-flex gap-2 position-absolute justify-content-between align-items-center">
                                                    <p className='cover-image'>COVER PHOTO</p>
                                                    <div className="modify-btn d-flex gap-2">
                                                        <button className='btn edit'>
                                                            <img src={editIcon} alt="icon" />
                                                        </button>

                                                        <button className='btn edit'>
                                                            <img src={deleteIcon} alt="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="uploaded-image position-relative">
                                                <div className="upload-images">
                                                    <img src={uploadImage} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="modify-image d-flex gap-2 position-absolute justify-content-end">

                                                    <div className="modify-btn d-flex gap-2">
                                                        <button className='btn edit'>
                                                            <img src={editIcon} alt="icon" />
                                                        </button>

                                                        <button className='btn edit'>
                                                            <img src={deleteIcon} alt="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="uploaded-image position-relative">
                                                <div className="upload-images">
                                                    <img src={uploadImage} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="modify-image d-flex gap-2 position-absolute justify-content-end">

                                                    <div className="modify-btn d-flex gap-2">
                                                        <button className='btn edit'>
                                                            <img src={editIcon} alt="icon" />
                                                        </button>

                                                        <button className='btn edit'>
                                                            <img src={deleteIcon} alt="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="uploaded-image position-relative">
                                                <div className="upload-images">
                                                    <img src={uploadImage} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="modify-image d-flex gap-2 position-absolute justify-content-end">

                                                    <div className="modify-btn d-flex gap-2">
                                                        <button className='btn edit'>
                                                            <img src={editIcon} alt="icon" />
                                                        </button>

                                                        <button className='btn edit'>
                                                            <img src={deleteIcon} alt="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="uploaded-image position-relative">
                                                <div className="upload-images">
                                                    <img src={uploadImage} alt="img" className='img-fluid' />
                                                </div>
                                                <div className="modify-image d-flex gap-2 position-absolute justify-content-end">
                                                    <div className="modify-btn d-flex gap-2">
                                                        <button className='btn edit'>
                                                            <img src={editIcon} alt="icon" />
                                                        </button>

                                                        <button className='btn edit'>
                                                            <img src={deleteIcon} alt="icon" />
                                                        </button>
                                                    </div>
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

export default EditImage
