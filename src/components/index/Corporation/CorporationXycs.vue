<template>
  <div class="hello">
    <!-- 头部 -->
    <div class="top">
      <head-nav :title="toptitle"></head-nav>
    </div>

    <div class="header">
      <!-- 导航栏S -->
      <div class="nav">
        <a href="#">民企风采</a>
        <em>></em>
        <a href="#">信用查询</a>
        <em>></em>
        <a href="#">行政处罚</a>
      </div>
      <!-- 导航栏E -->
      <div class="leftNav">
        <!-- 左侧侧边栏S -->
        <ul class="left">
          <li v-for="(item,idx) in leftList" :key="idx" @click="chooose(idx)">
            <a href="javascript:">{{item}}</a>
          </li>
        </ul>
        <!-- 右侧实现效果 -->
        <div class="right" v-if="leftShow==0">行政许可</div>
        <div class="right" v-if="leftShow==1">行政处罚</div>
        <div class="right" v-if="leftShow==2">红榜名单</div>
        <div class="right" v-if="leftShow==3">黑榜名单</div>
      </div>
    </div>
    <!-- 尾部 -->
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
import headNav from "../../headNav";
import footerNav from "../../footer";
import "../../../assets/css/page.less";
export default {
  name: "policyrsxi",
  data() {
    return {
      toptitle: "铜陵市民营经济云服务智慧平台",
      leftList: ["行政许可", "行政处罚", "红榜名单", "黑榜名单"],
      leftShow: 0
    };
  },
  components: {
    headNav,
    footerNav
  },
  created() {},
  methods: {
    chooose(i) {
      this.leftShow = i;
    }
  },
  mounted() {}
};
</script>
<style lang='less'>
.hello {
  background: #f5f5f5;
}
.header {
  background-color: #ffffff;
  // 导航栏
  .nav {
    margin-left: 360px;
    a {
      display: inline-block;
      font-size: 14px;
      color: #666666;
      padding: 0 10px;
    }
  }
  .leftNav {
    width: 100%;
    background: #f5f5f5;
    margin-top: 30px;
    line-height: 35px;
    margin-bottom: 650px;
    padding-top: 10px;
    // 左侧侧边栏
    .left {
      display: block;
      li {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-left: 360px;
        width: 185px;
        height: 47px;
        line-height: 40px;
        text-align: center;
        border: 1px solid rgba(217, 217, 217, 1);
        color: #454545;
      }
      li:hover {
        border-bottom: 1px solid #ff4d4d;
      }
      li:hover a {
        color: #ff4d4d;
      }
    }
    .right {
      bottom: 296px;
      position: absolute;
      color: rgba(232, 57, 10, 1);
      font-size: 20px;
      left: 569px;
    }
  }
}
</style>

