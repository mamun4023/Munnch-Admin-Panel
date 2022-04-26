import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchMenuListRequest = ()=>{
    return{
        type : Types.FETCH_MENU_LIST_REQUEST
    }
}

const FetchMenutListSuccess = (data)=>{
    return{
        type : Types.FETCH_MENU_LIST_SUCCESS,
        payload : data
    }
}

const FetchMenuListFailed = (err)=>{
    return{
        type : Types.FETCH_MENU_LIST_FAILED,
        payload : err
    }
}

export const FetchMenuList = (storeId, search, page, limit, order)=>{
    return (dispatch)=>{
        dispatch(FetchMenuListRequest());
        axios.get(`${URL}/api/v1/admin/store/menu-item/list?store_id=${storeId}&keyword=${search}&page=${page}&limit=${limit}&sortOrder=${order}`, AuthConfig)
            .then(res =>{
                const response = res.data.data.menu_items;
                // console.log("data ",response);
                dispatch(FetchMenutListSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchMenuListFailed(err.response))
            })
    }
}