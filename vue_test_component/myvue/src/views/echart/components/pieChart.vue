<template>
  <div style="width: 100%; height: 100%">
  </div>
</template>

<script>
  import echarts from "echarts"
  const COLOR = ["#11c2c1","#6066e4","#E36E81","#FFCB00","#e4e4e4"]
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
          return{
            showTitle:false,
            title:null,
            showLegend:false,
            legendPosition:"left",
            legendOrient:"vertical"
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

        this.chartObj.setOption({
          color:COLOR,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            right: '20',
            top:'middle',
            data: this.series.map(v => { return {name: v.name, icon:"circle"} })
          },
          series: [
            {
              name: this.config.title,
              type: 'pie',
              label: {
                normal: {
                  show: false,
                  position: 'center',
                  formatter: '{b}\n{c}\n{d}%'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              radius: ['50%', '70%'],
              tooltip:{
                position: ['50%', '50%']
              },
              avoidLabelOverlap: false,
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
  #piechartContainer{
    display: flex;
    flex:1;

  }
</style>
