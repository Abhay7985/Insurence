
import uploadImage from '../../assets/images/banner_one.png';
import editIcon from '../../assets/icons/edit_pencil.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import henceforthApi from '../../utils/henceforthApi';

const BoatPhotoView = (props: any) => {

    return <div className="col-md-6">
        <div className="uploaded-image position-relative">
            <div className="upload-images">
                <img src={henceforthApi.FILES.imageOriginal(props.image, uploadImage)} alt="img" className='img-fluid' />
            </div>
            {props.image === props.cover_image ? <p className='cover-image position-absolute top-0 mt-2 ms-2' >COVER PHOTO</p> : ''}
            <div className="modify-image d-flex gap-2 position-absolute justify-content-end align-items-center">
                <ul className="modify-btn d-flex gap-2">
                    {props.image !== props.cover_image &&
                    <li>
                        <button className='edit' type='button' onClick={() => props.initialiseCover(props.image)}>
                            <img src={editIcon} alt="icon" />
                        </button>
                    </li>}
                    <li>
                        <button className='edit' type='button' onClick={props.onRemove}>
                            <img src={deleteIcon} alt="icon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}
export default BoatPhotoView