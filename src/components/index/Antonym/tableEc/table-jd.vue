<template>
  <div>
    <div class="warp">
      <h3>企业按地区统计</h3>
      <div id="bing" ref="bing"></div>
      <h3>按产业统计</h3>
      <div id="chan" ref="chan"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "table-jd",
  data() {
    return {
      binglist: []
    };
  },
  methods: {
    get(duilen,duix,duidata) {
      var chan = echarts.init(this.$refs.chan);
      // 绘制条形图
      chan.setOption( {
        color:['#57A9D4',  '#67E0E3', '#FFDB5C','#DEA58D', '#D978B2'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: 'center',
          data: duilen
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:  {
          type: 'category',
          data:duix

        },
        yAxis: {
          type: 'value'
        },
        series: duidata
      });
    },
    draw(arr,arr1){
      // 实例化echarts对象
      var bings = echarts.init(this.$refs.bing);
      // 绘制条形图
      bings.setOption({
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
          x: "center",
          y: "bottom",
          data:arr
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:arr1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    /*
    * 1.从接口获取数据
    * 2.将数据转换成所需要的格式
    * */
    var datas = {
      startTime: '',
      endTime: '',
    };
    this.axios.post('/system/leader/webenterprisestatic',datas).then(({data})=>{
      // console.log(data.data);
      /*
      * 获取饼状图的图例数组*/
      var arr=[];//饼状图 图例
      var arr1=[];//饼状图数据
      var leng=data.data.listregion;
      /*
      * 获取饼状图的数据
      * 格式为 [  { value: 335, name: "铜官区" }];
      * */
      for(var i=0;i<leng.length;i++){
        arr.push(leng[i].name.toString());
        var obj={};
        obj.name=leng[i].name;
        obj.value=leng[i].count;
        arr1.push(obj);
      };
       this.draw(arr,arr1);
      /*
      * 柱状堆叠图
      * 1.获取堆叠图的图例数据*/
      var dui=data.data.listindustry;
      var duilen=[];//存放图例的数组
      let duix=[];//堆叠图x轴数据
      let duidata=[];
      for(var i=0;i<dui.length;i++){
        duilen.push(dui[i].cyname);
        for (var b=0;b<dui[i].childlist.length;b++){
          var obj={
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data:[]
          };
          obj.name=dui[i].childlist[b].cyname;
          obj.data.push(dui[i].childlist[b].count);
          duidata.push(obj);
        }
      };
      function format(array) {
        let newArray = [array[0]];
        array.reduce(function (accumulator, currentItem) {
          if (JSON.stringify(accumulator.name) === JSON.stringify(currentItem.name)) {
            newArray[newArray.length - 1].data.push.apply(newArray[newArray.length - 1].data,currentItem.data);
          } else {
            newArray.push(currentItem);
          }
          return newArray[newArray.length - 1];
        })
        return newArray;
      };
      let result=format(duidata);//堆叠图的数据
      console.log(result);
      /*
    * 2.获取x轴的数据*/
      for(var a=0;a<dui[0].childlist.length;a++){
        duix.push(dui[0].childlist[a].name);
      };
      this.get(duilen,duix,result);
    })
  }
};
</script>

<style scoped lang="less">
#mychart {
  width: 100%;
  height: 300px;
  margin: 20px auto;
}
.warp {
  background: #fff;
  padding-bottom: 100px;
  h3 {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid #ff4c4c;
    font-size: 16px;
    font-weight: 400;
    color: #454545;
  }
}
#bing {
  width:100%;
  height: 500px;
}
#chan {
  width: 100%;
  height: 500px;
  margin-top: 30px;
}
</style>
