import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleRequest = ()=>{
    return{
        type : Types.FETCH_SINGLE_REQUEST
    }
}

const FetchSingleSuccess = (data)=>{
    return{
        type : Types.FETCH_SINGLE_SUCCESS,
        payload : data
    }
}

const FetchSingleFailed = (err)=>{
    return{
        type : Types.FETCH_SINGLE_FAILED,
        payload : err
    }
}

export const FetchFeeList = (id)=>{
    return (dispatch)=>{
        dispatch(FetchSingleRequest());
        axios.get(`${URL}/api/v1/admin/delivery-fee/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                dispatch(FetchSingleSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleFailed(err.response))
            })
    }
}