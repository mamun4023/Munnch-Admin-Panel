import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchUserRequest = ()=>{
    return{
        type : Types.FETCH_USERS_REQUEST
    }
}

const FetchUserSuccess = (data)=>{
    return{
        type : Types.FETCH_USERS_SUCCESS,
        payload : data
    }
}

const FetchUserFailed = (err)=>{
    return{
        type : Types.FETCH_USERS_FAILED,
        payload : err
    }
}

export const FetchUserList = (status, search, page, limit, sortOrder)=>{
    return (dispatch)=>{
        dispatch(FetchUserRequest());
        axios.get(`${URL}/api/v1/admin/customer/list?status=${status}&keyword= ${search}&page=${page}&limit=${limit}&sortOrder=${sortOrder}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.customers;
                console.log(response);
                dispatch(FetchUserSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchUserFailed(err.response))
            })
    }
}