<template>
  <div>
    <div class="login-wrap" @keyup.enter="login">
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
      showTishi: false,
      tishi: "",
      username: "",
      password: ""
    };
  },
  props: ["isReg"],
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    var userId = getCookie("userid");
    if (userId) {
      //修改
      this.$emit("userSignIn", userId);
      this.$router.push("/PomoMode");
      console.log("cookie exist");
    }
  },
  methods: {
    ToRegister() {
      console.log("register");
      this.$router.push({ name: "Reg" });
    },
    logInSuccess(userID) {
      /*向父组件传值*/
      this.$emit("userSignIn", userID);
      setCookie("userid", userID, 1000 * 60);
      setTimeout(
        function() {
          this.$router.push("/PomoMode");
        }.bind(this),
        1000
      );
    },
    login() {
      if (this.username == "" || this.password == "") {
        alert("请输入用户名或密码");
      } else if (this.username == "admin") {
        this.$router.push("/Admin");
      } else {
        let data = { password: this.password, username: this.username };
        /*接口请求*/
        this.$http
          .post(loginurl, data, { emulateJSON: true })
          .then(res => {
            console.log(res);
            res = res.body;
            var code = res[0];
            sessionStorage.username = res[1];
            sessionStorage.email = res[2];
            sessionStorage.tomoLength = res[4];
            sessionStorage.dayGoal = res[5];
            sessionStorage.weekGoal = res[6];
            sessionStorage.monthGoal = res[7];
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if (code == "No user!") {
              this.tishi = "该用户不存在";
              this.showTishi = true;
            } else if (code == "Wrong password!") {
              this.tishi = "密码输入错误";
              this.showTishi = true;
              // this.logInSuccess(2);
            } else {
              // debugger;
              this.tishi = "登录成功";
              this.showTishi = true;
              // var userID = code;
              this.logInSuccess(code);
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