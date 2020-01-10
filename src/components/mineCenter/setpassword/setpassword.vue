<template>
  <div class="hello">
    <h3>修改密码</h3>
    <div class="forget">
      <!-- <div class="mima">
        <div class="imgBox">
          <img src="../../../../static/images/wjmm.png" alt />
        </div>
      </div>-->
      <div class="forgetNum">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
          @close="handle"
        >
          <el-form-item label="绑定手机号码："  class="number">
            <span>{{ruleForm2.shoujiNum}}</span>
          </el-form-item>

          <el-form-item label="短信验证：" class="shjicode" prop="shoujicode">
            <el-input type="text" v-model="ruleForm2.shoujicode" auto-complete="off"></el-input>
            <span v-if="isdao=='false'" class="hqcode" @click="getMsgnum">获取短信验证码</span>
            <span v-if="isdao=='true'" class="hqcode">{{dao}}s</span>
          </el-form-item>

          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger complete" @click="submitForm1('ruleForm2')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <place  :placeshow="placeshow" :success="success" @hide="placeshow = false" :succmsg="plas"></place>
  </div>
</template>
<script>
export default {
  data() {
    var passreg=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,16}$/;
    var reg=new RegExp("^[0-9]{6}$");
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!passreg.test(value)){
        callback(new Error("输入的密码格式不正确"));
      }else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value =="") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var yanzheng = (rule, value, callback) => {
      console.log(value)
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if(!reg.test(value)){
        callback(new Error("输入的验证码格式不正确"));
      }else {
        callback();
      }
    };
    return {
      phone: "",
      password: "",
      // 忘记密码
      ruleForm2: {
        pass: "",
        checkPass: "",
        shoujiNum: "",
        shoujicode:"",
      },
      rules2: {
        shoujicode: [{ validator: yanzheng, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      isdao: "false",
      dao: 60,
      placeshow:false,
      success:3,
      plas:''
    };
  },
  created() {
    var a=JSON.parse(localStorage.getItem('personal'));
    this.ruleForm2.shoujiNum=a.mobile;
},
  methods: {
    // 忘记密码
    submitForm1(formName) {
      var that=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post(`/web/user/web/ChangePswd`,{code:this.ruleForm2.shoujicode,mobile:this.ruleForm2.shoujiNum,newPassword:this.ruleForm2.checkPass}).then((res)=>{
              console.log(res.data.code);
              if(res.data.code===10001){
                 this.placeshow=true;
                 this.success=3;
                 this.plas='密码修改成功';
                let path=this.$route.path;
                 setTimeout(function () {
                   that.placeshow=false;
                    that.$router.go(0);
                 },2000)
              }else{
                  this.$message.error(res.data.msg);
              }
          })
        } else {
          return false;
        }
      });
    },
    // 获取短信验证码
    getMsgnum() {
      var that = this;
      var phonereg = /^1[3456789]\d{9}$/; //手机号正则
        clearInterval(that.timer);
        this.axios
          .post(`/web/send/send`, { mobile: this.ruleForm2.shoujiNum, type: 1 })
          .then(res => {
            // console.log(res.data.code);
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
    },
    handle() {
      this.ruleForm2.shoujicode = "";
      this.ruleForm2.pass = "";
    }
  }
};
</script>
<style lang="less" scoped>
  .hello{
    background: #fff;
  }
.xg_dom {
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin-left: 21px;
  line-height: 30px;
  margin-top: 5px;
}
h3 {
  height: 19px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #464646;
  padding: 0 30px;
  margin-top: 30px;
}
/deep/.el-form-item__content{
  font-size: 16px;
}
// 忘记密码
.forget {
  padding: 88px 182px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(69, 68, 68, 1);

  /deep/.el-form-item__error{
    margin-left: 20px;
  }
  .forgetNum {
    /deep/ label {
      width: 120px !important;
    }
    /deep/.el-input {
      width: 360px;
      height: 38px;
      outline: none;
    }
    /deep/.el-input__inner:focus{
      border:1px solid #ff744f;
      outline:none;
    }
    /deep/ .el-form-item {
      margin-bottom: 32px;
    }
    .shjicode {
      margin-bottom: 20px;
      /deep/ .el-input {
        width: 170px;
      }
      .hqcode {
        width: 137px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        margin-left:49px;
        background: #ededed;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #bcbcbc;
      }
    }
    .number{
      margin-bottom: 20px;
    }
    .complete {
      width: 300px;
      height: 45px;
      margin-left: 50px;
      background: rgba(231, 57, 10, 1);
      border-radius: 4px;
    }
  }
}
</style>
