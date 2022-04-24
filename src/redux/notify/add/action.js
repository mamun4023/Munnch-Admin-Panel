import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const AddNotification = (data)=>{
    return axios.post(`${URL}/api/v1/admin/notification/store`,data, AuthConfig)
}