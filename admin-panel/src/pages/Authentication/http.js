import { URL } from "../../config/constants";
import { axiosRequest } from "_services/commons";

export async function login(payload) {
    return await axiosRequest.post(URL.LOGIN, payload); 
}

export async function forgotPassword(payload) {
    return await axiosRequest.post(URL.FORGOT_PASSWORD, payload);
}

export async function resetPassword(payload) {
    return await axiosRequest.post(URL.RESET_PASSWORD, payload);
}
