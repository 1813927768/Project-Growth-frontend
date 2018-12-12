<template>
  <div class="container">
    <el-card class="box-card-his">
      <div slot="header" class="clearfix">
        <span>最近一周工作情况</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看详细数据</el-button>
      </div>

      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </el-card>

    <el-card class="box-card">
      <ve-pie :data="chartData1"></ve-pie>
    </el-card>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.box-card-his {
  width: 600px;
  margin: 50px;
  margin-left: 80px;
  font-size: 13px;
}

.box-card {
  margin: 50px;
  margin-left: 80px;
  font-size: 13px;
  width: 400px;
}
</style>

<script>
import "echarts/lib/chart/line";
import VeLine from "v-charts/lib/line";
import VePie from "v-charts/lib/pie.js";

export default {
  components: { VeLine, VePie },
  data() {
    this.chartSettings = {
      stack: { 用户: ["taskNum", "pomoNum"] },
      area: true
    };
    return {
      chartData1: {
        columns: ["时刻", "taskNum"],
        rows: [
          { 时刻: "上午", taskNum: 1393 },
          { 时刻: "下午", taskNum: 3530 },
          { 时刻: "晚上", taskNum: 2923 },

        ]
      },
      chartData: {
        columns: ["日期", "taskNum", "pomoNum"],
        rows: [
          { 日期: "周一", taskNum: 1393, pomoNum: 1093},
          { 日期: "周二", taskNum: 3530, pomoNum: 3230},
          { 日期: "周三", taskNum: 2923, pomoNum: 2623},
          { 日期: "周四", taskNum: 1723, pomoNum: 1423},
          { 日期: "周五", taskNum: 3792, pomoNum: 3492},
          { 日期: "周六", taskNum: 4593, pomoNum: 4293},
          { 日期: "周日", taskNum: 4593, pomoNum: 4293},
        ]
      }
    };
  }
};
</script>

