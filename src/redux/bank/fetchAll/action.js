import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchBankListRequest = ()=>{
    return{
        type : Types.FETCH_BANK_LIST_REQUEST
    }
}

const FetchBanktListSuccess = (data)=>{
    return{
        type : Types.FETCH_BANK_LIST_SUCCESS,
        payload : data
    }
}

const FetchBankListFailed = (err)=>{
    return{
        type : Types.FETCH_BANK_LIST_FAILED,
        payload : err
    }
}

export const FetchBankList = (status, filter, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchBankListRequest());
        axios.get(`${URL}/api/v1/admin/bank/list?is_enabled=${status}&keyword=${filter}&page=${page}&limit= ${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.bank_list;
                // console.log("data ",response);
                dispatch(FetchBanktListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchBankListFailed(err.response))
            })
    }
}