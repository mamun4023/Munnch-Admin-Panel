import axios from 'axios';
import * as Types from './types';
import { URL, AuthConfig } from '../../../../config/config';

const GetProfileRequest = ()=>{
    return{
        type : Types.GET_PROFILE_REQUEST,
    } 
}

const GetProfileSuccess = (data)=>{
    return{
        type : Types.GET_PROFILE_SUCCESS,
        payload : data
    }
}

const GetProfileFailed = (err)=>{
    return{
        type : Types.GET_PROFILE_FAILED,
        payload : err
    }
}

export const FetchProfile = ()=>{
    return (dispatch)=>{
        dispatch(GetProfileRequest());
        axios.get(`${URL}/api/v1/admin/auth/profile`, AuthConfig)
            .then(res =>{
                console.log("fetched Data", res.data.data)
                // const data = res.data.data;
                dispatch(GetProfileSuccess(res.data.data))
            })
            .catch(()=>{
                dispatch(GetProfileFailed())
            })
    }
}