<template>
  <div class="suqiu">
    <h3>我的收藏</h3>
    <div class="line"></div>
    <div class="collectjs">
      <div class>
        <el-table :data="collectList" style="width: 100%" @row-click="goinit">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="title" label="内容标题" >
            <template slot-scope="scope">
              {{scope.row.title.length>25?scope.row.title.substring(0,25)+'...':scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="推荐类别" width="100">
            <template slot-scope="scope">
              {{scope.row.type==2?"政策详情":scope.row.type==1?"新闻详情":scope.row.type==3?"公告详情":scope.row.type==4?"办事指南":"---"}}
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="收藏时间" width="180"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <span class="del" @click.stop="cancelCollect(scope.row.contentId,scope.row.type)">取消收藏</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
     <div class="page">
        <div>
          <button v-if="collectcurrent==1" disabled="disabled">上一页</button>
          <button v-if="collectcurrent>1" @click="collectbackPage">上一页</button>
          <button>
            第
            <b>{{collectcurrent}}</b> 页
          </button>
          <button>
            共
            <b>{{collectpages}}</b> 页
          </button>
          <button v-if="collectcurrent<collectpages" @click="collectnextPage">下一页</button>
          <button v-if="collectcurrent==collectpages" disabled="disabled">下一页</button>
        </div>
      </div>
    <place :msgplace="msgplace" :placeshow="placeshow" :success="success" @hide="placeshow = !placeshow" :msgok="msgok" :succmsg="succmsg"></place>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectpages: 0,
      collecttotal: "",
      collectcurrent: 1,
      collectsize: 10,
      collectList: [],
      msg: "",
      token:"",
      userId:0,
      title:" ",
      placeshow:false,
      success:4,
      succmsg:'删除成功',
      type:'',
      delid:'',
      msgplace:''
    };
  },
  created(){
      // this.token = localStorage.getItem("token");
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      this.userId=localStorageStr.userId;
      this.getcollectList();
  },
  methods: {
    //取消收藏
    msgok(){
      this.axios
        .post("/web/usercollection/usercollection", {
          contentId: this.delid,
          state: 2,
          type: this.type,
          userId: this.userId,
          Url: " "
        })
        .then(({ data }) => {
          if(data.code==10001) {
            this.success = 3;
            this.succmsg = '删除成功';
            this.collectpages = 0;
            this.collecttotal = "";
            this.collectcurrent = 1;
            this.collectsize = 10;
            this.collectList = [];
          var that=this;
           setTimeout( function () {
             that.placeshow=false;
             that.getcollectList();
           },2000);
          }
        });
    },
    cancelCollect(contentId, type) {
      this.placeshow=true;
      this.delid=contentId;
      this.success=4;
      this.type=type;
      this.msgplace='您确定取消收藏吗？'
    },
//点击收藏条转页面
      goinit(row){
        /*
        * 判断收藏的每一条的type
        * 如果type=2跳转到政策详情页面
        * 如果type=1跳转到新闻详情页面
        * 如果type=3跳转到公告详情页面
        * 如果type=4跳转到办事指南详情页面
        * */
        if(row.type==2){
            let {href} = this.$router.resolve({
                path: '/information/informationMore/informationdetali',
                query: {
                    id:row.contentId
                }
            });;;
            window.open(href, '_blank')
        }else  if(row.type==1){
            let {href} = this.$router.resolve({
                path: '/newslist/newsdetali',
                query: {
                    id:row.contentId
                }
            });;;
            window.open(href, '_blank')
        }else  if(row.type==3){
            let {href} = this.$router.resolve({
                path: '/policy/policydetali',
                query: {
                    id:row.contentId
                }
            });;;
            window.open(href, '_blank')
        }else  if(row.type==4){
            let {href} = this.$router.resolve({
                path: '/information/guides/guidesDetali',
                query: {
                    id:row.contentId
                }
            });;;
            window.open(href, '_blank')
        }
      },
    getcollectList(){
      this.axios
        .post("/web/usercollection/usercollect", {
          userId : this.userId,
          type: -1,
          current: this.collectcurrent,
          size: this.collectsize
        })
        .then(({ data }) => {
          if(data.code==10001){
            this.collectList = data.data.records;
            this.collecttotal = data.data.total;
            this.collectcurrent = data.data.current;
            this.collectpages = data.data.pages;
          }

        });
    },
    //重点推荐 下一页
    collectbackPage() {
      this.collectcurrent -= 1;
      this.axios
         .post("/web/usercollection/usercollect", {
          userId : this.userId,
          type: -1,
          current: this.collectcurrent,
          size: this.collectsize
        })
        .then(({ data }) => {
          console.log(data);
          if(data.code==10001){
            this.collectList = data.data.records;
            this.collecttotal = data.data.total;
            this.collectcurrent = data.data.current;
            this.collectpages = data.data.pages;
          }

        });
    },
    collectnextPage() {
      this.collectcurrent += 1;
      this.axios
         .post("/web/usercollection/usercollect", {
          userId : this.userId,
          type: -1,
          current: this.collectcurrent,
          size: this.collectsize
        })
        .then(({ data }) => {
          console.log(data);
          if(data.code==10001){
            this.collectList = data.data.records;
            this.collecttotal = data.data.total;
            this.collectcurrent = data.data.current;
            this.collectpages = data.data.pages;
          }

        });
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
  .collectjs {
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
