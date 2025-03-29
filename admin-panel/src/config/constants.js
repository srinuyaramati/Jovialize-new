import { getAPIURL } from "./confix";

// export const APP_BASE_URL = "http://localhost:6001/"; //getAPIURL()
export const APP_BASE_URL = "http://92.205.183.4:6001/"; //getAPIURL()

export const URL = {
    LOGIN : APP_BASE_URL + "authentication/login",
    LOGOUT: APP_BASE_URL + "authentication/logout",
    FORGOT_PASSWORD: APP_BASE_URL + "authentication/forgotPassword",
    RESET_PASSWORD: APP_BASE_URL + "authentication/resetPassword",
    DEALS: APP_BASE_URL + "deals",
    // GET_ALL_DEALS: APP_BASE_URL + "deals",
    GET_INDIVIDUAL_DEAL: APP_BASE_URL + "deals/individualDeal",
    ADD_DEALS: APP_BASE_URL + "deals/createDeal",
    UPDATE_DEALS: APP_BASE_URL + "deals/updateDeal",
    DELETE_MULTIPLE_IMAGES: APP_BASE_URL + "deals/deleteDealMultipleImages",
    CITIES_LIST: APP_BASE_URL + "cities",
    CITY: APP_BASE_URL + "cities",
    ROLES: APP_BASE_URL + "roles",
    USERS: APP_BASE_URL + "admin",
    APP_USERS: APP_BASE_URL + "admin/appUsers", 
    IMAGE_UPLOAD: APP_BASE_URL + "deals/uploadImage",
    DELETE_MULTIPLE_DEALS: APP_BASE_URL + "deals/deleteMultipleDeals",
    GET_DEAL_IMAGES: APP_BASE_URL + "deals/dealImages",
    MASS_MAILING: APP_BASE_URL + "massMailing",
    GET_BANNERS: APP_BASE_URL + "common/banners",
    BANNER_UPLOAD: APP_BASE_URL + "common/bannerImageUpload",
    DASHBOARD_CARDS_INFO: APP_BASE_URL + "common/dashboardCardInfo"
}