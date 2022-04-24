import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveBankRequest = ()=>{
    return{
        type : Types.REMOVE_BANK_REQUEST
    }
}

const RemoveBankSuccess = (data)=>{
    return{
        type : Types.REMOVE_BANK_SUCCESS,
        payload : data
    }
}

const RemoveBankFailed = (err)=>{
    return{
        type : Types.REMOVE_BANK_FAILED,
        payload : err
    }
}

export const RemoveBank = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveBankRequest());
        axios.delete(`${URL}/api/v1/admin/bank/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response)
                dispatch(RemoveBankSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveBankFailed(err.response))
            })
    }
}