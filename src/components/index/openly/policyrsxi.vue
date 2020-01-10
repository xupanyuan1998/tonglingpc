<template>
  <div class="hello">
    <!-- 头部 -->
    <div class="top">
      <head-nav :title="toptitle"></head-nav>
    </div>

    <div class="select">
      <!-- 导航栏S -->
      <div class="nav">
        <a href="#">政务公开</a>
        <em>></em>
        <a href="#">人事信息</a>
      </div>
      <!-- 导航栏E -->
      <!-- 主页面区域S -->
      <div class="image">
        <img src="../../../../static/images/22.png" alt />
        <div class="images">
          <h3>陈利耘</h3>
          <div class="container">
            <span>职务:</span>
            <span>
              <p>铜陵市人民政府政务服务中心党组书记、主任</p>
              <p>铜陵市民营经济促进局局长</p>
            </span>
            <!-- 履历 -->
            <span>履历:</span>
            <span>
              <p>陈利耘，男，汉族，1971年11月出生，籍贯安徽池州，大学学历，文学学士，中共党员，</p>
              <p>现任市政务服务中心党组书记、主任：铜陵市民营经济促进局局长。</p>
            </span>
            <span>简历:</span>
            <span class="active">
              <p>1989.9-1993.7 安徽师范大学中文系读书；</p>
              <p>1993.7-2002.8 市计委经济信息中心科员、副科秘书；</p>
              <p>2002.8-2005.10 市人社局公务员管理科主任科员</p>
              <p>2005.11-2010.9 市编办事业机构编制科长、行政机构编制科兼监督检查科长、综合科长；</p>
              <p>2010.10-2018.3 市编办副主任；</p>
              <p>2018.3-至今 铜陵市人民政府政务服务中心党组书记、主任。</p>
              <p>工作分工： 主持中心党政全面工作</p>
            </span>
          </div>
        </div>
      </div>
      <!-- 主页面区域E -->
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
      toptitle: "铜陵市民营经济云服务智慧平台"
    };
  },
  components: { headNav, footerNav },
  methods: {},
  mounted() {}
};
</script>
<style lang='less'>
.hello {
  background: #f5f5f5;
}
.select {
  background-color: #ffffff;
  // width: 920px;
  // 导航栏
  .nav {
    margin-left: 360px;
    a {
      font-size: 14px;
      color: #666666;
      padding: 0 10px;
    }
  }
  // 主页面区域
  .image {
    background-color:  #f5f5f5;
;
    margin-left: 375px;
    margin-top: 10px;
    display: flex;
    img {
      width: 200px;
      height: 261px;
      padding-top: 30px;
      padding-left: 10px;
    }
    .images {
      flex: 1;
      margin-top: 33px;
      h3 {
        color: #454545;
        font-size: 16px;
        padding-left: 10px;
        margin-bottom: 27px;
      }
      .container {
        margin-left: 10px;
        margin-bottom: 275px;
        span {
          font-size: 16px;
          color: #454545;
        }
        p {
          position: relative;
          padding-left: 52px;
          font-size: 16px;
          color: #454545;
          top: -21px;
        }
        .active {
             line-height: 45px;
        }
      }
    }
  }
}
</style>
