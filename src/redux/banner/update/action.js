import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateBanner = (id, data)=>{
    return axios.post(`${URL}/api/v1/admin/banner/update/${id}`, data, AuthConfig)
}

export const FetchSingleStore = (id)=>{
    return axios.get(`${URL}/api/v1/admin/merchant/single/${id}`, AuthConfig)
}