import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchCouponListRequest = ()=>{
    return{
        type : Types.FETCH_COUPON_LIST_REQUEST
    }
}

const FetchCouponListSuccess = (data)=>{
    return{
        type : Types.FETCH_COUPON_LIST_SUCCESS,
        payload : data
    }
}

const FetchCouponListFailed = (err)=>{
    return{
        type : Types.FETCH_COUPON_LIST_FAILED,
        payload : err
    }
}

export const FetchCouponList = (status, filter, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchCouponListRequest());
        axios.get(`${URL}/api/v1/admin/coupon/list?status=${status}&keyword=${filter}&page=${page}&limit=${limit}&sortBy=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.coupons_list;
                dispatch(FetchCouponListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchCouponListFailed(err.response))
            })
    }
}