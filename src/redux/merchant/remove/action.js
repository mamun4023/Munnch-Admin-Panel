import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveMerchantRequest = ()=>{
    return{
        type : Types.REMOVE_MERCHANT_REQUEST
    }
}

const RemoveMerchantSuccess = (data)=>{
    return{
        type : Types.REMOVE_MERCHANT_SUCCESS,
        payload : data
    }
}

const RemoveMerchantFailed = (err)=>{
    return{
        type : Types.REMOVE_MERCHANT_FAILED,
        payload : err
    }
}

export const RemoveMerchant = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveMerchantRequest());
        axios.delete(`${URL}/api/v1/admin/merchant/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response)
                dispatch(RemoveMerchantSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveMerchantFailed(err.response))
            })
    }
}