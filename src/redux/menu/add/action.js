import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const AddMenu = (data)=>{
    return axios.post(`${URL}/api/v1/admin/store/menu-item/store`,data, AuthConfig)
}