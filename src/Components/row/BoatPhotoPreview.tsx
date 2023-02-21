
import deleteIcon from '../../assets/icons/delete.svg';

const BoatPhotoPreview = (props: any) => {
   
    return <div className="col-md-6">
        <div className="uploaded-image position-relative">
            <div className="upload-images">
                <img src={URL.createObjectURL(props.file)} alt="img" className='img-fluid' />
            </div>
            <div className="modify-image d-flex gap-2 position-absolute justify-content-end align-items-center">
                <ul className="modify-btn d-flex gap-2">
                    <li>
                        <button type="button" className='edit' onClick={props.onRemove}>
                            <img src={deleteIcon} alt="icon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}
export default BoatPhotoPreview