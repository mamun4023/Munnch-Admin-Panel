import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateCoupon = (id, data)=>{
    return  axios.put(`${URL}/api/v1/admin/coupon/update/${id}`, data, AuthConfig)
}