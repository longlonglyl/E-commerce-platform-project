<template>
  <div class="order_head">
    <div class="head_background">
      <div class="head_box">
        <h1 class="head_h1">我的购物车</h1>
      </div>
    </div>
  </div>
  <div class="trolley_background">
    <div class="trolley_background_in">
      <div class="tro_tab_h">
        <div class="col tro_tab_check">
          <el-checkbox v-model="selectAll" label="全选" 
          size="large" class="selectAll"/>
        </div>
        <div class="col tro_tab_img">

        </div>
        <p class="col tro_tab_name">商品名称</p>
        <div class="col tro_tab_price">单价</div>
        <div class="col tro_tab_num">数量</div>
        <div class="col tro_tab_total">小计</div>
        <div class="col tro_tab_action">操作</div>

      </div>

      <!-- 购物车存放的商品 -->
      <div class="tro_tab_h1" v-for="(value) in userCarList.data" :key="value.goodsid">
        <div class="col tro_tab_check">
          <el-checkbox 
          size="large" 
          class="selectAll checkBoxSingle"
          :id="String(value.goodsid)"
          @change="select(value.goodsid,$event)"
          />
          <span class="tro_tab_check_sp"></span>
        </div>
        <div class="col tro_tab_img">
          <img :src="value.img" alt="">
        </div>
        <div class="col tro_tab_name">
          <li class="tro_tab_name_li1">{{value.title}}</li>
          <li class="tro_tab_name_li2" v-show="value.config != 'undefined'">{{value.config}}</li>
        </div>
        <div class="col tro_tab_price">
          <span id="price">{{value.price}}</span><span>元</span>
        </div>
        <div class="col tro_tab_num">
          <a class="tro_tab_num_p1" id="subtract" @click="value.count>1? value.count--:value.count">-</a>
          <input type="text" name="" id="input_num" :value="value.count">
          <a class="tro_tab_num_p2" id="plus" @click="value.count++">+</a>
        </div>
        <div class="col tro_tab_total "><span class="tro_tab_total_value"
            id="prices">{{value.count * value.price}}</span>元
        </div>
        <div class="col delete" @click="deleteCar(value.goodsid)">x</div>
      </div>

    </div>
    <div class="tro_close_bot ">
      <p class="tro_close_p ">
        <router-link to="/home">继续购物</router-link> | 共<span>{{arrLength}}</span>件,已选择了<span>{{checkLength}}</span>件<span
          style="color: #ff6700"></span>
      </p>

      <p class="tro_close_p_r">去结算</p>
      <p class="tro_close_p_c">合计:<span id="close">{{sum}}</span>元</p>
    </div>
  </div>
</template>

<script>
  import {
    reactive,
    ref
  } from '@vue/reactivity'
  import axios from 'axios'
import { computed, watch } from '@vue/runtime-core'
  export default {
    setup() {
      let selectAll = ref(false)
      let username = sessionStorage.getItem('user')
      let arrLength = ref('')  //商品总数
      let checkLength = computed(()=>{
        return checkArr.length
      })

      //发起axios请求，从数据库拿到该用户的购物车信息
      let userCarList = reactive({})
      axios({
        method: 'get',
        url: 'http://127.0.0.1/mycar',
        params: {
          token: sessionStorage.getItem('token'),
          username: sessionStorage.getItem('user')
        }
      })
      .then(res => {
        if (res.data.status == 200) {
          userCarList.data = [...res.data.data]
          arrLength.value = userCarList.data.length
        }
      })

      //定义一个数组，用来存放哪些按钮被选中了
      let checkArr = reactive([])
      //点击单选按钮触发函数
      function select(goodsid,e) {  //每次点击单选按钮，就会把按钮的索引传过来
        if(e == true) {  //如果当前勾选框状态为true，就向数组新增元素
          checkArr.push(goodsid)
        } else {  //为false，就删除数组指定元素
          //注意，这里不能用filter，filter会返回一个新数组，导致原来的watch不生效
          checkArr.forEach((value,index) => {
            if(value == goodsid) {
              checkArr.splice(index,1)
            }
          })
        }
      }
      //反选全选按钮
      watch(checkArr,() => {
        //如果所有商品都在数组里，就勾选全选按钮
        if(checkArr.length == userCarList.data.length) {
          selectAll.value = true
        } else {
          selectAll.value = false
        }
      })


      //点击全选按钮触发的事件，不知道怎么操作elementplus的单选框勾选状态，所以没做
      watch(selectAll,()=>{
        if(selectAll.value === true) {
          const allBox = document.querySelectorAll('.checkBoxSingle')
          allBox.forEach((value)=>{
            // console.log(value);  //里面没有改变当前复选框状态的属性
          })
        }
      })

      //计算总价格
      let sum = computed(() => {
        let sumPrice = 0  //总价格
        checkArr.forEach( goodsid => {  //先循环选中商品数组
          let thisSum = 0  //本商品的价格
          userCarList.data.forEach(value => {  //从商品列表里计算当前商品的总价格
            if(value.goodsid == goodsid) {
              thisSum =  Number(value.price) * value.count
            }
          })
          sumPrice += thisSum
        });
        return sumPrice
      })

      //删除购物车商品函数
      function deleteCar(goodsid) {
        axios ({
          method: 'post',
          url: 'http://127.0.0.1/mycar/delete',
          params: {goodsid},
        }).then(res => {
          if(res.data.status == 200) {

            userCarList.data.forEach((value,index) => { //商品数组里去掉该商品
              if(value.goodsid == goodsid) {
                userCarList.data.splice(index,1)
                arrLength.value = userCarList.data.length
              }
            })

            checkArr.forEach((value,index) => { //已勾选数组里去掉该商品
              if(value == goodsid) {
                checkArr.splice(index,1)
                console.log(checkArr);
              }
            })
          }
        })
      }

      
      return {
        userCarList,
        username,
        selectAll,  //全选按钮的状态
        checkArr,
        select,
        sum,
        deleteCar,
        arrLength,
        checkLength
      }
    }
  }

</script>

<style lang="less" scoped>
  a:hover {
    text-decoration: none;
  }

  /deep/ .selectAll {
    margin-left: 30px;
    margin-top: 17px;
    --el-checkbox-checked-text-color: #ff6700;
    --el-checkbox-checked-input-border-color: #ff6700;
    --el-checkbox-checked-bg-color: #ff6700;
    --el-checkbox-checked-icon-color: var(--el-color-white);
    --el-checkbox-input-border-color-hover: #ff6700;
  }

  .order_head {
    width: 100%;
    height: 100px;
    background: #fff;
    border-bottom: 2px solid #ff6700;
  }

  .head_background {
    width: 1226px;
    height: 48px;
    margin: 0 auto;
    background: #fff;
    /*background: paleturquoise;*/
    padding: 26px 0;
  }

  .head_left_a img {
    width: 48px;
    height: 48px;
    float: left;
    margin-right: 50px;
  }

  .head_h1 {
    font-family: 黑体;
    display: block;
    float: left;
    line-height: 48px;
  }

  .head_right {
    color: #757575;
    font-size: 12px;
    float: right;
    line-height: 48px;
    margin-right: 20px;
  }

  .head_right a {
    color: #757575;
  }

  .trolley_background {
    width: 100%;
    /*height:800px;*/
    background: #f5f5f5;
    padding: 38px 0;
  }

  .trolley_background_in {
    width: 1226px;
    /*height: 500px;*/
    padding: 15px 0px;
    background: #fff;
    margin: 0 auto;

  }

  .tro_tab_h {
    width: 1226px;
    height: 70px;
  }

  .col {
    float: left;
  }

  .tro_tab_check {
    width: 110px;
    height: 70px;
  }

  .tro_tab_check_p {
    width: 20px;
    height: 20px;
    background: #ff6700;
    color: #fff;
    text-align: center;
    line-height: 20px;
    margin-top: 25px;
    margin-left: 25px;
    float: left;
  }

  .tro_tab_check_sp {
    float: left;
    margin-top: 25px;
    margin-left: 10px;
  }

  .tro_tab_img {
    width: 120px;
    height: 70px;
  }

  .tro_tab_img img {
    width: 80px;
    height: 80px;
  }

  .tro_tab_name {
    width: 380px;
    height: 70px;
    text-align: left;
    line-height: 70px;
  }

  .tro_tab_price {
    width: 159px;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }

  .tro_tab_num {
    width: 150px;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }

  .tro_tab_total {
    width: 201px;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }

  .tro_tab_action {
    width: 80px;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }
    .delete {
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-top: 22px;
    margin-left: 22px;
    font-size: 17px;
    text-align: center;
    line-height: 30px;
  }

  .tro_tab_h1 {
    width: 1226px;
    height: 86px;
    padding: 16px 0;
  }

  .tro_tab_h1 .tro_tab_check {
    width: 110px;
    height: 86px;
  }

  .tro_tab_h1 .tro_tab_check_p {
    width: 20px;
    height: 20px;
    background: #ff6700;
    color: #fff;
    text-align: center;
    line-height: 20px;
    margin-top: 25px;
    margin-left: 25px;
    float: left;
  }

  .tro_tab_h1 .tro_tab_check_sp {
    float: left;
    margin-top: 25px;
    margin-left: 10px;
  }

  .tro_tab_h1 .tro_tab_img {
    width: 120px;
    height: 86px;
  }

  .tro_tab_name_li1 {
    line-height: 70px;
    font-size: 20px;
    color: #333;
  }

  .tro_tab_name_li2 {
    line-height: 0px;
    font-size: 12px;
    color: #cdcac2;
  }

  .tro_tab_h1 .tro_tab_price {
    width: 159px;
    height: 86px;
    text-align: center;
    line-height: 86px;
  }

  .tro_tab_h1 .tro_tab_num {
    width: 150px;
    height: 86px;
    text-align: center;
    line-height: 86px;
    font-size: 16px;
  }

  #input_num {
    width: 72px;
    height: 36px;
    float: left;
    font-size: 14px;
    text-align: center;
    color: #333;
    margin-top: 24px;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
  }

  .tro_tab_num a {
    display: block;
    float: left;
    width: 37px;
    height: 36px;
    background: #fff;
    font-size: 12px;
    margin-top: 24px;
    line-height: 38px;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;

  }

  .tro_tab_num a:hover {
    background: #e0e0e0;
  }

  .tro_tab_num_p1 {
    border-left: 1px solid #e0e0e0;
  }
  .tro_tab_num_p1:hover {
    cursor: pointer;
  }

  .tro_tab_num_p2 {
    display: block;
    border-right: 1px solid #e0e0e0;
  }
  .tro_tab_num_p2:hover {
    cursor: pointer;
  }

  .tro_tab_h1 .tro_tab_total_value {
    color: #ff6700;
    text-align: center;
  }

  .tro_close_bot {
    width: 1212px;
    height: 50px;
    padding: 5px 0px 5px 14px;
    background: #fff;
    margin: 20px auto;
  }

  .tro_close_p {
    &,a {
    display: block;
    float: left;
    font-size: 18px;
    color: #ff6700;
    line-height: 50px;
    }
  }

  .tro_close_p_c {
    display: block;
    float: left;
    color: #ff6700;
    line-height: 50px;
    margin-left: 500px;
  }

  .tro_close_p_c span {
    font-size: 35px;
  }

  .tro_close_p_r {
    display: block;

    float: right;
    width: 180px;
    height: 50px;
    color: #ffffff;
    background: #ff6700;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    /*margin-right: 10px;*/
  }

</style>
