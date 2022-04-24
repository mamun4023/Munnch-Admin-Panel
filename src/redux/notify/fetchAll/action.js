import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchNotificationRequest = ()=>{
    return{
        type : Types.FETCH_NOTIFICATION_REQUEST
    }
}

const FetchNotificationSuccess = (data)=>{
    return{
        type : Types.FETCH_NOTIFICATION_SUCCESS,
        payload : data
    }
}

const FetchNotificationFailed = (err)=>{
    return{
        type : Types.FETCH_NOTIFICATION_FAILED,
        payload : err
    }
}

export const FetchNotification = (search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchNotificationRequest());
        axios.get(`${URL}/api/v1/admin/notification/list?keyword=${search}&page=${page}&limit=${limit}&order=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.notifications_list;
                // console.log(response);
                dispatch(FetchNotificationSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchNotificationFailed(err.response))
            })
    }
}