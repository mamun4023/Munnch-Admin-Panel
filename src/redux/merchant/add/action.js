import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';


export const AddMerchant = (data)=>{
    return axios.post(`${URL}/api/v1/admin/merchant/add`,data, AuthConfig)
}