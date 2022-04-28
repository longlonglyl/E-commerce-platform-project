<template>
  <!-- 轮播图+快报组件 -->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="@/assets/carousel/carousel1.jpg" style="width: 984px;height:464px" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/carousel/carousel2.jpg" style="width: 984px;height:464px" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/carousel/carousel3.jpg" style="width: 984px;height:464px" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/carousel/carousel4.jpg" style="width: 984px;height:464px" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {
    getImg
  } from '@/api/index.js'
  import {
    nextTick,
    onBeforeMount,
    reactive,
    watch
  } from '@vue/runtime-core'
  import Swiper from 'swiper' //引入swiper构造函数
  import 'swiper/css/swiper.css' //引入swiper样式

  export default {
    setup() {
      let imgs = reactive({})
      onBeforeMount(async () => {
        //   不能直接赋值给imgs，会失去响应式
        imgs.data = await getImg(); //通过api=>index.js里面的函数拿到轮播图的信息
        //   console.log(imgs);
        if (imgs.data.code == 200) { //成功的话
          imgs.data = imgs.data.data
          // console.log(imgs.data);
        }
      })


      watch(imgs, () => { //imgs是异步获取的，所以创建swiper实例不能写在onMounted里面，会拿不到dom元素
        
        //虽然数据更新了，但是v-for可能还来不及执行，
        // nextTick可以在dom更新之后再执行里面的回调函数，这样能保证swiper实例创建时存在对应的dom元素
        nextTick(() => {
          let mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式
            autoplay: { //开启自动轮转
              delay: 2500,
              pauseOnMouseEnter: true,
            },

            // 如果需要分页器
            pagination: {
              clickable: true, //分页器可以点击
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })

      })

      return {
        imgs,
      }

    }
  }

</script>

<style lang="less" scoped>
  .list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
      height: 464px;
      padding-left: 210px;

      .center {
        box-sizing: border-box;
        width: 980px;
        height: 100%;
        padding: 5px;
        float: left;
      }
    }
  }

</style>
