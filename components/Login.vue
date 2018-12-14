<template>
  <div>
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input class="input" placeholder="请输入用户名" v-model="username" clearable></el-input>
      <br>
      <el-input class="input" placeholder="请输入密码" v-model="password" type="password" clearable></el-input>
      <br>
      <el-button type="primary" @click="login" round class="button">登录</el-button>
      <!-- <button v-on:click="login">登录</button> -->
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <el-input class="input" placeholder="请输入用户名" v-model="newUsername" clearable></el-input>
      <br>

      <el-input class="input" placeholder="请输入邮箱" v-model="mailAddress" clearable></el-input>
      <br>
      <el-input class="input" placeholder="请输入密码" v-model="newPassword" type="password" clearable></el-input>

      <br>
      <el-button type="primary" @click="register" round class="button">注册</el-button>

      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style scoped>
.login-wrap {
  text-align: center;
  margin-top: 50px;
}
.register-wrap {
  text-align: center;
  margin-top: 50px;
}

.input {
  width: 18%;
  margin: 0 auto;
  margin-bottom: 7px;
  padding: 8px;
}
p {
  color: red;
}

.button {
  display: block;
  width: 200px;
  height: 40px;
  margin: 0 auto;
  margin-bottom: 5px;
}

span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}

h3 {
  margin-bottom: 10px;
}
</style>

<script>
import { setCookie, getCookie } from "../assets/cookie.js";

var loginurl = "http://localhost:8080/logIn";
var regiurl = "http://localhost:8080/signUp";

export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: "",
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      mailAddress: ""
    };
  },
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (getCookie("username")) {
      //this.$router.push("/PomoMode");
      console.log("cookie exist");
    }
  },
  methods: {
    ToRegister() {
      this.showRegister = true;
      this.showLogin = false;
    },
    ToLogin() {
      this.showRegister = false;
      this.showLogin = true;
    },
    register() {
      if (this.newUsername == "" || this.newPassword == "") {
        alert("请输入用户名或密码");
      } else {
        let data = {
          username: this.newUsername,
          password: this.newPassword,
          email: this.mailAddress
        };
        this.$http.get(regiurl, { params: data }).then(res => {
          console.log(res);
          if (res.data !== -1) {
            this.tishi = "注册成功";
            this.showTishi = true;
            this.username = "";
            this.password = "";
            /*注册成功之后再跳回登录页*/
            setTimeout(
              function() {
                this.showRegister = false;
                this.showLogin = true;
                this.showTishi = false;
              }.bind(this),
              1000
            );
          } else {
            this.tishi = "注册失败";
            this.showTishi = true;
          }
        });
      }
    },
    login() {
      if (this.username == "" || this.password == "") {
        alert("请输入用户名或密码");
      } else {
        let data = { password: this.password, username: this.username };
        debugger;
        /*接口请求*/
        this.$http
          .post(loginurl, data, { emulateJSON: true })
          .then(res => {
            console.log(res);
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if (res.data == -1) {
              this.tishi = "该用户不存在";
              this.showTishi = true;
            } else if (res.data == 0) {
              this.tishi = "密码输入错误";
              this.showTishi = true;
            } else if (res.data == "admin") {
              /*路由跳转this.$router.push*/
              this.$router.push("/main"); //管理员界面
            } else {
              this.tishi = "登录成功";
              this.showTishi = true;
              /*向父组件传值*/
              this.$emit("userSignIn", this.username);
              setCookie("username", this.username, 1000 * 60);
              setTimeout(
                function() {
                  this.$router.push("/Recom");
                }.bind(this),
                1000
              );
            }
          })
          .catch(res => {
            console.log("fail");
          });
      }
    }
  }
};
</script>