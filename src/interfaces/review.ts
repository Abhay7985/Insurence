
export default interface MyReviewProductDetails {
    _id: string,
    name: string,
    discount_price: number,
    average_rating: number,
    images: Array<string>
    
}
export default interface MyReviewList {
    created_at: string,
    description: string,
    images: Array<string>
    product_id: MyReviewProductDetails,
    ratings: number,
    seller_id?: string,
    title: string,
    user_id?: string,
    _id: string
}