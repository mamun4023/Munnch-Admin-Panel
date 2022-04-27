import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateMerchant = (id, data)=>{
    return axios.post(`${URL}/api/v1/admin/merchant/update/${id}`,data, AuthConfig)
}