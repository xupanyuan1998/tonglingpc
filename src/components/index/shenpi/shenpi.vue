<template>
  <div class="hello">
    <div class="top">
      <head-nav  :title="toptitle"></head-nav>
    </div>
    <div class="container">
      <div class="nav">
        <span @click="goindex">首页</span><b> ></b><span >在线审批</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="warp">
      <div class="left">
        <h3 v-for="(item,idx) in leftlist" :class="leftShow==idx?'select':''" @click="cleft(idx,item)">{{item.name}}</h3>
      </div>
      <div class="right">
        <div class="serch">
          <input type="text" placeholder="请输入关键字" v-model=" serchs">
          <button @click="serchsa">搜索</button>
        </div>
        <h1 >{{rightname}}</h1>
        <ul class="addlist">
          <!--          <router-link tag="a" to="/information/informationMore/informationdetali">本市召开中小企业高质量发展座谈会23个优质中小企业重点项目集中开工</router-link>-->
          <li v-for="(item,idx) in newsList" :key="idx" :class="idx%5==4?'five':''"><b></b><router-link tag="a" :to="{path:'/shenpi/shenpidetail',query:{id:item.approvalId,leftId:leftShow}}">{{item.title}}</router-link><span>{{clearFen(item.addTime)}}</span></li>
        </ul>
        <div class="page">
          <!--        分页组件-->
          <div>
            <!--          <page-component :page-config="pageConfigPageTotal"></page-component>-->
            <div class="pageComponent" v-if="pageConfig.total">
              <!--上一页-->
              <button @click="prePage" :disabled="currentPage === 1" class="pagess">上一页</button>
              <!--总页数小于8的-->
              <template v-if="pageTotal <= showPageNo">
                <button v-for="i in pageTotal" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{i}}</button>
              </template>
              <template v-else-if="currentPage < 4">
                <button v-for="i in 6" @click="changeCurrentPage(i)" :class="{active:i === currentPage}" :key="i">{{i}}</button>
                <button :disabled="true">···</button>
                <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
              </template>
              <template v-else-if="currentPage > pageTotal - 4">
                <button @click="changeCurrentPage(1)">1</button>
                <button :disabled="true">···</button>
                <button v-for="i in 6" @click="changeCurrentPage(i + (pageTotal - 6))" :class="{active:(i + (pageTotal - 6)) === currentPage}" :key="i">{{i + (pageTotal - 6)}}</button>
              </template>
              <template v-else>
                <button @click="changeCurrentPage(1)">1</button>
                <button :disabled="true">···</button>
                <button @click="changeCurrentPage(currentPage - 2)">{{currentPage - 2}}</button>
                <button @click="changeCurrentPage(currentPage - 1)">{{currentPage - 1}}</button>
                <button class="active">{{currentPage}}</button>
                <button @click="changeCurrentPage(currentPage + 1)">{{currentPage + 1}}</button>
                <button @click="changeCurrentPage(currentPage + 2)">{{currentPage + 2}}</button>
                <button :disabled="true">···</button>
                <button @click="changeCurrentPage(pageTotal)">{{pageTotal}}</button>
              </template>
              <!--下一页-->
              <button @click="nextPage" :disabled="currentPage === pageTotal" class="pagess">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
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
  import footerNav from "../../footer"
  import '../../../assets/css/page.less'
  import  '../../../assets/css/list.less'
  export default {
    name: "shenpi",
    data() {
      return {
        toptitle:'铜陵市民营经济云服务智慧平台',
        showPageNo:1,
        currentPage:1,
        pageTotal: 50,//总的页数
        pageConfig: {
          pageSize: 10,     //一页的数据条数
          total: 500,         //总的数据条数
        },
        categoryid:11,
        newsList:'',
        leftlist:'',
        leftShow:0,
        rightname:'',
        serchs:'',
        userId:0,
        placeshow:false,
        success:0,
      }
    },
    components: {
      headNav,
      footerNav
    },
    methods:{
      goindex(){
        this.$router.push('/')
      },
      serchsa(){
        this.getnewList(20,1,this. categoryid,this.serchs);
      },
      cleft(i,b){
        this. leftShow=i;
        this.categoryid=b.categoryId;
        this.rightname=b.name;
        this.getnewList(20,1,this. categoryid,this.serchs);
      },
      prePage(){
        this.currentPage -= 1;
        this.getnewList(20, this.currentPage,this. categoryid,this.serchs);
      },
      nextPage(){
        this.currentPage += 1;
        this.getnewList(20, this.currentPage,this. categoryid,this.serchs);
      },
      changeCurrentPage(i){
        this.currentPage = i;
        this.getnewList(20, this.currentPage,this. categoryid,this.serchs);
      },
      clearFen(i){
        return i.substring(0,i.indexOf(' '))
      },
      getnewList(a,b,c,d){
        this.axios.post('/web/onlineapproval/list',{title:d,categoryId:c,size:a,current:b}).then(({data})=>{
          this.pageTotal=data.data.pages;
          this.currentPage=data.data.current;
          this. pageConfig.pageSize=data.data.size;
          this. pageConfig.total=data.data.total;
          this.newsList=data.data.records;
        })
      },
      //关闭
      choose(){
        this.placeshow=false;
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
      var id=this.$route.query.id;
      if(id==undefined){
        this.leftShow=0;
        this.axios.post('/web/onlineapproval/categorylist').then((data)=>{
          console.log(data.data.data);
          this.leftlist=data.data.data;
          this.rightname=data.data.data[0].name;
          this.categoryid=data.data.data[0].categoryId;
          this.getnewList(20,1,this. categoryid,this.serchs);
        });
      }else{
        this.leftShow=id;
        this.axios.post('/web/onlineapproval/categorylist').then((data)=>{
          this. leftlist=data.data.data;
          this.rightname=data.data.data[id].name;
          this.categoryid=data.data.data[id].categoryId;
          this.getnewList(20,1,this. categoryid,this.serchs);
        });
      }

      var a=localStorage.getItem('personal');
      this.msg=JSON.parse(a);
      if(a==null){
        this.userId=0;
      }else{
        this.userId=JSON.parse(a).userId;
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
        font-size:20px;
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
