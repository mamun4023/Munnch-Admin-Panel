import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleMenuRequest = ()=>{
    return{
        type : Types.FETCH_SINGLE_MENU_REQUEST
    }
}

const FetchSingleMenuSuccess = (data)=>{
    return{
        type : Types.FETCH_SINGLE_MENU_SUCCESS,
        payload : data
    }
}

const FetchSingleMenuFailed = (err)=>{
    return{
        type : Types.FETCH_SINGLE_MENU_FAILED,
        payload : err
    }
}

export const FetchSingleMenu = (id)=>{
    return async (dispatch)=>{
        dispatch(FetchSingleMenuRequest());
        axios.get(`${URL}/api/v1/admin/store/menu-item/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchSingleMenuSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleMenuFailed(err.response))
            })
    }
}