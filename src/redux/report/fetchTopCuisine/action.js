import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';

const FetchTopCuisineRequest = ()=>{
    return{
        type : Types.FETCH_TOP_CUISINE_REQUEST
    }
}

const FetchTopCuisineSuccess = (data)=>{
    return{
        type : Types.FETCH_TOP_CUISINE_SUCCESS,
        payload : data
    }
}

const FetchTopCuisineFailed = (err)=>{
    return{
        type : Types.FETCH_TOP_CUISINE_FAILED,
        payload : err
    }
}

export const FetchTopCuisine = ()=>{
    return (dispatch)=>{
        dispatch(FetchTopCuisineRequest());
        axios.get(`${URL}/api/v1/admin/dashboard/pie-chart`, AuthConfig)
            .then(res =>{
                const response = res?.data?.data;
                // console.log(response);
                dispatch(FetchTopCuisineSuccess(response));
            })
            .catch((err)=>{
                dispatch(FetchTopCuisineFailed(err.response))
            })
    }
}