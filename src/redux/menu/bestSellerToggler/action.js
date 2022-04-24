import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

export const BestSellerToggler = (id)=>{
    return ()=>{
        axios.post(`${URL}/api/v1/admin/store/menu-item/bestseller/${id}`,{}, AuthConfig)
            .then(res =>{
                const response = res.data.message;
                console.log(response);
                toast.dark(response)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}