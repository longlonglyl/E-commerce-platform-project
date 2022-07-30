import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import List from '@/components/List/List.vue' //  把List注册为全局组件
import Paginator from '@/components/Paginator/Paginator.vue' // 注册分页器为全局组件
import './mock/mockServer.js' //  导入mock文件，让里面的代码执行一次，配置ajax模拟数据拦截器
import mitt from 'mitt' //  用于兄弟组件通信的插件
import VueLazyload from 'vue-lazyload' // 图片懒加载插件
// import ElementPlus from 'element-plus' //  element-plus使用按需加载的webpack配置，优化打包速度
// import 'element-plus/dist/index.css' // 这两个是elementui专门适用vue3的版本

const app = createApp(App)
app.use(store)
// app.use(ElementPlus)
app.use(router)
app.use(VueLazyload) // 图片懒加载插件
app.mount('#app')
app.component('List',List) //  注册全局组件
app.component('Paginator',Paginator) // 注册全局组件

app.config.globalProperties.$mitt = new mitt() //  挂载一个全局命令$mitt用于组件通信
//  这里的app.config.globalProperties相当于Vue2中的Vue.prototype，在Vue的原型对象上新增了一个方法
