import { axiosRequest } from "_services/commons";
import { URL } from "./../../config/constants";

export async function roleRequest(data) {
    const payload = {
        roleName: data.roleName
    }
    if(data.roleId) {
        payload.roleId = data.roleId;
        return await axiosRequest.put(URL.ROLES, payload);
    }
    else {
        return await axiosRequest.post(URL.ROLES, payload);
    }
}