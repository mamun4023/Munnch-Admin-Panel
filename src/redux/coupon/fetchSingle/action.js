import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleCouponRequest = ()=>{
    return{
        type : Types.FETCH_COUPON_SINGLE_REQUEST
    }
}

const FetchSingleCouponSuccess = (data)=>{
    return{
        type : Types.FETCH_COUPON_SINGLE_SUCCESS,
        payload : data
    }
}

const FetchSingleCouponFailed = (err)=>{
    return{
        type : Types.FETCH_COUPON_SINGLE_FAILED,
        payload : err
    }
}

export const FetchSingleCoupon = (id)=>{
    return (dispatch)=>{
        dispatch(FetchSingleCouponRequest());
        axios.get(`${URL}/api/v1/admin/coupon/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                dispatch(FetchSingleCouponSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleCouponFailed(err.response))
            })
    }
}