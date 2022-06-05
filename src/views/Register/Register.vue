<template>
  <div class="sign_background">
    <div class="sign_background_in">
      <div class="sign_background_no1">
        <!-- <a href="index.html"><img src="img/logo.jpg" alt=""></a> -->
      </div>
      <div class="sign_background_no2">注册帐号</div>
      <div class="sign_background_no3">
        <form action="">
          <div class="username-div">
            用户名：
            <el-input v-model.trim="username" placeholder="请输入长度为6-20位的用户名" clearable @keyup="checkUsername" />
            <span v-show="flag2" :class="{active: flag2}">用户名已经存在</span>
            <span v-show="!usernameLength" :class="{active: !usernameLength}">请输入正确的长度</span>
          </div>
          <div class="password-div">
            密码：
            <el-input v-model.trim="pass" type="password" placeholder="请设置你的密码" show-password />
          </div>
          <div class="password-check-div">
            确认密码：
            <el-input v-model.trim="checkPass" type="password" placeholder="请再次输入你的密码" show-password />
            <span v-show="!flag" :class="{active: !flag}">两次输入的密码不一致</span>
          </div>
        </form>
        <div class="sign_background_no6" @click="register">立即注册</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    ref
  } from '@vue/reactivity'
  import {
    postNode,
    registerUser,
  } from '@/api/index.js'
  import {
    computed,
  } from '@vue/runtime-core'
import router from '@/router'
  export default {
    setup() {
      let username = ref('')
      let pass = ref('')
      let checkPass = ref('')

      let flag = ref(false) //是否显示密码提示信息(第二次密码输入错误)
      //注意，这里千万不能写成flag.value = computed(),因为computed返回的本身就是一个ref格式的数据
      flag = computed(() => {
        return pass.value == checkPass.value
      })

      let flag2 = ref(false) //用户名是否已经存在
      let usernameLength = ref(true)
      function checkUsername() {
        //在里面向服务器发起请求，检查用户名是否已经存在
        if(username.value.length >= 6 && username.value.length <= 20) {
          usernameLength.value = true
        } else {
          usernameLength.value = false
        }
        if (username.value.length >= 6 && username.value.length <= 20) {
          postNode(username.value).then((res) => {
            if (res.status == 200) {
              // console.log(res.data);
              switch (res.data.data) { //关于用户名是否可用的状态码
                case 1:
                  flag2.value = false;
                  break;
                case 0:
                  flag2.value = true;
              }
            } else {
              console.log('获取node信息失败');
            }
          });
        }
      }

      //提交注册，往服务器里增加一条用户信息
      let usernameLegal = computed(() => {
        return flag2 
        && username.value != '' 
        && username.value.length >= 6 
        && username.value.length <= 20
      })
      let passLegal = computed(() => {
        return pass.value != ''
      })

      function register() {  //点击注册触发的函数
        if (usernameLegal.value && passLegal.value) {  //如果用户名和密码都合法，就调用函数
          registerUser({
            username: username.value,
            password: pass.value
          }).then(res => {
            console.log(res);
            alert('注册成功！')
            router.push({
              name: 'login'
            })
          })
        } else {
          alert('注册失败，请检查用户名或密码是否合法')
        }
      }

      return {
        username,
        pass,
        checkPass,
        flag,
        checkUsername,
        flag2,
        register,
        usernameLength,
      }
    }

  }

</script>

<style lang="less" scoped>
  .active {
    color: #ff6700;
    font-size: 13px;
  }

  .sign_background {
    width: 100%;
    height: 800px;
    background: #f9f9f9;
    padding-top: 40px;
    ;
  }
  form > div {
    height: 80px;
  }
  .sign_background_in {
    background: white;
    width: 854px;
    height: 620px;
    margin: 0 auto;
  }

  .sign_background_no1 {
    width: 854px;
    height: 88px;
  }

  .sign_background_no2 {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 30px;
  }

  .sign_background_no3 {
    font-size: 18px;
    width: 432px;
    height: 318px;
    margin: 0 auto;
    padding: 30px 0;
  }

  .sign_background_no6 {
    height: 42px;
    margin-top: 20px;
    background: #ff6700;
    color: white;
    text-align: center;
    line-height: 42px;
  }

  .sign_background_no6:hover {
    cursor: pointer;
  }

  .sign_no5_div2 {
    width: 258px;
    height: 40px;
    float: left;
    border: 1px solid #ff6700;
  }

</style>
