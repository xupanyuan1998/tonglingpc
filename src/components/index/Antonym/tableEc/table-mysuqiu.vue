

<template>
  <div class="hello">
    <!-- 图形 -->
    <h3>在线诉求统计</h3>
    <div id="myChartsFa" ref="myChartsFa"></div>
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
    <div class="table">
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
          prop="datevalue"
          label="日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="总数量"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="notcount"
          label="未完成"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="finishcount"
          label="已完成"
          align="center"
          width="150">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getMonthEndDate, getMonthStartDate, getWeekEndDate, getWeekStartDate} from "../../../../assets/js/changedate";

  export default {
        data() {
            return {
                starttime: '',
                tableData: [],
              datas:[],
              value2:''
            }
        },
        methods: {
            getState() {
                const myChartsFa = this.$echarts.init(this.$refs.myChartsFa);
                myChartsFa.setOption();
            },
          //获取在线诉求信息统计数据
          getmsg(datas) {
            this.axios.post('/system/leader/weborderstatic', datas).then(({data}) => {
              console.log(data.data);
              this.tableData = data.data.reverse();
              //重组X轴日期
              var arr = [];
              this.datas = [{name: '总量'}, {name: '未完成'},{name:'已完成'}];
              var arr1 = [];//总量
              var arr2 = [];//未完成
              var arr3 = [];//已完成
              for (var a = 0; a < data.data.length; a++) {
                arr.push(data.data[a].datevalue);
                arr1.push(data.data[a].num);
                arr2.push(data.data[a].notcount);
                arr3.push(data.data[a].finishcount);
              }
              this.datas[0].data = arr1;
              this.datas[1].data = arr2;
              this.datas[2].data = arr3;
              this.riqi = arr;
              const myChartsFa = this.$echarts.init(this.$refs.myChartsFa);
              let options={
                title: {
                  text: ''
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {

                  data:['总量','未完成','已完成']
                },
                grid: {
                  left: '3%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: arr
                },
                yAxis: {
                  type: 'value'
                },
                series: [

                  {
                    name:this.datas[1].name,//2
                    type:'line',
                    stack: '总量',
                    data:this.datas[1].data
                  },
                  {
                    name:this.datas[2].name,//3
                    type:'line',
                    stack: '总量',
                    data:this.datas[2].data
                  },
                  {
                    name:this.datas[0].name,//1
                    type:'line',
                    stack: '总量',
                    data:this.datas[2].data
                  }
                ]
              };
              myChartsFa.setOption(options);
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
          //
          chaxun(){
            var start=this.value2[0];
            var end=this.value2[1];
            var datas = {
              startTime: start,
              endTime: end,
            };
            this.getmsg(datas);
          }
        },

        mounted() {
          var datas={
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
  #myChartsFa {
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
    margin-top: 30px;
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
  #mychart {
    padding:0 30px ;
    height: 300px;
    margin: 20px auto;
  }
  .table{
   width: 100%;
    margin-top: 30px;
    padding-bottom: 100px;
    /deep/.el-table th{
      background: #f5f5f5;
    }
  }
</style>


