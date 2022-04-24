import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveCouponRequest = ()=>{
    return{
        type : Types.REMOVE_COUPON_REQUEST
    }
}

const RemoveCouponSuccess = (data)=>{
    return{
        type : Types.REMOVE_COUPON_SUCCESS,
        payload : data
    }
}

const RemoveCouponFailed = (err)=>{
    return{
        type : Types.REMOVE_COUPON_FAILED,
        payload : err
    }
}

export const RemoveCoupon = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveCouponRequest());
        axios.delete(`${URL}/api/v1/admin/coupon/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                toast.dark(response);
                // console.log(response);
                dispatch(RemoveCouponSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveCouponFailed(err.response))
            })
    }
}