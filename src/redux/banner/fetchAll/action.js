import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchBannerListRequest = ()=>{
    return{
        type : Types.FETCH_BANNER_LIST_REQUEST
    }
}

const FetchBannerListSuccess = (data)=>{
    return{
        type : Types.FETCH_BANNER_LIST_SUCCESS,
        payload : data
    }
}

const FetchBannerListFailed = (err)=>{
    return{
        type : Types.FETCH_BANNER_LIST_FAILED,
        payload : err
    }
}

export const FetchBannerList = (status,search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchBannerListRequest());
        axios.get(`${URL}/api/v1/admin/banner/list?is_enabled=${status}&keyword=${search}&page=${page}&limit=${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.banner_list;
                // console.log(response);
                dispatch(FetchBannerListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchBannerListFailed(err.response))
            })
    }
}