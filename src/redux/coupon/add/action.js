import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const AddCoupon = (data)=>{
    return axios.post(`${URL}/api/v1/admin/coupon/store`,data, AuthConfig)
}