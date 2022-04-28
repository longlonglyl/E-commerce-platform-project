<template>
  <List></List>
  <div>
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a>全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x">{{query.keyword}}<i>×</i></li>
          </ul>
        </div>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a>综合</a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li>
                  <a @click="priceUp($event)" id="up">价格⬆</a>
                </li>
                <li>
                  <a @click="priceDown($event)" id="down">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="value in search.data" :key="value.id">
                <div class="list-wrap">
                  <router-link :to="{name:'detail',
                  params:{
                    goodsName: value.title,
                    },
                  query:{
                    page: thisPage,
                    img: value.defaultImg,
                    price: value.price,
                    attrs: value.attrs,
                    tmName: value.tmName
                  }}" target="_blank"><img :src="value.defaultImg" /></router-link>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{value.title}}</a>
                  </div>
                  <span class="price">
                    {{value.price}}元
                  </span>
                  <div class="small-img">
                    <img :src="value.defaultImg" /><img :src="value.defaultImg" /><img :src="value.defaultImg" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页组件 -->
          <Paginator :pageMax="pageMax"></Paginator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router';
  import {
    onMounted,
    onUpdated,
    reactive,
    watch
  } from '@vue/runtime-core';
  import store from '@/store';
  import Paginator from '@/components/Paginator/Paginator.vue';
  export default {
    components: {
      Paginator
    },
    setup() {
      // console.log(router.currentRoute.value.query);  //这种方式也能拿到传递过来的参数
      let query = router.currentRoute.value.query; //搜索框里输入的筛选结果
      // console.log('search传过去的参数',query); //query里存放了关键词keyword、页数page
      let search = reactive({}) //存放请求来的搜索数据
      let pageMax = reactive({})
      let thisPage = router.currentRoute.value.query.page
      //根据最新的keyword发起请求拿数据
      function getKeyGoods() {
        store.dispatch('getSearchList', query).then(() => {
          // search.data = store.getters.goodsList //使用了search小仓库里的计算属性
          // pageMax.data = store.state.search.pageMax.data //拿到search小仓库里的最大页数
          if (store.state.search.searchList.data.length != 0) { //如果申请的数据在仓库里存在
            search.data = store.getters.goodsList //使用了search小仓库里的计算属性
            pageMax.data = store.state.search.pageMax.data //拿到search小仓库里的最大页数
          } else {
            search.data = [] //把数组设置为空，该页没有商品
          }
        })
      }

      //页面加载完成时，根据keyword渲染列表
      onMounted(() => {
        getKeyGoods()
      })

      // 当搜索框输入关键词时，响应到keyword的变化，重新渲染商品列表
      let flag = reactive({})
      onUpdated(() => {
        //在里面调用getKeyGoods会死循环，而且keyword不是响应式，不能watch
        query = router.currentRoute.value.query; //更新一下query
        flag.data = router.currentRoute.value.query;
      })
      watch(flag, () => {
        query.keyword = router.currentRoute.value.query.keyword //手动给keyword赋最新的值
        getKeyGoods();
      })

      //点击价格升序降序，重新给数组排序，重新渲染商品列表
      function priceUp(e) {
        search.data = search.data.sort((a, b) => {
          return a.price - b.price
        })
        if (e.target.style.backgroundColor == 'red') { //处于激活状态
          e.target.style.backgroundColor = '#fbfbfb'
          e.target.style.color = '#777'
        } else { //不处于激活状态
          document.querySelector('#down').style.backgroundColor = '#fbfbfb' //降序的背景颜色取消掉
          document.querySelector('#down').style.color = '#777'
          e.target.style.backgroundColor = 'red'
          e.target.style.color = '#fbfbfb'
        }
      }

      function priceDown(e) {
        search.data = search.data.sort((a, b) => {
          return a.price - b.price
        }).reverse()
        if (e.target.style.backgroundColor == 'red') { //处于激活状态
          e.target.style.backgroundColor = '#fbfbfb'
          e.target.style.color = '#777'
        } else { //不处于激活状态
          document.querySelector('#up').style.backgroundColor = '#fbfbfb' //升序的背景颜色取消掉
          document.querySelector('#up').style.color = '#777'
          e.target.style.backgroundColor = 'red'
          e.target.style.color = '#fbfbfb'
        }
      }


      return {
        search,
        priceUp,
        priceDown,
        query,
        pageMax,
        thisPage
      }
    }
  }

</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul li:nth-child(4n) {
            margin-right: 0px;
          }

          ul {
            display: flex;
            flex-wrap: wrap;

            @keyframes shadow {
              100% {
                box-shadow: 2px 2px 2px 2.5px #ccc;
                // box-shadow: -2px -2px 4px #ccc inset;
              }
            }

            .yui3-u-1-5:hover {
              animation: shadow 0.4s forwards;
              cursor: pointer;
            }

            .yui3-u-1-5 {
              margin-top: 10px;
              margin-right: 14px;
              line-height: 28px;

              .list-wrap {
                width: 286px;
                height: 383px;
                padding-top: 47px;
                border: 1px solid #ccc;
                text-align: center;

                .small-img {
                  z-index: 666;

                  img {
                    margin: 15px 4px;
                    border: 1px solid #ccc;
                    width: 34px;
                    height: 34px;
                  }
                }

                .small-img img:hover {
                  border: 1px solid #e1251b;
                }

                a {
                  color: #666;

                  img {
                    width: 200px;
                    height: 200px;
                    vertical-align: middle;
                  }
                }

                .price {
                  margin: 0 auto;
                  font-size: 14px;
                  color: #ff6700;
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  cursor: pointer;

                  a {
                    display: block;
                    color: #757575;
                    font-size: 14px;
                    text-align: center;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }


      }
    }
  }

</style>
