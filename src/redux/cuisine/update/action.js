import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

export const UpdateCuisine = (id, data)=>{
    return axios.post(`${URL}/api/v1/admin/cuisine/update/${id}`,data, AuthConfig)    
}