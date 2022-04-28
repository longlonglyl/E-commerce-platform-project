// 这是一个专属于home模块的vuex仓库
import { getList } from '@/api/index.js'  //引入统一配置api文件，发请求
import { reactive } from 'vue';
import store from '..';
const state = {
  list:reactive({}),
}
const mutations = {
  setList(state,obj) {  //第一个参数是state，第二个参数才是调用时的传参
    //state里面list属性存放列表(一定要提前在state里面定义一个空的list，不然外部拿不到list)
    state.list.data = obj.data   //不能直接给list重新赋值，会让list变成无响应的数据，要在里面新增一个data属性
    // console.log(obj.data);
  }
}

const actions = {

  //拿到表单数据的异步函数
  async asyncGetList() {
    let obj = await getList();  //getList是api index.js里包装获取列表的函数，返回值是一个Promise
    // console.log(obj);
    if (obj.code == 200) {  //获取成功
      store.commit('setList',obj);  //用mutations里的setList方法修改state里的数据
      // console.log('asyncGetList执行完了',state.list);  //查看state是不是有数据了
    } else {
      console.log('获取三级联动列表失败');
    }
  }


}

export default {
  state,
  mutations,
  actions,
}