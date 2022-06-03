import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchTransactionListRequest = ()=>{
    return{
        type : Types.FETCH_TRANSACTION_LIST_REQUEST
    }
}

const FetchTransactionListSuccess = (data)=>{
    return{
        type : Types.FETCH_TRANSACTION_LIST_SUCCESS,
        payload : data
    }
}

const FetchTransactionListFailed = (err)=>{
    return{
        type : Types.FETCH_TRANSACTION_LIST_FAILED,
        payload : err
    }
}

export const FetchUserTransactionList = (filterName, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchTransactionListRequest());
        axios.get(`${URL}/api/v1/admin/transactions/list?type=1&keyword${filterName}&page=${page}&limit=${limit}&order=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchTransactionListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchTransactionListFailed(err.response))
            })
    }
}