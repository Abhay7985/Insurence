import _superagent, { search } from 'superagent';
const SuperagentPromise = require('superagent-promise');
const superagent = SuperagentPromise(_superagent, global.Promise);

const API_BASE_URL = `lanchasalvador.com.br/api/`
const IS_STAGING = (window.origin.includes('staging') || window.origin.includes('127.0.0.1'));
const LIVE_API_ROOT = `https://aluguel.backend.${API_BASE_URL}`;
const STAGING_API_ROOT = `https://staging.api.${API_BASE_URL}`;

const API_ROOT = IS_STAGING ? STAGING_API_ROOT : LIVE_API_ROOT

const BUCKET_ROOT = `https://lanchastaging.s3.sa-east-1.amazonaws.com/`;

const API_FILE_ROOT_MEDIUM = `${BUCKET_ROOT}medium/`;
const API_FILE_ROOT_THUMBNAIL = `${BUCKET_ROOT}thumbnail/`;
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
  boatRoutes: () =>
    requests.get(`provider/boat-routes`),
  create: (items: any) =>
    requests.post(`provider/boats`, items),
  edit: (id: string, items: any) =>
    requests.put(`provider/boats/${id}`, items),
  status: (id: any, items: any) =>
    requests.put(`provider/boat-status/${id}`, items),
  getBoatListing: (search: any) =>
    requests.get(`provider/boats?${search}`),
  viewBoatDetails: (id: any) =>
    requests.get(`provider/boats/${id}`),
  deleteBoat: (id: any) =>
    requests.del(`provider/boats/${id}`),
  boatAmenities: () =>
    requests.get(`provider/boat-amenities`),
  extraAmenities: () =>
    requests.get(`provider/extra-amenities`),
  imageUpload: (key: string, file: any) =>
    requests.file(`provider/upload-image`, key, file),
  filerDate: (id: any, priceing_date: any) =>
    requests.get(`boat-details/${id}/prices${priceing_date !== 0 ? `?priceing_date=${priceing_date}` : ""}`),
  getBoatListingCalender: () =>
    requests.get(`boat-listing-calendar`)
}
const Subscribe = {
  subscribe: (item: any) => requests.post(`subscribe`, item)
}
const Calender = {
  dateCalender: (id: string, month: number, year: number) => requests.get(`provider/boat-price-month/${id}?month=${month}&year=${year}`),
  viewPrice: (id: string, available_date: string) => requests.get(`provider/show-boatprice-date/${id}?available_date=${available_date}`),

  getWeekPrice: (id: string, available_day: string) => requests.get(`provider/boat-price-weekday/${id}?available_day=${available_day}`),
  getDatePrice: (id: string, available_date: string) => requests.get(`provider/boat-price-date/${id}?available_date=${available_date}`),

  editWeekPrice: (id: string, item: any) => requests.put(`provider/boat-price-weekday/${id}`, item),
  editDatePrice: (id: string, item: any) => requests.put(`provider/boat-price-date/${id}`, item),

  switchDatePrice: (type: string, id: string, item: any) => requests.put(`provider/boat-${type}-switch/${id}`, item),
  switchDayPrice: (id: string, item: any) => requests.put(`provider/boat-day-switch/${id}`, item)


}
// boat-routes

const Inquiry = {
  pagination: (status: string, page: string, search: any) =>
    requests.get(`provider/inquiry?page=${page}${status ? `&status=${status}` : ''}${search ? `&${search}` : ''}`),
  getexport: (start_date: any, end_date: any) =>
    requests.get(
      `provider/inquiries/export?${start_date ? `&start_date=${start_date}` : ""}${end_date ? `&end_date=${end_date}` : ""}`
    ),
  inquiryStatus: (id: any, items: any) =>
    requests.put(`provider/inquiry/${id}`, items),
  deleteInquiry: (id: any) => requests.del(`provider/inquiry/${id}`)
};

const Admin = {
  routes: () =>
    requests.get(`provider/boat-routes`),
}
const social = {
  socialContent: (title: string) =>
    requests.get(`show-pages/${title}`)
}
const Location = {
  getLoctaion: () => requests.get('provider/boat-locations')
}
const Common = {
  faq: () => requests.get(`faq`),
  contact_us: (item: any) => requests.post('contact-us', item),
  do_spaces_file_upload: (key: string, file: any) => requests.file(`provider/upload-image`, key, file),
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
};

const FILES = {
  audio: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_AUDIO}${filename}`,
  video: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_VIDEO}${filename}`,
  imageOriginal: (filename: string, placeholder: any) => filename ? filename?.startsWith('http') ? filename : `${API_FILE_ROOT_ORIGINAL}${filename}` : placeholder,
  imageMedium: (filename: string, placeholder: any) => filename ? filename?.startsWith('http') ? filename : `${API_FILE_ROOT_MEDIUM}${filename}` : placeholder,
  // imageMedium: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_MEDIUM}${filename}`,
  imageSmall: (filename: string) => filename?.startsWith('http') ? filename : `${API_FILE_ROOT_SMALL}${filename}`,
}

const henceforthApi = {
  Admin,
  Boat,
  token,
  Auth,
  Common,
  social,
  Calender,
  Profile,
  Inquiry,
  Location,
  Subscribe,
  API_ROOT,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_THUMBNAIL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_ORIGINAL,
  API_FILE_ROOT_VIDEO,
  API_FILE_ROOT_DOCUMENTS,
  FILES,
  encode,
  setToken: (_token?: string) => { token = _token; }
};

export default henceforthApi