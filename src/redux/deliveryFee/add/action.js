import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const AddDeliveryFee = (data)=>{
    return axios.post(`${URL}/api/v1/admin/delivery-fee/store`,data, AuthConfig)
}