export const SingleContact = (id)=>{
    return axios.get(`${URL}/api/v1/admin/contact-us/customer/single/${id}`, AuthConfig)
}

export const RemoveContact = (id)=>{
    return axios.get(`${URL}/api/v1/admin/contact-us/customer/delete/1/${id}`, AuthConfig)
}

export const StatusToggler = (id)=>{
    return axios.get(`${URL}/api/v1/admin/contact-us/customer/status/${id}`, AuthConfig)
}
