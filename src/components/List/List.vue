<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all" @mouseenter="showNav" @mouseleave="hideNav">全部商品</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sorta">
        <div class="sort" v-show="showList" @mouseenter="showNav" @mouseleave="hideNav">
        <div class="all-sort-list2" @click="goSearch($event)">
          <!-- 最外层，商品分类 -->
          <div class="item" v-for="(value,index) in list.msg" :key="index">
            <h3>
              <a href="" id="a">{{value.categoryName}}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 第二层分类，展开后最左边的标题 -->
                <dl class="fore" v-for="(valuee,indexx) in value.categoryChild" :key="indexx">
                  <dt>
                    <a href="" style="color: #333">{{valuee.categoryName}}</a>
                  </dt>
                  <dd>
                    <!-- 第三层分类，详细页面 -->
                    <em v-for="(valueee,indexxx) in valuee.categoryChild" :key="indexxx">
                      <a href="" style="color: #333">{{valueee.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {
    computed,
    onMounted,
    reactive,
    ref,
  } from '@vue/runtime-core';
  import {
    useStore
  } from 'vuex'
  import router from '@/router';
  export default {
    setup() {
      // 点击三级联动列表跳转到search，并且传递对应a链接的参数
      function goSearch(event) {
        event.preventDefault();
        let target = null;
        if (event.target.children[0]) { //如果点击的是外层h3（里面还有子元素）
          target = event.target.children[0] //让target等于子元素a
        } else { //点击的就是a链接
          target = event.target;
        }
        let query = {
          keyword: target.innerHTML,  //把链接里的内容当作关键词keyword传过去
          page: 1  //在list里面点击，自动申请第一页的数据
          }
        //event.target里面有一个dataset对象，可以拿到所有data-开头的自定义属性

        router.push({  //跳转到search，并且把query参数传过去
          name: 'search',
          query,
        })
      }

      let showList = ref(false) //Nav列表默认不展开
      onMounted(() => { //加载页面的时候判断是不是在访问/home
        if (router.currentRoute.value.path == '/home') {
          showList.value = true
        } else if (router.currentRoute.value.path == '/search/') {
          showList.value = false
        }
      })


      function showNav() {  //List随着鼠标进入离开显示隐藏，只能在/search里面生效
        if(router.currentRoute.value.path == '/search/') {
          showList.value = true
        }
      }
      function hideNav() {  //List随着鼠标进入离开显示隐藏，只能在/search里面生效
        if(router.currentRoute.value.path == '/search/') {
          showList.value = false
        }
      }

      let list = reactive({}) //创建一个空的响应式对象，转存vuex里的数组
      const store = useStore();
      //从vuex小仓库里拿到数组，由于这个数组一开始是空的，异步请求以后才有数据，所以要computed
      list.msg = computed(() => {
        if(store.state.home.list.data) {  //如果vuex里已经更新了数组
          return store.state.home.list.data.slice(0,11)  //截取一部分数组，数据太多放不下
        }
        return store.state.home.list.data  //vuex里还没有数组，就先动态监视原数组
      })

      return {
        showList,
        goSearch,
        showNav,
        hideNav,
        list
      }
    },
  }

</script>

<style lang="less" scoped>
  .type-nav {

    a:hover {
      text-decoration: none;
    }

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
        top: 47px;
        width: 210px;
        height: 464px;
        position: absolute;
        background: rgba(105, 101, 101, .6);
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 42px;
              font-size: 16px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #fff;
              }
            }

            h3:hover {
              background-color: #ff6700;
              cursor: pointer;
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #fff;
              // 设置列表的字体大小
              font-size: 13px;
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
      .sorta-enter-from {
        height: 0;
      }
      .sorta-enter-active {
        transition: all .2s linear;
      }
      .sorta-enter-to {
        height: 464px;
      }
    }
  }

</style>
