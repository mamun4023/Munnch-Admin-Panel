import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleMerchantRequest = ()=>{
    return{
        type : Types.FETCH_SINGLE_MERCHANT_REQUEST
    }
}

const FetchSingleMerchantSuccess = (data)=>{
    return{
        type : Types.FETCH_SINGLE_MERCHANT_SUCCESS,
        payload : data
    }
}

const FetchSingleMerchantFailed = (err)=>{
    return{
        type : Types.FETCH_SINGLE_MERCHANT_FAILED,
        payload : err
    }
}

export const FetchSingleMerchant = (id)=>{
    return async (dispatch)=>{
        dispatch(FetchSingleMerchantRequest());
        axios.get(`${URL}/api/v1/admin/merchant/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.merchant;
                // console.log(response);
                dispatch(FetchSingleMerchantSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleMerchantFailed(err.response))
            })
    }
}