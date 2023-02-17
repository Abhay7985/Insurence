import SliderImage from '../../assets/images/boat_three.png';
import henceforthApi from '../../utils/henceforthApi';

const PhotoSlider = (props:any) => {
    return (
        <>
            <div className="photo-slider" key={props.order}>
                <img src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props.image}`} className='img-fluid' alt='img' />
            </div>
        </>
    )
}

export default PhotoSlider
