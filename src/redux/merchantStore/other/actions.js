import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';


export const FetchFoodTypeList = (id)=>{
    return axios.get(`${URL}/api/v1/admin/store-food/list/${id}`, AuthConfig)
}

export const FetchCuisineTypeList = (id)=>{
    return axios.get(`${URL}/api/v1/admin/store-cuisine/list/${id}`, AuthConfig)
}


export const CategoryList = (id)=>{
    return axios.get(`${URL}/api/v1/admin/category/list?store_id=${id}`, AuthConfig)
}

