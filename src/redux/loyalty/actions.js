import axios from 'axios';
import {AuthConfig, URL} from "../../config/config";

export const GetLoyaltyImageList = ()=>{
    return axios.get(`${URL}/api/v1/admin/loyalty-level-image/list`, AuthConfig)
}

export const StoreImage = (data)=>{
    return axios.post(`${URL}/api/v1/admin/loyalty-level-image/store`,data, AuthConfig)
}


