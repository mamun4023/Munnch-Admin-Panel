import * as Types from './types';
import axios from 'axios';
import { URL } from 'src/config/config';
import { toast } from 'material-react-toastify';

const SignInREquest  = ()=>{
    return{
        type : Types.SIGNIN_REQUEST
    }
}

const SignInSuccess = (data)=>{
    return{
        type : Types.SIGNIN_SUCCESS,
        payload : data
    }
}

const SignInFailed = (data)=>{
    return{
        type : Types.SIGNIN_FAILED,
        payload : data
    }
}

export const AdminSignIn = (data)=>{
    return (dispatch)=>{
        dispatch(SignInREquest())
        axios.post(`${URL}/api/v1/admin/login`, data)
            .then(res=>{
                localStorage.setItem('token', res.data.token);
                window.location.replace("dashboard/user") 
                dispatch(SignInSuccess(res))
            })
            .catch((err)=>{
                console.log(err)
                toast.error("Check Internet Connection !")
                dispatch(SignInFailed())
            })
    }
}