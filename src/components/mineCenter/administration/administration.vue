<template>
  <!-- 产品管理 -->
  <div class="enterprisezizhi">
    <div class="supply">
      <h3 class="public">
        产品管理
        <span @click="addchan" class="add">
          <i class="el-icon-circle-plus-outline"></i>
          添加
        </span>
      </h3>
      <div class="line"></div>
      <div class="container">
        <el-table :data="productList"   v-loading="loading" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="smallImg" label="产品logo" width="100">
            <template slot-scope="scope">
              <el-popover placement="bottom" title="" trigger="hover" width="160px">
                <img :src="scope.row.smallImg"  style="height: 120px;width: 160px">
                <img slot="reference" :src="scope.row.smallImg" :alt="scope.row.smallImg" style="height: 30px;width: 40px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="产品名称" width="270" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.name.length>18?scope.row.name.substring(0,15)+'...':scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="添加时间" width="200">
          </el-table-column>
          <el-table-column prop="state" label="审核/上线" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.state==0" style="cursor: pointer;color: #E7390A;font-size: 14px">审核中</span>
              <span v-if="scope.row.state==1" style="cursor: pointer;color: #7ac23c;font-size: 14px">已上线</span>
              <span v-if="scope.row.state==2" style="cursor: pointer;color: #fe0000;font-size: 14px">已下线</span>
            </template>
          </el-table-column>

          <el-table-column label="" width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.state===1">
                <span class="bj" @click.stop="editqyzz(scope.row.productId)">下线</span>
                <span class="del" @click.stop="delProduct(scope.row.productId)">删除</span>
              </p>
              <p v-if="scope.row.state===2">
                <span class="bj" @click.stop="online(scope.row.productId)">上线</span>
                <span class="del" @click.stop="delProduct(scope.row.productId)">删除</span>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <div>
          <button v-if="productcurrent==1" disabled="disabled">上一页</button>
          <button v-if="productcurrent>1" @click="productbackPage">上一页</button>
          <button>
            第
            <b>{{productcurrent}}</b> 页
          </button>
          <button>
            共
            <b>{{productpages}}</b> 页
          </button>
          <button v-if="productcurrent<productpages" @click="productnextPage">下一页</button>
          <button v-if="productcurrent==productpages" disabled="disabled">下一页</button>
        </div>
      </div>
    </div>
    <place
      :placeshow="placeshow"
      :success="success"
      @hide="placeshow = !placeshow"
      :msgok="msgok"
      :succmsg="succmsg"
      :msgplace="msgplace"></place>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productpages: 0,
      producttotal: "",
      productcurrent: 1,
      productsize: 10,
      msg: "",
      token:"",
      companyId:0,
      productList: [],
        shoucangcurrent:1,
      loading:true,
      placeshow:false,
      success:4,
      succmsg:'',
      upLine:false,
      delid:'',
      msgplace:''
    };
  },
  created(){
      this.token = localStorage.getItem("token");
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      this.companyId=localStorageStr.companyId;
      this.getproductList();
  },
  methods: {
    addchan(){
      this.$router.push('addadministration')
    },
    msgok(){
      //判断UpLine==true
      /*
      * 就执行删除操作
      * 如果为false的时候就执行下线的操作*/
      if(this.upLine){
        //删除产品
        this.axios
          .post("/web/company/delete", {
            productId : this.delid
          })
          .then(({ data }) => {
            if(data.code==10001){
              this.placeshow=true;
              this.success=3;
              this.succmsg=data.msg;
              var that=this;
              this.productpages= 0;
              this.producttotal= "";
              this.productcurrent= 1;
              this.productsize= 10;
              this.productList= [];
              setTimeout(function () {
                that.placeshow=false;
                that.getproductList();
              },2000)

            }else{
              this.$message.error('删除失败');
            }
          });
      }else{
        this.axios.post('/web/company/productupdate',{
          state:2,
          productId:this.delid
        }).then(({data})=>{
          if(data.code==10001){
            this.placeshow=true;
            this.success=3;
            this.succmsg=data.msg;
            var that=this;
            setTimeout(function () {
              that.placeshow=false;
              that.getproductList();
            },2000)
          }
        })
      }
    },
    editqyzz(i){
      this.upLine=false;
      this.placeshow=true;
      this.msgplace='你确定要将此产品下线吗？';
      this.delid=i;
    },
    //上线
    online(i){
      this.axios.post('/web/company/productupdate',{
        state:0,
        productId:i
      }).then(({data})=>{
        console.log(data)
        if(data.code==10001){
          this.placeshow=true;
          this.succmsg=data.msg;
          this.success=3;
          var that=this;
          setTimeout(function () {
            that.placeshow=false;
            that.getproductList();
          },2000)
        }
      })
    },
    //删除产品
    delProduct(productId){
      this.upLine=true;
      this.placeshow=true;
      this.msgplace='你确定要删除此产品吗？';
      this.delid=productId;
    },
    getproductList() {
      this.loading=true;
      this.axios
        .post("/web/company/productlist", {
          companyId : this.companyId,
          type: 1,
          token: this.token,
          current: this.productcurrent,
          size: this.productsize
        })
        .then(({ data }) => {
          console.log(data);
          this.loading=false;
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
      this.shoucangcurrent -= 1;
      this.getproductList();
    },
    productnextPage() {
      this.shoucangcurrent += 1;
      this.getproductList();
    },
  }
};
</script>
<style lang="less" scoped>
.enterprisezizhi {
 /deep/ .cell{
    font-size: 16px;
  }
  background: #fff;
  .supply {
    padding: 20px 0;
    .public {
      position: relative;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);
      margin-left: 30px;
      padding-bottom: 10px;
      .add {
        position: absolute;
        right: 74px;
        top: 5px;
        font-size: 12px;
        width: 74px;
        height: 29px;
        background: rgba(85, 196, 186, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 29px;
        color: #fff;
        cursor: pointer;
      }
    }
    .fabu {
      width: 56px;
      height: 20px;
      line-height: 20px;
      background: rgba(235, 245, 255, 1);
      border: 1px solid rgba(122, 200, 255, 1);
      border-radius: 10px;
      text-align: center;
      color: #0095ff;
      display: inline-block;
    }
    .line {
      height: 2px;
      background: rgba(255, 76, 76, 1);
      margin-bottom: 10px;
    }
    .container {
      /deep/ .el-table th,
      .el-table tr {
        font-size: 16px;
        font-weight: bold;
        color: #454545;
        margin-right: 38px;
      }
      /deep/.el-table td,
      .el-table th.is-leaf {
        border-bottom: 1px dashed #d6d6d6;
      }
      .bj {
        font-size: 16px;

        text-align: center;
        color: #454545;
        display: inline-block;
        background: none;
        a {
          color: #fff;
        }
      cursor: pointer;
      }
      .bj:hover{
        border-bottom: 1px solid #1a1a1a;
      }
      .del {
        font-size: 14px;
        text-align: center;
        background: none;
        color: #454545;
        display: inline-block;
      cursor: pointer;
      }
      .del:hover{
        border-bottom: 1px solid #1a1a1a;
      }
      /deep/.el-table th,
      .el-table tr {
        border-bottom: 1px dashed #d6d6d6;
      }
      margin: 0px 30px 30px 30px;
      box-sizing: border-box;
      .imgBox {
        width: 40px;
        height: 30px;
        display: inline-block;
        /deep/img {
          width: 40px;
          height: 30px;
        }
      }
      /deep/.el-button--mini {
        padding: 7px;
      }
      /deep/ .el-table th,
      .el-table tr {
        height: 40px;
        background: rgba(242, 242, 242, 1);
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .page {
      position: absolute;
      bottom: 24px;
      left: 0;
      width: 100%;
      height: 35px;
      div {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        height: 35px;
        button {
          cursor: pointer;
          display: block;
          float: left;
          border: none;
          outline: none;
          height: 35px;
          line-height: 35px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(69, 69, 69, 1);
          background: #fff;
          b {
            color: #e8390a;
            font-size: 18px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
