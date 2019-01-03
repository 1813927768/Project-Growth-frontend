<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <navmenu></navmenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";

export default {
  components: {
    navmenu: NavMenu
  },
  mounted() {
    console.log("his page");
    this.$router.push({ name: "DayView1" });
  }
};
</script>

<style>
.abandon {
  background-color: #000000 !important;
}

.completed {
  background-color: #1eff00 !important;
}

.waiting {
  background-color: #ffe800 !important;
}

.running {
  background-color: #ff0000 !important;
}
</style>

