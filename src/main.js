import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import List from '@/components/List/List.vue'  //把List注册为全局组件
import Paginator from '@/components/Paginator/Paginator.vue' //注册分页器为全局组件
import './mock/mockServer.js'  //导入mock文件，让里面的代码执行一次，配置ajax模拟数据拦截器


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.component('List',List)  //注册全局组件
app.component('Paginator',Paginator)  //注册全局组件
