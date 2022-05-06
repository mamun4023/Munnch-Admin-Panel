import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchOrderListRequest = ()=>{
    return{
        type : Types.FETCH_ORDER_LIST_REQUEST
    }
}

const FetchOrderListSuccess = (data)=>{
    return{
        type : Types.FETCH_ORDER_LIST_SUCCESS,
        payload : data
    }
}

const FetchOrderListFailed = (err)=>{
    return{
        type : Types.FETCH_ORDER_LIST_FAILED,
        payload : err
    }
}

export const FetchOrderList = (page, limit, order, status, filter)=>{
    return (dispatch)=>{
        dispatch(FetchOrderListRequest());
        axios.get(`${URL}/api/v1/admin/order/list?limit=${limit}&page=${page}&sortOrder=${order}&status=${status}&keyword=${filter}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.orders;
                console.log( "from action",response);
                dispatch(FetchOrderListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchOrderListFailed(err.response))
            })
    }
}