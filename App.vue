<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <vheader :isVerified="this.isVerified"/>
      </el-header>
      <router-view @userSignIn="userSignIn"></router-view>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "app",
  components: {
    vheader: Header
  },
  data(){
    return{
      userName: sessionStorage.userName,
      //isVerified: sessionStorage.isVerified,
      isVerified:true,
    }
  },

  methods:{
    //子组件(register)将用户名传过来
    userSignIn(userName){
      sessionStorage.userName = userName;
      this.userName = sessionStorage.userName;
      sessionStorage.isVerified = true;
      this.isVerified = sessionStorage.isVerified;
    }
  }

};
</script>

