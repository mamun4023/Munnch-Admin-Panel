import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const AddMerchantRequest = ()=>{
    return{
        type : Types.ADD_MERCHANT_REQUEST
    }
}

const AddMerchantSuccess = (data)=>{
    return{
        type : Types.ADD_MERCHANT_SUCCESS,
        payload : data
    }
}

const AddMerchantFailed = (err)=>{
    return{
        type : Types.ADD_MERCHANT_FAILED,
        payload : err
    }
}

export const AddMerchant = (data)=>{
    return (dispatch)=>{
        dispatch(AddMerchantRequest());
        axios.post(`${URL}/api/v1/admin/merchant/add`,data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response)
                dispatch(AddMerchantSuccess(true));
            })
            .catch((err)=>{
                const errors = err.response.data.message;
                console.log(errors)
                toast.error(errors)
                dispatch(AddMerchantFailed(false))
            })
    }
}