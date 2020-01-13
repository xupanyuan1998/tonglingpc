<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">金融超市</span><b> ></b><span >国元农业保险股份有限公司</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/1.jpg" alt="">
            <b>国元农业保险股份有限公司</b>
          </div>
          <p>国元农业保险股份有限公司是经中国保险监督管理委员会（保监发改〔2008〕54号）批准成立的第一家总部设在安徽的财产保险公司。公司由安徽省金融资产规模最大的国有大型金融控股企业安徽国元控股（集团）有限责任公司等26家企业共同设立。注册资本2103928900元人民币。注册地合肥。
            成立国元保险是安徽省委、省政府在社会主义新农村建设中着力解决“三农”问题，防范和化解农业风险，建立一项长效支农、惠农政策的重要举措。国元保险以“ 立足安徽、服务社会主义新农村建设”为宗旨，实行“三步走”发展战略。第一步是用1-3年时间完成安徽省内经营区域的全覆盖；第二步是用3-5年时间在周边省份铺设网点，使公司成为具有一定实力的区域性农业保险公司；第三步是面向全国，用5-8年时间把公司建设成为“资本充足、管理先进、服务一流、效益良好、品牌卓著”的国内一流的创新型农业保险公司。
            国元保险以服务“三农”为重点，实行农业保险业务和财产保险业务并存发展的模式。经营范围不仅包括“种植业保险”、“养殖业保险”、“农房保险”、“农民工意外伤害保险”、“森林火灾保险”等农业保险业务，还包括财产损失保险、责任保险、法定责任保险、信用保险和保证保险、短期健康保险和意外伤害保险，以及上述保险业务的再保险等财产保险业务。
            在中国保险业快速发展的新时期，国元保险将严格遵照“法制、监管、自律、规范”的方针，弘扬“诚信、专业、协作、创新”的企业精神，坚持“客户至上、以人为本、规范运作、优质高效”的经营理念，信奉“热情周到、快速便捷”的服务宗旨，积极探索、开拓创新、追求卓越，更好地发挥保险业在服务地方经济，推进社会主义新农村建设中的积极作用，为全面建设小康社会和构建社会主义和谐社会做出应有贡献。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/2.jpg" alt="">
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
        name: "guoyuan",
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
