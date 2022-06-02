import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchContactListRequest = ()=>{
    return{
        type : Types.FETCH_CONTACT_LIST_REQUEST
    }
}

const FetchContactListSuccess = (data)=>{
    return{
        type : Types.FETCH_CONTACT_LIST_SUCCESS,
        payload : data
    }
}

const FetchContactListFailed = (err)=>{
    return{
        type : Types.FETCH_CONTACT_LIST_FAILED,
        payload : err
    }
}

export const FetchContactList = (status,search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchContactListRequest());
        axios.get(`${URL}/api/v1/admin/contact-us/customer/list?status=${status}&keyword=${search}&page=${page}&limit=${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchContactListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchContactListFailed(err.response))
            })
    }
}