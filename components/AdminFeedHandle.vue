<template>
  <div style="padding-left: 15%;  padding-right: 15%; margin-top: 20px">
    <el-table
      ref="singleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="时间" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120" sortable></el-table-column>
      <el-table-column prop="status" label="状态" width="120" sortable></el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent()" style="float: right ">取消选择</el-button>
    </div>
    <div v-if="hasSelect" height="60px" style="margin-top: 30px; ">
      <h1>回复</h1>
      <el-input type="textarea" v-model="reply" style="margin-top: 10px; margin-bottom:10px;"></el-input>
      <el-button type="primary" @click="submitReply" style="float: right;">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reply: "",
      currentRow: null,
      tableData3: [
        {
          date: "2016-05-03",
          name: "王大虎",
          status: "已处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          status: "已处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          status: "已处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          status: "已处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          status: "已处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          status: "已处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          status: "未处理",
          title: "上海市普陀区金沙江路 1518 弄",
          content: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  computed: {
    hasSelect() {
      return this.currentRow === null ? false : true;
    }
  },

  methods: {
    submitReply() {},
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      this.currentRow = null;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
