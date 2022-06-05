//这个模块对api进行统一管理
//尚硅谷的接口太不稳定了，所以自己存了一份成功的返回数据放在mock里，然后请求本地mock数据
import requests from "./request";  //requests是用来请求尚硅谷接口数据的axios配置
import getMock from "./get(Mock).js" //getMock是用来请求本地mock数据的axios配置
import axios from "axios";

//向外暴露获取三级联动列表的请求  get  无参数(Mock)
export const getList = () => {
  return getMock({
    method: 'get',
    url: '/list'
  })
}

//向外暴露获取轮播图列表的请求 get 无参数(Mock)
export const getImg = () => {
  return getMock({
    method: 'get',
    url: '/carousel'
  })
}

//搜索商品的请求 post 有参数
export const searchGoods = (query) => {  //调用这个请求时要传参（参数是要筛选的内容）
  return getMock({
    method: 'post',
    url: '/search',
    //虽然所有参数都是可选，但是如果不要参数就必须要传一个空对象，不然会失败
    data: query,
  })
  // ！！！注意，如果这里写了.then()的话，在外面调用这个函数，用await就拿不到返回的数据了
}

//向node发送post请求（检查用户名是否存在）
export const postNode = (query) => {
  return axios ({
    method: 'post',
    url: 'http://127.0.0.1/register/checkusername',
    // data: JSON.parse(JSON.stringify({username: query}))  
    //query是一个对象，但是data要传的数据是一个json格式的字符串（键和值都要用双引号包住）
    //我真的服了，vue会自动去除变量名前面的引号，什么傻逼啊，想写个json格式都写不了
    params: {username: query}
  })
}

//发送post请求，注册新用户
export const registerUser = (query) => {
  return axios ({
    method: 'post',
    url: 'http://127.0.0.1/register',
    params: query   //这里的query应该传过来一个对象，包含用户名和密码
  })
}

//发送post请求，用户登录
export const userLogin = (query) => {
  return axios ({
    method: 'post',
    url: 'http://127.0.0.1/login',
    params: query  //这里的query应该传过来一个对象，包含用户名和密码
  })
}