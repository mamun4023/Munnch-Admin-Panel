import axios from 'axios';
import {AuthConfig, URL} from '../../../../config/config';

export const FetchMerchantString = ()=>{
    return axios.get(`${URL}/api/v1/admin/merchant-variable/list`, AuthConfig)
    
}