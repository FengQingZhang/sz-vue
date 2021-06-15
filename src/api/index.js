import axios from 'axios'
import app from '../main'
import qs from 'qs'


// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
axios.defaults.baseURL = "http://localhost:8700";

//request拦截器,每次请求前从cookie中获取jwt，加入请求头部
axios.interceptors.request.use(
    config => {
        if (!config.url.includes("/login")) {
            let jwt = localStorage.getItem("jwt");
            config.headers['JWTHeaderName'] = jwt;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)
//是否正在刷新的标记
let isRefreshing = false;
//重试队列，每一项将是一个待执行的函数形式
let requests = []
//response拦截器
axios.interceptors.response.use(
    response => {
        const data = response.data;
        //当token过期时会触发
        if (data.msg == "token past") {
            const config = response.config;
            //判断是否正在刷新token
            if (!isRefreshing) {
                isRefreshing = true;
                return refreshToken().then(res => {
                    config.headers['JWTHeaderName'] = res.data.data;
                    localStorage.setItem("jwt",res.data.data);
                     // 已经刷新了token，将所有队列中的请求进行重试
                    requests.forEach(cb=>cb(res.data.data));
                    requests=[];
                    return axios.create(config);
                }).catch(error => {
                    window.location.href = '/';
                }).finally(()=>{
                    isRefreshing =false;
                })
            }else{
                //正在刷新token，将返回一个未执行resolve的Promise
                return new Promise((resolve)=>{
                    requests.push((token)=>{
                        config.headers['JWTHeaderName']=token;
                        resolve(axios.create(config));
                    })
                })
            }

        }
        return response;
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '请重新登录';
                    break;
                case 403:
                    error.message = "拒绝访问";
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `未知错误${error.response.status}`;

            }
        } else {
            error.message = "连接到服务器失败";
        }
        return Promise.reject(error);
    }
)
function refreshToken() {
    return axios.post("/refreshToken");
}

export default {
    post: function (url, data, config) {
        if (!data)
            data = {};
        if (!config)
            config = {};
        config.header = {};
        if (data instanceof FormData) {
            if (!config.header)
                config.header = {};
            config.header['content-type'] = 'multipart/form-data';
            return axios.post(url, data, config);
        }
        return axios.post(url, qs.stringify(data, { arrayFormat: 'repeat' }), config);
    },
    get: function (url, config) {
        if (!config)
            config = {};
        config.withCredentials = true;
        return axios.get(url, config);
    },
    put: function (url, data, config) {
        if (!data) {
            data = {};
        }
        if (!config) {
            config = {};
        }
        config.header = {}
        return axios.put(url, qs.stringify(data, { arrayFormat: 'repeat' }), config);
    }
}