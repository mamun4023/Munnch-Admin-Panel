import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const UpdateCuisineRequest = ()=>{
    return{
        type : Types.UPDATE_CUISINE_REQUEST
    }
}

const UpdateCuisineSuccess = (data)=>{
    return{
        type : Types.UPDATE_CUISINE_SUCCESS,
        payload : data
    }
}

const UpdateCuisineFailed = (err)=>{
    return{
        type : Types.UPDATE_CUISINE_FAILED,
        payload : err
    }
}

export const UpdateCuisine = (id, data)=>{
    return (dispatch)=>{
        dispatch(UpdateCuisineRequest());
        axios.post(`${URL}/api/v1/admin/cuisine/update/${id}`,data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response);
                dispatch(UpdateCuisineSuccess(response));
            })
            .catch((err)=>{
                const response = err.response
                dispatch(UpdateCuisineFailed(response))
            })
    }
}