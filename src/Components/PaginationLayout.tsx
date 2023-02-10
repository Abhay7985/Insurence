import React from "react";

type Function=(page:number)=>void

interface page{
count:number;
data:any
page:number
limit:number
loading:boolean
onPageChange:Function
}
export default ({ count, data, page, limit, loading, onPageChange } : page) => {
  const visited_page_size = (limit * (page - 1)) + data?.length
  const total = Math.floor(count / limit)
  // console.log(total)
  
  return (<>
    {count > 10 ?
      <div className="d-flex justify-content-center mt-4">
        {loading ? "sppiner" :
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item btn-round cursor-pointer" onClick={() => (page !== 1) ? onPageChange(page - 1) : ""}>
                <button disabled={(page == 1)} className={`btn "btn-outline-primary`}><i className="fas fa-chevron-left"></i><span className="d-none d-md-block ms-2"></span></button>
              </li>

              {((page - 2) > 0) ?
                <li className="page-item cursor-pointer" onClick={() => onPageChange(page - 2)}><span className="page-link">{page - 2}</span></li>
                : <></>}

              {((page - 1) > 0) ?
                <li className="page-item cursor-pointer" onClick={() => onPageChange(page - 1)}><span className="page-link">{page - 1}</span></li>
                : <></>}

              <li className="page-item active cursor-pointer" aria-current="page">
                <span className="page-link">{page} </span>
              </li>


              {(visited_page_size < count) ?
                <li className="page-item cursor-pointer" onClick={() => onPageChange(page + 1)}><span className="page-link">{page + 1}</span></li>
                : <></>}

              {((visited_page_size + limit) < count) ?
                <li className="page-item cursor-pointer" onClick={() => onPageChange(page + 2)}><span className="page-link">{page + 2}</span></li>
                : <></>}


              <li className="page-item cursor-pointer" onClick={() => (visited_page_size < count) ? onPageChange(page + 1) : ""}>
                <button disabled={!(visited_page_size < count)} className={`btn "btn-outline-primary `}><span className="d-none d-md-block me-2"></span><i className="fas fa-chevron-right" ></i></button>
              </li>
              {!loading &&
                < span className=""><h3>{limit * (page - 1) + 1}-{data?.length == 10 ? (limit * (page)) : (limit * (page - 1) + data?.length)} out of {count} </h3></span>}
              </ul>
          </nav>}
      </div> : loading ? <div className='text-center'>"spiner"</div>: ""
    }</>)
}