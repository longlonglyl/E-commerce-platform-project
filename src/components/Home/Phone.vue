<template>
  <div class="phone_container">
    <div class="phone">
      <!-- 上层，tab -->
      <div class="tab">
        <span>手机</span>
        <a href="">查看更多</a>
      </div>
      <!-- 下层，手机列表 -->
      <div class="container">
        <!-- 左边 -->
        <span class="left" @click="pushLeft">
          <img src="@/assets/home/leftPhone.png">
        </span>
        <!-- 右边 -->
        <div class="right">
          <ul>
            <li v-for="(value,index) in goodsList.data" :key="value.id" @click="rightPush(index)">
              <img :src="value.defaultImg" alt="">
              <span class="title">{{value.title}}</span>
              <span class="price">{{value.price}}元起</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    reactive
  } from '@vue/reactivity'
  import router from '@/router'
  export default {
    setup() {
      const goodsList = reactive({})
      const LeftGood = reactive({})
      axios.get('/mock/phone').then(res => {
        LeftGood.data = res.data.data.goodsList[0]
        goodsList.data = res.data.data.goodsList.slice(1, 9);
      })

      //点击左侧图片的跳转逻辑实现
      function pushLeft() {
        router.push({
          name: 'detail',
          params: LeftGood.data.title,
          query: {
            img: LeftGood.data.defaultImg,
            price: LeftGood.data.price,
            id: LeftGood.data.id,
            attrs: LeftGood.data.attrs,
            tmName: LeftGood.data.tmName,
          }
        })
      }

      //点击右侧图片的跳转
      function rightPush(index) {
          router.push({
          name: 'detail',
          params: goodsList.data[index].title,
          query: {
            img: goodsList.data[index].defaultImg,
            price: goodsList.data[index].price,
            id: goodsList.data[index].id,
            attrs: goodsList.data[index].attrs,
            tmName: goodsList.data[index].tmName,
          }
        })
      }

      return {
        goodsList,
        LeftGood,
        pushLeft,
        rightPush
      }

    },
  }

</script>

<style lang='less' scoped>
  .phone_container {
    padding-bottom: 30px;
    background-color: whitesmoke;

    .phone {
      width: 1200px;
      height: 670px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .tab {
        display: flex;
        justify-content: space-between;

        span {
          font-size: 22px;
          font-weight: 200;
          line-height: 58px;
          color: #333;
        }

        a {
          font-size: 16px;
          line-height: 58px;
          color: #424242;
          text-decoration: none;

          &:hover {
            transition: all .4s;
            color: #FF6700;
          }
        }
      }

      .container {
        flex-grow: 1; //自动填充剩余区域
        display: flex;
        background-color: whitesmoke;

        .left {
          width: 213px;
          height: 614px;
          flex-shrink: 0; //空间不足时也不缩小
          background-color: gainsboro;

          &:hover {
            cursor: pointer;
            transition: all 0.6s;
            box-shadow: 0px 0px 20px .5px;
            transform: translateY(-2px);
          }

          img {
            width: 100%;
            height: 100%;
          }
        }

        .right {
          margin-left: 15px;
          flex-grow: 1;
          display: flex;

          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;

            li {
              width: 234px;
              height: 300px;
              display: flex;
              flex-direction: column;
              background-color: #fff;

              &:hover {
                cursor: pointer;
                transition: all 0.6s;
                box-shadow: 0px 0px 15px .1px;
                transform: translateY(-1px);
              }

              img {
                width: 160px;
                height: 160px;
                margin: 30px auto;
              }

              .title {
                font-size: 1.17em;
                margin: 0 auto;
                font-weight: 400;
                color: #333;
              }

              .price {
                text-align: center;
                color: #ff6700;
                margin-top: 10px;
                font-size: 1.17em;
              }
            }
          }
        }
      }
    }
  }

</style>
