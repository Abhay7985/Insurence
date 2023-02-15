import SliderImage from '../../assets/images/boat_three.png';

const PhotoSlider = () => {
    return (
        <>
            <div className="photo-slider">
                <img src={SliderImage} className='img-fluid' alt='img' />
            </div>
        </>
    )
}

export default PhotoSlider
