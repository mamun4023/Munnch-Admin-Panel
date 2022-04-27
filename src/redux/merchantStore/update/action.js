import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateStore = (id, data)=>{
    return axios.put(`${URL}/api/v1/admin/store/update/${id}`, data, AuthConfig)
}