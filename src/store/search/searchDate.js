import { getCurrentInstance, reactive, ref, toRaw } from "vue"
import { searchGoods } from '@/api/index.js'  //获取搜索列表的封装axios函数
import store from ".."

//刚进来忘记vuex怎么初始化了。。。
const state = {
  searchList: reactive({}),
  pageMax:reactive({})
}
const mutations = {
  //！！注意如果mutations里面的方法要传参的话，第一个参数是state，第二个才是真正的参数
  setSearch(state,obj) {  //命名不能和其他仓库的mutations冲突
    state.searchList.data = obj.data  //商品数组
    state.pageMax.data = obj.data.pageMax //最大页数
  },
  clearSearch(state) {
    state.searchList.data = []
    // console.log(state.searchList.data);
  }
}
const actions = {
  async getSearchList(commit,query) {  //又犯错了，这里的参数第一个没写commit
    let searchMsg = await searchGoods(query);
    if(searchMsg) {
      console.log('actions的获取商品列表成功',query,searchMsg);
      store.commit('setSearch',searchMsg)
    } else {
      console.log('获取searMsg失败');
      store.commit('clearSearch')
    }

    // console.log(state.searchList.data); //看看state数据更新了没有
  }
}

const getters = {
  attrsList(){
    return state.searchList.data.data.attrsList
  },
  goodsList(){
    return state.searchList.data.data.goodsList
  },
  trademarkList(){
    return state.searchList.data.data.trademarkList
  },
}

export default  {
  state,
  mutations,
  actions,
  getters
}