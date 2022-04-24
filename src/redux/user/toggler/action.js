import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

// const FetchUserRequest = ()=>{
//     return{
//         type : Types.FETCH_USERS_REQUEST
//     }
// }

// const FetchUserSuccess = (data)=>{
//     return{
//         type : Types.FETCH_USERS_SUCCESS,
//         payload : data
//     }
// }

// const FetchUserFailed = (err)=>{
//     return{
//         type : Types.FETCH_USERS_FAILED,
//         payload : err
//     }
// }

export const Toggler = (id)=>{
    return ()=>{
        axios.post(`${URL}/api/v1/admin/customer/status/${id}`,{}, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response)
                
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}