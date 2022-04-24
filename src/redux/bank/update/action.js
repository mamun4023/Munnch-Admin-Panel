import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateBank = (id, data)=>{
    return axios.post(`${URL}/api/v1/admin/bank/update/${id}`,data, AuthConfig)
}