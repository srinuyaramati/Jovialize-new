import { axiosRequest } from "_services/commons";
import { URL } from "./../../config/constants";

export async function dashboardCardInfo() {
    return await axiosRequest.get(URL.DASHBOARD_CARDS_INFO)    
}