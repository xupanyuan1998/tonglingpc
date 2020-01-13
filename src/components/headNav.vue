<template>
    <div style="background: #fff" >
      <div class="top">
        <div class="con">
          <p >欢迎光临铜陵市民营经济云服务智慧平台！</p>
          <div><b></b><span>服务热线：0562-5880190</span></div>
        </div>
      </div>
      <!--    头部-->
      <div class="warp" >
        <div class="warp_c" >
          <div class="t_center">
            <img src="../../static/images/logo.png" alt="" @click="goindex">
            <div class="tit">
              <h4>{{title}}</h4>
              <span></span>
            </div>
          </div>
          <div class="t_right" @mouseleave="hidego">
            <div class="wechat" v-if="loginShow==0" >
              <p class="weilog">
                <span @click="gologin">请登录</span>
                <span @click="goRegistered">注册</span>
              </p>
<!--              <div class="login"  style="display:none" id="login" @mouseleave="hidelogin" >-->
<!--                <h2>欢迎登录民营经济智慧云服务平台</h2>-->
<!--                <h4>-->
<!--                  <h3 id="erro" style="display: none">-->
<!--                    <img src="../../static/images/99.png" alt />-->
<!--                    <span>账号或密码错误请重输!</span>-->
<!--                  </h3>-->
<!--                </h4>-->
<!--                <div>-->
<!--                  <img src="../../static/images/9.png" alt />-->
<!--                  <input type="text" placeholder="请输入用户名" v-model="user" />-->
<!--                </div>-->
<!--                <div>-->
<!--                  <img src="../../static/images/10.png" alt />-->
<!--                  <input type="password" placeholder="请输入密码" v-model="password" />-->
<!--                </div>-->
<!--                <button @click="login"  v-on:keyup.enter.native="aaa">登录</button>-->
<!--                <p>-->
<!--                  <em class="gores" @click="resultPassword">忘记密码</em>-->
<!--                  <em class="gores" @click="goRegistered">免费注册</em>-->
<!--                </p>-->
<!--              </div>-->
            </div>
            <div class="wechat" v-if="loginShow==1" @mouseout="showgo" >
              <img class="headimg" src="../../static/images/109.png" alt="" v-if="personal.headImg<2">
              <img class="headimg" :src="personal.headImg" alt="" v-if="personal.headImg.length>1">
              <div class="msgs">
                <h4>您好! {{personal.userName}}</h4>
                <b v-if="personal.friendsCircle==''">{{personal.mobile}}</b>
                <b v-if="personal.friendsCircle!=''">{{personal.friendsCircle}}（1）</b>
              </div>
              <div class="go" id="go" style="display: none" @mouseleave="hidego">
                <div class="heimg">
                  <div class="yilogo">
                    <img :src="personal.headImg.length<2?'../../static/images/109.png':personal.headImg" alt />
                    <div class="gemsg">
                      <p>
                        <b>您好!</b>
                        <span>{{personal.userName}}</span>
                      </p>
                      <div>
                        <span>{{personal.mobile}}</span>
                        <button @click="goPersonal">个人中心</button>
                        <button class="outs" @click="logout">退出</button>
                      </div>
                    </div>
                    <h5 v-if="personal.authenticationState==0&&personal.roleId==1">
                      <b v-if="personal.authenticationState==0&&personal.roleId==1">
                        <span>您有一个法人账户未实名认证,</span>
                        <router-link tag="a" :to="{name:'personal', params:{data:'faren'}}">请处理</router-link>
                      </b>
                    </h5>
                  </div>
                </div>
                <h4 v-if="personal.roleId==1">
                  <span>重点推荐</span>
                  <b @click="linkzhong">更多>></b>
                </h4>
                <ul  v-if="personal.roleId==1">
                  <li v-for="(item,idx) in recommendVoList" :key="idx">
                    <a href="javascript:;" @click="gotui(item)">{{item.title}}</a>
                    <span>{{clearFen(item.publishTime)}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    导航-->
      <div class="nav" >
        <navBar :cNav="clect"></navBar>
      </div>
      <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" ></place>
    </div>
</template>

<script>
  let that;
  import navBar from "./navBar";
    export default {
        name: "headNav",
        data(){
            return {
                select:{
                    name:'服务项目',
                    id:0,
                },
                personal:'',
                loginShow:0,
                token:'',
                recommendVoList:'',
                user: "13674920000",
                password: "123456",
                choosecate:['服务项目','企业信息','政策信息'],
                cateSearch:'',//输入框
              placeshow:false,
              success:2
            }
        },
        methods:{
          aaa(){

          },
          //前往推荐页面
          gotui(i){
            if(i.type==1){
              let {href} = this.$router.resolve({
                path: '/newslist/newsdetali',
                query: {
                  id:i.newsId
                }
              });;;
              window.open(href, '_blank')
            }else if(i.type==2){
              let {href} = this.$router.resolve({
                path: '/policy/policydetali',
                query: {
                  id:i.newsId
                }
              });;;
              window.open(href, '_blank')
            }else if(i.type==3){
              let {href} = this.$router.resolve({
                path: '/information/informationMore/informationdetali',
                query: {
                  id:i.newsId
                }
              });
              window.open(href, '_blank')
            }else if(i.type==4){
              let {href} = this.$router.resolve({
                path: '/information/guides/guidesDetali',
                query: {
                  id:i.newsId
                }
              });;;
              window.open(href, '_blank')
            }
          },
            choose(){
                $('#select').slideDown(200);
            },
            xuan(index,i){
                this.select.name=index;
                this.select.id=i;
                $('#select').slideUp(200);
            },
            bigg(){
                $('#weig').fadeIn(200);
            },
            biggs(){
                $('#weig').fadeOut(200);
            },
            bigga(){
                $('#weiapp').fadeIn(200);
            },
            biggas(){
                $('#weiapp').fadeOut(200);
            },
            goindex(){
                this.$router.push('/')
            },
            gologin(){
              this.placeshow=true;
            },
            //登录
            login() {
                this.axios
                    .post("/web/login/login", {
                        mobile: this.user,
                        password: this.password
                    })
                    .then(({ data }) => {
                      if (data.code === 10001) {
                        this.loginShow = 1;
                        this.personal = data.data;
                        this.token = data.data.tokenSign;
                        localStorage.setItem("token", this.token);
                        localStorage.setItem("personal", JSON.stringify(data.data));
                        window.location.reload();
                        var that = this;
                        setTimeout(function () {
                          this.axios
                            .post("/web/user/recommend", {
                              userId: that.personal.userId,
                              token: that.personal.token,
                              current: 1,
                              size: 4
                            })
                            .then(({data}) => {
                              if (data.code == 10001) {
                                that.recommendVoList = data.data.records;
                              }
                            });
                        }, 2000)
                      }
                      ;
                      if (data.code === 500) {
                        $("#erro").fadeIn(200);
                        setTimeout(function () {
                          $("#erro").fadeOut(200);
                        }, 2000);
                      }
                    })
                          // console.log(data)
            },
            //退出
            logout() {
                // this.loginShow=0;
                // localStorage.removeItem('token');
                // localStorage.removeItem('personal');
                // window.location.reload();
                this.axios
                    .post("/web/user/logout", { token: this.token })
                    .then(({ data }) => {
                        if (data.code == 10001) {
                            this.loginShow = 0;
                            localStorage.removeItem("token");
                            localStorage.removeItem("personal");
                            this.$router.push('/');
                        }
                    });
            },
            //个人中心
            goPersonal() {
                this.$router.push("/personal");
            },
            //注册页面
            goRegistered() {
                this.$router.push("/registered");
            },
            //找回密码页面
            resultPassword() {
                this.$router.push("/resultPassword");
            },
            //鼠标移出隐藏登录框
            hidelogin(){
                $('#login').css({display:'none'})

            },
            //切割数组
            sliceAway(arr, i) {
                //arr=数组  i切割结束的下标
                return arr.slice(0, i);
            },
            //重点推荐页面
            linkzhong() {
                this.$router.push("/personal");
                localStorage.setItem("zhong", "推荐");
            },
            clearFen(i) {
                return i.substring(0, i.indexOf(" "));
            },
            //隐藏推荐框
            hidego(){
                $('#go').css({display:'none'});

            },
            //推荐框显示
            showgo(){
                $('#go').fadeIn(200);

            },
            //隐藏搜索选项
            hideselect(){
                $('#select').fadeOut(200);

            },
            //首页搜素页面
            goserchscate(){
              this.$router.push({
                  path:'/indexserch',
                  query:{
                      id:this.select.id,
                  }
              })
            }
        },
        created(){
            that=this;
            let status = localStorage.getItem("token");
            //获取缓存个人信息数据
            let ge = localStorage.getItem("personal");
            this.personal = JSON.parse(ge);
            console.log(this.personal);
            if (status == null) {
                this.loginShow = 0;
            } else {
                this.token = status;
                this.loginShow = 1;
              this.axios
                .post("/web/user/recommend", {
                  userId :  this.personal.userId,
                  token: this.personal.token,
                  current: 1,
                  size: 4
                })
                .then(({ data }) => {
                  if(data.code==10001){
                    this.recommendVoList = data.data.records;
                  }
                });

            }
        },
      props:{
        clect:{
          type:Number,
          default:0
        },
        title:{
          type:String,
          default:'铜陵市民营经济云服务智慧平台'
        }
      },
        components:{
            navBar
        }
    }
</script>

<style scoped lang="less">
  #select{
    position: absolute;
    width: 116px;
    top:70px;
    left: 0;
    background: #fff;
    z-index: 999;
    border:1px solid #e6e6e6;
    li{
      cursor: pointer;
      width: 116px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
    }
    li:hover{
      background: #e6e6e6;
    }
  }
  .top{
    width:100%;
    height:30px;
    background:rgba(242,242,242,1);
    .con{
      width: 1200px;
      height: 30px;
      margin: 0 auto;
      p{
        float: left;
        font-size:14px;
        line-height: 30px;
        font-weight:400;
        color:rgba(73,73,73,1);
        height: 30px;
      }
      div{
        height: 30px;
        line-height: 30px;
        float: right;
        b{
          display: block;
          float: left;
          width: 16px;
          height: 16px;
          background: url("../../static/images/1.png");
          margin-top: 7px;
        }
        span{
          height: 30px;
          line-height: 30px;
          display: block;
          float: left;
          font-size:14px;
          font-weight:400;
          color:rgba(73,73,73,1);
          margin-left: 2px;
        }
      }
    }
  }
  .warp{
    width: 100%;
    height: 110px;
    .warp_c{
      width: 1200px;
      height: 110px;
      margin: 0 auto;
      .t_center{
        float: left;
        height: 85px;
        margin: 12px 0;
        img{
          width: 37px;
          height: 85px;
          float: left;
          margin-left: 17px;
          display: block;
          cursor: pointer;
        }
        div.tit{
          float: left;
          margin-left: 17px;
          margin-top: 9px;
          h4{
            height: 40px;
            line-height: 40px;
            font-size:28px;
            font-weight:bold;
            color:rgba(231,57,10,1);
          }
          span{
            /*display: block;*/
            /*height: 20px;*/
            /*line-height: 20px;*/
            /*width:393px;*/
            /*font-size:10px;*/
            /*font-weight:bold;*/
            /*color:rgba(231,57,10,1);*/
            display: block;
            width: 393px;
            height: 8px;
            margin-top: 5px;
            background: url("../../static/images/100.png") no-repeat;

          }
        }
      }
      .t_right{
        float: right;
        height: 110px;
        position: relative;
        .serch{
          height: 36px;
          margin: 35px 55px 35px 0;
          width: auto;
          float: left;
          div{
            float: left;
            width:290px;
            height:34px;
            border:1px solid rgba(228,228,228,1);
            span {
              cursor: default;
              float: left;
              display: block;
              width: 60px;
              height: 34px;
              line-height: 34px;
              padding:0 20px;
              font-size:14px;
              font-weight:400;
              color:rgba(73,73,73,1);
              position: relative;
              border-right: 1px solid rgba(228,228,228,1);
              i{
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-top-color: #d7d7d7;
                display: block;
                position: absolute;
                top: 14px;
                right: 10px;
              }
            }
            input{
              width: 169px;
              height: 34px;
              line-height: 34px;
              border:none;
              outline: none;
              padding: 0 10px;
              font-size:14px;
              font-weight:400;
            }
            input[type=text]:focus{
              border:1px solid #ff744f;
              outline:none;
              width: 167px;
              height: 32px;
            }
          }
          button{
            display: block;
            float: left;
            border: none;
            outline: none;
            width:60px;
            height:36px;
            line-height: 36px;
            background:rgba(231,57,10,1);
            border-radius:0 4px 4px 0;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
          button:hover{
            background:#f00;
          }
        }
        .wechat{
          width: 239px;
          height: 67px;
          float: right;
          margin: 20px  0;
          text-align: center;
          position: relative;
          p{
            display: inline-block;
            line-height: 67px;
          }
          span{
            font-size:18px;
            font-weight:400;
            cursor: pointer;
            margin-right: 20px;
            color: #666;
          }
          .weilog{
            span:hover{
              border-bottom: 1px solid #e7390a;
              color: #e7390a;
            }
          }
          span:last-child{
            margin-right: 0;
          }
          img.headimg{
            width: 65px;
            height: 65px;
            border-radius: 50%;
            display: block;
            float: left;
          }
          .msgs{
            float: left;
            margin-left: 10px;
            cursor: default;
            h4{
              height: 37px;
              line-height: 37px;
              font-size:18px;
              font-weight:400;
              color:rgba(99,192,66,1);
            }
            b{
              width:128px;
              height:25px;
              background:rgba(239,255,235,1);
              border:1px solid rgba(99,192,66,1);
              border-radius:4px;
              text-align: center;
              line-height: 25px;
              font-size:16px;
              font-weight:400;
              color:rgba(99,192,66,1);
              display: block;
            }
          }
          .login {
            position: absolute;
            top: 77px;
            left: -129px;
            z-index: 999;
            width: 363px;
            height: 300px;
            background: url("../../static/images/8.png") no-repeat;
            h2 {
              width: 363px;
              height: 56px;
              line-height: 56px;
              text-align: center;
              font-size: 18px;
              font-weight: 400;
              color: rgba(229, 53, 9, 1);
              padding-top: 10px;
            }
            h4 {
              width: 284px;
              height: 20px;
              margin: 0 auto 6px;
              h3 {
                width: 284px;
                height: 20px;
                border-radius: 2px;
                display: flex;
                align-items: center;
                span {
                  margin-left: 13px;
                  font-size: 14px;
                  font-weight: bold;
                  color: rgba(69, 69, 69, 1);
                }
              }
            }

            div {
              width: 284px;
              height: 36px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(227, 227, 227, 1);
              border-radius: 2px;
              margin: 0 auto 16px;
              img {
                display: block;
                float: left;
                margin: 6px;
              }
              input {
                float: left;
                border: none;
                outline: none;
                width: 240px;
                height: 36px;
                line-height: 36px;
                padding: 0 3px;
                font-size: 14px;
                font-weight: 400;
              }
            }
            button {
              display: block;
              width: 284px;
              height: 36px;
              background: #fff;
              color: #e8390a;
              border: 1px solid #e8390a;
              border-radius: 2px;
              text-align: center;
              border: none;
              outline: none;
              line-height: 36px;
              margin: 0 auto;
              font-size: 16px;
              font-weight: 400;
            }
            button:hover{
              background: rgba(229, 53, 9, 1);
              color: #fff;
            }
            p {
              display: block;
              overflow: hidden;
              width: 284px;
              margin: 0 auto;
              padding-top: 15px;
              line-height: 20px;
              em{
                cursor: default;
                display: block;
                float: left;
                font-size: 14px;
                height: 20px;
                color: rgba(41, 93, 211, 1);
              }
              em:last-child {
                float: right;
              }
              em:hover{
                border-bottom: 1px solid  rgba(41, 93, 211, 1);
              }
            }
          }
          .go {
            position: absolute;
            top: 77px;
            left: -129px;
            z-index: 999;
            width: 363px;
            height: 300px;
            background: url("../../static/images/8.png") no-repeat;
            .heimg {
              user-select: none;
              cursor: pointer;
              padding: 30px 20px 0 20px;
              height: 93px;
              border-bottom: 1px dashed #e3e3e3;
              .yilogo {
                width: 320px;
                height: 48px;
                img {
                  display: block;
                  float: left;
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                }
                .gemsg {
                  float: left;
                  margin-left: 12px;
                  width: 260px;
                  p {
                    height: 24px;
                    width: 250px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    b {
                      font-size: 16px;
                      font-weight: 400;
                      color: rgba(69, 69, 69, 1);
                    }
                    span {
                      margin-left: 11px;
                      font-size: 14px;
                      font-weight: 400;
                      color: rgba(69, 69, 69, 1);
                    }
                  }
                  div {
                    height: 24px;
                    width: 260px;
                    span {
                      width: 91px;
                      display: block;
                      height: 24px;
                      line-height: 24px;
                      float: left;
                      font-size: 14px;
                      font-weight: 400;
                      color: rgba(69, 69, 69, 1);
                      margin-right: 7px;
                    }
                    button {
                      display: block;
                      float: left;
                      margin-left: 12px;
                      outline: none;
                      border: none;
                      width: 65px;
                      height: 24px;
                      background: rgba(229, 53, 9, 1);
                      border-radius: 2px;
                      text-align: center;
                      font-size: 12px;
                      font-weight: 400;
                      color: rgba(255, 255, 255, 1);
                    }
                    button:hover {
                      cursor: pointer;
                      background: #e7522d;
                    }
                    button.outs {
                      background: #cfcfcf;
                    }
                    button.outs:hover {
                      cursor: pointer;
                      background: #e1dddd;
                    }
                  }
                }
              }
              h5 {
                user-select: none;
                cursor: default;
                padding-top: 11px;
                width: 310px;
                height: 34px;
                line-height: 34px;
                display: flex;
                align-items: center;
                span {
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(68, 68, 68, 1);
                }
                a {
                  margin-left: 10px;
                  color: #0060fe;
                  font-size: 14px;
                  font-weight: 400;
                }
              }
            }
            h4 {
              margin-top: 9px;
              height: 39px;
              margin-left: 20px;
              width: 320px;
              span {
                float: left;
                display: block;
                line-height: 39px;
                height: 39px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(230, 62, 22, 1);
              }
              b {
                cursor: pointer;
                display: block;
                float: right;
                font-size: 12px;
                font-weight: 400;
                color: rgba(137, 137, 137, 1);
                margin-top: 9px;
              }
              b:hover{
                border-bottom: 1px solid #e7390a;
                color: #e7390a;
              }
            }
            ul {
              margin-left: 20px;
              width: 320px;
              cursor: pointer;
              li {
                height: 30px;
                cursor: pointer;

                a {
                  float: left;
                  text-align: left;
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(70, 70, 70, 1);
                  max-width: 235px;
                  overflow: hidden; //超出的文本隐藏
                  text-overflow: ellipsis; //溢出用省略号显示
                  white-space: nowrap; //溢出不换行
                  margin: auto 0;
                }
                a:hover{
                  border-bottom: #e7390a 1px solid ;
                  color: #e7390a;
                }
                span {
                  float: right;
                  cursor: default;
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(70, 70, 70, 1);
                  margin: auto 0;
                }
              }
            }
          }
        }
      }
    }
  }
  .nav{
    width:100%;
    height:42px;
    background:rgba(231,57,10,1);
  }
</style>
