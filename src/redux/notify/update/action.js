import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const UpdateFoodRequest = ()=>{
    return{
        type : Types.UPDATE_FOOD_REQUEST
    }
}

const UpdateFoodSuccess = (data)=>{
    return{
        type : Types.UPDATE_FOOD_SUCCESS,
        payload : data
    }
}

const UpdateFoodFailed = (err)=>{
    return{
        type : Types.UPDATE_FOOD_FAILED,
        payload : err
    }
}

export const UpdateFood = (id, data)=>{
    return (dispatch)=>{
        dispatch(UpdateFoodRequest());
        axios.put(`${URL}/api/v1/admin/food/update/${id}`, data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                // console.log(response);
                toast.dark(response);
                dispatch(UpdateFoodSuccess(response));
            })
            .catch((err)=>{
                const response = err.response.data.errors.cuisine_name[0];
                toast.dark(response)
                dispatch(UpdateFoodFailed(err.response))
            })
    }
}