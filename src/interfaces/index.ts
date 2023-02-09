export interface UserInfoInterface {
    token?: string,
    _id?: string,
    profile_pic?: string,
    name?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone_verified?: string,
    phone_no?: string,
    country_code?: string,
    email_verified?: boolean,
}

export interface ApisListResponse {
    data: {
        data: Array<any>,
        total_count: number
    },
    message?: string,
    success?: boolean
}
export interface BreadcrumbInterface {
    name: string,
    value: string,
    url: string
}
export interface WishlistList {
    _id: string,
    user_id: string,
    created_at: string
}
export interface CardGlobleState {
    data: {
        data: Array<CartGlobleObject>,
        total_count: number
    }
}

export interface CartGlobleObject {
    _id: string,
    user_id: string,
    product_highlights: [
        { content: string }
    ],

    quantity: number,
    updated_at: string,
    created_at: string,
    wishlist: boolean
}
export interface AddressGlobleState {
    data: {
        data: Array<GlobleAddressObject>,
        total_count: number
    }
}

export interface GlobleAddressObject {
    address_type: string
    apartment_number: string
    city: string
    company: string
    country: string
    country_code: string
    created_at: string
    full_address: string
    is_default: boolean
    is_deleted: boolean
    name: string
    phone_no: number
    pin_code: string
    shippo_user_address_id: string
    state: string
    user_id: string
    _id: string
    handleDefault: Function
    handleDelete: Function
    selectAddress: Function
    closeModal: Function
    delLoading: any
}
export interface CardListing {
    _id: string
    brand: string
    exp_month: number
    exp_year: number
    last4: number
    selectCard: Function
    handleDelete: Function
    router: any
    cardLaoding: boolean
    closeModal: Function
}
export interface faqListing {
    _id: string
    answer: string
    question: string
}
export interface couponListing {
    code: string
    created_at: string
    description: string
    end_date: string
    is_available: boolean
    is_deleted: boolean
    max_discount: number
    name: string
    percentage: string
    price: number
    start_date: string
    sub_type: string
    type: string
    updated_at: string
    _id: string
    showCopy: boolean
}

export interface boatListingData {
    id: number,
    name: string,
    cover_image: string,
    status: string,
    updated_at: string
}