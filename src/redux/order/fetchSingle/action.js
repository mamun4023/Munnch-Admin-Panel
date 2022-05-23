import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleOrderRequest = ()=>{
    return{
        type : Types.FETCH_SINGLE_ORDER_REQUEST
    }
}

const FetchSingleOrderSuccess = (data)=>{
    return{
        type : Types.FETCH_SINGLE_ORDER_SUCCESS,
        payload : data
    }
}

const FetchSingleOrderFailed = (err)=>{
    return{
        type : Types.FETCH_SINGLE_ORDER_FAILED,
        payload : err
    }
}

export const FetchSingleOrder = (id)=>{
    return (dispatch)=>{
        dispatch(FetchSingleOrderRequest());
        axios.get(`${URL}/api/v1/admin/order/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                console.log( "order Item data", response);
                dispatch(FetchSingleOrderSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleOrderFailed(err.response))
            })
    }
}