import { URL } from "./../../config/constants";
import { axiosRequest, axiosMultipartRequest } from "_services/commons";

export async function sendMails() {
    const payload = {
        createdBy: sessionStorage.getItem("userId")
    }
    return await axiosRequest.post(URL.MASS_MAILING, payload);
} 

export async function checkMassMailStatus() {
    return await axiosRequest.get(URL.MASS_MAILING);
}