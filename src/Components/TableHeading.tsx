export default (props: any) => {
    return <div className="table-responsive">
        <table className="table my-4"> <thead className="border-transparent">
        <tr className="thead border-light">
            {props?.Array?.map((res: any) => <th>{res}</th>)}
        </tr>
    </thead>
    <tbody>
        {props.children}
    </tbody>
    </table>
    </div>

}