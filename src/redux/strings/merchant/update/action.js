import axios from 'axios';
import { toast } from 'material-react-toastify';
import {AuthConfig, URL} from '../../../../config/config';

export const UpdateString = (data)=>{
    return axios.post(`${URL}/api/v1/admin/merchant-variable/store`, data, AuthConfig)
        .then(res =>{
            const response = res.data.message;
            console.log(response);
            toast.dark(response);
        })
}