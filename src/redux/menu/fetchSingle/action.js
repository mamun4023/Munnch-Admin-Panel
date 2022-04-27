import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const FetchSingleMenu = (id)=>{
    return axios.get(`${URL}/api/v1/admin/store/menu-item/single/${id}`, AuthConfig)
}