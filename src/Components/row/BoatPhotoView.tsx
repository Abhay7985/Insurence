
import uploadImage from '../../assets/images/banner_one.png';
import editIcon from '../../assets/icons/edit_pencil.svg';
import deleteIcon from '../../assets/icons/delete.svg';

const BoatPhotoView = () => {

    return <div className="col-md-6">
        <div className="uploaded-image position-relative">
            <div className="upload-images">
                <img src={uploadImage} alt="img" className='img-fluid' />
            </div>
            <div className="modify-image d-flex gap-2 position-absolute justify-content-between align-items-center">
                <p className='cover-image'>COVER PHOTO</p>
                <ul className="modify-btn d-flex gap-2">
                    <li>
                        <button className='edit'>
                            <img src={editIcon} alt="icon" />
                        </button>
                    </li>
                    <li>
                        <button className='edit'>
                            <img src={deleteIcon} alt="icon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}
export default BoatPhotoView