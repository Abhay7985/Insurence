type TypeProps = {
    buttonName?: string
}
const BackNextLayout = (props: TypeProps) => <div className="mx-0 row banner-footer border-top mt-auto justify-content-end sticky-bottom">
    <div className="col-12 col-lg-11 px-0">
        <ul className='d-flex justify-content-between'>
            <li>
                <button type='button' onClick={() => window.history.back()} className='btn back-btn border-0'>Back</button>
            </li>
            <li>
                <button type='submit' className='btn btn-yellow px-3'>{props.buttonName || 'Next'}</button>
            </li>
        </ul>
    </div>
</div>
export default BackNextLayout