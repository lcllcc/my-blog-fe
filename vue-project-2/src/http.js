import axios from 'axios'     //引入


let baseURL = 'http://localhost:5173/api'
 
let config = {
  baseURL: baseURL,
  timeout: 30000       //设置最大请求时间
}
const _axios = axios.create(config)
 
/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
  config => {
      //如果有需要在这里开启请求时的loading动画效果
    config.headers.Authorization = "";  //添加token,需要结合自己的实际情况添加，
    return config;
  },
  err => Promise.reject(err)
);
 
/* 请求之后的操作 */
_axios.interceptors.response.use(
  res => {
    //在这里关闭请求时的loading动画效果
    //这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
    return res;
  },
  err => {
    console.log('error', err)
    if(err.response.status == 401){
      // 未登录
      sessionStorage.removeItem('isLoggedIn');
      window.location.href = '/'
    }else{
      return Promise.reject(err);
    }
  }
);
 
//封装post,get方法,其他的自行往下加，比如put,delete
const http = {
  get(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'GET'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error.response.data)
      })
    })
  },
  post(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error.response.data)
      })
    })
  },
  delete(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'DELETE'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error.response.data)
      })
    })
  }
}


export default http
