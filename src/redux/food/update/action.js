import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateFood = (id, data)=>{
    return axios.post(`${URL}/api/v1/admin/food/update/${id}`, data, AuthConfig)
}