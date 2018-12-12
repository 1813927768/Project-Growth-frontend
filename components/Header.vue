<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      active-text-color="#FF2D00"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <a class="HeaderTitle" href="/">
        <span>Growth</span>
      </a>
      <el-menu-item
        v-for="item in Menus"
        v-text="item.name"
        :index="item.componentName"
        :key="item.id"
      ></el-menu-item>
      <el-submenu index="2">
        <template slot="title">设置</template>
        <el-menu-item index="2-1" @click="accountShow = true">账户设置</el-menu-item>
        <el-menu-item index="2-2">任务设置</el-menu-item>
        <el-menu-item index="2-3">退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="line"></div>
    <Modal v-model="accountShow" @on-ok="ok" @on-cancel="cancel" width="400">
      <Tabs value="name1">
        <TabPane label="账号" name="name1">
        <div>
          <label class="one-line">姓名：</label> 
          <div class="one-line" v-if="changeName">
            <Input v-model="nameValue" placeholder="Enter something..." style="width: 200px" />
            <Button>保存</Button>
          </div>
          <div class="one-line" v-else>
            <span>userName</span>
            <Button type="text" @click="changeName = true">更换</Button>
          </div>
        </div>
          <br>
        <div>
          <label class="one-line">邮箱：</label> 
          <div class="one-line" v-if="changeMail">
            <Input v-model="mailValue" placeholder="Enter something..." style="width: 200px" />
            <Button>保存</Button>
          </div>
          <div class="one-line" v-else>
            <span>userMail</span>
            <Button type="text" @click="changeMail = true">更换</Button>
          </div>
        </div>
        </TabPane>
        <TabPane label="账号安全" name="name2">
          <div>原密码:
            <Input v-model="originalPW" placeholder="请输入原密码" class="input-item"/>
          </div>
          <br>
          <div>新密码:
            <Input v-model="newPW" placeholder="请输入新密码" class="input-item"/>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>


<script>
import Menus from "@/config/header-config";

export default {
  data() {
    return {
      activeIndex: "3",
      activeIndex2: "2",
      accountShow: false,
      changeName: false,
      nameValue:"",
      changeMail:false,
      mailValue:"",
      originalPW: "",
      newPW: "",
      Menus: Menus
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    ok() {
      this.$Message.info("确认提交");
    },
    cancel() {}
  }
};
</script>

<style>
.HeaderTitle {
  color: #149290;
  float: left;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
  outline: none; /*取消选中后的蓝框*/
  text-decoration: none; /*取消a标签下划线*/
}
.el-menu--horizontal > .el-submenu {
  float: right;
}
.input-item {
  width: 200px;
}
.one-line{
  display: inline-block;
}
</style>