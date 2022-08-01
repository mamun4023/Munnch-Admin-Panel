import axios from 'axios';
import {URL, AuthConfig } from "../../../../config/config"

export const UpdateProfileData = (data)=>{
    return axios.post(`${URL}/api/v1/admin/auth/update-profile`, data, AuthConfig)
}