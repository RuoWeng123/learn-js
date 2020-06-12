<template>
  <div style="width: 100%;height: 100%">
  </div>
</template>

<script>

// 使用前 npm install echarts-gl
  import echarts from "echarts"
 // require('echarts-gl')
  import * as R from 'ramda'

  export default {
    name: "surfaceChart",
    props: {
      pointList: {
        type:Array,
        default: function(){
          return []
        }
      },
      config:{
        type:Object,
        default: function(){
          return {
            serial_name:'应力',
            x_name:'标号 ',
            y_name:'进尺 ',
            z_name:'应力 ',
            x_field: 'x',
            y_field: 'y',
            z_field: 'depth',
            theme:'light' //light light-blue
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

      // surfacechart 表格渲染要求必须为主序二维数组，或者是渲染函数
      // 主序二维数组格式如下：
      //  [
      //     [-1,-1,0],[-0.5,-1,0],[0,-1,0],[0.5,-1,0],[1,-1,0],
      //     [-1,-0.5,0],[-0.5,-0.5,1],[0,-0.5,0],[0.5,-0.5,-1],[1,-0.5,0],
      //     [-1,0,0],[-0.5,0,0],[0,0,0],[0.5,0,0],[1,0,0],
      //     [-1,0.5,0],[-0.5,0.5,-1],[0,0.5,0],[0.5,0.5,1],[1,0.5,0],
      //     [-1,1,0],[-0.5,1,0],[0,1,0],[0.5,1,0],[1,1,0]
      //   ]

      drawChart(data, min, max) {
        let config = this.config
        let options = {
          backgroundColor: '#fff',
          visualMap: {
            show: false,
            dimension: 2,
            min: min,
            max: max,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#a50026']
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
          tooltip:{
            formatter: function(params){
              let html_el = `
                <div><span style='float:left;width: 50px;'>${config.x_name}</span><span style="float:left;">${params.data[0].toFixed(2)}</span></div>
                <div><span style='float:left;width: 50px;'>${config.y_name}</span><span style="float:left;">${params.data[1].toFixed(2)}</span></div>
                <div><span style='float:left;width: 50px;'>${config.z_name}</span><span style="float:left;">${params.data[2].toFixed(2)}</span></div>
              `
              return html_el
            }
          },
          grid3D: {
            viewControl: {
              // projection: 'orthographic'
            }
          },
          series: [{
            name:this.config.name,
            type: 'surface',
            silent:false,
            wireframe: {
               show: false
            },
            data:data
          }]
        }
        this.chartObj.setOption(options)
      },
      // 使用前，请获取prop中传入的 x，y,z 对应的键值
      // input：常规一维数组
      // output: 以x为主序列的二维数组
      // 若要观看 面 效果，请调整 第一个for循环的频次
      //  for(let i = 0; i<30; i++){
      //     for(let j =0; j<listValue.length;j++){
      //       let temp = listValue[j][i%2]
      //       serialData.push([ temp.x-xMin, temp.y+i -yMin, temp.depth ])
      //     }
      //   }
      formatChartData(data , config={x_field:'x', y_field:'y', z_field:'depth'}){
        console.log('原始数据',data)
        const xMin = data.map(v => v[config.x_field]).sort()[0]
        const yMin = data.map(v => v[config.y_field]).sort()[0]
        const zMin = data.map(v => v[config.z_field]).sort()[0]
        const zMax = R.last(data.map(v => v[config.z_field]).sort())
        const space = Math.round(zMin / 2)
        let serialData = []
        let listValue = R.values(R.groupBy(R.prop(config.x_field))(data.sort((a,b) => a[config.x_field]-b[config.x_field])))
        for(let i = 0; i<listValue[0].length; i++){
          for(let j =0; j<listValue.length;j++){
            let temp = listValue[j][i]
            serialData.push([ temp[config.x_field]-xMin, temp[config.y_field]+i -yMin, temp[config.z_field] ])
          }
        }
        this.drawChart(serialData, zMin-space, zMax+space)
      }
    },
    mounted() {
      this.chartObj = echarts.init(this.$el)
      if(!this.pointList.length) return
      this.formatChartData(this.pointList)
    },
    watch: {
      pointList: function(val, old) {
        val && val.length && this.formatChartData(val)
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
