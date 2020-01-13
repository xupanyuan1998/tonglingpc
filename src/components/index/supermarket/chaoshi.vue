<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="warp">
      <div class="jin">
        <h4>信贷服务</h4>
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
        <ul class="ji">
          <li @click="goji">
            <div>
              <img src="../../../../static/images/210.png" alt="">
            </div>
            <span>积利金增强型(可转积利金)</span>
          </li>
          <li @click="gowai">
            <div>
              <img src="../../../../static/images/210.png" alt="">
            </div>
            <span>外汇宝</span>
          </li>
        </ul>
      </div>
      <div class="jin">
      <h4>基金对接</h4>
      <ul class="ji">
        <li @click="goanhua">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽安华创新风险投资基金</span>
        </li>
        <li @click="goanyuan">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽安元创新风险投资基金</span>
        </li>
        <li @click="place">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽新兴产业创业投资基金</span>
        </li>
        <li @click="place">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽省“三重一创”产业发展基金</span>
        </li>
        <li @click="place">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽省中小企业（专精特新）发展基金</span>
        </li>
        <li @click="place">
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽省科技成果转化引导基金</span>
        </li>
        <li @click="place" >
          <div>
            <img src="../../../../static/images/212.png" alt="">
          </div>
          <span>安徽省供销合作发展基金</span>
        </li>
      </ul>
    </div>
      <div class="jin">
        <h4>保险服务</h4>
        <ul class="baoc">
          <li @click="gobaoc">
            <div>
              <img src="../../../../static/images/235.png" alt="">
            </div>
            <span>太平洋保险股份有限公司</span>
          </li>
          <li @click="goguoyuan">
            <div>
              <img src="../../../../static/chao/1.jpg" alt="">
            </div>
            <span>国元农业保险股份有限公司</span>
          </li>
        </ul>
      </div>
      <div class="jin">
        <h4>上市服务</h4>
       <ul class="shang">
         <li @click="godf">
           <div>
             <img src="../../../../static/chao/4.jpg" alt="">
           </div>
           <span>铜陵东方会计师事务所</span>
         </li>
         <li @click="goyc">
           <div>
             <img src="../../../../static/chao/3.jpg" alt="">
           </div>
           <span>铜陵永昌会计师事务所</span>
         </li>
       </ul>
      </div>
      <div class="jin">
        <h4>担保服务</h4>
        <ul class="ji">
          <li @click="goandan">
            <div>
              <img src="../../../../static/chao/15.png" alt="">
            </div>
            <span>安徽省信用担保集团</span>
          </li>
          <li @click="gotongl">
            <div>
              <img src="../../../../static/chao/3.jpg" alt="">
            </div>
            <span>铜陵市担保控股集团有限公司</span>
          </li>
          <li @click="place">
            <div>
              <img src="../../../../static/chao/3.jpg" alt="">
            </div>
            <span>铜陵市中源信用担保公司</span>
          </li>
          <li @click="place">
            <div>
              <img src="../../../../static/chao/3.jpg" alt="">
            </div>
            <span>国元担保</span>
          </li>
          <li @click="place">
            <div>
              <img src="../../../../static/chao/3.jpg" alt="">
            </div>
            <span>铜陵金誉中小企业信用担保中心</span>
          </li>
          <li @click="place">
            <div>
              <img src="../../../../static/chao/3.jpg" alt="">
            </div>
            <span>铜陵市住房置业担保中心</span>
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
        gobaoc(){
            this.$router.push('/baoc')
        },
      gozhu(){
        this.$router.push('/bank')
      },
        //国元保险详情页面
        goguoyuan(){
            this.$router.push('/guoyuan')
        },
        //安华基金详情
        goanhua(){
            this.$router.push('/anhua')
        },
        //安元基金详情
        goanyuan(){
            this.$router.push('/anyuan')
        },
        //铜陵市担保控股集团有限公司详情
        gotongl(){
            this.$router.push('/tongl')
        },
        //安徽信用担保集团
        goandan(){
            this.$router.push('/andan')
        },
        //铜陵永昌会计师事务所
        goyc(){
            this.$router.push('/yongchang')
        },
        //铜陵东方会计师事务所
        godf(){
            this.$router.push('/dongfang')
        },
        //积利金
        goji(){
           this.$router.push('/jili');
        },
        //外汇宝
        gowai(){
            this.$router.push('/waihui');
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
            }
            img.big{
              display: none;
              position: absolute;
              right: -330px;
              top: 40px;
              width:244px;
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
      li{
        cursor: pointer;
      }
      li.four{
        margin-right: 0;
      }
    }
    .ji{
      padding: 20px;
      overflow: hidden;
      li{
        width: 200px;
        float: left;
        margin-right: 30px;
        margin-bottom: 20px;
        div{
          display: block;
          width: 120px;
          height: 120px;
          margin: 0 auto;
          overflow: hidden;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
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
          height: 60px;
          overflow: hidden;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
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
    .baoc{
      padding: 20px;
      overflow: hidden;
      li:hover{
        img{
          transform: scale(1.1);
        }
      }
      li{
        width: 200px;
        height: 150px;
        float: left;
        margin-right: 30px;
        div{
          overflow: hidden;
          img{
            display: block;
            width: 100px;
            height: 100px;
            margin: 0 auto;
            transition: all 0.3s;
          }
        }
        span{
          display: block;
          width: 100%;
          padding: 10px 0;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
        }
      }
    }
    .shang{
      padding: 20px;
      overflow: hidden;
      li{
        width:180px;
        height: 190px;
        margin-right: 50px;
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
          height: 60px;
          line-height: 30px;
          font-size: 16px;
          text-align: center;
          font-weight: bold;
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
