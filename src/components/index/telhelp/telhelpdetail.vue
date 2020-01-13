<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span >联系帮扶</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftlist" :class="leftShow==idx?'select':''" @click="cleft(idx,item)">{{item}}</h3>
      </div>
      <div class="right">
        <h3 class="title">我市掀起优化营商环境宣传贯彻新热潮</h3>
        <div class="r">
          <p class="int"><span>发布时间：2019-12-21 10:20:20</span><span>信息来源：市“四送一服”双千工程领导小组办公室</span></p>
        </div>
        <div class="content">
          <p style="line-height: 40px">
            <span style="color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: 14px; background-color: rgb(255, 255, 255);">&nbsp; &nbsp; &nbsp; &nbsp;<span style="color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; background-color: rgb(255, 255, 255); font-size: 18px;"></span>2019年以来，我市持续深化放管服改革，加快转变政府职能，主动作为，创新思路，着力打造一流营商环境。省“互联网+营商环境监测”系统显示，铜陵市营商环境（1-10月）综合排名位居全省第5位。企业开办、不动产登记、办理破产、获得电力等指标为全省亮点。在《安徽省实施&lt;优化营商环境条例&gt;办法》、《创优营商环境提升行动方案升级版》、《优化营商环境条例》等政策法规发布后，全市上下更是掀起了宣传贯彻的新热潮。</span><br/><span style="color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: 14px; background-color: rgb(255, 255, 255);">　　据了解，在市委、市政府统一部署要求下，各级各部门利用党委（党组）理论中心组学习、支部学习和机关学习等平台，专题学习《优化营商环境条例》等政策法规内容，并结合本地本部门的工作职责，找差距，抓落实。2019年12月31日，市政府党组理论学习中心组学习会，专题学习了国务院《优化营商环境条例》等政策法规。市“四最”工作领导小组、各县区也纷纷组织召开贯彻落实《优化营商环境条例》工作座谈会，学习条例具体内容，并将正在开展的有关工作与条例内容进行逐一对比，逐项对照找差距抓落实，并结合实际提出贯彻落实的具体工作安排。</span><br/><span style="color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: 14px; background-color: rgb(255, 255, 255);">　　自条例发布后，全市各级新闻媒体、网络媒体、融媒体纷纷进行专题宣传，报道《优化营商环境条例》等政策法规出台背景、具体内容和我市贯彻落实的做法等。皖西日报开设的“创优营商大环境 跑出发展加速度”专栏，市广播电视台策划推出的《营商环境全追踪》栏目等，通过动态新闻、人物专访、专题评论等形式，大力宣传《优化营商环境条例》等政策法规内容及我市贯彻落实做法等。铜陵市政府网、铜陵新闻网、各县区政府网站等市内重点新闻网站和主要商业网站等媒体多管齐下、各取所长，有的在首页醒目位置开设专栏，有的积极运用新技术制作融媒体产品，通过微博、微信、抖音等新媒体平台密集报道、集中推送，进一步宣传了各级各部门在优化营商环境中的新举措、新成效、新变化。</span><br/><span style="color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: 14px; background-color: rgb(255, 255, 255);">　　1月6日至7日，省政府办公厅秘书五室牵头工作小组赴我市，通过进企业、进园区等方式，分行业、分部门进行宣传指导，也取得了良好的效果。另外，市8个常态化工作小组将继续坚持每月赴各县区，就条例的宣传贯彻进一步开展形式多样的活动，向各级干部、各类园区和企业负责人宣传解读《条例》等政策法规。</span><br/><span style="color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: 14px; background-color: rgb(255, 255, 255);">　　下一步，我市各级各部门会继续把《优化营商环境条例》等政策法规宣传工作作为当前一项重点工作，坚持正确舆论导向，在公共场所和交通要道进行深度宣传，邀请省级以上主流新闻媒体记者来我市采访，充分报道我市贯彻落实《优化营商环境条例》等政策法规采取的新举措、取得的新经验、涌现的新典型、发生的新变化等方式，让广大干部群众充分认识制定《优化营商环境条例》等政策法规的重要意义，提高公众知晓率，扩大社会影响力，为《优化营商环境条例》等政策法规的贯彻实施营造更加良好的氛围。</span>
          </p>
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
    import footerNav from "../../footer"
    import '../../../assets/css/page.less'
    import  '../../../assets/css/list.less'
    import  '../../../assets/css/mianbao.less'
    export default {
        name: "informationMore",
        data() {
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 8,
                leftlist:['工作动态','问题搜集'],
                leftShow:0,
            }
        },
        components: {
            headNav,
            footerNav
        },
        methods:{
            goindex(){
                this.$router.push('/')
            },
            cleft(i,b){
                this. leftShow=i;
              this.$router.push('/telhelp')
            },
        },

        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            }
        },
    }
</script>
<style scoped lang="less">
  .hello{
    background: #fff;
  }
  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 21px ;
    position: relative;
    padding-bottom: 30px;
    .left{
      float: left;
      margin-right: 20px;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      background: #fff;
      h3{
        cursor: pointer;
        width:186px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        text-align: center;
        font-size:18px;
        font-weight:400;
        color:#454545;
      }
      h3.select{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
      h3:hover{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
    }
    .right{
      float: left;
      width:949px;
      min-height: 400px;
      background: #fff;
      border:1px solid rgba(217,217,217,1);
      padding:17px 20px ;
      position: relative;
      .title{
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        padding: 20px 0;
      }
      .r{
        display: flex;
        justify-content: center;
        padding: 20px 0;
        .int{
          display: flex;
          flex-direction: row;
          span{
            margin-right: 40px;
            font-size: 16px;
          }
          span:last-child{
            margin-right: 0;
          }
        }
      }
      .content{
        padding: 30px;
      }
    }
  }
  .page{
    margin: 30px 0;
    text-align: center;
    div{
      display: inline-block;
    }
  }
</style>
<style scoped lang="less">
  .placesa{
    width: 100vw;
    height: 100vh;
    background:rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .ca{
      width:350px;
      height:200px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      h1{
        width:337px;
        height:30px;
        line-height: 30px;
        background:rgba(227,65,21,1);
        border-radius:4px 4px 0px 0px;
        padding-left: 13px;
        font-size:16px;
        font-weight:400;
        color:rgba(254,254,255,1);
      }
      p{
        margin-top: 4px;
        height: 93px;
        line-height: 93px;
        background: #fff;
        text-align: center;
        font-size:16px;
        font-weight:400;
        color:rgba(69,69,69,1);
        border-bottom: 1px dashed #e3e3e3;
      }
      button{
        margin: 18px auto 0;
        width:70px;
        height:30px;
        background:rgba(227,65,21,1);
        border-radius:4px;
        display: block;
        outline: none;
        border: none;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    .success{
      width:241px;
      height:263px;
      padding: 0 48px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      img{
        width: 44px;
        height: 44px;
        display: block;
        margin: 24px auto 0;
      }
      h2{
        text-align: center;
        height:22px;
        font-size:24px;
        font-weight:400;
        color:rgba(77,77,77,1);
        margin-top: 11px;
      }
      p{
        margin-top: 29px;
        height:79px;
        font-size:20px;
        font-weight:400;
        color:rgba(89,89,89,1);
        line-height:30px;
      }
    }
    .logins{
      width:422px;
      height:518px;
      background:rgba(255,255,255,1);
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      h2{
        margin-top: 32px;
        font-size:20px;
        font-weight:400;
        color:rgba(229,53,9,1);
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #E53509;
      }
      ul{
        margin: 40px auto 0;
        width:284px;
        background:rgba(255,255,255,1);

        li{
          height:38px;
          width:282px;
          border:1px solid rgba(227,227,227,1);
          border-radius:2px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          img{
            margin-left: 7px;
          }
          input{
            width: 234px;
            padding: 0 10px;
            border: none;
            outline: none;
          }
        }
      }
      button{
        width:284px;
        height:36px;
        background:rgba(229,53,9,1);
        border-radius:2px;
        outline: none;
        border: none;
        font-size:16px;
        text-align: center;
        line-height: 36px;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin: 0 auto;
        display: block;
      }
      div{
        height: 48px;
        width:284px;
        margin: 0 auto;
        span{
          display: block;
          float: left;
          cursor:pointer;
          height: 45px;
          line-height: 45px;
          font-size:14px;
          font-weight:400;
          color:rgba(41,93,211,1);
        }
        span:last-child{
          float: right;
        }
      }
      .cloose{
        width: 30px;
        height: 30px;
        position: absolute;
        top: -20px;
        right: -15px;
      }
    }
  }
</style>
<style>
  .el-input__inner{
    border: none;
  }
</style>
