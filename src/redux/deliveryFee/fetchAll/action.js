import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchDeliveryFeeListRequest = ()=>{
    return{
        type : Types.FETCH_DELIVERY_FEE_LIST_REQUEST
    }
}

const FetchDeliveryFeeListSuccess = (data)=>{
    return{
        type : Types.FETCH_DELIVERY_FEE_LIST_SUCCESS,
        payload : data
    }
}

const FetchDeliveryFeeListFailed = (err)=>{
    return{
        type : Types.FETCH_DELIVERY_FEE_LIST_FAILED,
        payload : err
    }
}

export const DeliveryFeeList = (filter, page, rowsPerPage, order)=>{
    return (dispatch)=>{
        dispatch(FetchDeliveryFeeListRequest());
        axios.get(`${URL}/api/v1/admin/delivery-fee/list?limit= ${rowsPerPage}&keyword=${filter}&page=${page}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.delivery_fees_list;
                // console.log(response);
                dispatch(FetchDeliveryFeeListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchDeliveryFeeListFailed(err.response))
            })
    }
}