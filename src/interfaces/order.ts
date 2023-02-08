export interface OrderDetails {
    message: string,
    success: boolean
}
interface productDetails {
    _id: string
    name: string
    description: string,
    images: Array<string>
}
// export interface OrderDetailsData {
//     "_id": string,
//     "order_id": string,
//     "user_id": string,
//     "seller_id": string,
//     "product_id": {
//         "_id": string,
//         "name": string,
//         "description": string,
//         "images": Array<string>
//     },
//     products: Array<productDetails>,
//     "address_id": {
//         "_id": string,
//         "name": string,
//         "user_id": string,
//         "country_code": string,
//         "phone_no": null,
//         "company": string,
//         "country": string,
//         "state": string,
//         "city": string,
//         "pin_code": string,
//         "apartment_number": string,
//         "full_address": string,
//         "address_type": string
//     },
//     "quantity": number,
//     "price": number,
//     "delivery_price": number,
//     "coupon_discount": number,
//     "total_price": number,
//     "total_earnings": number,
//     "shippo_data": null,
//     "order_status": string,
//     "delivery_status": string,
//     "stripe_data": null,
//     "updated_at": string,
//     "created_at": string
// }