<template>
  <div class="container">
    <div class="list" v-for="(item,index) in comData" :key="index">
      <div class="ticket">
        <div class="avatar">
          <img src="avatar">
        </div>
        <div class="title">
          <span v-if="item.isAdmin" class="status-open mini-status">管理员</span>
          {{item.title}}
        </div>
        <div class="content">{{item.content}}</div>
        <div class="author">
          by
          {{item.author}}
          <br>
          <span class="time">{{item.time}}</span>
        </div>
      </div>
    </div>
    <el-button class="newButton" type="primary" icon="el-icon-edit" @click="newFeed" plain>新建反馈</el-button>
    <Page :total="size" :page-size="pageSize" @on-change="pageChange" show-elevator class="footer"/>
  </div>
</template>

<script>
var testData = [
  {
    title: "应用内存占用过高",
    time: "01/03 @ 13:17",
    author: "oilover",
    content: "应用内存占用过高",
    isAdmin: true
  },
  {
    title: "应用内存占用过高",
    time: "01/03 @ 13:17",
    author: "oilover",
    content: "应用内存占用过高",
    isAdmin: true
  },
  {
    title: "应用内存占用过高",
    time: "01/03 @ 13:17",
    author: "oilover",
    content: "应用内存占用过高",
    isAdmin: true
  },
  {
    title: "应用内存占用过高",
    time: "01/03 @ 13:17",
    author: "oilover",
    content: "应用内存占用过高",
    isAdmin: false
  },
  {
    title: "应用内存占用过高",
    time: "01/03 @ 13:17",
    author: "oilover",
    content: "应用内存占用过高",
    isAdmin: true
  }
];

export default {
  name: "Order",
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  },

  data() {
    return {
      avatar:
        "http://cdn.v2ex.com/gravatar/d86a1f8a3c75e155a0417a9af2a41ade?s=48&amp;d=mm",
      comData: testData,
      size: 0,
      pageSize: 10,
      remarks: ""
    };
  },
  computed: {
    totalPrice() {
      let price = 0;
      this.goodsCheckList.forEach(item => {
        price += item.price * item.count;
      });
      return price;
    }
  },
  methods: {
    newFeed() {
      console.log("feedback");
      this.$router.push({ name: "FeedBack" });
    },
    pageChange(index) {
      //页数变化回调
      var start = (index - 1) * this.pageSize;
      var end = index * this.pageSize;
      this.tableData = this.chartData.rows.slice(start, end);
      //this.pageCurrent=index;
    },
    select(selection, row) {
      console.log(selection);
      this.goodsCheckList = selection;
    },
    changeAddress(data) {
      const father = this;
      this.address.forEach(item => {
        if (item.addressId === data) {
          father.checkAddress.name = item.name;
          father.checkAddress.address = `${item.name} ${item.province} ${
            item.city
          } ${item.address} ${item.phone} ${item.postalcode}`;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.newButton {
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.3em;
}

.footer {
  margin-top: 60px;
}

.time {
  color: #777;
  font-style: italic;
  font-size: 0.9em;
}

.mini-status.status-open {
  background: #52c27d;
}

.mini-status {
  display: inline-block;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  padding: 3px 4px 2px;
  line-height: 1;
  color: #fff;
  font-weight: 600;
  margin: 0 10px 0 0;
  position: relative;
  top: -2px;
  font-size: 10px;
  text-transform: uppercase;
  background: #ccc;
}

.container {
  max-width: 860px;
  margin: 0 auto 2em;
  min-height: 480px;
  width: 95%;
}

.ticket {
  position: relative;
  display: block;
  margin: 0;
  padding: 17px 90px 18px 74px;
  border-bottom: 1px #dfdfdf dashed;
  color: blue;
}

.title {
  font-size: 1em;
  padding-bottom: 0.5em;
  padding-top: 0;
  width: 85%;
  background: rgba(0, 0, 0, 0);
  font-weight: 400;
}

.reply {
  position: absolute;
  right: 1em;
  top: 2em;
  color: #ccc;
}

.content {
  font-size: 0.9em;
  color: #666;
}

.author {
  position: absolute;
  right: 1em;
  top: 2em;
  font-size: 0.9em;
  color: #666;
  /* float: right; */
}

.avatar {
  position: absolute;
  width: 64px;
  left: 10px;
  background: url(/src/assets/none.png) no-repeat;
  height: 64px;
}
</style>