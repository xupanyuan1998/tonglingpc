

<template>
  <div class="hello">
    <!-- 图形 -->
    <h3>诉求办理统计</h3>
    <div id="myCharts" ref="myCharts"></div>
    <!-- 日期 -->
    <div class="date_day">
      <!-- 本周 -->
      <el-button class="week" type="primary" @click="getweek">本周</el-button>
      <!--本月 -->
      <el-button type="primary" @click="getmonth">本月</el-button>
      <div class="date">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <!-- 查询 -->
      <el-button v-if="value2==''||value2==null" type="primary" class="chaxun" disabled>查询</el-button>
      <el-button v-else type="primary" class="chaxun" @click="chaxun">查询</el-button>
    </div>
    <div class="table_w">
      <!-- 表单 -->
      <el-table :data="tableData" border style="width: 100%">
        >
        <el-table-column prop="name" label="类型" ></el-table-column>
        <el-table-column prop="value" label="数量" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getMonthEndDate, getMonthStartDate, getWeekEndDate, getWeekStartDate} from "../../../../assets/js/changedate";

  export default {
  created() {},
  data() {
    return {
      // 表格数据
      tableData:[],
      // 时间戳
      value2: ""
    };
  },
  methods: {
    getmsg(datas){
      this.axios.post('/system/leader/orderlist' ,datas).then(({data})=>{
        console.log(data.data);
        var arr=[];
        var arr1=[];
        for(var i=0;i<data.data.length;i++){
          var obj={};
          obj.name=data.data[i].stateString;
          obj.value=data.data[i].count;
          arr.push(obj);
          arr1.push(data.data[i].stateString);
        }
        this.tableData=arr;
        console.log(this.tableData);
        const myCharts = this.$echarts.init(this.$refs.myCharts);
        let options = {
          title : {
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            data:arr1
          },
          series : [
            {
              name: '访问来源',
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
        myCharts.setOption(options);
      })
    },
    //获取本周
    getweek() {
      var start=getWeekStartDate();
      var end=getWeekEndDate();
      var datas = {
        startTime: start,
        endTime: end,
      };;;
      this.getmsg(datas);
    },
    //获取本月
    getmonth() {
      var start=getMonthStartDate();
      var end=getMonthEndDate();
      var datas = {
        startTime: start,
        endTime: end,
      };
      this.getmsg(datas);
    },
    chaxun(){
      var start=this.value2[0];
      var end=this.value2[1];
      var datas = {
        startTime: start,
        endTime: end,
      };;;
      this.getmsg(datas);
    }

  },

  mounted() {
    var datas = {
      startTime: '',
      endTime: '',
    };
    this.getmsg(datas);
  }
};
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
    padding: 0 30px;
  }
#myCharts {
  width: 100%;
  height: 500px;
  margin-bottom: 30px;
}
  .date_day{
    width: 100%;
    overflow: hidden;
    button.el-button{
      display: block;
      float: left;
      margin-right: 50px;
    }
    .date{
      float: left;
      margin-right: 50px;
    }
    button:last-child{
      margin-right: 0;
    }
  }
  h3 {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid #ff4c4c;
    font-size: 16px;
    font-weight: 400;
    color: #454545;
    margin-bottom: 30px;
  }
.table_w {
  margin: 30px 0;
  width: 100%;
  /deep/.el-table th{
    background: #f5f5f5;
  }
}
</style>

