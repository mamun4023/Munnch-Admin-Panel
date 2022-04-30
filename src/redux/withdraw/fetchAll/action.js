import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchWithdrawalListRequest = ()=>{
    return{
        type : Types.FETCH_WITHDRAWAL_LIST_REQUEST
    }
}

const FetchWithdrawalListSuccess = (data)=>{
    return{
        type : Types.FETCH_WITHDRAWAL_LIST_SUCCESS,
        payload : data
    }
}

const FetchWithdrawalListFailed = (err)=>{
    return{
        type : Types.FETCH_WITHDRAWAL_LIST_FAILED,
        payload : err
    }
}

export const FetchWithdrawalList = (filterName, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchWithdrawalListRequest());
        axios.get(`${URL}/api/v1/admin/withdraw/list?${filterName}&page=${page}&limit =${limit}&order=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchWithdrawalListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchWithdrawalListFailed(err.response))
            })
    }
}