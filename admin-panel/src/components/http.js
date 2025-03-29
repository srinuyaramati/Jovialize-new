import { URL } from "../config/constants";
import axios from "axios";

const axiosRequest = axios.create({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
});

export async function logoutFun() {
    try {
        return await axiosRequest.get(URL.LOGOUT);
    }
    catch(e) {
        return new Error(e)
    }
}