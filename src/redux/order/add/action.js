import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const AddFood = (data)=>{
    return axios.post(`${URL}/api/v1/admin/food/store`,data, AuthConfig)
}