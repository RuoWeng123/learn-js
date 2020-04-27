<template>
  <div style="width: 100%;height: 100%">
  </div>
</template>

<script>
  import echarts from "echarts"
  require('echarts-gl')
  export default {
    name: "surfaceChart",
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
          //主序的二维数组
        //TODO 2020/4/27  RUOWENG 此处渲染必须是主序二维数组，如下坐标序列，X必须是有序的。
          let data = [
            [-1,-1,0],[-0.5,-1,0],[0,-1,0],[0.5,-1,0],[1,-1,0],
            [-1,-0.5,0],[-0.5,-0.5,1],[0,-0.5,0],[0.5,-0.5,-1],[1,-0.5,0],
            [-1,0,0],[-0.5,0,0],[0,0,0],[0.5,0,0],[1,0,0],
            [-1,0.5,0],[-0.5,0.5,-1],[0,0.5,0],[0.5,0.5,1],[1,0.5,0],
            [-1,1,0],[-0.5,1,0],[0,1,0],[0.5,1,0],[1,1,0]
          ]
          console.log("++++",data)
        let options = {
          tooltip: {},
          backgroundColor: '#fff',
          visualMap: {
            show: false,
            dimension: 2,
            min: 0,
            max: 1,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf','#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value'
          },
          grid3D: {
            viewControl: {
              // projection: 'orthographic'
            }
          },
          series: [{
            type: 'surface',
            silent:false,
            wireframe: {
               show: false
            },
            data:data
            /*equation: {
              x: {
                step: 0.05
              },
              y: {
                step: 0.05
              },
              z: function (x, y) {
                if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
                  return '-'
                }
                return Math.sin(x * Math.PI) * Math.sin(y * Math.PI)
              }
            }*/
          }]
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
  #linechartContainer{
    display: flex;
    flex:1;

  }
</style>
