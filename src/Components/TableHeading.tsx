export default (props: any) => {
    return <div className="table-responsive">
        <table className="table my-4"> <thead>
        <tr className="thead">
            {props.Array.map((res: any) => <th>{res}</th>)}
        </tr>
    </thead>
    <tbody>
        {props.children}
    </tbody>
    </table>
    </div>

}