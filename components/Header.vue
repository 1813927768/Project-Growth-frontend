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
        v-if="isVerified"
      ></el-menu-item>
      <el-submenu index="2" v-if="isVerified">
        <template slot="title">设置</template>
        <el-menu-item index="2-1" :route="{path:this.$route.path}" @click="accountShow = true">账户设置</el-menu-item>
        <el-menu-item index="2-2" :route="{path:this.$route.path}" @click="taskShow = true">任务设置</el-menu-item>
        <el-menu-item index="2-3" :route="{path:this.$route.path}">退出</el-menu-item>
      </el-submenu>
    </el-menu>
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
    <Modal
        v-model="taskShow"
        @on-ok="ok"
        @on-cancel="cancel">
    <Tabs value="name1">
        <TabPane label="目标设置" name="name1">
          <div class="one-line">
            <span>每日目标</span>
            <InputNumber :min="1" v-model="dayGoal" class="input-number"></InputNumber>
            <span>个番茄</span>
          </div>
          <br>
          <div class="one-line">
            <span>每周目标</span>
            <InputNumber :min="1" v-model="weekGoal" class="input-number"></InputNumber>
            <span>个番茄</span>
          </div>
          <br>
          <div class="one-line">
            <span>每月目标</span>
            <InputNumber :min="1" v-model="monthGoal" class="input-number"></InputNumber>
            <span>个番茄</span>
          </div>
        </TabPane>
        <TabPane label="番茄设置" name="name2">
          <div class="one-line">
            <span>番茄时间</span>
            <InputNumber :min="10" v-model="pomoTime" class="input-number"></InputNumber>
            <span>分钟</span>
          </div>
          <br>
          <div class="one-line">
            <span>休息时间</span>
            <InputNumber :min="1" v-model="restTime" class="input-number"></InputNumber>
            <span>分钟</span>
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
      //isVerified:true,
      activeIndex: "3",
      activeIndex2: "2",
      accountShow: false,
      changeName: false,
      taskShow:false,
      dayGoal:1,
      weekGoal:7,
      monthGoal:30,
      pomoTime:25,
      restTime:5,
      nameValue:"",
      changeMail:false,
      mailValue:"",
      originalPW: "",
      newPW: "",
      Menus: Menus
    };
  },
  props: ['isVerified'],
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //this.isVerified = false;
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

.input-number{
  margin-left: 20px;
  margin-bottom: 5px;
  width: 50px;
}

</style>