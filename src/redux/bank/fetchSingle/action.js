import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleBankRequest = ()=>{
    return{
        type : Types.FETCH_SINGLE_BANK_REQUEST
    }
}

const FetchSingleBankSuccess = (data)=>{
    return{
        type : Types.FETCH_SINGLE_BANK_SUCCESS,
        payload : data
    }
}

const FetchSingleBankFailed = (err)=>{
    return{
        type : Types.FETCH_SINGLE_BANK_FAILED,
        payload : err
    }
}

export const FetchSingleBank = (id)=>{
    return async (dispatch)=>{
        dispatch(FetchSingleBankRequest());
        axios.get(`${URL}/api/v1/admin/bank/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                dispatch(FetchSingleBankSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleBankFailed(err.response))
            })
    }
}