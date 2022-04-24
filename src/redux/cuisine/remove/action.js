import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveCuisineRequest = ()=>{
    return{
        type : Types.REMOVE_CUISINE_REQUEST
    }
}

const RemoveCuisineSuccess = (data)=>{
    return{
        type : Types.REMOVE_CUISINE_SUCCESS,
        payload : data
    }
}

const RemoveCuisineFailed = (err)=>{
    return{
        type : Types.REMOVE_CUISINE_FAILED,
        payload : err
    }
}

export const RemoveCuisine = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveCuisineRequest());
        axios.delete(`${URL}/api/v1/admin/cuisine/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response)
                dispatch(RemoveCuisineSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveCuisineFailed(err.response))
            })
    }
}