import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Search from '@/views/Search/Search.vue'
import Detail from '@/views/Detail/Detail.vue'
import ShopCar from '@/views/shopCar/ShopCar.vue'
import CarSuccess from '@/components/shopCar/CarSuccess.vue'
import nprogress from 'nprogress'  //进度条
import 'nprogress/nprogress.css'  //进度条样式

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showFooter: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/search/:keyword?:page?', //必须传递名为keyword和page的params参数,后面加'?'是表示可传可不传
    component: Search,
    name:'search',  //配置一个name，可以路由传参
    meta: {
      showFooter: true
    }
  },
  {
    path: '/detail/:goodsName?',//属性名后面配置的是params参数(一直以为是query)
    name: 'detail',
    component: Detail,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: ShopCar,
    meta: {
      showFooter:true
    },
    beforeEnter: (to, from, next) => {  //在进入购物车页面之前，要先判断是否登录（是否已经有token）
      let token = sessionStorage.getItem('token')
      if(token) {
        next();
      } else {
        router.push('/login')
      }
    }
  },
  {
    path: '/carSuccess',
    name: 'carSuccess',
    component: CarSuccess,
    meta: {
      showFooter:true
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next) => {
  nprogress.start();  //路由跳转前加载进度条
  next()
})
router.afterEach((to,from) => {
  nprogress.done();  //路由跳转完成就结束进度条
  window.scroll(0,0) //每次路由跳转以后都定位到最顶端
})

export default router
