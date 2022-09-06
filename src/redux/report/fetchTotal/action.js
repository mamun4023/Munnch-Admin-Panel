import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchTotalRequest = ()=>{
    return{
        type : Types.FETCH_TOTAL_REQUEST
    }
}

const FetchTotalSuccess = (data)=>{
    return{
        type : Types.FETCH_TOTAL_SUCCESS,
        payload : data
    }
}

const FetchTotalFailed = (err)=>{
    return{
        type : Types.FETCH_TOTAL_FAILED,
        payload : err
    }
}

export const FetchTotal = ()=>{
    return (dispatch)=>{
        dispatch(FetchTotalRequest());
        axios.get(`${URL}/api/v1/admin/dashboard`, AuthConfig)
            .then(res =>{
                const response = res?.data?.data;
                // console.log(response);
                dispatch(FetchTotalSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchTotalFailed(err.response))
            })
    }
}