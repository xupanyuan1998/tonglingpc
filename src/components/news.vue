<template>
  <div id="myChart" ref="myChart"></div>
</template>
<style>
  #myChart {
    width: 95%;
    height: 300px;
    margin: 20px auto;
    border: 1px solid #CCC
  }
</style>
<script>
    // 引入完整的echarts
    import echarts from 'echarts'
    export default {
        mounted () {
            // 调用绘制图表的方法
            this.draw();
        },
        methods: {
            draw () {
                // 实例化echarts对象
                myChart = echarts.init(this.$refs.myChart);;;

                // 绘制条形图
                myChart.setOption({
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                })
            }
        }
    }
</script>
