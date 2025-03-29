import { URL } from "./../../config/constants";
import { axiosRequest, axiosMultipartRequest } from "_services/commons";

/**
 * Get all Deals (and) search based all deals
 * @param {*} searchRequestValue 
 * @returns 
 */
export async function getAllDeals(searchRequestValue = '', offset = 0, cityId = '') {
  let limit = 10;
  const headers = {headers: { 'Authorization': sessionStorage.getItem("jovialize-token") } }; 
  return await axiosRequest.get(`${URL.DEALS}?dealTitle=${searchRequestValue}&limit=${limit}&offset=${offset}&cityId=${cityId}`, headers);
}

/**
 * Create deal
 * @param {*} payload 
 * @returns 
 */
export async function createDeal(payload) {
    payload.createdBy = sessionStorage.getItem("userId");
    payload.role = sessionStorage.getItem("role");
    return await axiosRequest.post(URL.ADD_DEALS, payload);
}

/**
 * Upload deal images
 * @param {*} payload 
 * @param {*} dealId 
 * @returns 
 */
export async function uploadImage(payload, dealId) {
    try {
        const data = new FormData();
        data.append('image', payload);
        data.append('dealId', dealId);
        data.append('imageOrder', payload.order +1);
        const result = await axiosMultipartRequest.post(URL.IMAGE_UPLOAD, data);
        return result.data;
    }
    catch(error) {
        throw error.response?.data
    }
}

/** API request for update the deal info */
export async function updateDeal(payload) {
    try {
        const result = await axiosRequest.put(URL.UPDATE_DEALS, payload);
        return result.data;
    }
    catch(error) {
        throw error.response?.data
    }
}
/**
 * get deal image's
 * @param {*} dealId 
 * @returns 
 */
export async function getDealImages(dealId) {
    return await axiosRequest.get(`${URL.GET_DEAL_IMAGES}/${dealId}`);
}

export async function deleteDeal(dealId) {
    const payload = {
        roleId: 1,
        dealId: dealId
    }
    return await axiosRequest.delete(URL.DEALS, {data: payload});
}

/**
 * Delete single or multiple deals
 * @param {*} dealIds 
 * @returns 
 */
export async function deleteMultiplsDeals(dealIds) {
    const payload = {
        roleId: 1,
        dealIds: dealIds,
        userId: sessionStorage.getItem("userId")
    }
    return await axiosRequest.post(URL.DELETE_MULTIPLE_DEALS, payload);
}

export async function getIndividualDealsdetails(dealId) {
    return await axiosRequest.get(`${URL.GET_INDIVIDUAL_DEAL}/${dealId}`);
}

export async function deleteImages(ids) {
    return await axiosRequest.post(URL.DELETE_MULTIPLE_IMAGES, {imageIndexes: ids} )
}