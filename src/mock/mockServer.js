// 使用Mock模拟ajax请求数据
import Mock from "mockjs";
import carousel from "./images.json" //引入轮播图数据json文件
import listData from './listData.json'
import searchData from './searchData1.json'
import searchData2 from './searchData2.json'
import searchData3 from './searchData3.json'

// 当ajax请求的url是/mock/carousel，方式是get时，就会把后面的数据作为ajax响应回去
// 用来模拟ajax请求返回的数据，实际上这些数据都在本地

//获取轮播图的配置
Mock.mock('/mock/carousel', 'get' || "GET", {
  code: 200,
  data: carousel
})

//发起请求获取list的配置
Mock.mock('/mock/list', 'get' || "GET", {
  code: 200,
  data: listData
})

// //获取search列表的配置
Mock.mock('/mock/search', 'post' || "POST", function (options) {
  // console.log(options.body);  //传过来是一个对象，但是自动变成字符串了
  let obj = JSON.parse(options.body); //把传过来的字符串变成对象
  console.log('mock拿到的参数', obj);

  switch (obj.page) {
    case '1': { //如果想拿第一页的数据
      if (obj.keyword == '全部' || obj.keyword == '全部商品' || obj.keyword == '') {
        return {
          code: 200,
          data: searchData
        }
      }

      function match(keyword) {
        //转存一份searchData，不然每次跳转都会过滤里面的元素（先跳手机再跳笔记本数组就是空的了），searchData只导入一次
        let searchdata = JSON.parse(JSON.stringify(searchData));
        let arr = searchData.data.goodsList.filter((value) => {
          if(value.tmName == keyword) {
            return value.tmName == keyword
          }
          if(value.attrs == keyword) {
            return value.attrs == keyword
          }
        })
        searchdata.data.goodsList = arr //让筛选后的数组代替数据中原来的数组
        console.log(searchdata);
        return {
          code: 200,
          data: searchdata
        }
      }
      return match(obj.keyword)
    }

    case '2': {
      if (obj.keyword == '全部' || obj.keyword == '全部商品' || obj.keyword == '') {
        return {
          code: 200,
          data: searchData2
        }
      }

      function match(keyword) {
        let searchdata = JSON.parse(JSON.stringify(searchData2));
        let arr = searchData2.data.goodsList.filter((value) => {
          if(value.tmName == keyword) {
            return value.tmName == keyword
          }
          if(value.attrs == keyword) {
            return value.attrs == keyword
          }
        })
        searchdata.data.goodsList = arr //让筛选后的数组代替数据中原来的数组
        return {
          code: 200,
          data: searchdata
        }
      }
      return match(obj.keyword)
    }
    case '3': {
      if (obj.keyword == '全部' || obj.keyword == '全部商品' || obj.keyword == '') {
        return {
          code: 200,
          data: searchData3
        }
      }

      function match(keyword) {
        let searchdata = JSON.parse(JSON.stringify(searchData2));
        let arr = searchData3.data.goodsList.filter((value) => {
          if(value.tmName == keyword) {
            return value.tmName == keyword
          }
          if(value.attrs == keyword) {
            return value.attrs == keyword
          }
        })
        searchdata.data.goodsList = arr //让筛选后的数组代替数据中原来的数组
        return {
          code: 200,
          data: searchdata
        }
      }
      return match(obj.keyword)
    }
  }
})
