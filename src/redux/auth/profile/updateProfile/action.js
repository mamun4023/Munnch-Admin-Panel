import axios from 'axios';
import * as Types from './Types';
import {URL, AuthConfig } from "../../../../config/config"
import { toast } from 'material-react-toastify';


const UpdateProfileRequest = ()=>{
    return{
        type : Types.UPDATE_PROFILE_REQUEST,
    }
}

const UpdateProfileSuccess = (data)=>{
    return{
        type : Types.UPDATE_PROFILE_SUCCESS,
        payload : data
    }
}

const UpdateProfileFailed = (err)=>{
    return{
        type : Types.UPDATE_PROFILE_FAILED,
        payload : err
    }
}

export const UpdateProfileData = (data)=>{
    return (dispatch)=>{
        dispatch(UpdateProfileRequest());
        axios.post(`${URL}/api/v1/admin/auth/update-profile`, data, AuthConfig)
            .then(res =>{
                const message = res.data.message;
                toast.dark(message);
                dispatch(UpdateProfileSuccess(message))   
            })
            .catch((err)=>{
                const message = err.response.data.message;
                toast.error(message)
                dispatch(UpdateProfileFailed(message));
            })
    }
}