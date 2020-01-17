<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "inversionBarChart",
    props: {
      series: {
        type: Array,
        default: function() {
          return []
        }
      },
      config:{
        type:Object,
        default: function(){
          return{
            showTitle:false,
            title:null,
            showLegend:false,
            grid:{
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            }
          }
        }
      }
    },
    data() {
      return {
        chartObj: {}
      }
    },
    methods: {
      drawChart() {
        const options = {
          color:"#45A1FF ",
          title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['2011年', '2012年']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  1, 0, 0, 0,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.57, color: '#2378f7'},
                    {offset: 1, color: '#2378f7'}
                  ]
                )
              },
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
          ]
        }
        this.chartObj.setOption(options)
      }
    },
    mounted() {
      this.chartObj = echarts.init(this.$el)
      this.drawChart()
    },
    watch: {
      series: function() {
        this.drawChart()
      }
    }
  }
</script>

<style lang="css" scoped>
  .chart-container {
    display: flex;
    width: 100%;
    height: auto;
  }
  #barchartContainer{
    display: flex;
    flex:1;

  }
</style>
