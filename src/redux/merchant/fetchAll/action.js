import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchMerchantListRequest = ()=>{
    return{
        type : Types.FETCH_MERCHANT_LIST_REQUEST
    }
}

const FetchMerchantListSuccess = (data)=>{
    return{
        type : Types.FETCH_MERCHANT_LIST_SUCCESS,
        payload : data
    }
}

const FetchMerchantListFailed = (err)=>{
    return{
        type : Types.FETCH_MERCHANT_LIST_FAILED,
        payload : err
    }
}

export const FetchMerchantList = (status, search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchMerchantListRequest());
        axios.get(`${URL}/api/v1/admin/merchant/list?status=${status}&keyword=${search}&page=${page}&limit=${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.merchants;
                // console.log("data ",response);
                dispatch(FetchMerchantListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchMerchantListFailed(err.response))
            })
    }
}