import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const UpdateMenuRequest = ()=>{
    return{
        type : Types.UPDATE_MENU_REQUEST
    }
}

const UpdateMenuSuccess = (data)=>{
    return{
        type : Types.UPDATE_MENU_SUCCESS,
        payload : data
    }
}

const UpdateMenuFailed = (err)=>{
    return{
        type : Types.UPDATE_MENU_FAILED,
        payload : err
    }
}

export const UpdateMenu = (id, data)=>{
    return async (dispatch)=>{
        dispatch(UpdateMenuRequest());
        axios.post(`${URL}/api/v1/admin/store/menu-item/update/${id}`,data, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response);
                dispatch(UpdateMenuSuccess(true));
            })
            .catch((err)=>{
                const response = err.response.data.message;
                toast.error(response)
                console.log(response)
                dispatch(UpdateMenuFailed(false))
            })
    }
}