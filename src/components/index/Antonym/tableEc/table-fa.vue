<template>
  <div class="hello">
    <!-- 图形 -->
    <h3>政策发布效果统计</h3>
    <div id="myChartsFa" ref="myChartsFa"></div>
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
        <el-table-column type="index" label="序号" width="150" align="center"></el-table-column>
        <el-table-column prop="datevalue" label="日期" ></el-table-column>
        <el-table-column prop="viewCnt" label="浏览量" ></el-table-column>
        <el-table-column prop="collectCnt" label="收藏量" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getWeekStartDate,
    getWeekEndDate,
    getMonthStartDate,
    getMonthEndDate,} from '../../../../assets/js/changedate.js'
  export default {
    created() {
    },
    data() {
      return {
        // 表格数据
        tableData: [
          {
            xuhao: 1,
            riqi: "11-11",
            liulanliang: 200,
            shoucangliang: 355
          },
          {
            xuhao: 2,
            riqi: "11-12",
            liulanliang: 150,
            shoucangliang: 300
          },
          {
            xuhao: 3,
            riqi: "11-13",
            liulanliang: 300,
            shoucangliang: 600
          },
          {
            xuhao: 4,
            riqi: "11-14",
            liulanliang: 500,
            shoucangliang: 732
          },
          {
            xuhao: 5,
            riqi: "11-15",
            liulanliang: 400,
            shoucangliang: 1200
          },
          {
            xuhao: 6,
            riqi: "11-16",
            liulanliang: 800,
            shoucangliang: 580
          }
        ],
        // 时间戳
        value2: "",
        //x轴 日期数组;
        riqi: [],
        datas: [],
        options: '',
      };
    },
    methods: {
      getState() {

      },
      //获取政策发布效果数据
      async getmsg(datas) {
        this.axios.post('/system/leader/favoriteviews', datas).then(({data}) => {
          this.tableData = data.data.reverse();
          //重组X轴日期
          var arr = [];
          this.datas = [{name: '收藏量'}, {name: '浏览量'}];
          var arr1 = [];//收藏数据
          var arr2 = [];//浏览数据
          for (var a = 0; a < data.data.length; a++) {
            arr.push(data.data[a].datevalue);
            arr1.push(data.data[a].collectCnt);
            arr2.push(data.data[a].viewCnt);
          }

          this.datas[0].data = arr1;
          this.datas[1].data = arr2;
          this.riqi = arr;
          const myChartsFa = this.$echarts.init(this.$refs.myChartsFa);
          let options = {
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["浏览量", "收藏量"]
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
            series: [
              {
                name: this.datas[0].name,
                type: "line",
                data: this.datas[0].data,
                markPoint: {
                  data: [
                    {type: "max", name: "最大值"},
                    {type: "min", name: "最小值"}
                  ]
                },
              },
              {
                name: this.datas[1].name,
                type: "line",
                data: this.datas[1].data,
                markPoint: {},
                markLine: {
                  data: [
                    {type: "average", name: "平均值"},
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
                            position: "start"
                            // formatter: "最大值"
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
  .hello {
    background: #fff;
    padding: 0 30px;
  }

  #myChartsFa {
    width: 100%;
    height: 500px;
    margin-left: -30px;
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
    margin: 30px 0;
    /deep/.el-table th{
      background: #f5f5f5;
    }
  }
</style>

