import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const UpdateMenu = (id, data)=>{
    return axios.post(`${URL}/api/v1/admin/store/menu-item/update/${id}`,data, AuthConfig)
}