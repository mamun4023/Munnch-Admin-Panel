import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const UpdateMerchantRequest = ()=>{
    return{
        type : Types.UPDATE_MERCHANT_REQUEST
    }
}

const UpdateMerchantSuccess = (data)=>{
    return{
        type : Types.UPDATE_MERCHANT_SUCCESS,
        payload : data
    }
}

const UpdateMerchantFailed = (err)=>{
    return{
        type : Types.UPDATE_MERCHANT_FAILED,
        payload : err
    }
}

export const UpdateMerchant = (id, data)=>{
    return async (dispatch)=>{
        dispatch(UpdateMerchantRequest());
        axios.post(`${URL}/api/v1/admin/merchant/update/${id}`,data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response);
                dispatch(UpdateMerchantSuccess(true));
            })
            .catch((err)=>{
                const response = err.response.data.message;
                toast.error(response)
                console.log(response)
                dispatch(UpdateMerchantFailed(false))
            })
    }
}