<template>
  <div class="swiper-container">
    <!-- 轮播图，写到这里发现node数据处理没写好，如果把small_img放在一个数组里传过来就可以v-for渲染了 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(value) in img" :key="value">
        <img :src="value" @mouseenter="sendImg($event)" @mouseleave="showOriginImg">
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import {
    computed,
    onMounted,
    reactive
  } from '@vue/runtime-core'
  import {
    getCurrentInstance
  } from 'vue' //获取当前组件实例，因为setup执行的时候组件实例还没有创建

  export default {

    name: "ImageList",
    props: ['goodsDetail'],

    setup(props) {

      let {
        proxy
      } = getCurrentInstance()
      let img = computed(() => { //在这里用reactive响应式有时候会失效
        return [props.goodsDetail.small_img, props.goodsDetail.small_img2]
      })


      //轮播图的配置
      onMounted(() => {
        new Swiper('.swiper-container', {
          // slidesPerView: 6, //一页轮播图最多显示几个图片（前提是轮播图容器能放得下）
          slidesPerGroup: 1, //每一次切换图片的个数
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      })

      //鼠标进入轮播小图触发，通知兄弟组件换图片
      function sendImg(e) {
        let imgUrl = e.target.getAttribute('src') //获取元素身上的src属性
        proxy.$mitt.emit('sendImg', imgUrl)
      }

      //鼠标离开轮播图时触发，通知父组件换回原来的图片
      function showOriginImg() {
        proxy.$mitt.emit('showOriginImg')
      }

      return {
        sendImg,
        showOriginImg,
        img
      }
    }
  }

</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        float: left;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;

      &::after {
        font-size: 12px;
      }
    }
  }

</style>
