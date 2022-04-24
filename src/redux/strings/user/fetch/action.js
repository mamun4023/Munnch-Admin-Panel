import axios from 'axios';
import {AuthConfig, URL} from '../../../../config/config';

export const FetchUserString = (status, search, page, limit, sortOrder)=>{
    return axios.get(`${URL}/api/v1/admin/user-variable/list`, AuthConfig)
            // .then(res =>{
            //     const response = res.data.data.user_variables_list;
            // })
        
}