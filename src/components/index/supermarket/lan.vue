<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >安徽蓝天会计师事务所</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/3.jpg" alt="">
            <b>安徽蓝天会计师事务所</b>
          </div>
          <p>安徽蓝天是具有多种从业资格的综合型中介机构。其前身是由铜陵市审计局于1988年成立的
            铜陵市审计事务所（自收自支的副县级单位），1999年12月根据《安徽省会计师（审计）事务
            所脱钩改制实施意见》的规定进行脱钩改制，成立有限责任式的会计师事务所，经多年发展具有
            多种资质平台，多个机构，统一定名为“安徽蓝天”。
            安徽蓝天技术力量雄厚：现有固定从业人员50名，其中注册会计师34名、注册资产评估师8人、
            注册税务师13名、注册造价（监理）工程师11名、土地估价师6名、房地产估价师10名、司法鉴
            定人28名、节能评估师7名、二手车评估师6名。
            安徽蓝天社会信誉良好：安徽蓝天涉足铜陵各行业及各经济领域，我们的足迹遍布青阳、石台、
            池州、黄山、安庆、芜湖、合肥、深圳、上海等地。我们一贯秉承“以责任凝聚，以实践立帜，以
            专业求效，以博学实基”这一信念，以为客户提供优质服务为理念，与客户共同进步、共赢发展，
            有着良好的社会信誉： 2003-2013年度列安徽省会计师事务所及资产评估机构前20强，2004-2008
            年被市工商局评为“优秀诚信企业”、“重合同守信用单位”， 2009年-2014年度被省工商局授予省级
            重合同守信用单位，2011年被省建筑工程招标协会授予 “双满意工程招标代理机构”荣誉称号，2004
            -2014年被市建工局评为“优秀招标代理企业”和“优秀工程造价咨询企业”，2013年被省造价协会评为
            2011-2012年度全省工程造价咨询企业先进单位，安徽省档案管理一级单位、2013年度安徽省诚信企业。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/10.jpg" alt="">
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <ol>
          <li>
            <span >电话：</span>
            <span>0562-2172288</span>
          </li>
          <li><span>传真：</span><span>0562-2877257</span></li>
          <li>
            <span>地址：</span>
            <span>铜陵市北京西路655号</span>
          </li>
          <li>
            <span>邮箱：</span>
            <span>ahlt-gxl@163.com</span>
          </li>
        </ol>
      </div>
      <div class="int">
        <h4>企业服务</h4>
        <button @click="place">我要审计</button>
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
        name: "lan",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
                placeshow:false,
                value:3.8
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
            //企业设立
            goshe(){
                this.$router.push('/services')
            }
        }
    }
</script>

<style scoped lang="less">
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
      ol{
        padding: 20px;
        li{
          max-height: 60px;
          line-height: 30px;
          font-size: 16px;
          overflow: hidden;
          span{
            display: inline-block;
          }
          span.left{
            display:block;
            float: left;
          }
          .right{
            float: left;
            width: 1000px;
            span{
              font-weight: normal !important;
            }
          }
          span:first-child{
            font-weight: bold;
          }
        }
      }
      .gu {
        overflow: hidden;
        img {
          display: block;
          margin: 0 auto;
        }
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
            font-size: 18px;
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
  .hello{
    background: #fff;
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
