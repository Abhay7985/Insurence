import TableHeading from "../TableHeading"
import boatImage from '../../assets/images/boat_four.png'
import HenceforthIcons from '../../assets/icons/HenceforthIcons';
const Tablelayout = (props: any) => {
    const headings = [
        "SR. NO.",
        "BOAT NAME",
        "ROUTE",
        "PRICE",
        "DATE",
        "ENQUIRY VIA",
        "STATUS",
        "ACTION"
    ]


    return <TableHeading Array={headings}>
        {props?.data?.map((res: any) =>
            <tr>
                <th>01</th>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        <div className="boat-image">
                            <img src={boatImage} alt="img" className='img-fluid' />
                        </div>
                        <p>{res.boat_name}</p>
                    </div>
                </td>
                <td>{res.route_name}</td>
                <td>${res.price}</td>
                <td>{res.created_at}</td>
                <td>
                    <div className="boats d-flex gap-2 align-items-center">
                        {res.inquiry_mode == "whatsapp" ?
                            <HenceforthIcons.Whatsapp /> :
                            <HenceforthIcons.Email />}
                        <p>{res.inquiry_mode}</p>
                    </div>
                </td>
                <td>{res.status}</td>
                <td>
                    <button className='btn border-0 p-0'><HenceforthIcons.ThreeDot /></button>
                </td>
            </tr>
        )}
    </TableHeading>
}
export default Tablelayout