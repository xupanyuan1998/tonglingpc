<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >中海环境科技（上海）股份有限公司</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/6.jpg" alt="">
          </div>
          <p>中海环境科技（上海）股份有限公司隶属于中国远洋海运集
            团有限公司，是由上海船舶运输科学研究所为主发起的、在整合
            全部环境相关业务的基础上设立的股份制高新技术企业。公司控股股
            东上海船舶运输科学研究所成立于1962年，是我国最大的交通运输及航运
            综合技术研究开发基地，原为交通部直属科研事业机构，2000年转制为科
            技型企业，改由中央企业工作委员会领导，2003年划归国务院国有资产监
            督管理委员会管理，2010年经国务院批准，整体并入原中国海运（集团）总公司。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/7.jpg" alt="">
        </div>
      </div>
      <div class="int">
        <h4>公司资质</h4>
        <div class="jia">
          <img src="../../../../static/chao/23.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>环评服务</h4>
        <button @click="gohuan">我要环评</button>
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
    import '../../../assets/css/mianbao.less'
    export default {
        name: "zhonghai",
        data(){
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 5,
                placeshow:false,
                value:4.8
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
