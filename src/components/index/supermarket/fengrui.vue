<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >铜陵市丰瑞贸易有限公司</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/8.jpg" alt="">
            <b>铜陵市丰瑞贸易有限公司</b>
          </div>
          <p>本公司一直保持着和铜陵市新桥矿业公司业务关系,不论市场怎么变化,我们公司都在发展贸易.有诚信的厂家我们可以联系交流,我们公司的宗旨:诚信.月供硫铁矿和硫精砂近一万吨和硫金砂需求每个月20000吨（含金2克以上)
            欢迎来到铜陵市丰瑞贸易有限公司网站， 具体地址是安徽省铜陵市铜官山区铜陵市铜官山区铜陵市淮河南路金色兰庭4号楼705，联系人是谢斌。
            主要经营硫精砂和硫金砂; 硫铁矿; 低硫高铁;。
            我们是一家专业从事化工产品研发与销售的综合型高科技服务性企业。公司主营化工 过氧化物 等！公司由一批化工领域的专业研究人员及从事多年化工销售团队组建而成。同时，我公司拥有完善的技术团队，能够及时为客户提供技术支持与服务。我公司自成立以来，一直秉承“科技创新，立足诚信，感恩于心”的理念，力求创造与客户合作共赢的局面。在广大新老客户的大力支持下，我公司员工经过不懈努力，公司已快速发展成为国内知名化工企业。公司一直与国内外大型化工企业保持良好的合作关系，使我公司的服务品质得到不断提高。“做客户信赖的化工产品可以选择]品牌”是企业坚持不懈的奋斗目标，我们也时时刻刻以此来严格要求自己。如果你对我们公司的产品感兴趣，期待您的来电咨询，期望与您携手共进，共创美好未来！
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/30.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <ol>
          <li><span>公司地址：</span><span> 安徽省 铜陵市 铜官山区 铜陵市铜官山区铜陵市淮河南路金色兰庭4号楼705</span></li>
          <li><span>移动电话：</span><span> 13955909988</span></li>
          <li><span>联&nbsp;系&nbsp;&nbsp;人：</span><span> 谢斌</span></li>
          <li><span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span><span> 2219309327@qq.com</span></li>
        </ol>
      </div>
      <div class="int">
        <h4>企业服务</h4>
        <button @click="place">咨询办理</button>
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
        name: "fengrui",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
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
            gohuan(){
                window.open('http://envir.coscoshipping.com/index.html','_blank')
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
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          span{
            display: inline-block;
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
          margin-top: 18px;
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
      .jia{
        padding: 0 20px;
        img{
          display: block;
          width: 800px;
          margin: 0 auto;
        }
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
