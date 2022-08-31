export const URL = "https://api.munchhnow.com";

// "https://api-munchh.segwitz.dev";
export const AuthConfig = {
        headers : {
            "Accept": "multipart/form-data", 
            "Authorization": 'Bearer '+ localStorage.getItem(process.env.REACT_APP_TOKEN)
        }          
    }
    