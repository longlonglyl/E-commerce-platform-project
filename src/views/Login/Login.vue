<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span></span>
                <input type="text" placeholder="用户名" v-model.trim="username">
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input type="password" placeholder="请输入密码" v-model.trim="password">
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="login">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="@/assets/login/qq.png" alt=""></li>
                <li><img src="@/assets/login/sina.png" alt=""></li>
                <li><img src="@/assets/login/ali.png" alt=""></li>
                <li><img src="@/assets/login/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机app</li>
        <li>销售联盟</li>
        <li>社区</li>
      </ul>
      <div class="address">地址：江西省南昌市新建区学府大道999号</div>
      <div class="beian">京ICP备114514号
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref
  } from '@vue/reactivity'
  import {
    computed
  } from '@vue/runtime-core'
  import {
    userLogin
  } from '@/api/index.js'
  import router from '@/router'
  export default {
    setup() {
      let username = ref('')
      let password = ref('')
      let flag = computed(() => { //flag用来反映输入的用户名和密码是否为空，为空就不允许登录
        return username.value.length != 0 && password.value.length != 0
      })

      function login() {
        if (flag.value == true) {
          userLogin({
              username: username.value,
              password: password.value
            })
            .then((res) => {
              console.log(res);
              switch (res.data.status) {
                case '不存在该用户': {
                  alert('不存在该用户')
                  break;
                }
                case '密码错误': {
                  alert('密码错误');
                  break;
                }
                case '登录成功': {
                  sessionStorage.setItem('token', res.data.token)
                  sessionStorage.setItem('user', res.data.username)

                  if (sessionStorage.getItem('token') && sessionStorage.getItem('user') == res.data.username) {
                    router.push('/home')
                  }
                  break;
                }
              }
            })
        } else {
          alert('请输入完整的登录信息')
        }
      }
      return {
        username,
        password,
        login
      }
    }
  }

</script>

<style lang="less" scoped>
  .login-container {
    .login-wrap {
      height: 487px;
      background-color: #f9f9f9;

      .login {
        width: 1200px;
        height: 487px;
        margin: 0 auto;
      }

      .loginform {
        width: 420px;
        height: 406px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        margin-right: 50px;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

          li {
            width: 50%;
            float: left;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;
              border-top-color: #28a3ef;
              color: #e1251b;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;

          form {
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              margin-bottom: 16px;

              span {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                background: url(@/assets/icons.png) no-repeat -10px -201px;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }

              .pwd {
                background-position: -72px -201px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;

                border-radius: 0 2px 2px 0;
                outline: none;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }

            .btn {
              background-color: #e1251b;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid #e1251b;
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 25px;
              outline: none;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;
              }
            }

            .register {
              float: right;
              font-size: 15px;
              line-height: 38px;
            }

            .register:hover {
              color: #4cb9fc;
              text-decoration: underline;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }

</style>
