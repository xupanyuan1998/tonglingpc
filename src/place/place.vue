<template>
  <div>
   <transition name = "my">
     <div class="placesa"  @mousewheel.prevent v-if="placeshow" @click="cloose">
       <div @click.stop="show">
         <div class="ca" v-if="success==0">
           <img src="../../static/images/138.png" alt="">
           <span>请登录企业法人账号</span>
         </div>
         <div class="success" v-if="success==1">
           <img src="../../static/images/95.png" alt="">
           <h2>提交成功</h2>
           <p>{{placemsg}}</p>
         </div>
         <div class="logins" v-if="success==2">
           <h2>欢迎登录民营经济智慧云服务平台</h2>
           <ul>
             <li>
               <img src="../../static/images/9.png" alt="">
               <input type="text" placeholder="请输入用户名" v-model="username">
             </li>
             <li>
               <img src="../../static/images/10.png" alt="">
               <input type="password" placeholder="请输入密码" v-model="pass">
             </li>
           </ul>
           <button @click.stop="gologin" >登录</button>
           <div><span @click.stop="results">忘记密码</span> <span @click.stop="res">免费注册</span></div>
           <img src="../../static/images/96.png" alt="" class="cloose" @click.stop="cloose">
         </div>
         <div class="error" v-if="success==5">
           <img src="../../static/images/138.png" alt="">
           <p>{{errorshow}}</p>
         </div>
         <div class="error" v-if="errors">
           <img src="../../static/images/138.png" alt="">
           <p>{{errorshows}}</p>
         </div>
         <!--        发布成功提示-->
         <div class="placesucc" v-if="success==3">
           <img src="../../static/images/95.png" alt="">
           <p>{{succmsg}}</p>
         </div>
         <!--选择弹框-->
         <div class="confim" v-if="success==4">
          <div class="msg-header">
            <span>提示</span>
            <i class="el-icon-close" @click.stop="cloose"></i>
          </div>
           <div class="msg-body">
             <span class="el-icon-warning"></span>
             <p>{{msgplace}}</p>
           </div>
           <div class="msg-btn">
             <button @click.stop="cloose">取消</button>
             <button @click.stop="msgok">确定</button>
           </div>
         </div>
       </div>
     </div>
   </transition>
  </div>
</template>

<script>
    export default {
        name: "place",
      props:{
          success:{
            type:Number,
            default:2
          },
        placeshow:{
          type:Boolean,
          default:false,
        },
        succmsg:{
            type:String,
          default:'提交成功'
        },
        errorshow:{
          type:String,
          default:'提交失败'
        },
        msgplace:{
          type:String,
          default:'此操作将永久删除该信息, 是否继续?'
        },
        msgok:{
            type:Function,
          default:function () {
            this.cloose();
              console.log('点击了按钮')
          }
        }
      },
        data(){
            return {
                username:'13674920000',
                pass:'123456',
                placemsg:'用户您好，我们将会以最快的速度为您办理，请耐心等待！',
              errors:false,
              errorshows:'',
            }
        },
        methods:{
            cloose(){
              this.hide();
            },
            show(){
                this.placeshow=true;
            },
            //注册页面
            res(){
                this.$router.push('/registered')
            },
            //找回密码页面
            results(){
                this.$router.push('/resultPassword')
            },
          //隐藏页面
          hide(){
            this.$emit("hide")
          },
          sliceAway(arr,i){
            //arr=数组  i切割结束的下标
            return arr.slice(0,i);
          },
            //弹框登录
            gologin(){
              var that=this;
              if(this.username==''){
                this.errors=true;
                this.errorshows='用户名不能为空';
                setTimeout(function () {
                  that.errors=false;
                },2000);
              }else if (this.pass==''){
                this.errors=true;
                this.errorshows='密码不能为空';
                setTimeout(function () {
                  that. errors=false;
                },2000);
              }else{
                this.axios
                  .post("/web/login/login", {
                    mobile: this.username,
                    password: this.pass
                  })
                  .then(({ data }) => {
                    if (data.code === 10001) {
                      this.loginShow = 2;
                      this.personal = data.data;
                      this.token = data.data.tokenSign;
                      if(data.data.recommendVoList !=null){
                        this.recommendVoList = this.sliceAway(data.data.recommendVoList, 4);
                      }
                      localStorage.setItem("token", data.data.tokenSign);
                      localStorage.setItem("personal", JSON.stringify(data.data));
                      that.hide();
                      window.location.reload();
                    }else{
                      this. errors=true;
                      this.errorshows=data.msg;
                      setTimeout(function () {
                        that. errors=false;
                      },2000);
                    }
                    // console.log(data)
                  });
              }

            },
        }
    }
</script>

<style scoped lang="less">
  .my-enter-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .my-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .my-enter, .my-leave-to
  {
    opacity: 0;
  }
  .placesa{
    width: 100vw;
    height: 100vh;
    background:rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .error{
      background: #fff;
      border-radius: 5px;
      padding: 10px;
      overflow: hidden;
      position: absolute;
      top: 10%;
      left: 50%;
      z-index: 999;
      transform: translateX(-50%);
      img{
        display: block;
        width: 30px;
        height: 30px;
        float: left;
      }
      p{
        display: block;
        float: left;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
        margin-right: 20px;
      }
    }
    .ca{
      width:350px;
      height:100px;
      padding-top: 20px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
      img{
        display: block;
        margin: 0 auto;
        width: 40px;
        height: 40px;
      }
      span{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #4d4d4d;
        font-size: 18px;
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
        cursor: pointer;
      }
      button:hover{
        background:#fe0000 ;
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
        transition: all 0.3s;
      }
      .cloose:hover{
        transform: rotate(360deg);
      }
    }
    .placesucc{
      width: 200px;
      height:150px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      border-radius: 4px;
      img{
        margin: 20px auto;
        width: 50px;
        height: 50px;
        display: block;
      }
      p{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
      }
    }
    .confim{
    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 400px;
      background: #FFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      font-size: 18px;
      text-align: left;
      backface-visibility: hidden;
      padding-bottom: 10px;
      .msg-header{
        position: relative;
        padding: 15px 15px 10px;
        span{
          font-size: 18px;
          line-height: 1;
          color: #303133;
        }
        i{
          font-size: 20px;
          display: block;
          position: absolute;
          right: 20px;
          top: 19px;
          cursor: pointer;
        }
      }
      .msg-body{
        padding: 10px 15px;
        overflow: hidden;
        color: #606266;
        font-size: 14px;
        span{
          display: block;
         font-size: 24px;
          color: #E6A23C;
          float: left;
        }
        p{
          padding-left: 12px;
          display:block;
          line-height: 24px;
          float: left;
          font-size: 16px;
        }
      }
      .msg-btn{
        padding: 5px 15px ;
        text-align: right;
        button{
          padding: 9px 15px;
          font-size: 12px;
          outline: none;
          border-radius: 3px;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          background: #FFF;
          border: 1px solid #DCDFE6;
          color: #606266;
          -webkit-appearance: none;
          text-align: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          outline: 0;
          margin: 0;
          transition: .1s;
        }
        button:first-child:hover{
          color: #409EFF;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
        button:last-child{
          color: #FFF;
          background-color: #409EFF;
          border-color: #409EFF;
        }
        button:last-child:hover{
          background: #66b1ff;
          border-color: #66b1ff;
          color: #FFF;
        }
      }
    }
  }
</style>

