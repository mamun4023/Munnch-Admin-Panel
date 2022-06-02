import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../../config/config';

const FetchProfileRequest = ()=>{
    return{
        type : Types.FETCH_PROFILE_REQUEST
    }
}

const FetchProfileSuccess = (data)=>{
    return{
        type : Types.FETCH_PROFILE_SUCCESS,
        payload : data
    }
}

const FetchProfileFailed = (err)=>{
    return{
        type : Types.FETCH_PROFILE_FAILED,
        payload : err
    }
}

export const FetchProfileData = () =>{
    return (dispatch)=>{
        dispatch(FetchProfileRequest());
        axios.get(`${URL}/api/v1/admin/auth/profile`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log("data ",response);
                dispatch(FetchProfileSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchProfileFailed(err.response))
            })
    }
}