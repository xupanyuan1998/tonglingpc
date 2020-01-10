<template>
  <div>
    <div class="qiyezizhi">
      <h3>企业资质</h3>
      <div class="zzBot">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="name" label="资质名称">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item  prop="smallImg" label="资质证书">
            <el-input type="text" v-model="ruleForm.smallImg" auto-complete="off"  class="yc"></el-input>
            <el-upload

              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />

              <el-button type="primary" v-else size="mini">上传</el-button>
            </el-upload>

            <el-button type="danger" v-on:click="upData('ruleForm')" class="public">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
 var that;
export default {

  data() {
    return {
      //ruleForm:'',
      // 企业资质
      ruleForm: {
        name: "",
        smallImg:'',
        type:1,
        intro:' ',
        companyId:''
      },
      rules: {
          name: [
            { required: true, message: '请输入资质名称', trigger: 'change' },
          ],
          smallImg: [
            { required: true, message: '请上传资质证书 ',trigger: 'change' }
          ],
      },
      imageUrl: "",
       uploadURL: 'http://116.62.67.239:1027/web/onlinework/file',
      file: "",
      liList: [
        { title: "全部" },
        { title: "创业融资" },
        { title: "税费减免" },
        { title: "税费减免" },
        { title: "创业资助" },
        { title: "其他" }
      ]
    };
  },
  created(){
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      that = this;
      that.ruleForm.companyId=localStorageStr.companyId;

  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);

      let formData = new FormData();

      formData.append("head", this.file);
      //第一个参数是键   第二个是值
      //然后在这里发送请求   如果还有其他参数 	继续append

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      this.$http
        .post("/web/onlinework/file", formData, config)
        .then(function(res) {
          console.log(res.data.data.url);
          that.ruleForm.smallImg=res.data.data.url

        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";

      this.file = file;
      console.log(this.file);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    upData(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
           this.axios.post('/web/company/companyproduct',{
              type:2,
              companyId:that.ruleForm.companyId,
              intro:that.ruleForm.intro,
              name:that.ruleForm.name,
              smallImg:that.ruleForm.smallImg
          }).then(({ data }) => {
              console.log(data.data);
               this.$message({
                   message: '上传成功',
                   type: 'success'
               });
               this.$refs[ruleForm].resetFields();
               this.$parent.reloadzizhiList();

            });


          } else {
              this.$message({
                  message: '上传失败'
              });
            return false;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.qiyezizhi {
  padding: 40px;
  box-sizing: border-box;
  background: #fff;
  h3 {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(70, 70, 70, 1);
  }
  .zzBot {
    padding: 50px 220px;

    .avatar {
      width: 137px;
      height: 110px;
    }
    /deep/.el-form-item__content {
      position: relative;
      /deep/ .el-button--small {
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
  .yc {
    display:none;
  }
    .shangchuan {
      font-size: 30px;
      margin: 10px 0 0 30px;
    }
    .public {
      width: 290px;
      height: 42px;
      margin-top: 50px;
    }
  }
}
</style>
