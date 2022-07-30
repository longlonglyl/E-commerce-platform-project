<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="@/assets/home/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <div class="recommend_goods">
          <li class="banner" v-for="(value,index) in imgList" :key="value">
            <img :src="value.img" @click="goDetail(index)" />
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import {
    reactive,
    ref
  } from '@vue/reactivity';
  import router from '@/router';
  export default {
    setup() {
      let goodsList = reactive({})
      let imgList = reactive([{
          img: require("@/assets/home/phone1.jpg")
        }, //静态资源用require，直接写地址到时候拿不到
        {
          img: require("@/assets/home/phone2.jpg")
        },
        {
          img: require("@/assets/home/phone3.jpg")
        },
      ])

      // console.log(imgList);
      store.dispatch('getSearchList', {
        keyword: '手机',
        page: '1'
      }).then(() => {
        goodsList.data = store.getters.goodsList
        // console.log(goodsList);
      })

      function goDetail(index) {
        router.push({
          name: 'detail',
          params: {
            goodsName: goodsList.data[index].title
          },
          query: {
            page: '1',
            img: goodsList.data[index].defaultImg,
            price: goodsList.data[index].price,
            attrs: goodsList.data[index].attrs,
            tmName: goodsList.data[index].tmName,
            id: goodsList.data[index].id,
          }
        })
      }
      return {
        imgList,
        goDetail
      }
    }
  }

</script>

<style lang="less" scoped>
  .today-recommend {
    .py-container {
      width: 1200px;
      margin: 10px auto;

      .recommend {
        height: 165px;
        // background-color: #eaeaea;
        margin: 10px 0;
        display: flex;

        .clock {
          width: 210px;
          height: 165px;
          background-color: #5c5251;
          color: #fff;
          font-size: 18px;
          text-align: center;

          .time {
            padding: 30px 0;
          }

          h3 {
            margin: 9px 0;
            font-weight: 700;
            font-size: 18px;
            line-height: 30.06px;
          }
        }

        .recommend_goods {
          width: 975px;
          display: flex;
          background-color: #fff;
          justify-content: space-between;

          img {
            width: 304px;
          }
        }

        .banner {

          img {
            transition: all 400ms;

            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }

</style>
