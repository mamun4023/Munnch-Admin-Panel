import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveFoodRequest = ()=>{
    return{
        type : Types.REMOVE_FOOD_REQUEST
    }
}

const RemoveFoodSuccess = (data)=>{
    return{
        type : Types.REMOVE_FOOD_SUCCESS,
        payload : data
    }
}

const RemoveFoodFailed = (err)=>{
    return{
        type : Types.REMOVE_FOOD_FAILED,
        payload : err
    }
}

export const RemoveFood = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveFoodRequest());
        axios.delete(`${URL}/api/v1/admin/food/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                toast.dark(response);
                // console.log(response);
                dispatch(RemoveFoodSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveFoodFailed(err.response))
            })
    }
}