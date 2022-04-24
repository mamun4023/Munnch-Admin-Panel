import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';


export const FetchFoodTypeList = ()=>{
    return axios.get(`${URL}/api/v1/admin/food/list`, AuthConfig)
}

export const FetchCuisineTypeList = ()=>{
    return axios.get(`${URL}/api/v1/admin/cuisine/list`, AuthConfig)
}

export const CategoryList = ()=>{
    return axios.get(`${URL}/api/v1/admin/category/list`, AuthConfig)
}

