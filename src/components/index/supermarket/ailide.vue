<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >安徽爱立得人力资源有限公司</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/3.jpg" alt="">
            <b>安徽爱立得人力资源有限公司</b>
          </div>
          <p>安徽爱立得人力资源有限公司是安徽省人力资源服务实力企业，注册资金500万，是安徽省较早开展人力资源外包服务企业和人力资源外包行业实力企业。爱立得凭借优良的管理和业界信誉，获得政府行政主管部门和广大企业的好评。
            　　公司凭借专业的服务团队，深化服务内容、扩大服务区域，致力于向客户提供高品质人事外包、劳务派遣、业务外包及猎头等服务。公司将致力于成为人力资源外包服务领域的专注者与耕耘者，立足于安徽、辐射华东、面向全国，成为能够与客户同步发展的合作伙伴。
            　　主营业务：猎头服务＼培训咨询＼人才派遣＼人事代理＼业务外包。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/31.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <ol>
          <li><span>公司地址：</span><span> 安徽阜阳市一道河中路28号万方广场3号楼14层</span></li>
          <li><span>移动电话：</span><span>15755885728</span></li>
          <li><span>联&nbsp;系&nbsp;&nbsp;人：</span><span> 王经理</span></li>
          <li><span>固定电话：</span><span> 0558-2666658</span></li>
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
    import footerNav from "../../footer"
    import '../../../assets/css/stars.css';
    import '../../../assets/css/mianbao.less'
    export default {
        name: "ailide",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
                placeshow:false,
                value: 4.8,
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
            goindex(){
                this.$router.push('/')
            },
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
  .stars{
    height: 40px;
    padding: 40px 20px;
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
<style>
  .el-rate__icon{
    font-size: 40px !important;
  }
  .el-rate__text{
    font-size: 20px !important;
    margin-left: 20px;
  }
</style>
