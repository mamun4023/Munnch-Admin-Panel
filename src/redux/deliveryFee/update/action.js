import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateDeliveryFee = (id, data)=>{
    return axios.put(`${URL}/api/v1/admin/delivery-fee/update/${id}`, data, AuthConfig)
}