<template>
  <div>
    <div class="hello">
      <div class="top">
        <head-nav :clect="clectnav" :title="toptitle"></head-nav>
      </div>
      <div class="warp">
        <div class="int">
          <div class="title">
            <h4>法律服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="fa">
            <li @click="goxianda">
              <div>
                <img src="../../../../static/images/229.jpg" alt="">
              </div>
              <span>安徽宪达律师事务所</span>
            </li>
            <li @click="godaqian">
              <div>
                <img src="../../../../static/images/230.jpg" alt="">
              </div>
              <span>安徽大潜律师事务所</span>
            </li>
          </ul>
        </div>
        <div class="int">
          <div class="title">
            <h4>审计服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="neng">
            <li @click="godong">
              <div>
                <img src="../../../../static/chao/15.png" alt="">
              </div>
              <span>铜陵东方事务所</span>
            </li>
            <li @click="golant">
              <div>
                <img src="../../../../static/chao/3.jpg" alt="">
              </div>
              <span>安徽蓝天会计师事务所</span>
            </li>
          </ul>
        </div>
        <div class="int">
          <div class="title">
            <h4>会计服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="neng">
            <li @click="goshun">
              <div>
                <img src="../../../../static/chao/33.png" alt="">
              </div>
              <span>顺为财税</span>
            </li>
            <li @click="gofu">
              <div>
                <img src="../../../../static/chao/3.jpg" alt="">
              </div>
              <span>铜陵市富达财务代理有限公司</span>
            </li>
          </ul>
        </div>
        <div class="int">
          <div class="title">
            <h4>环评服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="huan">
            <li @click="gozhonghai">
              <img src="../../../../static/chao/6.jpg" alt="">
            </li>
            <li @click="gonanda">
              <img src="../../../../static/chao/20.png" alt="">
            </li>
          </ul>
        </div>
        <div class="int">
          <div class="title">
            <h4>能评服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="neng">
            <li @click="gojinyuan">
              <div>
                <img src="../../../../static/chao/3.jpg" alt="">
              </div>
              <span>铜陵金远节能评估有限公司</span>
            </li>
            <li @click="goruide">
              <div>
                <img src="../../../../static/chao/3.jpg" alt="">
              </div>
              <span>铜陵瑞德环境科技咨询有限公司</span>
            </li>
          </ul>
        </div>
        <div class="int">
          <div class="title">
            <h4>技术服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="neng">
            <li @click="changjiang">
              <div>
                <img src="../../../../static/chao/22.png" alt="">
              </div>
              <span>铜陵长江科技有限责任公司</span>
            </li>
            <li @click="taixiang">
              <div>
                <img src="../../../../static/chao/3.jpg" alt="">
              </div>
              <span>铜陵泰祥科创高新技术有限公司</span>
            </li>
          </ul>
        </div>
        <div class="int">
          <div class="title">
            <h4>其他中介服务</h4>
            <router-link to="" tag="a">更多>></router-link>
          </div>
          <ul class="neng">
            <li @click="fengrui">
              <div>
                <img src="../../../../static/chao/8.jpg" alt="">
              </div>
              <span>铜陵市丰瑞贸易有限公司简介</span>
            </li>
            <li @click="ailide">
              <div>
                <img src="../../../../static/chao/3.jpg" alt="">
              </div>
              <span>安徽爱立得人力资源有限公司</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <footer-nav></footer-nav>
      </div>
    </div>
  </div>
</template>

<script>
import headNav from "../../headNav";
import footerNav from "../../footer";
export default {
  name: "services",
  components: {
    headNav,
    footerNav
  },
  data() {
    return {
      toptitle: "铜陵市民营经济云服务智慧平台",
      clectnav: 5,
      placeshow: false
    };
  },
    methods:{
      //安徽宪达律师事务所
      goxianda(){
          this.$router.push('/falv')
      },
        //安徽大潜律师事务所
        godaqian(){
            this.$router.push('/daqian')
        },
        //中海详情
        gozhonghai(){
          this.$router.push('/zhonghai')
        },
        //南京大学
        gonanda(){
            this.$router.push('/nanda')
        },
        //铜陵金远节能评估有限公司
        gojinyuan(){
            this.$router.push('/jinyuan')
        },
        //铜陵瑞德环境科技咨询有限公司
        goruide(){
            this.$router.push('/ruide')
        },
        //长江
        changjiang(){
            this.$router.push('/changjiang')
        },
        //泰祥
        taixiang(){
            this.$router.push('/taixiang')
        },
        //丰瑞
        fengrui(){
            this.$router.push('/fengrui')
        },
        //爱立德
        ailide(){
            this.$router.push('/ailide')
        },
        //东方
        godong(){
            this.$router.push('/dong')
        },
        //蓝天
        golant(){
            this.$router.push('/lan')
        },
        //顺为财税
        goshun(){
            this.$router.push('/shun')
        },
        //富达
        gofu(){
            this.$router.push('/fu')
        }
    }
};
</script>

<style lang="less" scoped>
  .hello{
    background: #fff;
  }
  .banner{
    padding: 20px 0;
    img{
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }

  }
.warp {
  width: 1200px;
  margin: 20px auto;
  .int {
    margin-bottom: 30px;
    .title{
      font-size: 20px;
      overflow: hidden;
      width: 100%;
      padding-bottom: 10px;
      color: #0e0d0d;
      border-bottom: 2px solid #ff4c4c;
      margin-bottom: 20px;
      h4 {
        font-weight: bold;
        display: block;
        float: left;
      }
      a{
        display: block;
        float: right;
        font-size: 16px;
        margin-top: 3px;
        margin-right: 20px;
      }
      a:hover{
        color: #1b8cff;
      }
    }
    .fa{
      padding: 20px;
      display: flex;
      flex-direction: row;
      li{
        width: 200px;
        margin-right: 50px;
        cursor: pointer;
        div{
          width: 150px;
          height: 150px;
          margin: 0 auto;
          overflow: hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        span{
          padding: 10px;
          width:180px;
          display: block;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
        }
      }
    }
    .huan{
      display: flex;
      flex-direction: row;
      padding: 20px;
      li{
        width: 400px;
        margin-right: 200px;
        img{
          width: 100%;
        }
      }
    }
    .neng{
      padding: 20px;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      li{
        width: 50%;
        div{
          float: left;
          width: 80px;
          height: 80px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        span{
          display: block;
          float:left;
          height: 80px;
          line-height: 80px;
          margin-left: 20px;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

}
</style>
