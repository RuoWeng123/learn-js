<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "pieChart",
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
          return{}
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
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.series.map(v =>v.name),
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              //显示轴线
              axisLine: {
                show: false
              },
              //显示坐标刻度
              axisTick:{
                show:false
              }
            }
          ],
          series: [
            {
              name: this.config.title,
              type: 'bar',
              barWidth: '60%',
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.57, color: '#2378f7'},
                      {offset: 1, color: '#2378f7'}
                    ]
                  )
                }
              },
              data: this.series
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
