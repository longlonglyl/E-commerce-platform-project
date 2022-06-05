<template>
  <!-- 头部组件 -->

  <Head></Head>

  <!-- 这里根据不同的Url地址，展示不同的路由 -->
  <router-view></router-view>
  <!-- {{thisPath}} -->

  <!-- 底部组件 -->
  <!-- Footer在Home、Search路由中显示，在Login、Register中隐藏 -->
  <Footer v-if="isShowFooter"></Footer>
</template>

<script>
  import Head from '@/components/Head/Head.vue'
  import Footer from '@/components/Footer/Footer.vue'
  import router from './router'
  import {
    computed, onMounted,
  } from '@vue/runtime-core'
import store from './store'


  export default {
    components: {
      Head,
      Footer
    },
    setup() {
      let isShowFooter = computed(() => { //是否展示Footer的变量
        return router.currentRoute.value.meta.showFooter
      })
      onMounted(() => {
        store.dispatch('asyncGetList')  //发起vuex里封装的axios拿到数组，存放在vuex里
      })

      return {
        isShowFooter,
      }
    }
  }

</script>

<style lang="less">
</style>
