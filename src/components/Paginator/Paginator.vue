<template>
  <!-- 这是分页器组件 -->
  <div v-show="false">{{pageMax.data}}</div>
  <!-- 很tm奇怪，这个div去掉了，页码就不显示了 -->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled">
          <a @click="prvPage">«上一页</a>
        </li>
        <!-- 根据数据中最大页数动态生成分页按钮 -->
        <!-- 动态绑定类名，当 -->
        <li :class="{active: currentPage.data == value}" v-for="(value,index) in arr" :key="index" @click="jumpPage($event)">
          <a>{{value}}</a>
        </li>
        <li class="dotted"></li>
        <li class="next">
          <a @click="nextPage">下一页»</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    reactive,
    ref,
    toRaw
  } from '@vue/reactivity';
  import {
    onUpdated,
    watch
  } from '@vue/runtime-core';
  import router from '@/router';
  export default {
    props: ['pageMax'],
    setup(props) {
      let currentPage = reactive({})
      let arr = []
      let isActive = ref('1')

      
      watch(props.pageMax, () => { //props.pageMax是通过异步操作更新的，所以一开始是空数据
        for (let i = 1; i <= toRaw(props.pageMax.data); i++) { //动态生成一个升序数组，为了渲染分页列表
          arr.push(i)
        }
        currentPage.data = Number(router.currentRoute.value.query.page); //拿到现在的页数(默认是字符串)
      })


      //上一页下一页跳转功能
      function nextPage() {
        router.push({
          name: 'search',
          query: {
            keyword: router.currentRoute.value.query.keyword,
            page: currentPage.data + 1
          }
        })
        currentPage.data++;
      }

      function prvPage() {
        let thispage = currentPage.data - 1
        if (thispage > 0) {
          router.push({
            name: 'search',
            query: {
              keyword: router.currentRoute.value.query.keyword,
              page: thispage
            }
          })
          currentPage.data--
        }
      }

      //点击页码直接跳转功能
      function jumpPage(e) {
        if (router.currentRoute.value.query.page != e.target.innerHTML) {
          router.push({
            name: 'search',
            query: {
              keyword: router.currentRoute.value.query.keyword,
              page: e.target.innerHTML
            }
          })
          currentPage.data = e.target.innerHTML
        }

      }
      return {
        arr,
        nextPage,
        prvPage,
        jumpPage,
        isActive,
        currentPage
      }
    }
  }

</script>

<style lang="less" scoped>
  a {
    cursor: pointer;
  }

  .page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    float: right;

    .sui-pagination {
      margin: 18px 0;

      ul {
        margin-left: 0;
        margin-bottom: 0;
        vertical-align: middle;
        width: 490px;
        float: left;

        li {
          line-height: 18px;
          display: inline-block;

          a {
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #e0e9ee;
            margin-left: -1px;
            font-size: 14px;
            padding: 9px 18px;
            color: #333;
          }

          &.active {
            a {
              background-color: #fff;
              color: #e1251b;
              border-color: #fff;
              cursor: pointer;
            }
          }

          &.prev {
            a {
              background-color: #fafafa;
            }
          }

          &.disabled {
            a {
              color: #999;
              cursor: pointer;
            }
          }

          &.dotted {
            span {
              margin-left: -1px;
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              font-size: 14px;
              border: 0;
              padding: 9px 18px;
              color: #333;
            }
          }

          &.next {
            a {
              background-color: #fafafa;
            }
          }
        }
      }

      div {
        color: #333;
        font-size: 14px;
        float: right;
        width: 241px;
      }
    }
  }

</style>
