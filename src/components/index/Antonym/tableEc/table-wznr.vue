

<template>
  <div class="hello">
    <!-- 图形 -->
    <h3>网站内容统计</h3>
    <div id="myChartsWznr" ref="myChartsWznr"></div>
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
        <el-table-column prop="name" label="板块" ></el-table-column>
        <el-table-column prop="count" label="数量" ></el-table-column>
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
      tableData: [
      ],
      value2:''
    };
  },
  methods: {
    // 图形
    async getmsg(datas) {
      this.axios.post('/system/leader/websitestatic', datas).then(({data}) => {
        // console.log(data.data);
        //重组表格数据;
          var arr=[];
          for (var key in data.data.sumlist) {
            var obj={};
            obj.name=key;
            obj.count= data.data.sumlist[key];
           arr.push(obj);
          };
        this.tableData=arr;
          var arr2=data.data.datelist;
        /*
        *先获取所有list里面的数据 将所有书剑遍历出来 放到同一层
        * 2.判断name一样的将其count添加的事先声明好的list里面
        * arr3   最后的数据集合
        * */
          var arr3=[];
          var leng=[];
          var center=data.data.list;
          for(var i=0;i<center[0].length;i++){
            var obj={
              name:'',
              data:[],
            }
            obj.name=center[0][i].categoryName;
            arr3.push(obj);
            leng.push(center[0][i].categoryName);
          }
          var arr4=[];
          console.log(center);
          for(var a=0;a<center.length;a++){
            for(var b=0;b<center[a].length;b++){
              var obj={};
              obj.name=center[a][b].categoryName;
              obj.count=center[a][b].count;
              arr4.push(obj);
            }
          }
          //循环arr4 判断数组是否一样
        for (var b=0;b<arr3.length;b++){
          for(var a=0;a<arr4.length;a++){
            if(arr4[a].name==arr3[b].name){
              arr3[b].data.push(arr4[a].count);
            }
          }
        };
        //循环arr3  添加echarts的数据
        /*
        * 把每一项转换成
        * {
            name: '政策法规',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },*/
        for(var i=0;i<arr3.length;i++){
          arr3[i].type='bar';
          arr3[i].stack='总量';
          arr3[i].label={
            normal: {
              show: true,
              position: 'inside'
            }
          };
        }
        const myChartsWznr = this.$echarts.init(this.$refs.myChartsWznr);
        let options =  {
          color:['#37A2DA','#67E0E3','#FFDB5C','#FF9F7F'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: leng
          },
          grid: {
            left: 0,
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'category',
            data: arr2

          },
          yAxis: {
            type: 'value'
          },
          series: arr3
        };
        myChartsWznr.setOption(options);

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
    var datas={
      startTime: '',
      endTime: '',
    };
    this.getmsg(datas);
    // this.getData();
  }
};
</script>

<style scoped lang="less">
  .hello{
    background: #fff;
    padding: 0 30px;
  }
#myChartsWznr {
  width: 100%;
  height: 500px;
  padding: 30px 0;
}
  h3 {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid #ff4c4c;
    font-size: 16px;
    font-weight: 400;
    color: #454545;
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
  margin: 30px 0;
  width: 100%;
  /deep/.el-table th{
    background: #f5f5f5;
  }
}

</style>

