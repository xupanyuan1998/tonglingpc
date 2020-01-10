<template>
  <div class="product">
    <h3>添加企业产品</h3>
    <div class="proContainer">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="产品简介" prop="intro">
          <el-input class="jianjie" type="textarea" v-model="ruleForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="产品数量" prop="number">
          <el-input class="num" type="text" v-model="ruleForm.number"></el-input>
          <span class="place">如:300台</span>
        </el-form-item>
        <el-form-item label="产品价格" prop="price">
          <el-input class="num" type="text" v-model="ruleForm.price"></el-input>
          <span class="place">如:2000元/台</span>
        </el-form-item>
        <el-form-item label="上传产品图" prop="picture" style="width: 800px;">
          <el-upload
            :action="baseUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="success"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button class="add" type="primary" @click="submitForm('ruleForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <place  :placeshow="placeshow" :success="successs" @hide="placeshow = false" :succmsg="plas"></place>
  </div>
</template>
<script>
export default {
  name: "newsdetali",
  data() {
    return {
      toptitle: "铜陵市民营经济云服务智慧平台",
         ruleForm: {
          name: '',
          number:'',
           price:'',
           intro:''
        },
      placeshow:false,
      successs:3,
      plas:'',
      baseUrl:this.baseUrl,
         dialogImageUrl: '',
      smalllist:[],
        msg:'',//获取个人信息
        dialogVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         number: [
           { required: true, message: '请输入产品数量', trigger: 'blur' }
         ],
         intro: [
            { required: true, message: '请输入产品简介', trigger: 'blur' }
          ],
          price:[
            { required: true, message: '请输入产品价格', trigger: 'blur' }
          ],

        }
    };
  },
  methods: {
       submitForm(formName) {
         var msg=this.persoanalMsg;
         var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //企业发布产品
            /*
            * 1.所需参数    企业id*/
          var datas={
            companyId:msg.companyId,
            intro:this.ruleForm.intro,
            name:this.ruleForm.name,
            smalllist:JSON.stringify(this.smalllist),
            number:this.ruleForm.number,
            price:this.ruleForm.price,
            type:1
          };
          this.axios.post('/web/company/companyproduct',datas).then(({data})=>{
            console.log(data)
            if(data.code==10001){
              this.plas=data.msg;
              this.placeshow=true;
              this.successs=3;
              setTimeout(function () {
                that.placeshow=false;
                that.$router.push('/personal/administration')
              },2000)
            }
          })
          } else {
            return false;
          }
        });
      },
        // 上传图片
      handleRemove(file, fileList) {
        var a=file.response.data.url;
        var arr=this.smalllist;
        for(var i=0;i<arr.length;i++){
          if(a==arr[i].url){
            this.smalllist.splice(i,1);
          }
        }
      },
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    success(response){
         console.log(response.data.url);
         var obj={};
         obj.url=response.data.url;
           obj.name=response.data.name;
         this.smalllist.push(obj);
    }
  },
};
</script>
<style lang="less" scoped>
    .product {
      margin: 20px auto;
      box-sizing: border-box;
      background: #fff;
      h3 {
    position: relative;
    height: 19px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #464646;
    padding: 0 30px;
    margin-bottom: 100px;
        .back {
          position: absolute;
          right: 10px;
          top:0px;
          cursor: pointer;
        }
      }
      .proContainer {
      padding: 20px 100px;
        .add {
          margin: 50px  0  0  200px;
        }
        .jianjie {
            /deep/.el-textarea__inner {
               resize: none;
                height: 80px;
            }
        }

        .jieshao {
            /deep/.el-textarea__inner {
               resize: none;
                height: 120px;
            }
        }
        /deep/.el-input{
          height: 30px;
          width: 200px;
          display: inline-block;
        }
        .num{
          /deep/.el-input__inner {
            resize: none;
            height: 30px;
            width: 200px;
            display: inline-block;
          }
        }
        /deep/span.place{
          display: inline-block;
          height: 30px;
          line-height: 30px;
          color: #c00;
          margin-left: 20px;
        }
      }
    }
</style>
