<template>
  <div>
    <div class="block">
      <DatePicker
        type="daterange"
        show-week-numbers
        placement="bottom-end"
        placeholder="Select date"
        style="width: 200px"
        @on-change="timeChange"
      ></DatePicker>
    </div>
    <ve-line :data="chartData" :settings="chartSettings" :grid="grid"></ve-line>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="tomatocount" label="tomatocount" width="180"></el-table-column>
      <el-table-column prop="taskCount" label="taskCount"></el-table-column>
    </el-table>
    <Page :total="size" :page-size="pageSize" @on-change="pageChange" show-elevator class="footer"/>
  </div>
</template>


<script>
import VeLine from "v-charts/lib/line";
import { openDB } from "../assets/indexDB.js";

//完整的格式化  var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  //处理年份
  var reYear = /(y+)/;
  var resultYear = reYear.exec(fmt);
  if (resultYear) {
    var yearformatPart = resultYear[0]; //匹配到的格式化字符
    var yearVal = (this.getFullYear() + "").substr(4 - yearformatPart.length);
    fmt = fmt.replace(yearformatPart, yearVal);
  }
  for (var k in o) {
    var re = new RegExp("(" + k + ")");
    var re = re.exec(fmt);
    if (re) {
      var Val = "" + o[k]; //本次需要替换的数据
      var formatPart = re[0]; //匹配到的格式化字符
      var replaceVal =
        formatPart.length == 1 ? Val : ("00" + Val).substr(Val.length);
      fmt = fmt.replace(formatPart, replaceVal);
    }
  }
  return fmt;
};

const sourceData = [
  //测试数据
  { date: "2018-11-20", tomatocount: 6, taskCount: 0 },
  { date: "2018-11-21", tomatocount: 6, taskCount: 0 },
  { date: "2018-12-02", tomatocount: 3, taskCount: 1 },
  { date: "2018-12-03", tomatocount: 3, taskCount: 1 },
  { date: "2018-12-20", tomatocount: 6, taskCount: 0 },
  { date: "2018-12-21", tomatocount: 6, taskCount: 0 },
  { date: "2018-12-23", tomatocount: 5, taskCount: 2 },
  { date: "2018-12-24", tomatocount: 5, taskCount: 2 },
  { date: "2018-12-25", tomatocount: 5, taskCount: 1 },
  { date: "2018-12-29", tomatocount: 5, taskCount: 1 }
];

const DATA_FROM_BACKEND = {
  columns: ["date", "tomatocount", "taskCount"],
  rows: sourceData
};
const EMPTY_DATA = {
  columns: ["date", "tomatocount", "taskCount"],
  rows: []
};

function date_slice(start_date, end_date, source) {
  //从数据源切割
  var result = [];
  for (let j = 0; j < source.length; j++) {
    var item = source[j];
    //debugger;
    if (item.date >= start_date && item.date <= end_date) {
      result.push(item);
    } else if (item.date > end_date) {
      break;
    }
  }
  return result;
}

export default {
  data() {
    this.chartSettings = {
      xAxisType: "time"
    };
    this.userID = 2;
    this.grid = { right: 30 }; //坐标图右侧宽度为60
    return {
      value3: "",
      chartData: EMPTY_DATA,
      PO: {
        firstDayOfWeek: 1
      },
      tableData: EMPTY_DATA.rows,
      size: 0,
      pageSize: 10
    };
  },
  components: { VeLine },
  mounted() {
    openDB("weekDB");
    var now = new Date();
    // Lambda写法
    this.$http
      .get("http://localhost:8080//getHistoryData", {
        params: { userid: this.userID, date: now.format("yyyy-MM-dd") }
      })
      .then(res => {
        // 响应成功回调
        //console.log(res.body);
        //var selectedData = res.body;
        var selectedData = sourceData;
        this.tableData = selectedData;
        this.chartData.rows = selectedData;
        this.size = selectedData.length;
      })
      .catch(() => {
        var selectedData = sourceData;
        this.tableData = selectedData;
        this.chartData.rows = selectedData;
        this.size = selectedData.length;
        this.pageChange(1);
      });
  },
  methods: {
    timeChange(val) {
      //时间变化回调
      var selectedData = date_slice(val[0], val[1], sourceData);
      console.log(selectedData);
      this.tableData = selectedData;
      this.chartData.rows = selectedData;
      this.size = selectedData.length;
    },
    pageChange(index) {
      //页数变化回调
      var start = (index - 1) * this.pageSize;
      var end = index * this.pageSize;
      this.tableData = sourceData.slice(start, end);
      //this.pageCurrent=index;
    }
  }
};
</script>

<style>
.footer {
  margin-top: 50px;
}
</style>
