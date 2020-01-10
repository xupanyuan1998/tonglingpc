<template>
  <div>
    <div class="content">
      <div class="center">
        <div class="logo">
          <img src="../../static/images/logo.png" alt="" @click="goindex">
          <p>
            <span>铜陵市民营经济云服务智慧平台</span>
            <b>Intelligent Platform for Cloud Service of Tongling Private Economy</b>
          </p>
        </div>
        <h3>忘记密码</h3>
      </div>
    </div>
    <div class="warp">
      <div class="logo"><img src="../../static/images/79.png" alt=""></div>
      <ul>
        <li><span>绑定手机号码:</span>
          <div><input type="text" @input="yanphone" v-model="phone" placeholder="请输入绑定的手机号码"><em
            id="yanphone">手机号格式不正确</em></div>
        </li>
        <li><span>手机验证码:</span>
          <div><input type="text" class="yan" v-model="code" placeholder="请输入验证码">
            <button v-if="isdao=='false'" @click="getMsgnum">获取验证码</button>
            <button v-if="isdao=='true'">{{dao}}</button>
            <em id="code">验证码不能为空</em></div>
        </li>
        <li><span>新密码:</span>
          <div><input type="password" v-model="password" placeholder="请输入请输入6-16为数字、字符或符号"><em id="password">您输入的密码格式不正确</em></div>
        </li>
        <li><span>确定密码:</span>
          <div><input type="password" @input="yanrepass" placeholder="请再次输入密码" v-model="repassword"><em id="repass">两次密码不一致</em>
          </div>
        </li>
      </ul>
      <button class="save" @click="changepass">完成</button>
    </div>
    <div class="footer">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
  import footerNav from "./footer"

  export default {
    name: "resultPassword",
    components: {
      footerNav
    },
    data() {
      return {
        isdao: 'false',
        dao: 60,
        timer: '',
        phone: '',
        code: '',
        password: '',
        repassword: ''
        /*
        //滑块验证
        beginClientX:0,   //距离屏幕左端距离/
        mouseMoveStata:false,  //触发拖动状态 判断*!/
        maxwidth:'',    //拖动最大宽度，依据滑块宽度算出来的*!/
        confirmWords:'拖动滑块验证', //滑块文字*!/
        confirmSuccess:false   //验证成功判断*!/
        */
      }
    },
    methods: {
      //返回首页
      goindex() {
        this.$router.push('/')
      },
      //获取验证码
      getMsgnum() {
        var that = this;
        var phonereg = /^1[3456789]\d{9}$/;//手机号正则
        $('#yanphone').css({display: 'none'});
        if (!phonereg.test(this.phone)) {
          $('#yanphone').css({display: 'block'});
        } else {
          clearInterval(that.timer);
          this.axios.post('/web/send/send', {mobile: this.phone, type: 2}).then((res) => {
            console.log(res.data.code);
            if (res.data.code == 10001) {
              that.isdao = 'true';
              that.timer = setInterval(function () {
                if (that.dao > 0) {
                  that.dao--;
                }
                if (that.dao <= 0) {
                  clearInterval(that.timer);
                  that.isdao = 'false';
                  that.dao = 60;
                }
              }, 1000);
            }else{
              that.$message.error(res.data.msg);
            }
          })
        }

      },
      //验证手机号
      yanphone() {
        $('#yanphone').css({display: 'none'});
        var phonereg = /^1[3456789]\d{9}$/;//手机号正则
        if (!phonereg.test(this.phone)) {
          $('#yanphone').css({display: 'block'});
        }
      },
      //验证第二次密码
      yanrepass() {
        $('#repass').css({display: 'none'});
        if (this.repassword != this.password) {
          $('#repass').css({display: 'block'});
        }
      },
      //修改密码提交
      changepass() {
        $('#yanphone').css({display: 'none'});
        $('#code').css({display: 'none'});
        $('#password').css({display: 'none'});
        $('#repass').css({display: 'none'});
        var phonereg = /^1[3456789]\d{9}$/;//手机号正则
        var passreg=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,16}$/;//密码正则
        var that = this;
        if (!phonereg.test(this.phone)) {
          $('#yanphone').css({display: 'block'});
        }
        if (this.code == '') {
          $('#code').css({display: 'block'});
          $('#code').html('验证码不能为空');
        }
        if (!passreg.test(this.password)) {
          $('#password').css({display: 'block'});
        }else if(this.repassword != this.password){
          $('#repass').css({display: 'block'});
        } else {
          this.axios.post('/web/user/web/ResetPswd', {
            code: this.code,
            mobile: this.phone,
            newPassword: this.password
          }).then((data) => {
            if (data.data.code == 500) {
              that.$message.error('验证码错误');
              $('#code').css({display: 'block'});
              $('#code').html('验证码错误');
            } else if (data.data.code == 10001) {
              this.$message({
                showClose: true,
                message: '密码修改成功',
                type: 'success'
              });
              setTimeout(function () {
                that.$router.go(0);
              }, 2000)
            }
          })
        }
      }

      //
      /*mousedownFn:function (e) {
          if(!this.confirmSuccess){
              e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
              this.mouseMoveStata = true;
              this.beginClientX = e.clientX;
          }
      },  //mousedoen 事件
      successFunction(){
          this.confirmSuccess = true
          this.confirmWords = '验证通过';
          if(window.addEventListener){
              document.getElementsByTagName('html')[0].removeEventListener('mousemove',this.mouseMoveFn);
              document.getElementsByTagName('html')[0].removeEventListener('mouseup',this.moseUpFn);
          }else {
              document.getElementsByTagName('html')[0].removeEventListener('mouseup',()=>{});
          }
          document.getElementsByClassName('drag_text')[0].style.color = '#fff'
          document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
      },    //验证成功函数
      mouseMoveFn(e){
          if(this.mouseMoveStata){
              let width = e.clientX - this.beginClientX;
              if(width>0 && width<=this.maxwidth){
                  document.getElementsByClassName('handler')[0].style.left = width + 'px';
                  document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
              }else if(width>this.maxwidth){
                  this.successFunction();
              }
          }
      },     //mousemove事件
      moseUpFn(e){
          this.mouseMoveStata = false;
          var width = e.clientX - this.beginClientX;
          if(width<this.maxwidth){
              document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
              document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
          }
      }      //mouseup事件*/
    },
    mounted() {
      /* this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
       document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
       document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)*/
    }
  }
</script>

<style scoped lang="less">
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
        border-left: 2px solid #D9D9D9;
        float: left;
        line-height: 48px;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(69, 69, 69, 1);
      }
    }
  }

  .warp {
    width: 1200px;
    margin: 0 auto;
    padding: 88px 0 110px 0;

    .logo {
      margin-left: 540px;
      width: 181px;
      height: 102px;
    }

    ul {
      margin-left: 270px;
      margin-top: 90px;
      width: 590px;

      li {
        width: 590px;
        height: 44px;
        margin-bottom: 37px;

        span {
          display: block;
          width: 135px;
          text-align: right;
          height: 44px;
          line-height: 44px;
          float: left;
          font-size: 16px;
          font-weight: bold;
          color: rgba(69, 69, 69, 1);
        }

        div {
          overflow: hidden;
          padding-left: 20px;
          width: 402px;

          input {
            display: block;
            float: left;
            width: 380px;
            padding: 0 10px;
            line-height: 42px;
            height: 42px;
            border: 1px solid rgba(179, 179, 179, 1);
            outline: none;
          }
          input:focus, input.yan:focus{
            border: 1px solid #ff744f;
          }
          input.yan {
            width: 143px;
            border: 1px solid rgba(179, 179, 179, 1);
          }
          button {
            margin-left: 38px;
            outline: none;
            width: 137px;
            border: none;
            height: 44px;
            background: rgba(237, 237, 237, 1);
            font-size: 16px;
            font-weight: 400;
            color: rgba(188, 188, 188, 1);
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
        }
      }

      li:last-child {
        margin-bottom: 0;
      }
    }

    .save {
      outline: none;
      border: none;
      margin-left: 425px;
      margin-top: 60px;
      width: 402px;
      height: 51px;
      background: rgba(231, 57, 10, 1);
      border-radius: 4px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(255, 254, 254, 1);
    }
  }
</style>
<style scoped>
  .con {
    height: 100px;
    width: 300px;
  }

  .drag {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }

  .handler {
    width: 40px;
    height: 32px;
    border: 1px solid #ccc;
    cursor: move;
  }

  .handler_bg {
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
  }

  .handler_ok_bg {
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
  }

  .drag_bg {
    background-color: #7ac23c;
    height: 34px;
    width: 0px;
  }

  .drag_text {
    position: absolute;
    top: 0px;
    width: 100%;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
</style>
