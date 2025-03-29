import { axiosRequest } from "_services/commons";
import { URL } from "./../../config/constants";

export async function cityRequest(data) {
    const payload = {
        cityName: data.cityName,
        status: data.status
    }
    if(data.cityId) {
        payload.cityId = data.cityId;
        return await axiosRequest.put(URL.CITY, payload);
    }
    else {
        return await axiosRequest.post(URL.CITY, payload);
    }
}