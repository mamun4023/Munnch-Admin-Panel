import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const UpdateStoreRequest = ()=>{
    return{
        type : Types.UPDATE_STORE_REQUEST
    }
}

const UpdateStoreSuccess = (data)=>{
    return{
        type : Types.UPDATE_STORE_SUCCESS,
        payload : data
    }
}

const UpdateStoreFailed = (err)=>{
    return{
        type : Types.UPDATE_STORE_FAILED,
        payload : err
    }
}

export const UpdateStore = (id, data)=>{
    return (dispatch)=>{
        dispatch(UpdateStoreRequest());
        axios.put(`${URL}/api/v1/admin/store/update/${id}`, data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                // console.log(response);
                toast.dark(response);
                dispatch(UpdateStoreSuccess(response));
            })
            .catch((err)=>{
                const response = err.response.data.errors.cuisine_name[0];
                toast.dark(response)
                dispatch(UpdateStoreFailed(err.response))
            })
    }
}