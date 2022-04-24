import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchSingleStoreRequest = ()=>{
    return{
        type : Types.FETCH_SINGLE_STORE_REQUEST
    }
}

const FetchSingleStoreSuccess = (data)=>{
    return{
        type : Types.FETCH_SINGLE_STORE_SUCCESS,
        payload : data
    }
}

const FetchSingleStoreFailed = (err)=>{
    return{
        type : Types.FETCH_SINGLE_STORE_FAILED,
        payload : err
    }
}

export const FetchSingleStore = (id)=>{
    return (dispatch)=>{
        dispatch(FetchSingleStoreRequest());
        axios.get(`${URL}/api/v1/admin/store/single/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.data;
                // console.log(response);
                dispatch(FetchSingleStoreSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchSingleStoreFailed(err.response))
            })
    }
}