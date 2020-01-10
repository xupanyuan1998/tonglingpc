<template>
  <div class="hello">
    <div class="content">
      <div class="center">
        <div class="logo">
          <img src="../../static/images/logo.png" alt @click="goindex" />
          <p>
            <span>铜陵市民营经济云服务智慧平台</span>
            <b>Intelligent Platform for Cloud Service of Tongling Private Economy</b>
          </p>
        </div>
        <h3>欢迎注册</h3>
      </div>
    </div>
    <div class="topbar">
      <nav-bar></nav-bar>
    </div>
    <div class="con">
      <div class="res">
        <img src="../../static/images/116.png" alt />
        <span>实名注册</span>
        <b>注:以下带*的为必填项</b>
      </div>
      <div class="warp">
        <ul>
          <li>
            <p>
              <b>*</b>
              <span>用户名:</span>
            </p>
            <div>
              <input type="text" v-model="username" placeholder="请输入用户名" @blur="ifuser"/>
              <em id="user">用户名不能为空</em>
            </div>
          </li>
          <li>
            <p>
              <b>*</b>
              <span>姓名:</span>
            </p>
            <div>
              <input type="text" v-model="trueName"  placeholder="真实姓名" @blur="ifname"/>
              <em id="trueName">真实姓名不能为空</em>
            </div>
          </li>
          <li>
            <p>
              <b>*</b>
              <span>手机号码:</span>
            </p>
            <div>
              <input type="text" v-model="phone" @input.stop="yanphone" placeholder="请输入手机号码" />
              <em id="yanphone">手机号码格式不正确</em>
            </div>
          </li>
          <li>
            <p>
              <b>*</b>
              <span>密码:</span>
            </p>
            <div>
              <div class="passw">
                <input
                  :type="passes"
                  v-model="password"
                  @focus="changeborder"
                  @blur="changes"
                  @input.stop="yanpassword"
                  placeholder="请输入6-16为数字、字符或符号"
                />
                <img src="../../static/images/117.png" alt v-if="eye" @click="passshow" />
                <img src="../../static/images/118.png" alt v-if="!eye" @click="passhide" />
              </div>

              <em id="password">您输入的密码格式不正确</em>
            </div>
          </li>
          <li class="yan">
            <p>
              <b>*</b>
              <span>手机验证码:</span>
            </p>
            <div>
              <input type="text" v-model="msgYan" placeholder="请输入验证码" />
              <span v-if="isdao=='false'" @click.stop="getMsgnum">获取短信验证码</span>
              <span v-if="isdao=='true'">{{dao}}</span>
              <em id="msgYan">请输入手机验证码</em>
            </div>
          </li>
          <li>
            <p></p>
            <div class="xieyi">
              <strong v-if="agree" @click="faagree"></strong>
              <i v-if="!agree" @click="tragree"></i>
              <span>
                我已阅读并同意
                <a href="javascript:">《铜陵市民营经济云服务智慧平台注册协议》</a>
              </span>
            </div>
          </li>
        </ul>
        <button v-if="agree" @click.stop="Registered">立即注册</button>
        <button class="ti" v-if="!agree">立即注册</button>
      </div>
    </div>
    <div>
      <footer-nav></footer-nav>
    </div>
    <div class="place" @mousewheel.prevent v-if="success==true">
      <div>
        <img src="../../static/images/53.png" alt />
        <span>注册成功</span>
      </div>
    </div>
  </div>
</template>

<script>
import footerNav from "./footer";
import navBar from "./navBar";
export default {
  name: "registered",
  components: {
    footerNav,
    navBar
  },
  data() {
    return {
      password: "", //密码 
      phone: '',//手机号
      msgYan: "", //验证码
      trueName: "", //真实姓名
      username: "", //用户名
      //倒计时
      isdao: "false",
      dao: 60,
      timer: "",

      success: false,
      agree: false,
      eye: true,
      passes: "password"
    };
  },
  created() {},
  methods: {
    changeborder() {
      $(".passw").css({ "border-color": "#ff744f" });
    },
    changes() {
      $(".passw").css({ "border-color": "rgba(179, 179, 179, 1)" });
    },
    passshow() {
      this.eye = false;
      this.passes = "text";
    },
    passhide() {
      this.eye = true;
      this.passes = "password";
    },
    tragree() {
      this.agree = true;
    },
    faagree() {
      this.agree = false;
    },
    //回首页
    goindex() {
      this.$router.push("/");
    },
    //获取验证码
    getMsgnum() {
      var that = this;
      var phonereg = /^1[3456789]\d{9}$/; //手机号正则
      $("#yanphone").css({ display: "none" });
      if (!phonereg.test(this.phone)) {
        $("#yanphone").css({ display: "block" });
      } else {
        clearInterval(that.timer);
        this.axios
          .post("/web/send/send", { mobile: this.phone, type: 0 })
          .then(res => {
            console.log(res.data.code);
            if (res.data.code == 10001) {
              that.isdao = "true";
              that.timer = setInterval(function() {
                if (that.dao > 0) {
                  that.dao--;
                }
                if (that.dao <= 0) {
                  clearInterval(that.timer);
                  that.isdao = "false";
                  that.dao = 60;
                }
              }, 1000);
            }
          });
      }
    },
    //立即注册
    Registered() {
      let that = this;
      var phonereg = /^1[3456789]\d{9}$/; //手机号正则;
      var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/; //身份证正则
      var passreg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,16}$/; //密码正则
      //判断
      $(".warp ul li em").css({ display: "none" });
      //判断证件类型和与其对应的号码
      if  (this.username== "") {
        $("#user").css({ display: "block" });
      } else if(this.trueName=='') {
        $("#trueName").css({ display: "block" });
      }else if(!phonereg.test(this.phone)) {
        $("#yanphone").css({ display: "block" });
      }  else if (!passreg.test(this.password)) {
        $("#password").css({ display: "block" });
      } else if (this.msgYan == "") {
        $("#msgYan").css({ display: "block" });
      } else {
        let data = {
          userName: this.username,
          realName: this.trueName,
          password: this.password,
          mobile: this.phone,
          code: this.msgYan,
          type: 0
        };
        this.axios.post("/web/register/register", data).then(datas => {
          if (datas.data.msg == "注册成功") {
            that.success = true;
            setTimeout(function() {
              that.$router.push("/");
            }, 2000);
          } else if (datas.data.code == 500) {
            that.$message({
              message: datas.data.msg,
              type: "warning"
            });
            if (datas.data.msg == "验证码错误") {
              that.$message.error("验证码错误");
              $("#msgYan").css({ display: "block" });
              $("#msgYan").html("验证码错误");
            } else {
              setTimeout(function() {
                that.$router.push("/");
              }, 2000);
            }
          }
        });
      }
    },
    //验证手机号
    yanphone() {
      $("#yanphone").css({ display: "none" });
      var phonereg = /^1[3456789]\d{9}$/; //手机号正则
      if (!phonereg.test(this.phone)) {
        $("#yanphone").css({ display: "block" });
      }
    },
    //验证用户名不能为空
    getinput() {
      $("#user").css({ display: "none" });
      if (this.username == "") {
        $("#user").css({ display: "block" });
      }
    },
    //验证密码不能为空
    yanpassword() {
      var passreg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,16}$/;
      $("#password").css({ display: "none" });
      if (!passreg.test(this.password)) {
        $("#password").css({ display: "block" });
      }
    },
    ifuser(){
       $("#user").css({ display: "none" });
       if  (this.username== "") {
        $("#user").css({ display: "block" });
      }
    },
    ifname(){
       $("#trueName").css({ display: "none" });
      if(this.trueName=='') {
        $("#trueName").css({ display: "block" });
      }
    },
  },
  mounted() {
    document.addEventListener("click", function() {
      $("#type").css({ display: "none" });
    });
  },
  destroyed() {
    document.removeEventListener("click", function() {
      $("#type").css({ display: "none" });
    });
  }
};
</script>
<style scoped lang="less">
.hello {
  background: #f5f5f5;
}
.topbar {
  background: #e7390a;
}
.con {
  width: 1200px;
  margin: 40px auto;
  height: 843px;
  background: #fff;
  border: 1px solid rgba(204, 204, 204, 1);
}
.content {
  border-bottom: 2px solid #d9d9d9;
  .center {
    padding: 26px 0 10px;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    .logo {
      height: 83px;
      float: left;
      margin-right: 10px;

      img {
        display: block;
        float: left;
        margin-right: 17px;
        cursor: pointer;
      }

      p {
        height: 83px;
        float: left;

        span {
          display: block;
          margin-top: 17px;
          height: 28px;
          font-size: 28px;
          font-weight: bold;
          color: rgba(231, 57, 10, 1);
        }

        b {
          display: block;
          height: 8px;
          font-size: 10px;
          font-weight: bold;
          color: rgba(231, 57, 10, 1);
          margin-top: 12px;
        }
      }
    }
    h3 {
      margin-top: 25px;
      height: 48px;
      border-left: 2px solid #d9d9d9;
      float: left;
      line-height: 48px;
      padding-left: 10px;
      font-size: 20px;
      font-weight: 400;
      color: rgba(69, 69, 69, 1);
    }
  }
}
.res {
  height: 60px;
  background: rgba(247, 247, 247, 1);
  img {
    float: left;
    display: block;
    margin: 17px 10px 17px 21px;
  }
  span {
    cursor: default;
    display: block;
    float: left;
    font-size: 20px;
    color: rgba(69, 69, 69, 1);
    height: 60px;
    line-height: 60px;
  }
  b {
    display: block;
    float: right;
    height: 60px;
    line-height: 60px;
    margin-right: 26px;
    font-size: 16px;
    color: #fe0000;
    font-weight: 400;
  }
}
.warp {
  margin: 0 auto;
  padding: 49px 0 52px 232px;
  ul {
    li {
      height: 48px;
      margin-bottom: 30px;
      p {
        float: left;
        height: 40px;
        margin-right: 32px;
        width: 168px;
        text-align: right;

        b {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(254, 0, 0, 1);
          margin-right: 12px;
        }

        span {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(116, 116, 116, 1);
        }
      }
      div {
        float: left;
        height: 52px;
        position: relative;
        h2 {
          display: block;
          padding: 0 10px;
          font-weight: 400;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
          width: 378px;
          border: 1px solid rgba(179, 179, 179, 1);
          outline: none;
          position: relative;
          strong {
            width: 32px;
            height: 28px;
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(229, 229, 229, 1);
            a {
              display: inline-block;
              position: relative;
              width: 28px;
              height: 28px;
            }
            a:after {
              display: inline-block;
              content: " ";
              height: 10px;
              width: 10px;
              border-width: 0 1px 1px 0;
              border-color: #1a1a1a;
              border-style: solid;
              transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
              transform-origin: center;
              transition: transform 0.3s;
              position: absolute;
              top: 50%;
              right: 5px;
              margin-top: -7px;
            }
          }
        }
        input {
          float: left;
          display: block;
          padding: 0 10px;
          height: 42px;
          line-height: 42px;
          width: 378px;
          border: 1px solid rgba(179, 179, 179, 1);
          outline: none;
        }
        input:focus {
          border: 1px solid #ff744f;
        }
        em {
          display: none;
          float: left;
          width: 100%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #c00;
        }
        ul {
          display: none;
          width: 398px;
          position: absolute;
          top: 28px;
          left: 0;
          z-index: 999;
          background: #fff;
          border: 1px solid #e6e6e6;
          li {
            width: 378px;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            padding-left: 20px;
            margin: 0;
            cursor: default;
          }
          li:hover {
            background: #f6f7f9;
          }
        }
      }
      div.passw {
        width: 400px;
        float: left;
        height: 42px;
        border: 1px solid rgba(179, 179, 179, 1);
        position: relative;
        input {
          width: 330px;
          border: none;
          outline: none;
        }
        img {
          position: absolute;
          top: 15px;
          right: 8px;
          width: 21px;
          height: 9px;
        }
      }
      div.xieyi {
        strong {
          display: block;
          float: left;
          width: 18px;
          height: 18px;
          background: rgba(216, 216, 216, 1);
          border: 1px solid rgba(198, 198, 198, 1);
          border-radius: 4px;
          margin-top: 3px;
        }
        i {
          display: block;
          float: left;
          width: 18px;
          height: 18px;
          background: rgba(216, 216, 216, 1);
          border: 1px solid rgba(198, 198, 198, 1);
          border-radius: 4px;
          margin-top: 3px;
        }
        strong:before {
          width: 6px;
          height: 12px;
          content: "";
          display: block;
          border-color: #009933;
          border-style: solid;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
          margin-left: 5px;
        }
        span {
          display: block;
          float: left;
          margin-left: 18px;
          height: 20px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(27, 98, 216, 1);
          a {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(27, 98, 216, 1);
          }
        }
      }
    }
    li.yan {
      div {
        input {
          width: 165px;
          display: block;
          float: left;
        }

        img {
          display: block;
          float: left;
          width: 141px;
          height: 40px;
          margin-top: 2px;
          margin-left: 36px;
        }

        span {
          display: block;
          float: left;
          width: 137px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          background: rgba(237, 237, 237, 1);
          margin-left: 36px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(188, 188, 188, 1);
        }
      }
    }
  }
  button {
    display: block;
    outline: none;
    border: none;
    width: 286px;
    height: 51px;
    background: rgba(231, 57, 10, 1);
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
    margin: 18px 0 0 225px;
    cursor: pointer;
  }
  button.ti {
    background: #9e9e9e;
  }
}
.place {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.16);
  position: fixed;
  top: 0;
  left: 0;
  div {
    width: 294px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 20px auto;
    }
    span {
      display: block;
      height: 68px;
      text-align: center;
      line-height: 68px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(69, 69, 69, 1);
    }
  }
}
</style>
