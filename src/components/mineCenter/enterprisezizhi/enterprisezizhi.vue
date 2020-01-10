<template>
  <!-- 企业资质 -->
  <div class="enterprisezizhi">
    <div class="supply">
      <h3 class="public">
        企业资质
      </h3>
      <div class="line"></div>
      <div class="container">
        <ul>
          <li v-for="(item,index) in productList" :key="index">
            <div>
              <img :src="item.smallImg" alt="">
            </div>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="add">
        <h3>添加资质</h3>
        <div class="line"></div>
       <div class="adds">
         <el-form
           :action="baseUrl"
           :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm"
         >
           <el-form-item label="证书" prop="imgUrl" class="save">
             <div class="zheng">
               <el-upload
                 class="avatar-uploader"
                 :action="baseUrl"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
               >
                 <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
             </div>
             <div class="place">请上传150*240像素的图片文件,文件大小不超过2M</div>
           </el-form-item>
           <el-form-item label="资质名称" prop="name">
             <el-input v-model="ruleForm.name" placeholder=""></el-input>
           </el-form-item>
         </el-form>
         <button class="saves" @click="publicSupply('ruleForm')">提交</button>
       </div>
      </div>
    </div>
    <place :placeshow="placeshow" :success="success" @hide="placeshow = false"></place>
  </div>
</template>
<script>
import '../../../assets/css/personal.less'
export default {
    name:'enterprisezizhi',
  data() {
    return {
      placeshow:false,
      success:3,
      productpages: 0,
      producttotal: "",
      productcurrent: 1,
      productsize: 10,
      msg: "",
      token:"",
      companyId:0,
      productList: [],
        ruleForm:{
          name:'',
            imageUrl:''
        },
        rules:{
          name:[
              { required: true, message: "请输入证书名称", trigger: "change" }
          ],
            imageUrl:[
                { required: true, message: "请上传证书", trigger: "change" }
            ],
        }
    };
  },
  created(){
      this.token = localStorage.getItem("token");
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      this.companyId=localStorageStr.companyId;
      this.getzizhiList();
  },
  methods: {
      publicSupply(formName) {
          this.$refs[formName].validate(valid => {
              if (valid) {
              this.axios.post('/web/company/companyproduct',{
                  companyId:this.companyId,
                  name:this.ruleForm.name,
                  smallImg:this.ruleForm. imageUrl,
                  type:2
              }).then((res)=>{
                  if(res.data.code==10001){
                    this.placeshow=true;
                    this.success=3;
                    var that=this;
                    setTimeout(function () {
                      that.$refs[formName].resetFields();
                      that.ruleForm.imageUrl='';
                      that.placeshow=false;
                      that.getzizhiList();
                    },2000)
                  }
              })
              }
          });
      },
      handleAvatarSuccess(res, file) {
          this.ruleForm.imageUrl = res.data.url;
      },
    // //删除资质
    // delProduct(productId){
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.axios
    //       .post("/web/company/delete", {
    //         productId : productId
    //       })
    //       .then(({ data }) => {
    //         console.log(data);
    //         if(data.code==10001){
    //           this.$message({
    //             message: "删除成功",
    //             type: 'success'
    //           });
    //           this.productpages= 0;
    //           this.producttotal= "";
    //           this.productcurrent= 1;
    //           this.productsize= 10;
    //           this.productList= [];
    //           this.getzizhiList();
    //         }else{
    //           this.$message.error('删除失败');
    //         }
    //       });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    getzizhiList() {
      this.axios
        .post("/web/company/productlist", {
          companyId : this.companyId,
          type: 2,
          token: this.token,
          current: this.productcurrent,
          size: this.productsize
        })
        .then(({ data }) => {
          console.log(data);
          if(data.code==10001){
            this.productList = data.data.records;
            this.producttotal = data.data.total;
            this.productcurrent = data.data.current;
            this.productpages = data.data.pages;
          }

        });
    },
    //企业资质 下一页
    productbackPage() {
      this.productcurrent -= 1;
      this.axios
        .post("/web/company/productlist", {
          companyId : this.companyId,
          type: 2,
          token: this.token,
          current: this.productcurrent,
          size: this.productsize
        })
        .then(({ data }) => {
          console.log(data);
          if(data.code==10001){
            this.productList = data.data.records;
            this.producttotal = data.data.total;
            this.productcurrent = data.data.current;
            this.productpages = data.data.pages;
          }

        });
    },
    productnextPage() {
      this.productcurrent += 1;
      this.axios
        .post("/web/company/productlist", {
          companyId : this.companyId,
          type: 2,
          token: this.token,
          current: this.productcurrent,
          size: this.productsize
        })
        .then(({ data }) => {
          console.log(data);
          if(data.code==10001){
            this.productList = data.data.records;
            this.producttotal = data.data.total;
            this.productcurrent = data.data.current;
            this.productpages = data.data.pages;
          }

        });
    },
  }
};
</script>
<style lang="less" scoped>

  .container{
    margin-top: 20px;
    padding:0 26px;
    background: #fff;
    ul{
      overflow: hidden;
      padding-top: 20px;
      height: 450px;
      li{
        display: block;
        width: 130px;
        margin-right: 30px;
        float: left;
        margin-bottom: 10px;
        div{
          width:120px;
          height: 177px;
          padding: 2px;
          border: 2px solid #ccc;
          img{
            display: block;
            height: 100%;
            width: 100%;
            margin: 0 auto;
          }
        }
        span{
          display: block;
          height: 30px;
          font-size: 16px;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
  .add{
    margin-top: 30px;
    padding-bottom: 50px;
    h4{
      font-size: 20px;
      padding-left: 30px;
      height: 40px;
      line-height: 40px;
      font-weight: 400;
      border-bottom: 2px solid #FF4C4C;
      margin-bottom: 30px;
    }
  }
  .adds{
    margin-top: 30px;
  }
  /deep/ .avatar-uploader{
    display: inline-block;
    width: 52px;
    height: 52px;
  }
  /deep/.save{
    height: 52px;
  }
  .zheng{
    display: inline-block;
    width: 52px;
    height: 52px;
  }
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
  .place{
    display: inline-block;
    margin-left: 20px;
    height: 50px;
    line-height: 72px;
    vertical-align: top;
    color: #FF4C4C;
  }
  /deep/ .el-input{
    width: 300px;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  /deep/.avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  /deep/.el-button{
    margin: 0 auto;
    display: block;
    background: #004EFF;
    border: none;
  }
  .saves{
    width: 74px;
    height: 29px;
    background: rgba(85, 196, 186, 1);
    border-radius: 4px;
    text-align: center;
    line-height: 29px;
    display: block;
    outline:none;
    border: none;
    color: #fff;
    margin-left: 100px;
  }
</style>
