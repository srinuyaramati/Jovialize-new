import axios from "axios";
import { URL } from "../../config/constants";
import { axiosRequest } from "_services/commons";

export async function getAllUsers(searchRequestValue = '', offset=0) {
  let limit = 10;
  try {
    return await axiosRequest.get(`${URL.USERS}?userName=${searchRequestValue}&limit=${limit}&offset=${offset}`);
  }
  catch (e) {
    return new Error(e)
  }
}

/**
 * 
 * @param {*} payload 
 * @returns 
 */
export async function submitUserInfo(payload) {
  try {    
    if(payload.adminUserId) {
      return await axiosRequest.put(URL.USERS, payload);
    } else {
      return await axiosRequest.post(URL.USERS, payload);
    }
  }
  catch(error) {
    throw error.response.data.error.errors;
  }
}

/**
 * 
 * @param {*} userId 
 * @returns 
 */
export async function deleteUser(userId) {
  try {
    return await axios.delete(`${URL.USERS}/${userId}`, {data:{roleId: 1,deletedStatus: "1"}})
  } catch(error) {
    throw error
  }
}