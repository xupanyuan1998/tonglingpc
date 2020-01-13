<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >铜陵市富达财务代理有限公司</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/3.jpg" alt="">
            <b>铜陵市富达财务代理有限公司</b>
          </div>
          <p>本公司经营工商、税务行业代办业务，为创业者提供专业、便捷的代理公
            司注册服务，办理各种繁琐的前置及后置专项许可审批；为准备扩大规模的企
            业提供快速、可靠的代理业务。专业代理公司注册、变更、验资、税务登记等一
            系列工商税务事项，为中小型企业提供专业的代理记账业务、乱帐整理、年检、
            财务咨询、税务咨询、财务制度制度等服务。我们是一个由多名老资历的注册会
            计师、注册税务师组成的财务管理咨询团队，致力于提升各类民营企业的财务和
            税务管理水平，以为各类民营企业提供高水平的财税咨询/财务顾问为主要服务项
            目。具有丰富的财务筹划、税务筹划及财务管理经验。我们的主要职责是：根据客
            户的实际状况，提出切合客户实际的具有针对性、实用性和可操作性的解决方案（
            化繁为简），以较小的成本提升企业的财务管理水平，降低风险、提升效益 。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/35.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <ol>
          <li>
            <span >电话：</span>
            <span>0562-2223982</span>
          </li>
          <li>
            <span >手机：</span>
            <span>13339255219</span>
          </li>
          <li>
            <span>地址：</span>
            <span>铜陵市石城大道与翠湖一路交汇处（大润发对面）汇富广场1607室</span>
          </li>
          <li>
            <span >联系人：</span>
            <span>姚经理  先生(经理)</span>
          </li>
          <li>
            <span >邮箱：</span>
            <span>981432841@qq.com</span>
          </li>
        </ol>
      </div>
      <div class="int">
        <h4>企业服务</h4>
        <button @click="place">我要办理</button>
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
        name: "fu",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
                placeshow:false,
                value:5,
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
