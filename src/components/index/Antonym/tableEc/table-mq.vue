<template>
<div>
  <div class="warps">
    <h3>我的办理企业</h3>
    <div class="tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="企业名称"
        >
        </el-table-column>
        <el-table-column
          prop="legalperson"
          label="法人"
          align="center"
          width="150">
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "table-mq",
        data(){
            return {
                tableData:[],
            }
        },
      created() {
          this.getmsg();
      },
      methods:{
           //获取我的办理企业信息
        getmsg(){
          this.axios.post('/system/operator/companylist').then(({data})=>{
            console.log(data);
            this.tableData=data.data;
          })
        }
        }
    }
</script>

<style scoped lang="less">
.warps{
  padding:20px  0;
  margin: 0 auto;
  background: #fff;
}
h3{
  font-size: 18px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  border-bottom: 1px solid #ff4c4c;
}
div.tab{
  width: 800px;
  margin-left: 30px;
  margin-top: 20px;
}
/deep/.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: #454545;
}
/deep/.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: #454545;
}
  /deep/.el-table th.is-leaf{
    border-bottom: 1px solid #454545;
  }
  /deep/.el-table--border th{
    border-right: 1px solid #454545;
  }
  /deep/.el-table tr{
    cursor: pointer;
  }
</style>
