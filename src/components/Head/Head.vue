<template>
  <!-- 头部组件 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>
            <router-link to="/login" v-if="!flag" class="register">登录</router-link>
            <router-link to="/shopcar" v-if="flag" class="register">欢迎，{{username}}</router-link>
            <a @click="exit" class="register" v-if="flag">注销</a>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/shopcar">我的购物车</router-link>
          <router-link to="/home">注册会员</router-link>
          <router-link to="/home">企业采购</router-link>
          <router-link to="/home">合作招商</router-link>
          <router-link to="/home">我是商家</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="@/assets/pss.jpg" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model.trim="keywords" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  import router from '@/router';
  import {
    ref
  } from '@vue/reactivity';
  import {
    nextTick,
    watch
  } from '@vue/runtime-core';
  export default {
    setup() {
      let keywords = ref('全部商品') //搜索框的值

      const goSearch = () => { //点击搜索按钮跳转路由
        // this.$router.push('/search') //vue3不能用这种方法编程式跳转路由
        if (keywords.value !== '') {
          router.replace({
            name: 'search',
            query: {
              keyword: keywords.value,
              page: '1' //在搜索框里，默认请求第一页的数据
            }, //向name为'search'的路由传递query参数
          })
        }
        keywords.value = ''
      }
      let username = ref(sessionStorage.getItem('user'))
      let flag = ref(false) //flag控制是否展示用户名
      watch(() => router.currentRoute.value.path, () => {
        nextTick(); //有的时候浏览器还没有加载session，会导致拿不到user
        if (sessionStorage.getItem('user')) {
          username.value = sessionStorage.getItem('user')
          flag.value = true
        }
      })

      function exit() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        flag.value = false
      }

      return {
        goSearch,
        keywords,
        flag,
        username,
        exit
      }
    }
  }

</script>

<style lang='less' scoped>
  .header {
    &>.top {
      background-color: #333;
      height: 30px;
      line-height: 30px;

      a:hover {
        color: #fff;
        text-decoration: none;
      }

      .container {
        width: 1200px;
        margin: 0 auto;
        font-size: 13px;
        overflow: hidden;

        .loginList {
          float: right;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #424242;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: left;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #424242;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            outline: 0; //让focus的时候边框蓝色不显示
            width: 350px;
            height: 32px;
            padding: 0px 4px;
            border: 1.5px solid #e0e0e0;
            font-size: 13px;
            float: left;

          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            outline: 0; //让focus的时候边框蓝色不显示
            cursor: pointer;

          }
        }
      }
    }
  }

  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
      height: 464px;
      padding-left: 210px;

      .center {
        box-sizing: border-box;
        width: 740px;
        height: 100%;
        padding: 5px;
        float: left;
      }

      .right {
        float: left;
        width: 250px;

        .news {
          border: 1px solid #e4e4e4;
          margin-top: 5px;

          h4 {
            border-bottom: 1px solid #e4e4e4;
            padding: 5px 10px;
            margin: 5px 5px 0;
            line-height: 22px;
            overflow: hidden;
            font-size: 14px;

            .fl {
              float: left;
            }

            .fr {
              float: right;
              font-size: 12px;
              font-weight: 400;
            }
          }

          .news-list {
            padding: 5px 15px;
            line-height: 26px;

            .bold {
              font-weight: 700;
            }
          }
        }

        .lifeservices {
          border-right: 1px solid #e4e4e4;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;

          .life-item {
            border-left: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            margin-right: -1px;
            height: 64px;
            text-align: center;
            position: relative;
            cursor: pointer;
            width: 25%;

            .list-item {
              background-image: url(@/assets/icons.png);
              width: 61px;
              height: 40px;
              display: block;
            }

            .service-intro {
              line-height: 22px;
              width: 60px;
              display: block;
            }

            &:nth-child(1) {
              .list-item {
                background-position: 0px -5px;
              }
            }

            &:nth-child(2) {
              .list-item {
                background-position: -62px -5px;
              }
            }

            &:nth-child(3) {
              .list-item {
                background-position: -126px -5px;
              }
            }

            &:nth-child(4) {
              .list-item {
                background-position: -190px -5px;
              }
            }

            &:nth-child(5) {
              .list-item {
                background-position: 0px -76px;
              }
            }

            &:nth-child(6) {
              .list-item {
                background-position: -62px -76px;
              }
            }

            &:nth-child(7) {
              .list-item {
                background-position: -126px -76px;
              }
            }

            &:nth-child(8) {
              .list-item {
                background-position: -190px -76px;
              }
            }

            &:nth-child(9) {
              .list-item {
                background-position: 0px -146px;
              }
            }

            &:nth-child(10) {
              .list-item {
                background-position: -62px -146px;
              }
            }

            &:nth-child(11) {
              .list-item {
                background-position: -126px -146px;
              }
            }

            &:nth-child(12) {
              .list-item {
                background-position: -190px -146px;
              }
            }
          }
        }

        .ads {
          margin-top: 5px;

          img {
            opacity: 0.8;
            transition: all 400ms;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .today-recommend {
    .py-container {
      width: 1200px;
      margin: 0 auto;

      .recommend {
        height: 165px;
        background-color: #eaeaea;
        margin: 10px 0;
        display: flex;

        .clock {
          width: 16.67%;
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

        .banner {
          width: 20.83%;

          img {
            width: 100%;
            height: 100%;
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
