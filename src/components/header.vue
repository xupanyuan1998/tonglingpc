<template>
  <div>
    <div class="top">
      <div class="con">
        <p >欢迎光临铜陵市民营经济云服务智慧平台！</p>
        <div><b></b><span>服务热线：0562-5880190</span></div>
      </div>
    </div>
    <!--    头部-->
    <div class="warp">
      <div class="warp_c">
        <div class="t_center">
          <img src="../../static/images/logo.png" alt="" @click="goindex">
          <div class="tit">
            <h4>{{title}}</h4>
            <span></span>
          </div>
        </div>
        <div class="t_right">
          <div class="serch">
            <div>
              <span v-model="select" @click="choose">{{select}} <i></i></span>
              <input type="text" placeholder="请输入关键字搜索">
            </div>
            <button>搜索</button>
          </div>
          <div class="wechat" v-if="loginShow==0" >
            <p>
              <span @click="gologin">请登录/</span>
              <span @click="goRegistered">注册</span>
            </p>
            <div class="login" style="display: none" id="login" @mouseleave="hidelogin">
              <h2>欢迎登录民营经济智慧云服务平台</h2>
              <h4>
                <h3 id="erro" style="display: none">
                  <img src="../../static/images/99.png" alt />
                  <span>账号或密码错误请重输!</span>
                </h3>
              </h4>
              <div>
                <img src="../../static/images/9.png" alt />
                <input type="text" placeholder="请输入用户名" v-model="user" />
              </div>
              <div>
                <img src="../../static/images/10.png" alt />
                <input type="password" placeholder="请输入密码" v-model="password" />
              </div>
              <button @click="login">登录</button>
              <p>
                <b class="gores" @click="resultPassword">忘记密码</b>
                <b class="gores" @click="goRegistered">免费注册</b>
              </p>
            </div>
          </div>
          <div class="wechat" v-if="loginShow==1" @mouseout="showgo">
            <img class="headimg" src="../../static/images/109.png" alt="" v-if="personal.headImg==''">
            <img class="headimg" :src="personal.headImg" alt="" v-if="personal.headImg!=''">
            <div class="msgs">
              <h4>您好! {{personal.realName}}</h4>
              <b v-if="personal.friendsCircle==null">{{personal.mobile}}</b>
              <b v-if="personal.friendsCircle!=null">{{personal.friendsCircle}}（1）</b>
            </div>
            <div class="go" id="go" style="display: none" @mouseleave="hidego">
              <div class="heimg">
                <div class="yilogo">
                  <img :src="personal.headImg==''?'../../static/images/80.png':personal.headImg" alt />
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
                  <h5>
                    <b >
                      <span>您有一个法人账户未实名认证,</span>
                      <router-link tag="a" to="/personal">请处理</router-link>
                    </b>
                  </h5>
                </div>
              </div>
              <h4>
                <span>重点推荐</span>
                <b @click="linkzhong">更多>></b>
              </h4>
              <ul>
                <li v-for="(item,idx) in recommendVoList">
                  <router-link
                    tag="a"
                    :to="{path:'/recommended',query:{id:item.recommendId}}"
                  >{{item.title}}</router-link>
                  <span>{{clearFen(item.publishTime)}}</span>
                </li>
              </ul>
            </div>
          </div>
          <ul id="select" style="display: none" @mouseleave="hideselect">
            <li @click="xuan('服务项目')">服务项目</li>
            <li @click="xuan('政策信息')">政策信息</li>
            <li @click="xuan('企业信息')">企业信息</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    let that;
    export default {
        name: "headNav",
        data(){
            return {
                select:'服务项目',
                personal:'',
                loginShow:0,
                token:'',
                recommendVoList:'',
                user: "13674920000",
                password: "123456",
            }
        },
        methods:{
            choose(){
                $('#select').slideDown(200);
            },
            xuan(index){
                this.select=index;
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
                $('#login').fadeIn(200) ;
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
                            console.log(this.personal);
                            that.token = data.data.tokenSign;
                            that.recommendVoList = this.sliceAway(data.data.recommendVoList, 4);
                            console.log(data.data.recommendVoList);
                            localStorage.setItem("token", data.data.tokenSign);
                            localStorage.setItem("personal", JSON.stringify(data.data));

                        }
                        if (data.code === 500) {
                            $("#erro").fadeIn(200);
                            setTimeout(function() {
                                $("#erro").fadeOut(200);
                            }, 2000);
                        }
                        // console.log(data)
                    });
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
                            window.location.reload();
                        }
                    });
            },
            //个人中心
            goPersonal() {
                this.$router.push("personal");
            },
            //注册页面
            goRegistered() {
                this.$router.push("/registered");
            },
            //找回密码页面
            resultPassword() {
                alert(1);
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
                this.recommendVoList = this.sliceAway(this.personal.recommendVoList, 4);
            }
        },
        props:['title'],
    }
</script>

<style scoped lang="less">
  #select{
    position: absolute;
    width: 70px;
    top:70px;
    left: 0;
    background: #fff;
    z-index: 999;
    li{
      cursor: pointer;
      width: 70px;
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
            width:260px;
            height:34px;
            border:1px solid rgba(228,228,228,1);
            span {
              cursor: default;
              float: left;
              display: block;
              width: 70px;
              height: 34px;
              line-height: 34px;
              padding: 0 8px;
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
                top: 16px;
                right: 8px;
              }
            }
            input{
              width: 150px;
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
        }
        .wechat{
          width: 210px;
          height: 67px;
          line-height: 67px;
          float: right;
          margin: 20px 24px 20px 0;
          text-align: center;
          position: relative;
          p{
            display: inline-block;
            line-height: 67px;
          }
          span{
            font-size:20px;
            font-weight:400;
            color:rgba(99,192,66,1);
            cursor: pointer;
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
            top: 64px;
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
              margin-bottom: 3px;
            }
            h4 {
              width: 284px;
              height: 20px;
              margin: 0 auto 6px;
              h3 {
                width: 284px;
                height: 20px;
                background: rgba(255, 234, 234, 1);
                border-radius: 2px;
                display: flex;
                align-items: center;
                img {
                  margin-left: 15px;
                }
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
              background: rgba(229, 53, 9, 1);
              border-radius: 2px;
              text-align: center;
              border: none;
              outline: none;
              line-height: 36px;
              margin: 0 auto;
              font-size: 16px;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
            p {
              width: 284px;
              margin: 0 auto;
              height: 30px;
              b.gores {
                cursor: default;
                height: 30px;
                line-height: 30px;
                display: block;
                float: left;
              }
              b:last-child {
                float: right;
              }
            }
            .gores {
              display: block;
              font-size: 14px;
              font-weight: 400;
              color: rgba(41, 93, 211, 1);
              height: 20px;
              line-height: 20px;
              text-align: center;
            }
          }
          .go {
            position: absolute;
            top: 64px;
            left: -129px;
            z-index: 999;
            width: 363px;
            height: 300px;
            background: url("../../static/images/8.png") no-repeat;
            .heimg {
              user-select: none;
              cursor: pointer;
              padding: 30px 33px 0 20px;
              height: 93px;
              border-bottom: 1px dashed #e3e3e3;
              .yilogo {
                width: 310px;
                height: 48px;
                img {
                  display: block;
                  float: left;
                  width: 48px;
                  height: 48px;
                }
                .gemsg {
                  float: left;
                  margin-left: 12px;
                  width: 250px;
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
                    width: 250px;
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
                      margin-left: 16px;
                      outline: none;
                      border: none;
                      width: 60px;
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
                    }
                    button.outs {
                      background: #cfcfcf;
                    }
                    button.outs:hover {
                      cursor: pointer;
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
                height: 39px;
                line-height: 39px;
              }
            }
            ul {
              margin-left: 20px;
              width: 320px;
              cursor: pointer;
              li {
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                a {
                  float: left;
                  display: block;
                  height: 24px;
                  line-height: 24px;
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(70, 70, 70, 1);
                  width: 235px;
                  overflow: hidden; //超出的文本隐藏
                  text-overflow: ellipsis; //溢出用省略号显示
                  white-space: nowrap; //溢出不换行
                }
                span {
                  display: block;
                  height: 24px;
                  line-height: 24px;
                  cursor: default;
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(70, 70, 70, 1);
                  float: right;
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
