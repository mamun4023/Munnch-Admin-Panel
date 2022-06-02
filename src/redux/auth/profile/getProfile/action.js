import axios from 'axios';
import { URL, AuthConfig } from '../../../../config/config';

export const FetchProfile = ()=>{
    return axios.get(`${URL}/api/v1/admin/auth/profile`, AuthConfig)
}

export const UpdateProfileImage = (data)=>{
    return axios.post(`${URL}/api/v1/admin/auth/upload-profile-picture`, data, AuthConfig)
}


