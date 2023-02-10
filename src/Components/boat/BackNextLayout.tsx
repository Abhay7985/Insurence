const BackNextLayout = () => <div className="row banner-footer border-top mt-auto justify-content-end">
    <div className="col-11 col-lg-11">
        <ul className='d-flex justify-content-between'>
            <li>
                <button type='button' onClick={() => window.history.back()} className='btn back-btn border-0'>Back</button>
            </li>
            <li>
                <button type='submit' className='btn btn-yellow px-3'>Next</button>
            </li>
        </ul>
    </div>
</div>
export default BackNextLayout