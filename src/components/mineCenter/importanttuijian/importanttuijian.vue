<template>
  <div class="suqiu">
    <h3>重点推荐</h3>
    <div class="line"></div>
    <div class="recommendjs">
      <div class>
        <el-table :data="recommendList" v-loading="loading" style="width: 100%;"  >
          <el-table-column type="index" label="序号"  align="center" width="80"></el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip>
            <template slot-scope="scope">
             <div class="goclick"  @click="godetail(scope.row)">
               {{scope.row.title.length>28?scope.row.title.substring(0,28)+'...':scope.row.title}}
             </div>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="推荐时间" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
     <div class="page">
        <div>
          <button v-if="recommendcurrent==1" disabled="disabled">上一页</button>
          <button v-if="recommendcurrent>1" @click="recommendbackPage">上一页</button>
          <button>
            第
            <b>{{recommendcurrent}}</b> 页
          </button>
          <button>
            共
            <b>{{recommendpages}}</b> 页
          </button>
          <button v-if="recommendcurrent<recommendpages" @click="recommendnextPage">下一页</button>
          <button v-if="recommendcurrent==recommendpages" disabled="disabled">下一页</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendpages: 0,
      recommendtotal: "",
      recommendcurrent: 1,
      recommendsize: 10,
      msg: "",
      token:"",
      userId:0,
      title:" ",
      recommendList: [],
      loading:false,
    };
  },
  created(){
      this.token = localStorage.getItem("token");
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      this.userId=localStorageStr.userId;
      this.getrecommondList();
},
  methods: {
      godetail(row){
        console.log(row);
        if(row.type==1){
            let {href} = this.$router.resolve({
                path: '/newslist/newsdetali',
                query: {
                   id:row.newsId
                }
            });;;
            window.open(href, '_blank')
        }else if(row.type==2){
            let {href} = this.$router.resolve({
                path: '/policy/policydetali',
                query: {
                    id:row.newsId
                }
            });;;
            window.open(href, '_blank')
        }else if(row.type==3){
            let {href} = this.$router.resolve({
                path: '/information/informationMore/informationdetali',
                query: {
                    id:row.newsId
                }
            });;;
            window.open(href, '_blank')
        }else if(row.type==4){
            let {href} = this.$router.resolve({
                path: '/information/guides/guidesDetali',
                query: {
                    id:row.newsId
                }
            });;;
            window.open(href, '_blank')
        }
      },
    getrecommondList(){
        this.loading=true;
      this.axios
        .post("/web/user/recommend", {
          userId : this.userId,
          token: this.token,
          current: this.recommendcurrent,
          size: this.recommendsize
        })
        .then(({ data }) => {
          if(data.code==10001){
            this.loading=false;
            this.recommendList = data.data.records;
            this.recommendtotal = data.data.total;
            this.recommendcurrent = data.data.current;
            this.recommendpages = data.data.pages;
          }

        });
    },
    //重点推荐 下一页
    recommendbackPage() {
      this.recommendcurrent -= 1;
      this.getrecommondList();
    },
    recommendnextPage() {
      this.recommendcurrent += 1;
      this.getrecommondList();
    },
  }
};
</script>


<style lang="less" scoped>
.suqiu {
  padding: 20px 0;
  background: #fff;
  h3 {
    position: relative;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(68, 68, 68, 1);
    margin-left: 30px;
    padding-bottom: 10px;
  }
  .line {
    height: 2px;
    background: rgba(255, 76, 76, 1);
    margin-bottom: 10px;
  }
  .goclick{
    cursor: pointer;
    display: inline-block;
  }
  .recommendjs {
    padding: 0 20px;
    /deep/.el-textarea__inner {
      resize: none;
    }
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
    /deep/.el-table th,
    .el-table tr {
      border-bottom: 1px dashed #d6d6d6;
    }
    .shangchuan {
      font-size: 30px;
      margin: 10px 0 0 30px;
    }
    .del {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0px 5px;
        text-align: center;
        background: rgba(255, 76, 76, 1);
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        cursor: pointer;
      }
    .public {
      width: 290px;
      height: 42px;
      margin-top: 50px;
    }
    .imgBox {
      width: 40px;
      height: 30px;
      display: inline-block;
      /deep/img {
        width: 40px;
        height: 30px;
      }
    }
    /deep/ .el-table td,
    .el-table th {
      padding: 0;
    }
    /deep/.el-table td,
    .el-table th {
      padding: 12px 0;
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
</style>
