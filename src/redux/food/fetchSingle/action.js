import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleItemRequest = ()=>{
    return{
        type : Types.FETCH_FOOD_SINGLE_REQUEST
    }
}

const FetchSingleItemSuccess = (data)=>{
    return{
        type : Types.FETCH_FOOD_SINGLE_SUCCESS,
        payload : data
    }
}

const FetchSingleItemFailed = (err)=>{
    return{
        type : Types.FETCH_FOOD_SINGLE_FAILED,
        payload : err
    }
}

export const FetchSingleList = (id)=>{
    return (dispatch)=>{
        dispatch(FetchSingleItemRequest());
        axios.get(`${URL}/api/v1/admin/food/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                dispatch(FetchSingleItemSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleItemFailed(err.response))
            })
    }
}