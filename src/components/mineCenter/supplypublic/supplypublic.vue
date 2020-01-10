<template>
  <!-- 供需发布 -->
  <div class="enterprisezizhi">
    <div class="supply">
      <h3 class="public">
        供需发布
        <span @click="addgong" class="add">
          <i class="el-icon-circle-plus-outline"></i>
          添加
        </span>
      </h3>
      <div class="line"></div>

      <div class="containers">
        <el-table :data="supplypublicList" v-loading="loading" style="width: 100%" >
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="productname" label="产品名称" >
            <template slot-scope="scope">
              {{scope.row.productname.length>20?scope.row.productname.substring(0,20)+'...':scope.row.productname}}
            </template>
          </el-table-column>

          <el-table-column prop="number" align="center" label="数量" width="100"></el-table-column>
          <el-table-column prop="addtorime" align="center" label="时间" width="200"></el-table-column>
          <el-table-column prop="state"  align="center" label="状态" width="80" >
            <template slot-scope="scope">
              {{scope.row.state==0?"审核中":scope.row.state==1?"退回":scope.row.state==2?"审核中":"已上线"}}
            </template>
          </el-table-column>
          <el-table-column label="" width="120" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.state>2">
                <span class="del" @click.stop="delGong(scope.row.supplyanddemandId)">删除</span>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <div>
          <button v-if="supplypubliccurrent==1" disabled="disabled">上一页</button>
          <button v-if="supplypubliccurrent>1" @click="supplypublicbackPage">上一页</button>
          <button>
            第
            <b>{{supplypubliccurrent}}</b> 页
          </button>
          <button>
            共
            <b>{{supplypublicpages}}</b> 页
          </button>
          <button v-if="supplypubliccurrent<supplypublicpages" @click="supplypublicnextPage">下一页</button>
          <button v-if="supplypubliccurrent==supplypublicpages" disabled="disabled">下一页</button>
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
  let that;
export default {
   data() {
    return {
      supplypublicpages: 0,
      supplypublictotal: "",
      supplypubliccurrent: 1,
      supplypublicsize: 10,
      msg: "",
      userId:0,
      title:" ",
      supplypublicList: [],
      loading:false,
      placeshow:false,
      success:4,
      succmsg:'',
      msgplace:'',
      delid:''
    };
  },
  created(){
       that=this;
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      this.companyId=localStorageStr.companyId;
      this.getgongxu();
  },
  methods: {
     addgong(){
       this.$router.push('addsupplypublic');
     },
    msgok(){
      that.axios.post('/web/supplyanddemand/delete',{Id:this.delid}).then((res)=>{
        if(res.data.code==10001){
          this.placeshow=true;
          this.success=3;
          this.succmsg=res.data.msg;
          var that=this;
          setTimeout(function () {
            that.placeshow=false;
            that.getgongxu();
          })

        }
      })
    },
      //删除供需
      delGong(id){
       this.placeshow=true;
       this.success=4;
        this.msgplace='您确定要删除吗？';
        this.delid=id;
      },
    queryList(row){
       console.log(row.supplyanddemandId);
    },
    //供需列表上一页
    supplypublicbackPage() {
      this.supplypubliccurrent -= 1;
      this.getgongxu();
    },
      //获取供需列表
      getgongxu(){
        this.loading=true;
          this.axios
              .post("/web/supplyanddemand/list", {
                  title : this.title,
                  companyId : this.companyId,
                  current: this.supplypubliccurrent,
                  size: this.supplypublicsize
              })
              .then(({ data }) => {
                this.loading=false;
                  console.log(data);
                  if(data.code==10001){
                      this.supplypublicList = data.data.records;
                      this.supplypublictotal = data.data.total;
                      this.supplypubliccurrent = data.data.current;
                      this.supplypublicpages = data.data.pages;
                  }
              });
      },
    supplypublicnextPage() {
      this.supplypubliccurrent += 1;
      this.getgongxu();
    },
  }
};
</script>


<style lang="less" scoped>
.enterprisezizhi {
  background: #fff;
  .supply {
    padding: 20px 0;
    .public {
      position: relative;
      font-size: 22px;
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
    .containers {
      background: #fff;
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
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0px 5px;
        text-align: center;
        background: #ffba4c;
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        a {
          color: #fff;
        }
      cursor: pointer;
      }
      .del {
        height: auto;
        font-size: 14px;
        padding: 0px 5px;
        text-align: center;
        background: none;
        border-radius: 0px;
        display: inline-block;
      cursor: pointer;
        color:#454545;
      }
      .del:hover{
        color: #004EFF;
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
