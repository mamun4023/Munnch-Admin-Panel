import axios from 'axios';
import {AuthConfig, URL} from '../../../../config/config';

export const FetchUserString = ()=>{
    return axios.get(`${URL}/api/v1/admin/user-variable/list`, AuthConfig)     
}