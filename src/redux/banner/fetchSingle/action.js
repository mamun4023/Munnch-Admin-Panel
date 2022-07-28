import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const FetchSingleBanner = (id)=>{
    return axios.get(`${URL}/api/v1/admin/banner/single/${id}`, AuthConfig)
}