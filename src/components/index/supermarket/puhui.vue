<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <ul>
        <li>
          <div class="tit">
            <img src="../../../../static/images/169.png" alt="">
          </div>
          <div class="cont">
            <div class="left">
              <img src="../../../../static/images/174.png" alt="" @mouseenter="bigimg" @mouseleave="hideimg">
              <img class="big" src="../../../../static/images/174.png" alt="">
            </div>
            <div class="right">
              <h5>超e贷</h5>
              <p>超e贷是铜陵农商银行继贵阳市探索政府数据有序开放后推出的第一款线上消费类信用贷款产品,年利率优化至
              5.88%能满足客户不同的消费贷款需求.具有利率优、额度高、支用快、还款活的特点，额度循环使用，随借随还，
              客户在芝米钱包上可一键申请，一键放款，真正享受到大数据建设带来的便利。</p>
              <button @click="place">我要申请</button>
            </div>
          </div>
        </li>
        <li>
          <div class="tit">
            <img src="../../../../static/images/169.png" alt="">
          </div>
          <div class="cont">
            <div class="left">
              <img src="../../../../static/images/174.png" alt="" @mouseenter="bigimg" @mouseleave="hideimg">
              <img class="big" src="../../../../static/images/174.png" alt="">
            </div>
            <div class="right">
              <h5>超e贷</h5>
              <p>超e贷是铜陵农商银行继贵阳市探索政府数据有序开放后推出的第一款线上消费类信用贷款产品,年利率优化至
                5.88%能满足客户不同的消费贷款需求.具有利率优、额度高、支用快、还款活的特点，额度循环使用，随借随还，
                客户在芝米钱包上可一键申请，一键放款，真正享受到大数据建设带来的便利。</p>
              <button @click="place">我要申请</button>
            </div>
          </div>
        </li>
        <li>
          <div class="tit">
            <img src="../../../../static/images/169.png" alt="">
          </div>
          <div class="cont">
            <div class="left">
              <img src="../../../../static/images/174.png" alt="" @mouseenter="bigimg" @mouseleave="hideimg">
              <img class="big" src="../../../../static/images/174.png" alt="">
            </div>
            <div class="right">
              <h5>超e贷</h5>
              <p>超e贷是铜陵农商银行继贵阳市探索政府数据有序开放后推出的第一款线上消费类信用贷款产品,年利率优化至
                5.88%能满足客户不同的消费贷款需求.具有利率优、额度高、支用快、还款活的特点，额度循环使用，随借随还，
                客户在芝米钱包上可一键申请，一键放款，真正享受到大数据建设带来的便利。</p>
              <button @click="place">我要申请</button>
            </div>
          </div>
        </li>
        <li>
          <div class="tit">
            <img src="../../../../static/images/169.png" alt="">
          </div>
          <div class="cont">
            <div class="left">
              <img src="../../../../static/images/220.jpg" alt="">
            </div>
            <div class="right">
              <h5>e贷款</h5>
              <p>中国建设银行网络银行“e贷款”系列产品是建设银行专门服务电子商务客户的网络贷款产品，包括网络信息流类、网络物流
                类、网络资金流类、网络供应链类等基本类型。具有网络增信、轻松准入、操作简便、高效快捷等特点，电子商务客
                户通过全流程在线操作轻松获得建行的融资支持。该产品为中国建设银行首创，开启了网络贷款的全新时代。</p>
              <button @click="place">我要申请</button>
            </div>
          </div>
        </li>
      </ul>
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
  export default {
    name: "puhui",
    components:{
      headNav,
      footerNav
    },
    data(){
      return {
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 4,
        placeshow:false
      }
    },
    methods:{
      //各部门政策
      gozhinan(){
        this.$router.push('/information/guides')
      },
      place(){
        this.placeshow=true;
      },
      cloose(){
        this.placeshow=false;
      },
      bigimg(event){
        var li=event.currentTarget;
        $(li).parent().find('.big').fadeIn(200);
      },
      hideimg(event){
        var li=event.currentTarget;
        $(li).parent().find('.big').fadeOut(200);
      }
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
    background: #fff;
    ul{
      padding:40px;
      li{
        margin-bottom: 30px;
        .tit{
          height: 30px;
          img{
            height:30px;
            max-width: 380px;
          }
        }
        .cont{
          height: 156px;
          margin: 20px 0;
          padding: 20px;
          background: #f5f5f5;
          .left{
            float: left;
            position: relative;
            img{
              width: 122px;
              height: 156px;
            }
            img.big{
              display: none;
              position: absolute;
             right: -330px;
              top: 40px;
              width:244px;
              height:312px ;
              z-index: 999;
            }
          }
          .right{
            float: left;
            margin-left: 30px;
            width: 920px;
            >*{
              display: block;
              float: left;
            }
            h5{
              height: 40px;
              line-height: 40px;
              font-weight: bold;
              font-size: 18px;
              color: #333;
            }
            p{
              max-height: 800px;
              line-height: 30px;
              font-size: 18px;
            }
            button{
              border: none;
              outline: none;
              border-radius: 5px;
              float: right;
              height: 30px;
              width: 100px;
              text-align: center;
              line-height: 30px;
              background: #e7390a;
              color: #fff;
              cursor: pointer;
            }
            button:hover{
              background: #fe0000;
            }
          }
        }
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
