export const URL = "https://api-munchh.segwitz.dev";

export const AuthConfig =  {
         headers : {
            "Accept": "multipart/form-data",   //application/json
            "Authorization": 'Bearer '+ localStorage.getItem('token')
        }          
    }
    