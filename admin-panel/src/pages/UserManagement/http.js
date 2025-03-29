import { axiosRequest } from "_services/commons";
import { URL } from "config/constants";

export async function getAllUsers(searchRequestValue = '', offset=0, cityId = '') {
    let limit = 10;
    return await axiosRequest.post(`${URL.APP_USERS}?userEmail=${searchRequestValue}&limit=${limit}&offset=${offset}&cityId=${cityId}`);
}