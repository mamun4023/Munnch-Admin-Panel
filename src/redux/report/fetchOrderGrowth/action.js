import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchOrderGrowthRequest = ()=>{
    return{
        type : Types.FETCH_ORDER_GROWTH_REQUEST
    }
}

const FetchOrderGrowthSuccess = (data)=>{
    return{
        type : Types.FETCH_ORDER_GROWTH_SUCCESS,
        payload : data
    }
}

const FetchOrderGrowthFailed = (err)=>{
    return{
        type : Types.FETCH_ORDER_GROWTH_FAILED,
        payload : err
    }
}

export const FetchOrderGrowth = (year)=>{
    return (dispatch)=>{
        dispatch(FetchOrderGrowthRequest());
        axios.get(`${URL}/api/v1/admin/dashboard/order-growth-chart/${year}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchOrderGrowthSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchOrderGrowthFailed(err.response))
            })
    }
}