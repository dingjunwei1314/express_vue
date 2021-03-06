import axios from 'axios'

export default function(method,url,data,params,headers){
    return axios({
        method:method,   
        url:url,
        baseURL:'http://localhost:3000/',
        data:data||{},
        params:params||{},
        headers: headers||{},
        withCredentials:true
    })
}