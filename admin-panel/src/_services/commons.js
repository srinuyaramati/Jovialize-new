import axios from "axios";
import { URL } from "config/constants";

export const axiosRequest = axios.create({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
});

export const axiosMultipartRequest = axios.create({
    headers: {
      'Content-Type': 'multipart/form-data',
    }
});

// get cities list
export async function citiesList(searchRequestValue = '') {
  return axiosRequest.get(`${URL.CITIES_LIST}?cityName=${searchRequestValue}&showActiveCities=true`);
}

// get banners list
export async function getBanners() {
  return axiosRequest.get(URL.GET_BANNERS);
}

// get roles list
export async function getRolesList() {
  return axiosRequest.get(URL.ROLES)
}