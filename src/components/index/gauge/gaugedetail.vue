<template>
  <div class="hello">
    <div class="top">
      <head-nav :clect="clectnav" :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">求计问策</span><b> ></b><span @click="golists">政策前瞻</span><b> ></b><span>政策前瞻详情</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftList" :key="idx" @click="leftshow(idx)" :class="{'select':idx==1}">{{item}}</h3>
      </div>
      <div class="right">
        <div class="titles"><div><p>{{content.title}}</p><span v-if="content.isTop==1">置顶</span></div></div>
        <div class="Units"><P><span>来源&nbsp;:&nbsp;{{content.departmentName}}</span> <b>发布日期&nbsp;:&nbsp;{{addTime}}</b></P></div>
        <div class="content" v-html="content.content"></div>
      </div>
    </div>
    <div class="bottom">
      <footer-nav></footer-nav>
    </div>
    <div class="placesa"  @mousewheel.prevent v-if="placeshow">
      <div class="ca" v-if="success==0">
        <h1>提示</h1>
        <p>请完整上传所有的必要资料！</p>
        <button @click="cancleback">确定</button>
      </div>
      <div class="success" v-if="success==1">
        <img src="../../../../static/images/95.png" alt="">
        <h2>提交成功</h2>
        <p>用户您好，我们将会以最快的速度为您办理，请耐心等待！</p>
      </div>
      <div class="logins" v-if="success==2">
        <h2>欢迎登录民营经济智慧云服务平台</h2>
        <ul>
          <li>
            <img src="../../../../static/images/9.png" alt="">
            <input type="text" placeholder="请输入用户名">
          </li>
          <li>
            <img src="../../../../static/images/10.png" alt="">
            <input type="password" placeholder="请输入密码">
          </li>
        </ul>
        <button>登录</button>
        <div><span @click="results">忘记密码</span> <span @click="res">免费注册</span></div>
        <img src="../../../../static/images/96.png" alt="" class="cloose" @click="cloose">
      </div>
    </div>
  </div>
</template>

<script>
  import headNav from "../../headNav";
  import footerNav from "../../footer";
  import '../../../assets/css/mianbao.less'

  export default {
    name: "policydetali",
    components: {
      headNav,
      footerNav
    },
    data(){
      return{
        toptitle:'铜陵市民营经济云服务智慧平台',
        clectnav: 7,
        content:'',
        shoucang:'',
        left_shows:1,
        leftList:['经验推荐','政策前瞻'],
        msg:'',
        userId:'',
        success:0,
        placeshow:false,
        addTime:''
      }
    },
    methods:{
      //面包屑返回首页
      goindex(){
        this.$router.push('/gauge');
      },
      leftshow(i){
        this.$router.push({
          path:'/gauge',
          query:{
            id:i
          }
        });
      },
      golists(){
        this.$router.push('/gauge');
      },
      //收藏
      collection(i){
        console.log(this.$route.path);
        var a='#'+this.$route.fullPath;
        console.log(a);
        if(this.msg==null){
          this.placeshow=true;
        }else{
          this.axios.post('/web/usercollection/usercollection',{contentId:i,state:1,type:2,userId:this.msg.userId,Url:a}).then(({data})=>{
            if(data.code==10001){
              this.shoucang=1;
            }
          })
        }

      },
      cloose(){
        this.placeshow=false;
      },
      //取消收藏
      canclecollection(i){
        this.axios.post('/web/usercollection/usercollection',{contentId:i,state:2,type:2,userId:this.userId,Url:' '}).then(({data})=>{
          if(data.code==10001){
            this.shoucang=0;
          }
        })
      },
      clearFen(i) {
        return i.substr(0, i.indexOf(" "));
      },
      //注册页面
      res(){
        this.$router.push('/registered')
      },
      //找回密码页面
      results(){
        alert(1);
        this.$router.push('/resultPassword')
      },
      cancleback(){
        this.placeshow=false;
      },
    },
    created() {
      var a=localStorage.getItem('personal');
      this.msg=JSON.parse(a);
      if(a==null){
        this.userId=' ';
      }else{
        this.userId=JSON.parse(a).userId;
      }
      if (this.msg.roleId==3){
        this.leftList=['经验推荐','政策前瞻'];
      }else{
        this.leftList=['经验推荐'];
      }
      //获取数据
      this.axios.post('/web/seeking/details',{newspolicyId:this.$route.query.id}).then(({data})=>{
        console.log(data.data);
        this.content=data.data;
        this.shoucang=data.data.collState;
        this.left_show=data.data.categoryId;
        this.addTime=this.clearFen(data.data.publishTime);
        $('.content').find('p').css({'text-indent':'2em'});
      })
    }
  }
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
  }

  .warp{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 21px;
    .left{
      float: left;
      margin-right: 20px;
      width:186px;
      border:1px solid rgba(230,230,230,1);
      border-top: none;
      background: #fff;
      h3{
        width:186px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid rgba(230,230,230,1);
        text-align: center;
        font-size:18px;
        font-weight:400;
        color:#454545;
        cursor: pointer;
      }
      h3.select{
        color: #E84012;
        border-top: 1px solid #FF6A42;
      }
    }
    .right{
      float: left;
      width:989px;
      min-height: 800px;
      border:1px solid rgba(217,217,217,1);
      margin-bottom: 20px;
      background: #fff;
      .titles{
        padding-top: 40px;
        height: 29px;
        text-align: center;
        margin-bottom: 20px;
        div{
          display: inline-block;
          p{
            display: block;
            float: left;
            height: 29px;
            line-height: 29px;
            font-size:26px;
            font-weight:400;
            color:rgba(69,69,69,1);
          }
          span{
            display: block;
            float: left;
            width:40px;
            height:18px;
            background:rgba(255,106,66,1);
            border-radius:4px;
            font-size:12px;
            font-weight:400;
            color:rgba(254,254,254,1);
            text-align: center;
            margin-left: 10px;
          }
        }
      }
      .Units{
        height: 48px;
        margin: 0 auto;
        text-align: center;
         p{
           display: inline-block;
           span{
             display: block;
             float: left;
             height: 48px;
             line-height: 48px;
             font-size:16px;
             font-weight:400;
             color:rgba(115,115,115,1);
             margin-right: 47px;
           }
           b{
             float: left;
             display: block;
             height: 48px;
             line-height: 48px;
             font-size:16px;
             font-weight:400;
             color:rgba(115,115,115,1);
           }
         }
      }
      .cate{
        width:730px;
        height:26px;
        background:rgba(245,245,245,1);
        margin: 0 auto;
        >*{
          display: block;
          float: left;
          height: 26px;
          line-height: 26px;
        }
        span{
          margin-left: 145px;
          font-size:16px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        b{
          margin-left: 50px;
          font-size:16px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        strong{
          margin-left: 39px;
          font-size:16px;
          font-weight:400;
          color:rgba(69,69,69,1);
        }
        p{
          cursor: pointer;
          margin-left: 32px;
          overflow: hidden;
          img{
            display: block;
            float: left;
            margin: 7px 2px;
            width: 12px;
            height: 12px;
          }
          i{
            display: block;
            float: left;
          }
          i.shou{
            color: #FF8D1E;
          }
        }
      }
      .content{
        padding: 32px 88px 16px 93px;
        line-height: 40px;
      }
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
