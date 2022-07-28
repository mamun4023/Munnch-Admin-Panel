import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const AddBanner = (data)=>{
    return axios.post(`${URL}/api/v1/admin/banner/store`,data, AuthConfig)
}

export const StoreList = ()=>{
    return axios.get(`${URL}/api/v1/admin/store/list`, AuthConfig)
}

