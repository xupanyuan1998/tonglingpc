<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span >四送一服</span><b> ></b><span >{{mian}}</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftlist" :class="leftShow==idx?'select':''" @click="cleft(idx)">{{item}}</h3>
        <h3 @click="gowai">更多</h3>
      </div>
      <div class="right">
        <div class="pp">暂无内容</div>
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
    import  '../../../assets/css/list.less'
    export default {
        name: "sisone",
        data() {
            return {
                toptitle:'铜陵市民营经济云服务智慧平台',
                clectnav: 0,
                leftlist:['工作动态','活动方案','典型案例'],
                leftShow:0,
                mian:'',
            }
        },
        components: {
            headNav,
            footerNav
        },
        created(){
            let a=localStorage.getItem('clect');
            if(a==null){
                this.mian=this.leftlist[0];
                this.leftShow=0;
            }else{
                this.mian=this.leftlist[a];
                this.leftShow=a;
            }

        },
        methods:{
            goindex(){
                this.$router.push('/')
            },
            cleft(i){
                localStorage.setItem('clect',i);
                window.location.reload();
            },
            gowai(){
                 window.open('http://www.ah.gov.cn/zwyw/ztzl/ssyfsqgc/index.html','_blank')
            }
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
  .container {
    width: 100%;
    margin-top: 20px;
    .nav {
      width: 1200px;
      height: 40px;
      margin: 0 auto;
      background: #fff;
      span {
        display: block;
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-right: 10px;
        cursor: pointer;
      }
      b {
        display: block;
        float: left;
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
      }
    }
    .line{
      width: 1200px;
      height: 4px;
      margin: 0 auto;
      background: url("../../../../static/images/line.png") repeat-x;
    }
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
      .serch{
        position: absolute;
        top: 12px;
        right: 81px;
        width:204px;
        height:36px;

        border-radius:0px 4px 4px 0px;
        input{
          display: block;
          float: left;
          outline: none;
          height: 34px;
          line-height: 34px;
          width: 122px;
          padding:0 10px;
          border:1px solid rgba(179,179,179,1);
        }
        input:focus{
          border:1px solid #ff744f;
          outline:none;
        }
        button{
          cursor: pointer;
          display: block;
          float: left;
          border: none;
          outline: none;
          width:60px;
          height:36px;
          background:rgba(231,57,10,1);
          border-radius:0px 4px 4px 0px;
          text-align: center;
          line-height: 36px;
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        button:hover{
          background:#f00;
        }
      }
      h1{
        width: 949px;
        height: 50px;
        line-height: 50px;
        border-bottom: 5px solid #efefef;
        font-size:20px;
        font-weight:400;
        color:rgba(231,57,10,1);
      }
      .pp{
        margin: 20px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
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
