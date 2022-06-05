<template>
  <div class="detail">
    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域(面包屑) -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/search/',query:{keyword:'全部商品',page:1}}"><a>商品列表</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/search/',query:{keyword:goodsInfo.attrs,page:1}}">{{goodsInfo.attrs}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{goodsInfo.tmName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom />
          <!-- 小图列表 -->
          <ImageList :goodsDetail="goodsDetail.data" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{goodsInfo.name}}</h3>
            <p class="news">{{goodsDetail.data.comment}}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{goodsInfo.price}}</em>
                  <span>降价通知</span>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <!-- 地址选择器 -->
                <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleAdress"
                  placeholder="请选择要配送的城市">
                </el-cascader>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea" v-if="goodsInfo.attrs == '手机'">
              <div class="choosed"></div>
              <dl>
                <dt class="title">选择颜色</dt>
                <el-radio-group v-model="radio.radio1">
                  <el-radio-button label="金色" />
                  <el-radio-button label="银色" />
                  <el-radio-button label="黑色" />
                </el-radio-group>
              </dl>
              <dl>
                <dt class="title">内存容量</dt>
                <el-radio-group v-model="radio.radio2">
                  <el-radio-button label="64G" />
                  <el-radio-button label="128G" />
                  <el-radio-button label="256G" />
                </el-radio-group>
              </dl>
              <dl>
                <dt class="title">选择版本</dt>
                <el-radio-group v-model="radio.radio3">
                  <el-radio-button label="公开版" />
                  <el-radio-button label="移动版" />
                  <el-radio-button label="电信版" />
                </el-radio-group>
              </dl>
              <dl>
                <dt class="title">购买方式</dt>
                <el-radio-group v-model="radio.radio4">
                  <el-radio-button label="官方标配" />
                  <el-radio-button label="套餐1" />
                  <el-radio-button label="套餐2" />
                </el-radio-group>
              </dl>
            </div>
            <div class="chooseArea" v-if="goodsInfo.attrs == '笔记本'">
              <div class="choosed"></div>
              <dl>
                <dt class="title">选择颜色</dt>
                <el-radio-group v-model="radio.radio1">
                  <el-radio-button label="银色" />
                  <el-radio-button label="黑色" />
                </el-radio-group>
              </dl>
              <dl>
                <dt class="title">内存容量</dt>
                <el-radio-group v-model="radio.radio2">
                  <el-radio-button label="256G固态硬盘" />
                  <el-radio-button label="512G固态硬盘" />
                  <el-radio-button label="256G固态硬盘+1T机械硬盘" />
                </el-radio-group>
              </dl>
              <dl>
                <dt class="title">选择赠品</dt>
                <el-radio-group v-model="radio.radio3">
                  <el-radio-button label="套餐1" />
                  <el-radio-button label="套餐2" />
                  <el-radio-button label="套餐3" />
                </el-radio-group>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="carCount">
                <a href="javascript:" class="plus" @click="addCount">+</a>
                <a href="javascript:" class="mins" @click="descCount">-</a>
              </div>
              <div class="add">
                <a href="javascript:" @click="goShopCar">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <div class="detail">
        <div class="intro">
          <ul class="tab-wraped">
            <li class="introduction">
              商品介绍
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <div class="intro-detail">
                <img v-lazy="goodsDetail.data.big_img1" />
                <img v-lazy="goodsDetail.data.big_img2" />
                <img v-lazy="goodsDetail.data.big_img3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Zoom from '@/components/Detail/Zoom.vue'
  import ImageList from '@/components/Detail/ImageList.vue'
  import {
    regionData,
    CodeToText
  } from 'element-china-area-data' //中国地区插件，省/市/区
  import {
    reactive,
    ref,
  } from '@vue/runtime-core'
  import router from '@/router'
  import axios from 'axios'
  export default {
    components: {
      ImageList,
      Zoom
    },
    setup() {

      //拿到商品的基本信息（router的query参数拿到的）
      let goodsInfo = {
        name: router.currentRoute.value.params.goodsName,
        price: router.currentRoute.value.query.price,
        attrs: router.currentRoute.value.query.attrs,
        tmName: router.currentRoute.value.query.tmName,
        id: router.currentRoute.value.query.id
      }
      let radio = reactive({}) //用来存放用户选择的商品配置
      if (goodsInfo.attrs == '手机') {
        radio.radio1 = '金色'
        radio.radio2 = '64G'
        radio.radio3 = '公开版'
        radio.radio4 = '官方标配'
      } else if (goodsInfo.attrs == '笔记本') {
        radio.radio1 = '银色'
        radio.radio2 = '256G固态硬盘'
        radio.radio3 = '套餐1'
      }
      let goodsDetail = reactive({ //存放数据库拿来的商品详细信息
        data: {}
      })

      //处理省市区的相关数据和函数
      let options = regionData //省市区的下拉表单
      let selectedOptions = [] //选择器的v-model，存放数字码
      let adress = reactive({
        province: null,
        city: null,
        district: null
      })

      function handleAdress(value) {
        // console.log(value) //这里显示的是数字码，要用CodeToText[]转换
        adress.province = CodeToText[value[0]]; //省
        adress.city = CodeToText[value[1]]; //市
        adress.district = CodeToText[value[2]]; //区
      }

      //向数据库发起请求拿到 big_img small_img comment 等数据
      axios({
          method: 'get',
          url: 'http://127.0.0.1/detail',
          params: {
            id: goodsInfo.id
          } //get请求的参数，post的参数是data
        })
        .then((res) => {
          // console.log(res.data); //看一下发送回来的数据
          if (res.data.date.info[0]) {
            goodsDetail.data = res.data.date.info[0] //把数据转存到本地
          } else {
            console.log('没有从数据库拿到商品数据');
          }


        })

      //购物车数量的数据操作
      let carCount = ref(1)

      function addCount() {
        carCount.value++
      }

      function descCount() {
        if (carCount.value >= 2) {
          carCount.value--
        }
      }

      //加入购物车，往数据库发送数据（在对应用户的购物车table里面增加一条），然后跳转到购物车路由
      function goShopCar() {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
          let query = {
              goodsid: goodsInfo.id,
              username: sessionStorage.getItem('user'),
              price: goodsInfo.price,
              img: router.currentRoute.value.query.img,
              title: goodsInfo.name,
              count: carCount.value,
              config: Object.values(radio)  //把手机/电脑配置转换成数组发过去
            }
          axios({
            method: 'post',
            url: 'http://127.0.0.1/addcar',
            params: query,
          }).then((res) => {
            console.log(res);
            if(res.data.status == 200) {
              router.push('/carSuccess')
            } else if(res.data.status == 201) {
              alert("加入购物车失败，请稍后再试")
            }
          })
        } else {
          router.push('/login')
        }

      }
      return {
        radio,
        goodsInfo,
        goodsDetail,
        options,
        selectedOptions,
        handleAdress,
        carCount,
        addCount,
        descCount,
        goShopCar
      }
    }
  }

</script>

<style lang="less" scoped>
  .detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;

      .conPoin {
        padding: 9px 15px 9px 0;

        &>span+span:before {
          content: "/\00a0";
          padding: 0 5px;
          color: #ccc;
        }
      }

      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          position: relative;
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 18px;
            line-height: 21px;
            margin-top: 15px;
          }

          .news {
            color: #e12228;
            font-size: 13px;
            margin-top: 15px;
          }

          .priceArea {
            background: #fee9eb;
            padding: 7px;
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;
                color: #c81623;

                i {
                  font-size: 16px;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                }

                span {
                  font-size: 12px;
                }
              }

              .remark {
                float: right;
              }
            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .red-bg {
                  background: #c81623;
                  color: #fff;
                  padding: 3px;
                }

                .t-gray {
                  color: #999;
                }
              }
            }


          }

          .support {
            border-bottom: 1px solid #ededed;
            padding-bottom: 5px;

            .supportArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;
                color: #999;
              }
            }
          }

          .choose {
            .chooseArea {
              overflow: hidden;
              font-size: 15px;
              margin-top: 10px;

              dl {
                overflow: hidden;
                margin: 13px 0;

                dt {
                  margin-right: 15px;
                  line-height: 31.6px;
                  float: left;
                }
              }
            }

            .cartWrap {
              .controls {
                width: 48px;
                position: relative;
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 38px;
                  height: 37px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                }

                .plus,
                .mins {
                  width: 15px;
                  text-align: center;
                  height: 17px;
                  line-height: 17px;
                  background: #f1f1f1;
                  color: #666;
                  position: absolute;
                  right: -8px;
                  border: 1px solid #ccc;
                }

                .mins {
                  right: -8px;
                  top: 19px;
                  border-top: 0;
                }

                .plus {
                  right: -8px;
                }
              }

              .add {
                float: left;

                a {
                  background-color: #e1251b;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .product-detail {
      width: 1200px;
      margin: 30px auto 0;
      overflow: hidden;

      .aside {
        width: 210px;
        float: left;
        border: 1px solid #ccc;

        .tabWraped {
          height: 40px;

          h4 {
            border-top: 3px solid #fff;
            float: left;
            line-height: 37px;
            width: 105px;
            text-align: center;
            border-bottom: 1px solid #ccc;

            &.active {
              border-top: 3px solid #e1251b;
              border-bottom: 0;
              font-weight: normal;
            }
          }
        }

        .tabContent {
          padding: 10px;

          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .partList {
                overflow: hidden;

                li {
                  width: 50%;
                  float: left;
                  border-bottom: 1px dashed #ededed;
                  line-height: 28px;
                }
              }

              .goodsList {
                &>li {
                  margin: 5px 0 15px;
                  border-bottom: 1px solid #ededed;
                  padding-bottom: 5px;

                  .list-wrap {
                    .p-img {
                      text-align: center;

                      img {
                        width: 152px;
                      }
                    }

                    .price {
                      font-size: 16px;
                      color: #c81623;
                    }

                    .operate {
                      text-align: center;
                      margin: 5px 0;

                      a {
                        background-color: transparent;
                        border: 1px solid #8c8c8c;
                        color: #8c8c8c;
                        display: inline-block;
                        padding: 2px 14px;
                        line-height: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .detail {
        width: 980px;
        float: left;

        .fitting {
          border: 1px solid #ddd;
          margin-bottom: 15px;

          .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #333;
            padding: 5px 0 5px 15px;
          }

          .good-suits {
            height: 170px;
            padding-top: 10px;

            .master {
              width: 127px;
              height: 165px;
              text-align: center;
              position: relative;
              float: left;

              img {
                width: 87px;
              }

              p {
                color: #c81623;
                font-size: 16px;
                font-weight: 700;
              }

              i {
                position: absolute;
                top: 48px;
                right: -25px;
                font-size: 16px;
              }
            }

            .suits {
              width: 668px;
              height: 165px;
              float: left;

              .suitsItem {
                float: left;
                width: 127px;
                padding: 0 20px;
                text-align: center;

                img {
                  width: 120px;
                  height: 130px;
                }

                p {
                  font-size: 12px;
                }

                label {
                  display: block;
                  position: relative;

                  input {
                    vertical-align: middle;
                  }

                  span {
                    vertical-align: middle;
                  }
                }
              }
            }

            .result {
              border-left: 1px solid #ddd;
              width: 153px;
              height: 165px;
              padding-left: 20px;
              float: left;

              .num {
                font-size: 14px;
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .price-tit {
                font-weight: bold;
                margin-bottom: 10px;
              }

              .price {
                color: #B1191A;
                font-size: 16px;
                margin-bottom: 10px;
              }

              .addshopcar {
                background-color: #e1251b;
                border: 1px solid #e1251b;
                padding: 10px 25px;
                font-size: 16px;
                color: #fff;
                display: inline-block;
                box-sizing: border-box;
              }
            }
          }
        }

        .intro {
          .tab-wraped {
            background: #ccc;
            float: left;
            width: 1100px;
            height: 58px;
            border: 1px solid #ddd;
            overflow: hidden;
            padding: 5px;
            margin-top: 20px;

            li {
              font-size: 22px;
              line-height: 58px;
              color: #333;
              float: left;
            }
          }

          .tab-content {
            .tab-pane {
              display: none;

              &.active {
                display: block;
              }

              &:nth-child(1) {
                .goods-intro {
                  padding-left: 10px;

                  li {
                    margin: 10px 0;
                  }
                }

                .intro-detail {
                  img {
                    margin-left: 115px;
                    width: 100%;
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
