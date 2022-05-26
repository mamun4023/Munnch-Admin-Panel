import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const FetchSingleStore = (id)=>{
    return axios.get(`${URL}/api/v1/admin/store/single/${id}`, AuthConfig)
}