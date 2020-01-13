<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span @click="goshe">涉企服务</span><b> ></b><span >南京大学环境规划设计院</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="int">
        <h4>公司简介</h4>
        <div class="yin">
          <div>
            <img src="../../../../static/chao/20.png" alt="">
          </div>
          <p>南京大学是蜚声海内外的高等学府和科研中心，也是我国最早开展环境科学研究和教学的单位之一。自1978年教育部批准设立南京大学环境科学研究所以来，我校环境学科在培育大批优秀人才的同时，还一直坚持为国家、地方的重大环境需求提供有力的科技支撑。根据教育部2013年对全国一级学科的评估，我校“环境科学与工程”学科位列前三。为进一步完善我校环境学科“科学研究-人才培养-技术开发-服务社会”的一体化平台体系，根据国家事业单位体制改革和高校产业转型的相关要求，我校整合相关资源组建了综合性甲级环境科研、规划和咨询服务机构——南京大学环境规划设计研究院。
            “学府智慧、绿动未来”。我院发源于南京大学环境科学与工程学科群，坚持实践、科研、教学相结合的发展思路，严守“责任、诚信、公益、创新”的价值理念和“求实、求是、求精”的质量方针，利用综合性院校的优势，致力于推动我国社会经济的可持续发展。围绕环境标准制修订、环境模拟技术、环境经济政策、污染防控技术和风险防范与应急技术研究等重点方向，我院科研人员开展了大量科学研究和技术开发工作，研究成果获得多项国家级、省部级奖励。在环保服务业领域，我院开展了大量的顾问咨询、环境规划、工程设计、环境影响评价、监理核查、清洁生产、水资源论证、教育培训等工作，为各级政府、各类开发区、百余家世界500强企业等数2000余家客户提供了高品质的服务，获得了主管部门和社会各界的高度肯定。此外，我院还承担了南京大学环境行业校友会秘书处的职能，致力于为海内外从事环境保护相关领域工作的校友提供服务。
            廿一世纪的第二个十年，全球经济徘徊与环境事件频发并行，我国发展中面临的资源环境瓶颈更加凸显，环保人肩负了国家和人民的重托，任务艰巨，使命光荣。南京大学环境规划设计研究院将秉承“诚朴雄伟、励学敦行；艰苦奋斗、追求卓越”的精神，以“开放、包容、交流、竞合”的态度，与大家一起努力，开启和谐发展的新时代。
          </p>
        </div>
      </div>
      <div class="int">
        <h4>组织架构</h4>
        <div class="jia">
          <img src="../../../../static/chao/25.png" alt="">
        </div>
      </div>
      <div class="int">
        <h4>公司资质</h4>
        <div class="jia">
          <img src="../../../../static/chao/24.png" alt="">
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
                value:4.2
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
                window.open('http://www.njuae.cn/index.php','_blank')
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
