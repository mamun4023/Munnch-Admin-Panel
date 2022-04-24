import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';

export const PopularToggler = (id)=>{
    return ()=>{
        axios.post(`${URL}/api/v1/admin/bank/popular/${id}`,{}, AuthConfig)
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