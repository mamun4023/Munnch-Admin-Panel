import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchOrderTimelineRequest = ()=>{
    return{
        type : Types.FETCH_ORDER_TIMELINE_REQUEST
    }
}

const FetchOrderTimelineSuccess = (data)=>{
    return{
        type : Types.FETCH_ORDER_TIMELINE_SUCCESS,
        payload : data
    }
}

const FetchOrderTimelineFailed = (err)=>{
    return{
        type : Types.FETCH_ORDER_TIMELINE_FAILED,
        payload : err
    }
}

export const FetchOrderTimeLine = ()=>{
    return (dispatch)=>{
        dispatch(FetchOrderTimelineRequest());
        axios.get(`${URL}/api/v1/admin/dashboard/order-timeline-chart`, AuthConfig)
            .then(res =>{
                const response = res?.data?.data;
                // console.log(response);
                dispatch(FetchOrderTimelineSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchOrderTimelineFailed(err.response))
            })
    }
}