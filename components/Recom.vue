<template>
  <div class="container">
    <div class="section-header">
      <h2>推荐文章</h2>
      <div style="margin-top:10px">
        <el-tag
          class="head-tag"
          v-for="tag in tags"
          :key="tag.name"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          :type="tag.type"
        >{{tag.name}}</el-tag>
      </div>
    </div>
    <div class="section-container">
      <el-card class="box-card"  v-for="i in articles" :key="i.id">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1802563968,897623865&fm=15&gp=0.jpg" class="image">
        <div class="article-container">
          <a href="https://tutorialzine.com/articles">
            <h3>{{i.title}}</h3>
          </a>
          <p>{{i.content}}</p>
        </div>
        <div class="article-footer">
          <p class="aurthor">{{i.author}}</p>
          <p class="aurthor">{{i.clickcount}}</p>
          <p class="tag">{{i.tags}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
var sourceData = [{"tags":0,"title":"最适合入门的编程语言——python","content":null,"clickcount":"阅读数：3057","author":"cclplus"},{"tags":0,"title":"物联网安全综述报告","content":null,"clickcount":"阅读数：1251","author":"Newtol"},{"tags":0,"title":"编程语言Java的JDK","content":null,"clickcount":"阅读数：2265","author":"weilaizhou"},{"tags":0,"title":"Scrum团队应该如何选择Scrum工具？","content":null,"clickcount":"阅读数：1156","author":"Agile_zhanglao"},{"tags":0,"title":"终于有人把云计算、大数据和人工智能讲明白了！ （2）","content":null,"clickcount":"阅读数：2506","author":"网易云"},{"tags":0,"title":"docker入门（四）","content":null,"clickcount":"阅读数：2450","author":"Java小表弟"},{"tags":0,"title":"web 基础巩固——JSP基础","content":null,"clickcount":"阅读数：948","author":"SXJR"},{"tags":0,"title":"编程语言的分类Dynamic、Statically","content":null,"clickcount":"阅读数：1117","author":"freshZero_"},{"tags":0,"title":"一点资讯大数据面试题","content":null,"clickcount":"阅读数：1750","author":"柯南爱上指针"},{"tags":0,"title":"从程序员到架构师——踏上架构旅途 思考从未止步","content":null,"clickcount":"阅读数：1040","author":"博文视点"}]

export default {
  data() {
    return {
      articles: [],
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" }
      ]
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  },
    mounted() {
    // Lambda写法
    this.$http
      .get("http://localhost:8080/getPopularArticle")
      .then(
        res => {
          // 响应成功回调
          //console.log(res.body);
          this.articles = res.body;
        },
        res => {
          // 响应错误回调
          console.log("fail");
        }
      ).catch(
        ()=>{console.log("fail2");}
      );
  },
};
</script>

<style scoped>
.head-tag {
  margin: 3px;
}
.container {
  margin-left: 30px;
}

.tag {
  margin: 3px;
  border: 1px solid #dcdfe6;
  border-color: #ebeef5;
  border-radius: 18px;
  padding: 7px 15px;
  float: right;
}

.aurthor {
  color: #3dd07d;
  font-size: 14px;
  margin: 5px;
}

.article-footer {
  position: relative;
}

.article-container {
  padding: 14px;
  position: relative;
}

.section-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.section-header h2:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 70px;
  height: 2px;
  background: #3dd07d;
  transform: translateX(-50%);
}

.section-header h2 {
  position: relative;
  display: inline-block;
  font-size: 18px;
  padding-bottom: 10px;
}

.section-header-class {
  margin-top: 15px;
  font-size: 15px;
}

.section-header {
  margin: 0 0 60px;
  margin-top: 60px;
  text-align: center;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
}

.image {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  padding: "0px";
  width: 380px;
  margin: 13px;
}

h3 {
  color: #343434;
  font-size: 1.5em;
  line-height: 1.35;
  margin-bottom: 1em;
}
</style>

