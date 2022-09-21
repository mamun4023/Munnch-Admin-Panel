import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';

export const CSVList = (status, startDate, endDate)=>{
    // let url = `${URL}/api/v1/admin/merchant/list?status=1&start_date=2022-8-10&end_date=2022-10-10`
    let url = `${URL}/api/v1/admin/merchant/list?status=${status}&start_date=${startDate}&end_date=${endDate}`
    return axios.get(url, AuthConfig)
}