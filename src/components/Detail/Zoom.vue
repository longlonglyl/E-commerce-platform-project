<template>
  <div class="spec-preview">
    <img :src="img.data"/>
    <div class="event" @mousemove="moveBig($event)"></div>
    <div class="big">
      <img :src="img.data" id="bigImg"/>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import router from '@/router';
import { getCurrentInstance, reactive } from 'vue'
  export default {
    name: "Zoom",
    setup() {
      let { proxy } = getCurrentInstance()

      let originImg = reactive({data: router.currentRoute.value.query.img})
      let img = reactive({data: router.currentRoute.value.query.img})
      
      proxy.$mitt.on('sendImg',(res) => {  //接收到轮播图组件传过来的小图片，用来替代大图片
        img.data = res
      })

      //换回原来的图片
      proxy.$mitt.on('showOriginImg',(res) => {  //鼠标离开小图以后，触发事件通知换成原图
      showOriginImg()
      })

      function showOriginImg() {
        img.data = originImg.data
      }

      function moveBig(e) {
        let mask = document.querySelector('.mask')
        let bigImg = document.querySelector('#bigImg')
        if (e.pageY -290 >= 0 && e.pageY -290 <=200) {
          mask.style.top = e.pageY -290 + 'px'
          bigImg.style.top = -(e.pageY -290) * 2 + 'px'
        }
        if (e.pageX -260 >= 0 && e.pageX -260 <=200) {
          mask.style.left = e.pageX -260 + 'px'
          bigImg.style.left = -(e.pageX -260) * 2 + 'px'
        }
      }

      return {
        img,
        showOriginImg,
        moveBig
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>