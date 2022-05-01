import axios from 'axios';
import {AuthConfig, URL} from '../../../config/config';
import { toast } from 'material-react-toastify';


export const StatusToggler = (id)=>{
    return ()=>{
        axios.post(`${URL}/api/v1/admin/withdraw/status/2?status=1/${id}`,{}, AuthConfig)
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