<template>
  <!-- 添加供需发布 -->

  <div>
    <div class="needPublic">
      <ul class="fbTop">
        <li v-for="(item,i) in pubtit" :key="i" :class="con==i? 'set':''" @click="creat(i)">{{item}}</li>
      </ul>

      <div class="container" v-show="con==0">
        <el-form
          :action="baseUrl"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="产品名称" prop="productname">
            <el-input v-model="ruleForm.productname" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="产品数量" prop="number">
            <el-input class="number" v-model="ruleForm.number" placeholder=""></el-input>
            <span class="place">如:300台</span>
          </el-form-item>
          <el-form-item label="截止时间" prop="endtime">
            <div class="block">
              <el-date-picker
                v-model="ruleForm.endtime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions0"
                @change="getSTime"
              >
              </el-date-picker>
            </div>
            <span class="place">请输入截止时间,超出时间信息将不再展示</span>
          </el-form-item>
          <el-form-item label="Logo" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button type="danger" @click="publicSupply('ruleForm')">发布供应</el-button>
      </div>
      <div class="container" v-show="con==1">
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="产品名称" prop="productname">
            <el-input v-model="ruleForm1.productname" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="产品数量" prop="number">
            <el-input class="number" v-model="ruleForm1.number" placeholder=""></el-input>
            <span class="place">如:300台</span>
          </el-form-item>
          <el-form-item label="截止时间" prop="endtime">
            <div class="block">
              <el-date-picker
                v-model="ruleForm1.endtime"
                type="date"
                placeholder="选择日期"
                value-formate="timestamp"
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd"
                @change="getSTimes"
              >
              </el-date-picker>
            </div>
            <span class="place">请输入截止时间,超出时间信息将不再展示</span>
          </el-form-item>
          <el-form-item label="Logo" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
            >
              <img v-if="ruleForm1.imageUrl" :src="ruleForm1.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button type="danger" @click="publicDemand('ruleForm1')">发布需求</el-button>
      </div>
    </div>
    <place :placeshow="placeshow" :success="success" @hide="placeshow = false" :succmsg="plas"></place>
  </div>
</template>
<script>
  var that;
  export default {
    data() {
      return {
        BaseUrl: this.baseUrl,
        con: "",
        companyId: 0,
        userId: 0,
        placeshow: false,
        success: 3,
        pubtit: ["发布供应", "发布需求"],
        ruleForm: {
          productname: "",
          number: "",
          endtime: "",
          endtimes: "",
          companyId: "",
          imageUrl: ''
        },
        ruleForm1: {
          productname: "",
          number: "",
          endtime: "",
          endtimes: "",
          companyId: "",
          imageUrl: ''
        },
        rules: {
          productname: [
            {required: true, message: "请输入产品名称", trigger: "blur"}
          ],
          number: [
            {required: true, message: "请输入产品数量", trigger: "blur"}
          ],
          endtime: [
            {required: true, message: "请输入截止时间", trigger: "blur"}
          ],
        },
        rules1: {
          productname: [
            {required: true, message: "请输入产品名称", trigger: "change"}
          ],
          number: [
            {required: true, message: "请输入产品数量", trigger: "change"}
          ],
          endtime: [
            {required: true, message: "请输入截止时间", trigger: "change"}
          ],
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        plas:'',
      };
    },
    created() {
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      that = this;
      that.companyId = localStorageStr.companyId;
      that.userId = localStorageStr.userId;
    },
    methods: {
      //  供需发布
      publicSupply(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.axios
              .post("/web/supplyanddemand/add", {
                type: 1,
                productname: this.ruleForm.productname,
                number: this.ruleForm.number,
                endtime: this.ruleForm.endtimes,
                companyid: this.companyId,
                smallimg: this.ruleForm.imageUrl,
                userId: this.userId
              })
              .then(({data}) => {
                if (data.code == 10001) {
                  this.placeshow = true;
                  this.success = 3;
                  this.plas=data.msg;
                  var that = this;
                  setTimeout(function () {
                    that.$router.push('/personal/supplypublic');
                  }, 2000);
                }


              });
          } else {
            return false;
          }
        });
      },
      publicDemand(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.axios
              .post("/web/supplyanddemand/add", {
                type: 2,
                productname: this.ruleForm1.productname,
                number: this.ruleForm1.number,
                endtime: this.ruleForm1.endtimes,
                companyid: this.companyId,
                smallimg: this.ruleForm1.imageUrl,
                userId: this.userId
              })
              .then(({data}) => {
                console.log(data);
                if (data.code == 10001) {
                  this.placeshow = true;
                  this.success = 3;
                  this.plas=data.msg;
                  var that = this;
                  setTimeout(function () {
                    that.$router.push('/personal/supplypublic');
                  }, 2000);
                }
              });
          } else {
            return false;
          }
        })

      },
      creat(i) {
        this.con = i;
      },
      handleAvatarSuccess(res, file) {
        this.ruleForm.imageUrl = res.data.url;
      },
      handleAvatarSuccess1(res, file) {
        this.ruleForm1.imageUrl = res.data.url;
      },

      getSTime(val) {
        let self = this;
        let str = val;

        let strDate = new Date(str);
        console.log(strDate);
        let Y = strDate.getFullYear() + '-';
        let M = (strDate.getMonth() + 1 < 10 ? '0' + (strDate.getMonth() + 1) : strDate.getMonth() + 1) + '-';
        let D = strDate.getDate();
        let dateAfter = Y + M + D + ' ' + '23:59:59';
        this.ruleForm.endtimes = dateAfter;
      },
      getSTimes(val) {
        let self = this;
        let str = val;
        let strDate = new Date(str);
        let Y = strDate.getFullYear() + '-';
        let M = (strDate.getMonth() + 1 < 10 ? '0' + (strDate.getMonth() + 1) : strDate.getMonth() + 1) + '-';
        let D = strDate.getDate();
        let dateAfter = Y + M + D + ' ' + '23:59:59';
        this.ruleForm1.endtimes = dateAfter;
      }
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 131px;
    height: 115px;
    line-height: 115px;
    text-align: center;
  }

  /deep/ .avatar {
    width: 131px;
    height: 115px;
    display: block;
  }

  // 供需发布
  .needPublic {
    background: #fff;

    .fbTop {
      height: 66px;
      line-height: 66px;
      border-bottom: 4px solid #ebebeb;
      text-align: center;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(69, 68, 68, 1);
      cursor: pointer;
      // box-sizing: border-box;
      li:hover {
        color: #e8390a;
      }

      li {
        display: inline-block;
        text-align: center;
        padding: 0 20px;
        margin: 0 95px;
        box-sizing: border-box;
      }

      .set {
        border-bottom: 7px solid #e8390a;
      }
    }

    .container {
      padding: 30px 100px;

      /deep/ .el-input__inner {
        width: 404px;
        height: 34px;
        border: 1px solid rgba(203, 203, 203, 1);
      }

      /deep/ .el-button--danger {
        width: 406px;
        height: 42px;
        background: rgba(232, 57, 10, 1);
        border-radius: 4px;
        margin-left: 93px;
        margin-top: 30px;
      }

      /deep/ .el-form-item {
        margin-bottom: 17px;
      }

      /deep/ .el-textarea__inner {
        width: 404px;
        height: auto;
        min-height: 106px;
        border: 1px solid rgba(203, 203, 203, 1);
        resize: none;
      }

      /deep/ .number {
        width: 200px;

        .el-input__inner {
          width: 200px;
        }
      }

      /deep/ .el-input__inner:focus {
        border: 1px solid #ff744f;
      }

      .place {
        display: inline-block;
        margin-left: 20px;
      }

      /deep/ .block {
        width: 200px;
        display: inline-block;

        .el-input__inner {
          width: 200px;
        }

        .el-input__suffix {
          right: 20px;
        }
      }

    }
  }
</style>
