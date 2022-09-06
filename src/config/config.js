export const URL =  "https://api.munchhnow.com"

// production api "https://api-munchh.segwitz.dev"
// development api  "https://api.munchhnow.com"
export const AuthConfig = {
        headers : {
            "Accept": "multipart/form-data", 
            "Authorization": 'Bearer '+ localStorage.getItem(process.env.REACT_APP_TOKEN)
        }          
    }
    