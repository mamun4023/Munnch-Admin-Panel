import axios from 'axios';
import * as Types from './types';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

const RemoveMenuRequest = ()=>{
    return{
        type : Types.REMOVE_MENU_REQUEST
    }
}

const RemoveMenuSuccess = (data)=>{
    return{
        type : Types.REMOVE_MENU_SUCCESS,
        payload : data
    }
}

const RemoveMenuFailed = (err)=>{
    return{
        type : Types.REMOVE_MENU_FAILED,
        payload : err
    }
}

export const RemoveMenu = (id)=>{
    return (dispatch)=>{
        dispatch(RemoveMenuRequest());
        axios.delete(`${URL}/api/v1/admin/store/menu-item/delete/${id}`, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                toast.dark(response)
                dispatch(RemoveMenuSuccess(response));
            })
            .catch((err)=>{
                dispatch(RemoveMenuFailed(err.response))
            })
    }
}