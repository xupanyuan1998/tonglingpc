<template>
<div>
  <h3>评分统计</h3>
  <div ref="myChartsFa" id="myChartsFa"></div>
  <div class="table_w">
    <!-- 表单 -->
    <el-table :data="tableData" border style="width: 100%">
      >
      <el-table-column type="index" label="序号"  align="center"></el-table-column>
      <el-table-column prop="name" label="分数" ></el-table-column>
      <el-table-column prop="value" label="数量" ></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
    export default {
        name: "stars",
      data(){
          return{
            tableData:[],
          }
      },
      methods:{
        getmsg(){
            this.axios.post('/system/leader/webevaluatestatic',).then(({data})=>{
              console.log(data.data);
              var arr=[];
              var arr1=[];
              for(var a=0;a<data.data.length;a++){
                var obj={};
                obj.value=data.data[a].count;
                obj.name=data.data[a].satisfactionDegree;
                arr.push(obj);
                arr1.push(data.data[a].satisfactionDegree);
              }
              this.tableData=arr;
              const myChartsFa = this.$echarts.init(this.$refs.myChartsFa);
              const option = {
                title : {
                  x:'center'
                },
                tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  x: "center",
                  y: "bottom",
                  data: arr1
                },
                series : [
                  {
                    name: '评分',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:arr,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              };
              myChartsFa.setOption(option);
            })
        }
      },
      mounted() {
          this.getmsg();
      }
    }
</script>

<style scoped>
  h3 {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid #ff4c4c;
    font-size: 16px;
    font-weight: 400;
    color: #454545;
  }
#myChartsFa {
  width: 100%;
  height: 500px;
  margin-bottom: 30px;
}
.table_w {
  width: 100%;
  /deep/.el-table th{
    background: #f5f5f5;
  }
}

</style>
