

<template>
  <div class="hello">
    <!-- 图形 -->
    <h3>企业活跃统计</h3>
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
    <div id="myChartsQyhy" ref="myChartsQyhy"></div>
    <!-- 日期 -->

    <div class="table_w">
      <!-- 表单 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="datevalue" label="日期"></el-table-column>
        <el-table-column prop="viewcnt" label="总数量"  align="center"></el-table-column>
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
      tableData: [],
      // 时间戳
      value2: "",
      datas:'',
    };
  },
  methods: {
    getmsg(datas){
      this.axios.post('/system/leader/webcompanyactivity',datas).then(({data})=>{
        console.log(data.data);
        this.tableData=data.data.reverse();
        var arr = [];
        this.datas = [{name: '企业'}];
        var arr1 = [];//收藏数据
        for (var a = 0; a < data.data.length; a++) {
          arr.push(data.data[a].datevalue);
          arr1.push(data.data[a].viewcnt);
        }

        this.datas[0].data = arr1;
        //console.log(this.datas);
        this.riqi = arr;
        const myChartsQyhy = this.$echarts.init(this.$refs.myChartsQyhy);
        let options = {
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.riqi
          },
          yAxis: [
            {
              type: "value"
            }
          ],
          grid:{
            left:'6%'
          },
          series: [
            {
              type: "line",
              data: this.datas[0].data,
              markPoint: {},
              markLine: {
                data: [
                  { type: "average", name: "平均值" },
                  [
                    {
                      symbol: "none",
                      x: "90%",
                      yAxis: "max"
                    },
                    {
                      symbol: "circle",
                      label: {
                        normal: {
                          position: "start",
                          formatter: "最大值"
                        }
                      },
                      type: "max",
                      name: "最高点"
                    }
                  ]
                ]
              }
            }
          ]
        };
        myChartsQyhy.setOption(options);
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
      };;;
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
#myChartsQyhy {
  width: 100%;
  height: 500px;
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
  .table_w {
    width: 100%;
    margin-top: 30px;
    /deep/.el-table th{
      background: #f5f5f5;
    }
  }

</style>

