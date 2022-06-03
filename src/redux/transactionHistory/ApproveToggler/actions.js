import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';


export const MerchantStatusToggler = (id)=>{
    return ()=>{
        axios.post(`${URL}/api/v1/admin/withdraw/status/${id}`,{}, AuthConfig)
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


export const UserStatusToggler = (id)=>{
    return ()=>{
        axios.post(`${URL}/api/v1/admin/withdraw/customer/status/${id}`,{}, AuthConfig)
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