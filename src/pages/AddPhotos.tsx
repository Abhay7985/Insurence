import { Link } from 'react-router-dom';
import bannerImage from '../assets/images/image_one.png';
import uploadImage from '../assets/images/banner_one.png';
import uploadIcon from '../assets/icons/upload_photo.svg';
import editIcon from '../assets/icons/edit_pencil.svg';
import deleteIcon from '../assets/icons/delete.svg';

const AddPhotos = () => {
    return (
        <>
            {/* Aminities-offer */}
            <section className="Confirm-address-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="banner-content h-100 d-flex flex-column ">
                                <div className="row justify-content-center justify-content-lg-end gy-4 pb-5">
                                    <div className="col-11 col-lg-11 mb-4">
                                        <h3 className='banner-title pb-3'>Add photos to your listing <span className='fw-normal'>(Choose at least 5 photos)</span></h3>
                                        <p>Upload at least one photo to publish your listing. We strongly suggest adding multiple photos to attract attention to your listing. Do not include images of your boat name or contact information.</p>
                                    </div>
                                    <div className="col-11 col-lg-11">
                                        <div className="upload-image">
                                            <input type="file" className='form-control' id='upload-icon' />
                                            <label htmlFor="upload-icon">
                                                <div className="upload-icon text-center mb-2">
                                                    <img src={uploadIcon} alt="upload" className='img-fluid' />
                                                </div>
                                                <button className='btn btn-yellow'>Uploads Photos</button>
                                            </label>

                                        </div>
                                    </div>
                                    <div className="col-11 col-lg-11">
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
                                        </div>
                                    </div>
                                </div>
                                <div className="row banner-footer border-top mt-auto justify-content-end ">
                                    <div className="col-11 col-lg-11">
                                        <ul className='d-flex justify-content-between'>
                                            <li>
                                                <Link to='/add-photos' className='btn back-btn border-0'>Back</Link>
                                            </li>
                                            <li>
                                                <Link to='/safety-question' className='btn btn-yellow px-3'>Next</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 pe-lg-0 d-none d-lg-block">
                            <div className="banner-image border">
                                <img src={bannerImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddPhotos;
