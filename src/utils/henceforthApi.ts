import _superagent, { search } from 'superagent';
const SuperagentPromise = require('superagent-promise');
const superagent = SuperagentPromise(_superagent, global.Promise);

const API_ROOT = `http://15.229.56.53:8082/api/`;
const INSTAGRAM_API_ROOT = 'https://graph.instagram.com/'; //live

const BUCKET_ROOT = `https://lanchastaging.s3.sa-east-1.amazonaws.com/`;

const API_FILE_ROOT_MEDIUM = `${BUCKET_ROOT}medium/`;
const API_FILE_ROOT_ORIGINAL = `${BUCKET_ROOT}original/`;
const API_FILE_ROOT_SMALL = `${BUCKET_ROOT}small/`;
const API_FILE_ROOT_AUDIO = `${BUCKET_ROOT}audio/`;
const API_FILE_ROOT_VIDEO = `${BUCKET_ROOT}video/`;
const API_FILE_ROOT_DOCUMENTS = `${BUCKET_ROOT}documents/`;

const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;

let token: any = null;

const tokenPlugin = (req: any) => {
  if (token) {
    req.set('authorization', `Bearer ${token}`);
    // req.set('token', token);
  }
}

const requests = {
  del: (url: string) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url: string, body: any) =>
    superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: any) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  file: (url: string, key: string, file: any) =>
    superagent.post(`${API_ROOT}${url}`).attach(key, file).use(tokenPlugin).then(responseBody)
};
const instagramApi = {
  del: (url: string) =>
    superagent.del(`${INSTAGRAM_API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) =>
    superagent.get(`${INSTAGRAM_API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent.put(`${INSTAGRAM_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url: string, body: any) =>
    superagent.patch(`${INSTAGRAM_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: any) =>
    superagent.post(`${INSTAGRAM_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  login: (info: any) =>
    requests.post('provider/login', info),

  loginAsUser: (info: any) =>
    requests.post('Admin/users/login_as_user', info),
  signUp: (info: any) =>
    requests.post('register', info),
  signUpAsCreater: (info: any) =>
    requests.post('User/sigup_as_creater', info),
  resetPassword: (info: any) =>
    requests.post('User/forgot_password', info),
  logout: () =>
    requests.put('User/logout', {}),
  sendOtp: (info: any) =>
    requests.post('send-email-verify', info),
  resendOtp: (info: any) =>
    requests.post('User/resend_otp', info),
  resendOtpForForgotPassword: (info: any) =>
    requests.post('User/forgot_password/resend_otp', info),
  emailVerification: (info: any) =>
    requests.post('verify-email', info),
  ageVerification: (info: any) =>
    requests.post('User/age_verification', info),
  connetWallet: (info: any) =>
    requests.post('User/connect/wallet', info),
  connectSocialAccount: (info: any) =>
    requests.post('User/connect/social_account', info),
  changePassword: (info: any) =>
    requests.put('provider/change-password', info),
  fortgetPassword: (info: any) =>
    requests.post('forgot-password', info),
  forgotChangePassword: (info: any) =>
    requests.post('User/forgot_password/set_password', info),
  profile: () =>
    requests.get(`provider/profile`),
  editProfile: (info: any) =>
    requests.put('provider/profile', info),
  socialLogin: (info: any) =>
    requests.post('social-login', info),
  verifyOtp: (info: any) =>
    requests.post('User/forgot_password/verify_otp', info),
  resendPhoneOtp: (info: any) =>
    requests.post('User/resend/phone_no/otp', info),
  sendVerifyPhone: (info: any) =>
    requests.post('send-phone-verify', info),
  verifyPhone: (info: any) =>
    requests.post('User/verify/phone_no', info),
};

const Boat = {
  category: () =>
    requests.get(`provider/boat-category`),
  manufacturer: () =>
    requests.get(`provider/boat-manufacturer`),
  create: (items: any) =>
    requests.post(`provider/boats`, items),
  edit: (id: string, items: any) =>
    requests.put(`provider/boats/${id}`, items),
  getBoatListing: (search: any) =>
    requests.get(`provider/boats?${search}`),
  viewBoatDetails:(id:any)=> 
  requests.get(`provider/boats/${id}`),
  boatAmenities:()=> 
  requests.get(`provider/boat-amenities`),
  imageUpload:(key: string, file: any)=>
  requests.file(`provider/upload-image`,key, file)
}



const Search = {
  pagination: (search: string, nft_type: string) =>
    requests.get(`Nft/search?search=${search}&nft_type=${nft_type}&limit=10&pagination=0&language=ENGLISH`),
  reels: (user_id: any, amount: number) =>
    requests.get(`reels/getReels?user_id=${user_id}&amount=${amount ? amount : 10}`),
  getById: (id: any) =>
    requests.get(`profile?id=${id}`),
  searchSubCatg: (id: any) =>
    requests.get(`Product/sub_subcategories?subcategory_id=${id}&language=ENGLISH`)
};
const Address = {
  get: () =>
    requests.get(`User/address?limit=10&pagination=0&language=ENGLISH`),
  getById: (id: any) =>
    requests.get(`User/address?_id=${id}&limit=10&pagination=0&language=ENGLISH`),
  add: (info: any) =>
    requests.post(`User/address`, info),
  setDefault: (id: any) =>
    requests.put(`User/address?_id=${id}&language=ENGLISH`, id),
  delete: (id: any) =>
    requests.del(`User/address/delete/${id}`)
}

const Card = {
  get: () =>
    requests.get(`Stripe/card?language=ENGLISH`),
  add: (info: any) =>
    requests.post(`Stripe/card`, info),
  delete: (id: string) =>
    requests.del(`Stripe/card/${id}`),
}
const Common = {
  do_spaces_file_upload: (key: string, file: any) =>
    requests.file(`provider/upload-image`, key, file),
  nested: () =>
    requests.get(`User/nested`),
  notification: (pagination: number, limit: number) =>
    requests.get(`user/notification`),
  payments: () =>
    requests.get(`user/payments`),
  paymentsecurity: () =>
    requests.get(`user/paymentsecurity`),
  returnpolicy: () =>
    requests.get(`user/returnpolicy`),
  shipping: () =>
    requests.get(`user/shipping`),
  faq: () =>
    requests.get(`Product/faqs?language=ENGLISH`),
  content: (type: string) =>
    requests.get(`User/list_content?language=ENGLISH&type=${type}`),
  checkDelivery: (id: string, lat: string, lng: string) =>
    requests.get(`Product/check/delivery?product_id=${id}&lat=${lat}&lng=${lng}&language=ENGLISH`),
}


const Profile = {
  edit: (info: any) =>
    requests.put('User/profile', info),
  get: () =>
    requests.get(`User/profile?language=ENGLISH`),
  fcmToken: (fcm_token: string) =>
    requests.put('User/fcm', {
      device_type: "Web",
      fcm_token,
      language: "ENGLISH"
    }),
  getWallet: () =>
    requests.get(`User/wallet/listing?language=ENGLISH`),
  deleteWallet: (_id: string) =>
    requests.del(`User/wallet/${_id}`),
  deleteSocial: (_id: string) =>
    requests.del(`User/social_account/${_id}?language=ENGLISH`),
};
const Products = {
  dealsOfTheDayPagination: (pagination: number, limit: number,) =>
    requests.get(`Homepage/user/deal_of_the_day?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&language=ENGLISH`),
  fashionDealsPagination: (pagination: number, limit: number,) =>
    requests.get(`Homepage/user/fashion_deals?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&language=ENGLISH`),
  details: (_id: any) =>
    requests.get(`Product/details?_id=${_id}&language=ENGLISH`),
  review: (_id: any) =>
    requests.get(`Product/reviews?_id=${_id}&language=ENGLISH`),
  variant: (_id: any) =>
    requests.get(`Product/products/variants?_id=${_id}&language=ENGLISH`),
  faqs: (_id: any, limit: number, pagination: number) =>
    requests.get(`Product/product_faqs?_id=${_id}&language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),

  faqsLikeDislike: (info: any) =>
    requests.post(`User/product/faqs/like-dislike`, info),
  search: (search: any) =>
    requests.get(`User/search?search=${search}`),
  productSubcategory: (id: any, discount: any, limit: number, pagination: number, q: any, s: any) =>
    requests.get(`Product/filters?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&subcategory_id=${id}${q ? `&sub_subcategory_id=${q}` : ""}${s ? `&brand_id=${s}` : ""}${discount ? `&discount_available=${discount}` : ""}`),
  filter: (limit: number, q: string) =>
    requests.get(`Product/filters?language=ENGLISH&limit=${limit ? limit : 6}${q ? `&${q}` : ''}`),
  related: (product_id: string, limit: number, pagination: number) =>
    requests.get(`Product/related?product_id=${product_id}&language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  brands: (limit: number, pagination: number, search: any) =>
    requests.get(`Product/brands?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&search=${search}`),
  categories: (pagination: number, limit?: number,) =>
    requests.get(`Product/categories?language=ENGLISH&pagination=${pagination ? pagination : 0}${limit ? `&limit=${limit}` : ''}`),
  subCategories: (limit: number, pagination: number) =>
    requests.get(`Product/subcategories?language=ENGLISH&pagination=${pagination ? pagination : 0}${limit && `&limit=${limit}`}`),
  deals_of_the_day: (pagination: number, limit: number,) =>
    requests.get(`Product/deals_of_the_day?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&language=ENGLISH`),
  fashion_deals: (pagination: number, limit: number,) =>
    requests.get(`Product/fashion_deals?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&language=ENGLISH`),
  deals: (pagination: number, limit: number, title: any) =>
    requests.get(`Homepage/user/${title}?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&language=ENGLISH`),

};
const Cart = {
  addCart: (info: any) =>
    requests.post(`User/cart`, info),
  update: (info: any) =>
    requests.put(`User/cart`, info),
  getCart: (pagination: number, limit: number) =>
    requests.get(`User/cart?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  delete: (_id: any) =>
    requests.del(`User/cart/${_id}`),

}
const WishList = {
  add: (product_id: string) =>
    requests.post(`User/wishlist`, { product_id }),
  pagination: (pagination: number, limit?: number) =>
    requests.get(`User/wishlist?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  delete: (_id: any) =>
    requests.del(`User/wishlists/delete/${_id}`)
}
const Review = {
  add: (info: any) =>
    requests.post(`User/review`, info),
  edit: (info: any) =>
    requests.put(`User/review`, info),
  pagination: (pagination: number, limit?: number,) =>
    requests.get(`User/review/my?limit=${limit ? limit : 10}&pagination=${pagination ? pagination : 0}`),
  details: (_id: string) =>
    requests.get(`User/review/my/${_id}?language=ENGLISH`),
  availableForReview: (product_id: string) =>
    requests.get(`User/review/my?product_id=${product_id}`),
  delete: (_id: any) =>
    requests.del(`User/review/delete/${_id}`),
  reviewList: (_id: any, limit: number, pagination: number) =>
    requests.get(`Product/reviews?language=ENGLISH&_id=${_id}&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  canReview: (product_id: string) =>
    requests.get(`User/review/can_add?product_id=${product_id}`)
}

const Coupons = {
  checkValid: (info: any) =>
    requests.post(`Order/coupon/availablity`, info),
  getList: (limit: number, pagination: number) =>
    requests.get(`User/coupons?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  getExpired: (limit: number, pagination: number) =>
    requests.get(`User/coupons/expired?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
}
const Home = {
  banner_1: () =>
    requests.get(`Homepage/user/banner?language=ENGLISH&position=TOP`),
  banner_2: () =>
    requests.get(`Homepage/user/banner?language=ENGLISH&position=MIDDLE`),
  banner_3: () =>
    requests.get(`Homepage/user/banner?language=ENGLISH&position=BOTTOM`),
  top_deals: () =>
    requests.get(`Homepage/user/top_deals?language=ENGLISH`),
  featured_category: (pagination: number, limit: number) =>
    requests.get(`Homepage/user/featured_categories?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  shop_with_us: (pagination: number, limit: number) =>
    requests.get(`Homepage/user/shop_with_us?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  best_on_ecomm: (pagination: number, limit: number) =>
    requests.get(`Homepage/user/best_on_ecom?language=ENGLISH&limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}`),
  styles_for: () =>
    requests.get(`Homepage/user/style_for_categories?language=ENGLISH`),
  categories: () =>
    requests.get(`User/categories`),
  sub_categories: (category_id: string) =>
    requests.get(`User/sub_categories?category_id=${category_id}`),

}
const Order = {
  get: (limit: number, pagination: number, order_status: string) =>
    requests.get(`Order?limit=${limit ? limit : 6}&pagination=${pagination ? pagination : 0}&order_status=${order_status.toUpperCase()}&language=ENGLISH`),
  details: (id: any) =>
    requests.get(`User/order/details?_id=${id}&language=ENGLISH`),
  add: (info: any) =>
    requests.post(`Order`, info),
  orderPlacedDetails: (id: string) =>
    requests.get(`Order/${id}?language=ENGLISH`),
  orderPlaced: (id: string) =>
    requests.get(`Order/products/${id}?language=ENGLISH`),
  price_checkout_cart: () =>
    requests.get(`User/cart/price_details`),

}
const FILES = {
  audio: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_AUDIO}${filename}`,
  video: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_VIDEO}${filename}`,
  imageOriginal: (filename: string, placeholder: any) => filename ? filename?.startsWith('http') ? filename : `${API_FILE_ROOT_ORIGINAL}${filename}` : placeholder,
  imageMedium: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_MEDIUM}${filename}`,
  imageSmall: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_SMALL}${filename}`,
}

const henceforthApi = {
  Order,
  Home,
  Boat,
  token,
  Auth,
  Common,
  Coupons,
  WishList,
  Cart,
  Profile,
  Products,
  Review,
  Search,
  API_ROOT,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_ORIGINAL,
  API_FILE_ROOT_VIDEO,
  API_FILE_ROOT_DOCUMENTS,
  FILES,
  Address,
  Card,
  encode,
  setToken: (_token?: string) => { token = _token; }
};

export default henceforthApi