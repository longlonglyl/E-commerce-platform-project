// 拿到本地轮播图的api

import axios from 'axios'
import nprogress from 'nprogress'  //进度条效果 第三方插件
import 'nprogress/nprogress.css'  //引入进度条的样式

const getMock = axios.create({
  baseURL: '/mock',   //自动添加在最前面的url字段，每次调用requests就不用写完整地址
  timeout: 5000,  //最长请求时间
})

// 请求拦截
getMock.interceptors.request.use( config => {
  nprogress.start()  //发请求前开始加载进度条
  return config
}, err => {
  console.log('请求拦截到错误',err);
})

//响应拦截
getMock.interceptors.response.use( res => {
  nprogress.done()  //收到响应前结束进度条
  return res.data
}
,err => {
  console.log('Mock请求失败',err);
})

// 向外暴露实例
export default getMock