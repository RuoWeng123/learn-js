<template>
  <div style="width: 100%;height: 100%">
  </div>
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
        this.chartObj.setOption({
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
              type: 'value'
            }
          ],
          series: [
            {
              name: this.config.title,
              type: 'line',
              barWidth: '60%',
              data: this.series
            }
          ]
        })
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
  #linechartContainer{
    display: flex;
    flex:1;

  }
</style>
