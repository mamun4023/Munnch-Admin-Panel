import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const UpdateBannerRequest = ()=>{
    return{
        type : Types.UPDATE_BANNER_REQUEST
    }
}

const UpdateBannerSuccess = (data)=>{
    return{
        type : Types.UPDATE_BANNER_SUCCESS,
        payload : data
    }
}

const UpdateBannerFailed = (err)=>{
    return{
        type : Types.UPDATE_BANNER_FAILED,
        payload : err
    }
}

export const UpdateBanner = (id, data)=>{
    return (dispatch)=>{
        dispatch(UpdateBannerRequest());
        axios.post(`${URL}/api/v1/admin/banner/update/${id}`, data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                // console.log(response);
                toast.dark(response);
                dispatch(UpdateBannerSuccess(response));
            })
            .catch((err)=>{
                const response = err.response.data.errors
                toast.dark(response)
                dispatch(UpdateBannerFailed(response))
            })
    }
}