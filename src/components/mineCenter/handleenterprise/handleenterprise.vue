<template>
    <div class="suqiu">
          <h3>
             我的办理企业
          </h3>
          <div class="line"></div>
    <div class="productjs">
      <div class="">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="imgId" label="编号" width="60"></el-table-column>
          <el-table-column prop="name" label="诉求标题" width="230"></el-table-column>
          <el-table-column prop="intro" label="诉求状态" width="100"></el-table-column>
          <el-table-column prop="state" label="添加时间" width="250"></el-table-column>
          <el-table-column prop="set" label="操作">
            <span class="del">删除</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          imgId: "1",
          name: "关于安全生产问题",
          state: "2019.9.5 13:20:11",
          intro: "未发布",
        },
        {
          imgId: "1",
          name: "关于安全生产问题",
          state: "2019.9.5 13:20:11",
          intro: "未发布",
        }
      ]
    };
  }
};
</script>


<style lang="less" scoped>
.suqiu {
padding: 30px 0;
  background: #fff;
  h3 {
      position: relative;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);
      margin-left: 30px;
      padding-bottom: 20px;
  }
      .line {
      height: 2px;
      background: rgba(255, 76, 76, 1);
      margin-bottom: 10px;
    }
  .productjs {
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
    /deep/.el-table td, .el-table th.is-leaf {
  border-bottom: 1px dashed #d6d6d6;
}
/deep/.el-table th, .el-table tr{
  border-bottom: 1px dashed #d6d6d6;
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
    .imgBox {
      width: 40px;
      height: 30px;
      display: inline-block;
      /deep/img {
        width: 40px;
        height: 30px;
      }
    }
          .del {
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: rgba(255, 76, 76, 1);
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        cursor: pointer;
      }
    /deep/ .el-table td, .el-table th {
      padding: 0;
    }
    /deep/.el-table td, .el-table th {
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

}
</style>
