import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchCuisineListRequest = ()=>{
    return{
        type : Types.FETCH_CUISINE_LIST_REQUEST
    }
}

const FetchCuisineListSuccess = (data)=>{
    return{
        type : Types.FETCH_CUISINE_LIST_SUCCESS,
        payload : data
    }
}

const FetchCuisineListFailed = (err)=>{
    return{
        type : Types.FETCH_CUISINE_LIST_FAILED,
        payload : err
    }
}

export const FetchCuisineList = (search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchCuisineListRequest());
        axios.get(`${URL}/api/v1/admin/cuisine/list?keyword=${search}&page=${page}&limit=${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.cuisine_list;
                dispatch(FetchCuisineListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchCuisineListFailed(err.response))
            })
    }
}