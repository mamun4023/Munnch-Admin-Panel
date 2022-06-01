import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchTransactionRequest = ()=>{
    return{
        type : Types.FETCH_TRANSACTION_REQUEST
    }
}

const FetchTransactionSuccess = (data)=>{
    return{
        type : Types.FETCH_TRANSACTION_SUCCESS,
        payload : data
    }
}

const FetchTransactionFailed = (err)=>{
    return{
        type : Types.FETCH_TRANSACTION_FAILED,
        payload : err
    }
}

export const FetchTransactionList = (userType, search, page, limit, sortOrder)=>{
    return (dispatch)=>{
        dispatch(FetchTransactionRequest());
        axios.get(`${URL}/api/v1/admin/transactions/list?type=${userType}&keyword=${search}&page=${page}&limit=${limit}&sortOrder=${sortOrder}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                console.log(response);
                dispatch(FetchTransactionSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchTransactionFailed(err.response))
            })
    }
}