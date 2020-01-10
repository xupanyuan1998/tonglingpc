<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="jin">
        <h4>金融机构</h4>
        <ul class="list">
          <li  @click="gozhu">
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>中信银行铜陵分行</span>
          </li>
          <li @click="place">
           <div>
             <img src="../../../../static/images/210.png" alt="">
           </div>
            <span >中国银行铜陵分行</span>
          </li>
          <li @click="place">
          <div>
            <img src="../../../../static/images/211.png" alt="">
          </div>
            <span>中国民生银行铜陵分行</span>
          </li>
          <li @click="place">
            <div>
              <img src="../../../../static/images/234.png" alt="">
            </div>
            <span >中国建设银行铜陵分行</span>
          </li>
          <li class="four" @click="place">
            <div>
              <img src="../../../../static/images/214.png" alt="">
            </div>
            <span >中国邮政银行铜陵分行</span>
          </li>
          <li @click="place">
           <div>
             <img src="../../../../static/images/216.png" alt="">
           </div>
            <span >中国农业银行铜陵分行</span>
          </li>
          <li @click="place">
            <div>
              <img src="../../../../static/images/218.png" alt="">
            </div>
            <span >中国民生银行铜陵分行</span>
          </li>
          <li class="four" @click="place">
            <div>
              <img src="../../../../static/images/219.png" alt="">
            </div>
            <span >中国人寿保险股份有限公司</span>
          </li>
        </ul>
      </div>
      <div class="jin">
        <h4>创新产品</h4>
        <ul class="chan">
          <li>
            <div class="tit">
              <img src="../../../../static/images/169.png" alt="">
            </div>
            <div class="cont">
              <div class="left">
                <img src="../../../../static/images/174.png" alt="" @mouseenter="bigimg" @mouseleave="hideimg">
                <img class="big" src="../../../../static/images/174.png" alt="" >
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
                <img src="../../../../static/images/220.jpg" alt="" @mouseenter="bigimg" @mouseleave="hideimg">
                <img class="big" src="../../../../static/images/220.jpg" alt="" >
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
        </ul>
      </div>
      <div class="jin">
      <h4>基金对接</h4>
      <ul class="ji">
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
        <li class="four">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
        <li>
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>中欧新蓝筹</span>
        </li>
        <li class="four">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>国投资源前收费基金</span>
        </li>
      </ul>
    </div>
      <div class="jin">
        <h4>保险服务</h4>
        <ul class="bao">
          <li>
            <div class="left">
              <div>
                <img src="../../../../static/images/221.jpg" alt="">
              </div>
              <span>雇主责任险</span>
            </div>
            <p class="right">保障雇员在工作期间发生意外以及职业性疾病导致的身故、伤残、医疗费用；
              提供员工暂时丧失劳动能力期间的误工津贴保障；
              可扩展非工作期间的意外伤害保障；
              最多可同时为300人投保，人数越多保费越优惠；
              转嫁雇主的法律责任，免除雇主后顾之忧；</p>
          </li>
          <li class="four">
            <div class="left">
              <div>
                <img src="../../../../static/images/222.jpg" alt="">
              </div>

              <span>万创保</span>
            </div>
            <p class="right">万创保 专门为住宿业、零售业、批发业、餐饮业、商务服务业五大
              行业中小企业量身定做的一款组合保险产品，保障全面，范围涵盖企业财产、雇主及其家
              人和员工的意外、健康，还可转嫁雇主和企业的多种法律责任风险。中小企业通过保险即可获得大企业的保障！</p>
          </li>
          <li>
            <div class="left">
              <div>
                <img src="../../../../static/images/223.jpg" alt="">
              </div>
              <span>金福保</span>
            </div>
            <p class="right">为中小餐饮业量身定做的保险产品，保障全面，经营更安心。店内发生火
              灾、盗窃、抢劫，店内存货因水管爆裂受损，顾客摔伤、烫伤、食品中毒，雇员伤亡，均在保障范围。一险在手，后顾无忧！</p>
          </li>
          <li class="four">
            <div class="left">
              <div>
                <img src="../../../../static/images/224.jpg" alt="">
              </div>
              <span>企财险</span>
            </div>
            <p class="right">企业财产保险简称“企财险”，为企事业单位存放在指定地点的财产物资提供保障。
              针对保险责任范围内的自然灾害或意外事故造成的损失，中国人寿财险将进行赔偿，协助您尽可能降低损失。</p>
          </li>
        </ul>
      </div>
      <div class="jin">
        <h4>上市服务</h4>
       <ul class="shang">
         <li>
           <div>
             <img src="../../../../static/images/225.jpg" alt="">
           </div>
           <span>上市辅导</span>
         </li>
         <li>
           <div>
             <img src="../../../../static/images/226.jpg" alt="">
           </div>
           <span>律师服务</span>
         </li>
         <li>
         <div>
           <img src="../../../../static/images/227.jpg" alt="">
         </div>
           <span>会计师服务</span>
         </li>
       </ul>
      </div>
      <div class="jin">
        <h4>担保服务</h4>
        <ul class="ji">
          <li>
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>中欧新蓝筹</span>
          </li>
          <li>
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>国投资源前收费基金</span>
          </li>
          <li>
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>中欧新蓝筹</span>
          </li>
          <li>
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>国投资源前收费基金</span>
          </li>
          <li>
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>中欧新蓝筹</span>
          </li>
          <li>
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>国投资源前收费基金</span>
          </li>
          <li class="four">
            <div>
              <img src="../../../../static/images/212.png" alt="">
            </div>
            <span>中欧新蓝筹</span>
          </li>
        </ul>
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
  export default {
    name: "chaoshi",
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
      gozhu(){
        this.$router.push('/bank')
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
  margin: 30px auto;
  .jin{
    h4{
      font-size: 20px;
      font-weight: 600;
      padding-left: 10px;
      margin-bottom: 30px;
      padding-bottom: 10px;
      color: #0e0d0d;
      border-bottom: 2px solid #ff4c4c;
    }
    .list{
      overflow: hidden;
      li{
        float: left;
        width: 182px;
        height: 182px;
        margin-right: 72px;
        margin-bottom: 30px;
        div{
          width: 100px;
          height: 100px;
          display: block;
          margin: 10px auto;
          overflow: hidden;
        }
        img{
          width: 100px;
          height: 100px;
          transition: all 0.5s;
        }
        span{
          display: block;
          max-height: 40px;
          line-height: 20px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
        }
      }
      li:hover{
        border: 1px solid #eeee;
        width: 180px;
        height: 180px;
        border-radius: 3px;
      }
    }
    .chan{
      padding: 20px;
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
            width: 960px;
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
    ul{
      li.four{
        margin-right: 0;
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
        div{
          display: block;
          width: 90px;
          height: 90px;
          margin: 0 auto;
          overflow: hidden;
        }
        img{
          display: block;
          width: 90px;
          height: 90px;
          transition: all 0.5s;
        }
        div:hover{
          img{
            transform: scale(1.2);
          }
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
    .bao{
      padding: 20px;
      overflow: hidden;
      li{
        float: left;
        height: 190px;
        overflow: hidden;
        margin-right: 40px;
        margin-bottom: 30px;
        .left{
          float: left;
          height: 180px;
          div{
           overflow: hidden;
            width: 150px;
            height: 150px;
          }
          img{
            display: block;
            width: 150px;
            height: 150px;
            transition: all 0.5s;
          }
          div:hover{
            img{
              transform: scale(1.2);
            }
          }
          span{
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            font-weight: bold;
            width: 100%;
            overflow: hidden;
            text-align: center;
            display: block;
            margin-top: 10px;
          }
        }
        p{
          font-size: 16px;
          line-height: 26px;
          float: left;
          margin-left: 20px;
          width: 380px;
          height: 180px;
          overflow: hidden;
        }
      }
    }
    .shang{
      padding: 20px;
      overflow: hidden;
      li{
        width:180px;
        height: 190px;
        float: left;
        div{
          width: 150px;
          overflow: hidden;
          height: 150px;
          margin: 0 auto;
          cursor: pointer;
          img{
            width: 150px;
            height: 150px;
            transition: all 0.5s;
          }
        }
        div:hover{
          img{
            transform: scale(1.2);
          }
        }
        span{
          margin-top: 10px;
          display: block;
          height: 30px;
          line-height: 30px;
          font-size: 18px;
          font-weight: 500;
          text-align: center;
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
