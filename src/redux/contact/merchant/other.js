import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const RemoveContact = (id)=>{
    return axios.delete(`${URL}/api/v1/admin/contact-us/vendor/delete/${id}`, AuthConfig)
}