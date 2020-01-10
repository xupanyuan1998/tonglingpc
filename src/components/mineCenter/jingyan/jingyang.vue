<template>
  <div class="suqiu">
    <h3>经验推荐</h3>
    <div class="line"></div>
    <div class="orderjs">
      <div class>
        <el-table  :data="orderList" v-loading="loading" style="width: 100%" @row-click="queryList" >
          <el-table-column type="index" label="序号" align="center"  width="80"></el-table-column>
          <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="200"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page">
      <div>
        <button v-if="current==1" disabled="disabled">上一页</button>
        <button v-if="current>1" @click="orderbackPage">上一页</button>
        <button>
          第
          <b>{{current}}</b> 页
        </button>
        <button>
          共
          <b>{{pages}}</b> 页
        </button>
        <button v-if="current<pages" @click="ordernextPage">下一页</button>
        <button v-if="current==pages" disabled="disabled">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
  let that;
  import Vue from 'vue'
  export default {
    data() {
      return {
        pages: 0,
        ordertotal: "",
        current: 1,
        size: 10,
        msg: "",
        token: "",
        userId: 0,
        title: "",
        orderList: [],
        loading: false
      };
    },
    created() {
      that=this;
      this.token = localStorage.getItem("token");
      var localStorageStr = JSON.parse(localStorage.getItem("personal"));
      this.userId = localStorageStr.userId;
      var datas={
        current:this.current,
        size:this.size,
        title:this.title,
      };
        this.getOrderList(datas);
    },
    methods: {

      //查看详情
      queryList(row) {
       console.log(row)
      },
      getOrderList(datas) {
        this.loading=true;
        this.axios.post('/web/seeking/experience',datas).then(({data})=>{
          this.loading=false;
          this.current=data.data.current;
          this.pages=data.data.pages;
          this.orderList=data.data.records;
        })
      },
      //在线诉求 下一页
      orderbackPage() {
        this.current -= 1;
        var datas={
          current:this.current,
          size:this.size,
          title:this.title,
        };
        this.getOrderList(datas);
      },
      ordernextPage() {
        this.current += 1;
        var datas={
          current:this.current,
          size:this.size,
          title:this.title,
        };
        this.getOrderList(datas);
      }
    }
  };
</script>
<style lang="less" scoped>
  .states{
    display: inline-block;
    line-height: 30px;
  }
  .showstate{
    margin-left: 10px;
    color: #2c6af8;
  }
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
    .orderjs {
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
      .operationBtn {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0px 5px;
        text-align: center;
        border-radius: 4px;
        // color: #fff;
        display: inline-block;
        cursor: pointer;
      }
      // .col-red {
      //   background: rgba(255, 76, 76, 1);
      // }

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
