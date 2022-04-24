import axios from 'axios';
import * as Types from './types';
import { URL } from 'src/config/config';
import { AuthConfig } from 'src/config/config';
import {toast} from 'material-react-toastify';

const ChangePasswordRequest = ()=>{
    return{
        type : Types.CHANGE_PASSWORD_REQUEST,
    }
}

const ChangePasswordSuccess = (data)=>{
    return{
        type : Types.CHANGE_PASSWORD_SUCCESS,
        payload : data
    }
}

const ChangePasswordFailed = (err)=>{
    return{
        type : Types.CHANGE_PASSWORD_FAILED,
        payload : err
    }
}

export const ChangePassword = (data)=>{
    return (dispatch)=>{
        dispatch(ChangePasswordRequest());
        axios.post(`${URL}/api/v1/admin/auth/change-password`, data, AuthConfig )
            .then(res =>{
                // console.log(res.data)
                const message = res.data.message;
                toast.dark(message)
                dispatch(ChangePasswordSuccess(message))   
            })
            .catch((err)=>{
                // console.log("errro message",err.response.data.message)
                const message = err.response.data.message;
                toast.error(message)
                dispatch(ChangePasswordFailed(message));
            })
    }
}