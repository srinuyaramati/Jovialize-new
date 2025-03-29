import axios from "axios";
import { URL } from "./../config/constants";

// get deals list request
export async function getDeals(cityName, cityId, searchVal = '') {
    const url = URL.DEALS + "/" + cityName + "/" + cityId + "/" + searchVal;
    return await axios.get(url)
}

// get cities list
export async function getCities() {
    return await axios.get(URL.CITIES);
}

// get cities list
export async function getBanners() {
    return await axios.get(URL.BANNERS);
}

// join with us request
export async function joinWithUsRequest(data) {
    return await axios.post(URL.JOIN_WITH_US, data);
}

// get individual deal info
export async function getDealInfoRequest(dealId) {
    return await axios.get(`${URL.DEAL_INFO}/${dealId}`);
}

// insert the recently viewed deals
export async function insertRecentlyViewDealRequest(payload) {
    return await axios.post(URL.RECENTLY_VIEWED, payload);
}

// get the recently deals list
export async function getRecentlyViewDealRequest(userId) {
    return await axios.get(`${URL.RECENTLY_VIEWED}/${userId}`);
}

// user login request
export async function login(payload) {
    return await axios.post(`${URL.LOGIN}`, payload);
}

// get trending deals list
export async function getTrendingDealsRequest() {
    return await axios.get(URL.TRENDING);
}

// deals search input filter request
export async function dealSearch(value, cityId) {
    return await axios.get(`${URL.DEAL_SEARCH}?searchVal=${value}&&cityId=${cityId}`);
}

// user login request
export async function unsubscribe(payload) {
    return await axios.post(`${URL.UNSUBSCRIBE}`, payload);
}