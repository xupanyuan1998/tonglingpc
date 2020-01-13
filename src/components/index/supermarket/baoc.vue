<template>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="container">
        <div class="nav">
          <span @click="goindex">首页</span><b> ></b><span @click="goshe">金融超市</span><b> ></b><span >中国太平洋保险（集团）股份有限公司</span>
        </div>
        <div class="line"></div>
      </div>
      <div class="warp">
        <div class="int">
          <h4>公司简介</h4>
          <div class="yin">
            <div>
              <img src="../../../../static/images/235.png" alt="">
              <b>中国太平洋保险（集团）股份有限公司</b>
            </div>
            <p>中国太平洋保险（集团）股份有限公司（以下称“太平洋保险”）是在1991年5月13日成立的中国太平洋保险公司的基础上组建而成的保险集团公司，总部设在上海，是国内领先的“A+H”股上市综合性保险集团。
              太平洋保险以成为“行业健康稳定发展的引领者”为愿景，牢牢把握高质量发展主线，专注主业、做精专业，用转型的“进”，实现了发展的“稳”。连续八年入选《财富》世界500 强，2018年位列第220位。太平洋保险2018年实现营业收入3543.63亿元，其中保险业务收入3218.95亿元，同比增长14.3%；集团净利润为180.19亿元，同比增长22.9%。
              2018年，太平洋保险全面启动转型 2.0，重在转变增长方式、优化业务结构和转换发展动能，开启了太保高质量发展新征程。公司凭借高水平企业管治的杰出表现，在香港董事学会评选中荣获2018年度“杰出董事会奖”和“杰出董事奖”称号。
              太平洋保险通过科技创新，全面提升服务能级，为超过1.26亿名客户提供全方位风险保障解决方案、财富规划和资产管理服务。建成以客户为核心的大数据平台，在咨询、承保、理赔等服务中引入多项最新的人工智能技术，富有责任、智慧和温度的“太保服务”让客户更满意。太平洋产、寿险连续两年同获保险公司服务评价AA级和经营评级A级，成为行业服务和经营的新标杆。
              太平洋保险积极服务国家战略、实体经济和民生保障。护航一带一路，海外业务覆盖112个国家，为首届中国进口博览会提供总保额350亿元的一揽子财产保险解决方案。所承办的大病医保等项目惠及9500多万人，率先发布个人税延养老保险解决方案，“太保家园”养老社区建设实现新突破。
              平时注入一滴水，难时拥有太平洋。太平洋保险彰显责任担当，过去10年累计赔付金额近5600亿元。响应打赢脱贫攻坚战的国家战略，聚焦“三区三州”深贫地区，探索建立具有太保特色的精准扶贫长效机制。2018年，公司投入扶贫专项资金2130 万元，各类扶贫项目共覆盖建档立卡贫困户约429万人，为贫困地区提供总保额1.36万亿元的风险保障。
              太平洋保险将企业社会责任内化为可持续的发展动力。因在社会责任建设方面的扎实工作。2018年连续第九年获中国企业社会责任榜“杰出企业奖”，再次入选中国A股市场环境、社会和治理（ESG）“美好50指数成分股”。
              太平洋保险将继续以高质量发展为主线，推进实施“转型2.0”，围绕“客户体验最佳、业务质量最优、风控能力最强”的转型目标，用坚实的每一步打造 “行业健康稳定发展的引领者”。
            </p>
          </div>
        </div>
        <div class="int">
          <h4>组织架构</h4>
          <div class="jia">
            <img src="../../../../static/chao/11.png" alt="">
          </div>
        </div>
        <div class="int">
          <h4>保险服务</h4>
          <button @click="place">我要买保险</button>
        </div>
        <div class="int">
          <h4>我要评价</h4>
          <template>
            <div class="stars">
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
          </template>
        </div>
      </div>
      <div class="footer">
        <footer-nav></footer-nav>
      </div>
      <div class="place"  @mousewheel.prevent v-show="placeshow">
        <div class="ti">
          <h2>提示</h2>
          <p>即将开通,敬请关注!</p>
          <img src="../../../../static/images/96.png" alt="" @click="cloose">
        </div>
      </div>
    </div>
</template>

<script>
    import headNav from "../../headNav";
    import footerNav from "../../footer";
    import '../../../assets/css/stars.css';
    import '../../../assets/css/mianbao.less';
    export default {
        name: "baoc",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 4,
                placeshow:false,
                value:5
            }
        },
        components:{
            headNav,
            footerNav
        },
        methods:{
            place(){
                this.placeshow=true;
            },
            cloose(){
                this.placeshow=false;
            },
            //回首页
            goindex(){
                this.$router.push('/')
            },
            //金融超市
            goshe(){
                this.$router.push('/chaoshi')
            },
        }
    }
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: 20px auto;
    .int{
      margin-bottom: 30px;
      button{
        display: block;
        height: 50px;
        line-height: 50px;
        width: 200px;
        outline: none;
        border: none;
        background:#1abbf9;
        cursor: pointer;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0px 4px 10px 0 rgba(62, 62, 62, 0.1);
        margin:60px auto;
      }
      button:hover{
        background:#1b8cff;
      }
      h4{
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        color: #0e0d0d;
        border-bottom: 2px solid #ff4c4c;
        margin-bottom: 20px;
      }
      .ji{
        padding: 20px;
        overflow: hidden;
        li{
          width: 130px;
          height: 130px;
          float: left;
          margin-right: 40px;
          margin-bottom: 20px;
          img{
            display: block;
            width: 90px;
            height: 90px;
            margin: 0 auto;
          }
          span{
            margin-top: 10px;
            display: block;
            line-height: 30px;
            width: 100%;
            height: 30px;
            overflow: hidden;
            text-align: center;
          }
        }
      }
      .yin{
        overflow: hidden;
        div{
          width: 230px;
          margin-right:20px;
          margin-left: 20px;
          float: left;
          img{
            display: block;
            width: 100%;
            margin-bottom: 10px;
          }
          b{
            display: block;
            text-align: center;
            line-height: 30px;
          }

        }
        p{
          text-indent: 2em;
          padding: 20px;
          line-height: 40px;
          font-size: 18px;
        }
      }
      .banli{
        padding: 20px;
        font-size: 18px;
        line-height: 40px;
      }
      .save{
        cursor: pointer;
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 100px;
        color: #fff;
        font-size: 18px;
        border-radius: 5px;
        background:#66CCFF;
        border: none;
        outline: none;
        margin: 50px auto;
      }
      .save:hover{
        background: #2BB4F8;
      }
      h3{
        text-align: center;
        height: 40px;
        margin-bottom: 20px;
        font-size: 18px;

      }
      .li{
        table{
          margin:  0 auto;
          display: block;
          width: 900px;
        }
        td,th{
          width:260px;
          padding: 10px 20px;
          height: 40px;
          text-align: center;
          font-size: 16px;
        }
        td.left{
          text-align: left;
          background: #efefef;
        }
      }
    }
    .jia{
      padding: 0 20px;
      img{
       display: block;
        width: 800px;
        margin: 0 auto;
      }
    }
  }

</style>
<style scoped lang="less">
  .place{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.16);
    position:fixed;
    top: 0;
    left: 0;
    transition: all 0.5s;
    .ti{
      position: absolute;
      width: 300px;
      height: 200px;
      background: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
      h2{
        height: 30px;
        font-size: 18px;
        color: #fe0000;
        font-weight: 500;
        line-height: 30px;
        padding-left: 20px;
        border-bottom: 1px solid #fe0000;
        margin-top: 10px;
      }
      p{
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 80px;
      }
      img{
        position: absolute;
        top: -15px;
        right: -15px;
        transition: all 0.2s;
      }
      img:hover{
        transform: rotate(360deg);
      }
    }
  }
</style>
