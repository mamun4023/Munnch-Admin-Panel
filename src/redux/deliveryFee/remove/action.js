import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveRequest = ()=>{
    return{
        type : Types.REMOVE_REQUEST
    }
}

const RemoveSuccess = (data)=>{
    return{
        type : Types.REMOVE_SUCCESS,
        payload : data
    }
}

const RemoveFailed = (err)=>{
    return{
        type : Types.REMOVE_FAILED,
        payload : err
    }
}

export const RemoveDeliveryFee = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveRequest());
        axios.delete(`${URL}/api/v1/admin/delivery-fee/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                toast.dark(response);
                // console.log(response);
                dispatch(RemoveSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveFailed(err.response))
            })
    }
}