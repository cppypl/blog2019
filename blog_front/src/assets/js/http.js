import axios from "axios";
import router from "@/router/router"
import { Message } from 'element-ui';
const http = axios.create({
  baseURL: "http://localhost:8000/",
  // baseURL: "http://120.24.37.75:8000/",

  // headers: { 'Authorization': "Bearer " +token }
});

// 添加请求拦截器
http.interceptors.request.use(config=> {
    let token = localStorage.getItem("token");

    config.headers.Authorization = "Bearer " + token;
    // 在发送请求之前做些什么
    return config;
  },
  error=>{
    // 对请求错误做些什么
    
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(response=>{

  
    // 对响应数据做点什么
    return response;
  },
  error=>{
    // 对响应错误做点什么
    console.log(error.response);
    
    if(error.response.status===401){
      Message.error(error.response.data.msg)
      // location.href="/login"
      localStorage.removeItem('token')
      router.push('/login')
    }

    return Promise.reject(error);
  }
);

export default http;
