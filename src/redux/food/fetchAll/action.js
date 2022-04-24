import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchFoodListRequest = ()=>{
    return{
        type : Types.FETCH_FOOD_LIST_REQUEST
    }
}

const FetchFoodListSuccess = (data)=>{
    return{
        type : Types.FETCH_FOOD_LIST_SUCCESS,
        payload : data
    }
}

const FetchFoodListFailed = (err)=>{
    return{
        type : Types.FETCH_FOOD_LIST_FAILED,
        payload : err
    }
}

export const FetchFoodList = (search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchFoodListRequest());
        axios.get(`${URL}/api/v1/admin/food/list?keyword=${search}&page=${page}&limit=${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.food_list;
                // console.log(response);
                dispatch(FetchFoodListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchFoodListFailed(err.response))
            })
    }
}