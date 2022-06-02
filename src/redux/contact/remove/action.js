import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveBannerRequest = ()=>{
    return{
        type : Types.REMOVE_BANNER_REQUEST
    }
}

const RemoveBannerSuccess = (data)=>{
    return{
        type : Types.REMOVE_BANNER_SUCCESS,
        payload : data
    }
}

const RemoveBannerFailed = (err)=>{
    return{
        type : Types.REMOVE_BANNER_FAILED,
        payload : err
    }
}

export const RemoveBanner = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveBannerRequest());
        axios.delete(`${URL}/api/v1/admin/contact-us/customer/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                toast.dark(response);
                // console.log(response);
                dispatch(RemoveBannerSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveBannerFailed(err.response))
            })
    }
}