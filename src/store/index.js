import { createStore } from 'vuex'
import home from './home/homeData.js'  //引入home模块的共享数据
import search from './search/searchDate.js'  //引入home模块的共享数据

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {  //小仓库的注册在这里声明
    home,
    search,
  },
})
