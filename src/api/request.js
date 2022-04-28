// 封装自己的axios

// 1.导入axios
import store from '@/store'
import axios from 'axios'
import nprogress from 'nprogress'  //进度条效果 第三方插件
import 'nprogress/nprogress.css'  //引入进度条的样式

// 2.创建axios实例
const requests = axios.create({
  baseURL: 'http://39.98.123.211',   //自动添加在最前面的url字段，每次调用requests就不用写完整地址
  timeout: 2000,  //最长请求时间
})

// 3.为实例配置拦截器
// 请求拦截
requests.interceptors.request.use( config => {
  nprogress.start()  //发请求前开始加载进度条
  console.log('发起请求');
  return config
}, err => {
  console.log('请求拦截器拦截到错误',err);
})

//响应拦截
requests.interceptors.response.use( res => {
  if(res.status == 200) {
    if(res.data.code == 201) {
      console.log('拦截器发现请求失败',res.data);
    }
  }
  nprogress.done()  //收到响应前结束进度条
  return res.data
}
,err => {
  console.log('响应拦截器发现失败',err);
})

// 4.向外暴露实例
export default requests