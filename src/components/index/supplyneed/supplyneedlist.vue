<template>
  <div>
    <div class="top">
      <head-nav :title="toptitle" :clect="clectnav"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span >供需速递</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <h2>供需速递</h2>
      <div class="serch">
        <input type="text" placeholder="请输入关键字" v-model="serch" />
        <button @click="serchas">搜索</button>
      </div>
      <ul>
        <li class="con">
          <span class="need">
            <span>供需</span>
            <span class="changpin">产品</span>
          </span>
          <span class="num">
            <span>数量</span>
            <span class="day">截止日</span>
          </span>
        </li>
        <!-- <li v-for="(item,idx) in newsList" :key="idx">
          <span class="surplus">【3天】</span>
          <b></b>
          <router-link
            :to="{path:'/newslist/newsdetali',query:{id:item.newsId}}"
            tag="a"
          >{{item.title}}</router-link>
          <span>{{clearFen(item.addTime)}}</span>
        </li>-->
        <li v-for="(item,idx) in newsList" :key="idx">
            <span class="lefBox">
              <i v-if="item.type==1" class="surplus">【供应】</i>
              <i v-if="item.type==2" class="demand">【需求】</i>
              <router-link :to="{path:'/supplyneedlist/supplyneeddetail',query:{id:item.supplyanddemandId}}" class="xiaoshou">{{item.productname}}</router-link>
            </span>
            <span class="rightBox">
              <i class="treeNum">{{item.number}}</i>
              <em class="time">{{clearFen(item.endtime)}}</em>
            </span>
        </li>
      </ul>
    </div>
    <div class="page">
      <!--        分页组件-->
      <div>
        <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
        <div class="pageComponent" v-if="pageConfig.total">
          <!--上一页-->
          <button @click="prePage" :disabled="currentPage === 1" class="pagess">上一页</button>
          <!--总页数小于8的-->
          <template v-if="pageTotal <= showPageNo">
            <button
              v-for="i in pageTotal"
              @click="changeCurrentPage(i)"
              :class="{active:i === currentPage}"
              :key="i"
            >{{i}}</button>
          </template>
          <template v-else-if="currentPage < 4">
            <button
              v-for="i in 6"
              @click="changeCurrentPage(i)"
              :class="{active:i === currentPage}"
              :key="i"
            >{{i}}</button>
            <button :disabled="true">···</button>
            <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
          </template>
          <template v-else-if="currentPage > pageTotal - 4">
            <button @click="changeCurrentPage(1)">1</button>
            <button :disabled="true">···</button>
            <button
              v-for="i in 6"
              @click="changeCurrentPage(i + (pageTotal - 6))"
              :class="{active:(i + (pageTotal - 6)) === currentPage}"
              :key="i"
            >{{i + (pageTotal - 6)}}</button>
          </template>
          <template v-else>
            <button @click="changeCurrentPage(1)">1</button>
            <button :disabled="true">···</button>
            <button @click="changeCurrentPage(currentPage - 2)">{{currentPage - 2}}</button>
            <button @click="changeCurrentPage(currentPage - 1)">{{currentPage - 1}}</button>
            <button class="active">{{currentPage}}</button>
            <button @click="changeCurrentPage(currentPage + 1)">{{currentPage + 1}}</button>
            <button @click="changeCurrentPage(currentPage + 2)">{{currentPage + 2}}</button>
            <button :disabled="true">···</button>
            <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
          </template>
          <!--下一页-->
          <button @click="nextPage" :disabled="currentPage === pageTotal" class="pagess">下一页</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
import headNav from "../../headNav";
import footerNav from "../../footer";
import '../../../assets/css/mianbao.less'
import '../../../assets/css/page.less'
export default {
  name: "newslist",
  components: { headNav, footerNav },
  data() {
    return {
      toptitle: "铜陵市民营经济云服务智慧平台",
        clectnav: 0,
      showPageNo: 8,
      currentPage: 1,
      pageTotal: "", //总的页数
      pageConfig: {
        pageSize: 20, //一页的数据条数
        total: "" //总的数据条数
      },
      newsList: [],
      serch: ""
    };
  },
  created() {
    var datas={
      current:this.currentPage,
      size:this. pageConfig.pageSize,
      title:this.serch,
      type:-1
    };
    this.getnewList(datas);
  },
  methods: {
    serchas() {
      var datas={
        current:this.currentPage,
        size:this. pageConfig.pageSize,
        title:this.serch,
        type:-1
      };
      this.getnewList(datas);
    },
    prePage() {
      this.currentPage -= 1;
      var datas={
        current:this.currentPage,
        size:this. pageConfig.pageSize,
        title:this.serch,
        type:-1
      };
      this.getnewList(datas);
    },
    nextPage() {
      this.currentPage += 1;
      var datas={
        current:this.currentPage,
        size:this. pageConfig.pageSize,
        title:this.serch,
        type:-1
      };
      this.getnewList(datas);
    },
    changeCurrentPage(i) {
      this.currentPage = i;
      var datas={
        current:this.currentPage,
        size:this. pageConfig.pageSize,
        title:this.serch,
        type:-1
      };
      this.getnewList(datas);
    },
    getnewList(datas) {
      this.axios
        .post("/web/company/supplyanddemandpage", datas)
        .then(({ data }) => {
          this.pageTotal = data.data.pages;
          this.currentPage = data.data.current;
          this.pageConfig.pageSize = data.data.size;
          this.pageConfig.total = data.data.total;
          this.newsList = data.data.records;
          console.log(data.data.total);
        });
    },
    showslect(i) {
      this.left_show = i;
    },
    clearFen(i) {
      return i.substring(0, i.indexOf(" "));
    },
    goindex(){
      this.$router.push('/')
    },
  }
};
</script>
<style scoped lang="less">
.warp {
  width: 1130px;
  margin: 0 auto;
  padding: 34px 50px 0 20px;
  position: relative;
  .serch {
    position: absolute;
    top: 33px;
    right: 81px;
    width: 204px;
    height: 36px;
    border: 1px solid rgba(179, 179, 179, 1);
    border-radius: 0px 4px 4px 0px;
    input {
      display: block;
      float: left;
      border: none;
      outline: none;
      height: 36px;
      line-height: 36px;
      width: 124px;
      padding: 0 10px;
    }
    button {
      cursor: pointer;
      display: block;
      float: left;
      border: none;
      outline: none;
      width: 60px;
      height: 36px;
      background: rgba(231, 57, 10, 1);
      border-radius: 0px 4px 4px 0px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  h2 {
    height: 49px;
    border-bottom: 1px solid #e7390a;
    line-height: 49px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(231, 57, 10, 1);
  }
  ul {
    width: 1100px;
    min-height: 650px;
    padding: 0 15px 12px;
    position: relative;
    li.con {
      width: 100%;
      height: 34px;
      line-height: 34px;
      background: rgba(235, 235, 235, 1);
      padding: 0 110px 0 20px;
      box-sizing: border-box;
      border: none;
      margin: 20px 0;
      overflow: hidden;
      .need {
        float: left;
        .changpin {
          margin-left: 82px;
        }
      }
      .num {
        float: right;
        .day {
          margin-left: 235px;
        }
      }
    }
    li {
      height: 41px;
      line-height: 41px;
      border-bottom: 1px dashed #c5c5c5;
      padding-right: 30px;
      overflow: hidden;
        .lefBox {
         float: left;

          .surplus {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(231, 57, 10, 1);
          }
          .demand {
            color: #32A49C;
          }
          .xiaoshou {
            display: inline-block;
            margin-left: 50px;
            width: 500px;
            overflow: hidden;
            vertical-align: middle;
          }
        }
        .rightBox {
          float: right;
          width: 400px;
          .treeNum {
            display: inline-block;
            width: 277px;
            overflow: hidden;
            vertical-align: middle;
          }
          .time {
              display: inline-block;
          }
        }

    }

    li:last-child {
      border: none;
    }
  }
}
.page {
  margin: 30px 0;
  text-align: center;
  div {
    display: inline-block;
  }
}
</style>
