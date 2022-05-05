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

export const FetchOrderList = ()=>{
    return (dispatch)=>{
        dispatch(FetchOrderListRequest());
        axios.get(`${URL}/api/v1/admin/order/list`, AuthConfig)
            .then(res =>{
                const response = res.data.data.orders;
                // console.log(response);
                dispatch(FetchOrderListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchOrderListFailed(err.response))
            })
    }
}