import axios from 'axios';
import {AuthConfig, URL} from "../../config/config";

export const GetWithdrawData = ()=>{
    return axios.get(`${URL}/api/v1/admin/merchant-variable/find/minimum_withdraw`, AuthConfig)
}

export const GetLoyaltyData = ()=>{
    return axios.get(`${URL}/api/v1/admin/merchant-variable/find/loyalty_level`, AuthConfig)
}

export const UpdateData = (data)=>{
    return axios.post(`${URL}/api/v1/admin/merchant-variable/store`,data, AuthConfig)
}