// export const APP_API_URL = "http://localhost:6001/"; //getAPIURL()
// export const APP_WEB_API_URL = "http://localhost:6001/web/"; //getAPIURL()

export const APP_API_URL = "http://92.205.183.4:6001/"; //getAPIURL()
export const APP_WEB_API_URL = "http://92.205.183.4:6001/web/"; //getAPIURL()

export const URL = {
    CITIES: APP_API_URL + "cities?showActiveCities=true",
    BANNERS: APP_API_URL + "common/banners",
    DEALS: APP_WEB_API_URL + "deals",
    JOIN_WITH_US: APP_WEB_API_URL + "joinWithUs",
    DEAL_INFO: APP_WEB_API_URL + "dealInfo",
    RECENTLY_VIEWED: APP_WEB_API_URL + "recentlyViewedDeals",
    LOGIN: APP_WEB_API_URL + "login",
    TRENDING: APP_WEB_API_URL + "trending",
    DEAL_SEARCH: APP_WEB_API_URL + "dealSearch",    
    UNSUBSCRIBE: APP_WEB_API_URL + "unsubscribe"
}