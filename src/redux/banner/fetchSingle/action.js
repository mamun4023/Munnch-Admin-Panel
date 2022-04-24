import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleBannerRequest = ()=>{
    return{
        type : Types.FETCH_BANNER_SINGLE_REQUEST
    }
}

const FetchSingleBannerSuccess = (data)=>{
    return{
        type : Types.FETCH_BANNER_SINGLE_SUCCESS,
        payload : data
    }
}

const FetchSingleBannerFailed = (err)=>{
    return{
        type : Types.FETCH_BANNER_SINGLE_FAILED,
        payload : err
    }
}

export const FetchSingleBanner = (id)=>{
    return (dispatch)=>{
        dispatch(FetchSingleBannerRequest());
        axios.get(`${URL}/api/v1/admin/banner/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchSingleBannerSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleBannerFailed(err.response))
            })
    }
}