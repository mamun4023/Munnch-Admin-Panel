import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchGrowthRequest = ()=>{
    return{
        type : Types.FETCH_GROWTH_REQUEST
    }
}

const FetchGrowthSuccess = (data)=>{
    return{
        type : Types.FETCH_GROWTH_SUCCESS,
        payload : data
    }
}

const FetchGrowthFailed = (err)=>{
    return{
        type : Types.FETCH_GROWTH_FAILED,
        payload : err
    }
}

export const FetchGrowth = (year)=>{
    return (dispatch)=>{
        dispatch(FetchGrowthRequest());
        axios.get(`${URL}/api/v1/admin/dashboard/growth-chart/${year}`, AuthConfig)
            .then(res =>{
                const response = res?.data?.data;
                // console.log(response);
                dispatch(FetchGrowthSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchGrowthFailed(err.response))
            })
    }
}