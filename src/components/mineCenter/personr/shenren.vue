<template>
  <div>
    <div class="idAuthen">
      <div class="renzBot">
        <!-- 您的个人信息已通过认证 -->
       <div class="place">
         <p v-if="personal.authenticationState==2"><img src="../../../../static/images/132.png" alt=""><span>您的个人信息已通过认证</span></p>
         <p v-if="personal.authenticationState==1"><img src="../../../../static/images/119.png" alt=""><span>欢迎进行企业法人身份认证</span></p>
       </div>
        <!-- 欢迎进行个人身份认证 -->
        <div v-if="personal.authenticationState==2"  class="msg">
          <ul>
            <li><span>手机号码&nbsp;:</span><b>{{personal.mobile}}</b></li>
            <li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span><b>{{personal.realName}}</b></li>
            <li><span>注册时间&nbsp;:</span><b>{{personal.addTime}}</b></li>
            <li><span>认证时间&nbsp;:</span><b>{{personal.authenticationTime}}</b></li>
          </ul>
        </div>
        <div v-if="personal.authenticationState==1" class="msg" @click="place">
          <ul>
            <li><span>手&nbsp;机&nbsp;号&nbsp;码&nbsp;：</span><b>{{personal.mobile}}</b></li>
            <li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;：</span><b>{{personal.realName}}</b></li>
            <li><span>注&nbsp;册&nbsp;时&nbsp;间&nbsp;：</span><b>{{personal.addTime}}</b></li>
            <li><span>短信验证码&nbsp;：</span><input  type="text" v-model="code"><em v-if="isdao==false" @click.stop="getMsgnum">获取验证码</em><em v-if="isdao==true">{{dao}}</em><strong id="yanphone">*&nbsp;验证码错误</strong></li>
          </ul>
          <button @click.stop="saveren">提交</button>
        </div>
      </div>
    </div>
    <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" :succmsg="plas" :errorshow="error"></place>
  </div>
</template>
<script>
let that;
export default {
  name: "shenren",
  data() {
    return {
      authenticationState: 0,
      isdao: false,
      dao: 60,
      personal: "",
        timer:null,
        code:'',
      placeshow:false,
      success:3,
      plas:'',
      error:''
    };
  },
  created() {
    that = this;
    this.personal = JSON.parse(localStorage.getItem("personal"));
  },
  methods: {
      //提示
      place(){
          $("#yanphone").css({ 'display': "none" });
      },
    // 验证手机验证码
    getMsgnum() {
      var that = this;
        this.axios
            .post("/web/send/send", { mobile:this.personal.mobile, type: 3})
            .then(res => {
                if (res.data.code == 10001) {
                    that.isdao = true;
                    that.timer = setInterval(function() {
                        if (that.dao > 0) {
                            that.dao--;
                        }
                        if (that.dao <= 0) {
                            clearInterval(that.timer);
                            that.isdao = false;
                            that.dao = 60;
                        }
                    }, 1000);
                }
            });

    },
      //提交认证法人
      saveren(){
        let that=this;
        if(this.code==''){
            $("#yanphone").css({ 'display': "block" });
        }else{
            this.axios.post('/web/user/web/authentication',{mobile:this.personal.mobile,code:this.code}).then((res)=>{
                if(res.data.code==10001){
                    localStorage.setItem("personal", JSON.stringify(res.data.data));
                    console.log(res.data.data);
                  this.placeshow=true;
                  this.success=3;
                  this.plas='恭喜你认证成功';
                    setTimeout(function () {
                      that.placeshow=false;
                     window.location.reload();
                    },2000)
                }else if(res.data.code==500){
                  this.placeshow=true;
                  this.success=5;
                  this.error=res.data.msg;
                }
            })
        }
      }
  }
};
</script>
<style lang="less" scopd>
// 身份认证
.idAuthen {
  padding:0 30px;
  .renzBot {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(69, 68, 68, 1);
    .place{
     height: 32px;
      padding: 15px 0;
      border-bottom: 2px solid #ff4c4c;
      p{
        height: 32px;
        img{
          display: block;
          float: left;
          width: 32px;
          height: 32px;
          margin-left: 20px;
        }
        span{
          display: block;
          float: left;
          height: 32px;
          line-height: 32px;
          color: #4e4e4e;
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
    .msg{
      margin-left: 62px;
      margin-top: 15px;
      li{
        font-size: 18px;
        overflow: hidden;
        >*{
          display: block;
          float: left;
        }
        span{
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #4e4e4e;
          text-align: right;
          width: 101px;
        }
        b{

          height:40px;
          line-height: 40px;
          font-size: 16px;
          color: #4e4e4e;
          font-weight: 400;
        }
        input{
          margin: 3px 0;
          height: 32px;
          width: 100px;
          border: 1px solid #e6e6e6;
          line-height: 32px;
          font-size: 16px;
          padding: 0 20px;
          border-radius: 5px;
          outline: none;
        }
        em{
          margin: 3px 0 3px 20px;
          width: 100px;
          height: 34px;
          line-height: 34px;
          background: rgba(240, 240, 240, 1);
          color: #4e4e4e;
          border-radius: 5px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
        }
      }
      button{
        width: 120px;
        height: 36px;
        font-size: 16px;
        color: #fefefe;
        background: #e94921;
        border-radius: 5px;
        text-align: center;
        line-height: 36px;
        border: none;
        outline: none;
        margin: 30px 0 0 103px ;
        cursor: pointer;
      }
      button:hover{
        background: #fe0000;
      }
      strong{
        margin-left: 10px;
        color: #fe0000;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        display: none;
      }
    }
  }
}
</style>
