<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">金融超市</span><b> ></b><span >安徽安元创新风险投资基金有限公司</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/3.jpg" alt="">
            <b>安徽安元创新风险投资基金有限公司</b>
          </div>
          <p>为进一步推进安徽经济结构调整和产业升级，促进多层次资本市场建设，扩大企业直接融资比重，根据省政府领导指示，并经省国资委批准，国元集团、国元证券共同作为主发起人，联合省内实力雄厚的交控集团，省投集团（出资主体：铁路基金）、国贸集团（出资主体：国贸联创）、国资运营公司等六家大型国有企业于2015年6月30日共同发起设立安徽安元投资基金有限公司（简称：安元基金）。同时，上述发起人股东单位又联合股交中心、黄山公司共同发起设立安徽安元投资基金管理有限公司（简称：管理公司）作为专业管理机构受托管理安元基金的全部资产。
            安元基金实收注册资本30亿元，定位为开放创新型母基金。其中一部分用于直接股权投资，大部分用于引进社会资本发起设立子基金（包括区域专项子基金、并购子基金、债券子基金等），这种基金模式创新，使得母基金与系列子基金相呼应，共同形成一个“蜂窝状、可拆卸”的母子基金体系架构，可以因时制宜、因地制宜，根据资本市场环境变化、自身定位调整对各类子基金发展规模、速度，进行调节和控制。安元基金投资方向主要以服务培育安徽省重点发展领域的优质企业和加快省内多层次资本市场体系建设为主。同时，面对省内资本市场深化改革、产业整合全球化大趋势，安元基金立足安徽，放眼全国乃至全球资本市场，遵循市场化原则，以获利最大化为目标，紧跟传统产业整合升级、新型产业蓬勃发展的时代潮流，准确把握经济周期变化过程中的投资时机，运用“PE+上市公司”“PE+投行”
            等投资组合模式，全面开展并购重组业务，在资本市场上大显身手。</p>
          <button @click="joinan">进入网站</button>
        </div>
      </div>
      <div class="int">
        <h4>股权结构</h4>
        <div class="gu">
          <img src="../../../../static/chao/12.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>联系我们</h4>
        <ol>
          <li><span>传真：</span><span>0551-63894124</span></li>
          <li><span>邮箱：</span><span>zhangfabao@ayfund.net</span></li>
          <li><span>地址：</span><span>合肥市高新区创新创业园二期E1栋527室</span></li>
        </ol>
      </div>
      <div class="int">
        <h4>企业服务</h4>
        <button @click="place">我要投资</button>
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
        name: "anyuan",
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
            joinan(){
                window.open('http://www.ayfund.net','_blank');
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
      ol{
        padding: 20px;
        li{
          height: 30px;
          line-height: 30px;
          font-size: 18px;
          span{
            display: inline-block;
          }
          span:first-child{
            font-weight: bold;
          }
        }
      }
      .gu{
        overflow: hidden;
        img{
          display: block;
          margin: 0 auto;
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
