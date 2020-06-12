<template>
    <div class="ml16">
       <!-- <div class="mb16">
            <div class="title">基础饼图</div>
            <div class="bar-container">
            <pie-chart :series="pieData" :config="pieConfig" class="chart-container"></pie-chart>
            </div>
        </div>
        <div class="mb16">
            <div class="title">基础折线图</div>
            <div class="bar-container">
            <line-chart :series="pieData" :config="pieConfig"  class="chart-container"></line-chart>
            </div>
        </div>

        <div class="pb16">
            <div class="title">横向柱状图</div>
            <div class="bar-container">
            <inversion-bar-chart :series="inversionBarData" :config="inversionBarConfig"></inversion-bar-chart>
            </div>
        </div>

        <div class="pb16">
            <div class="title">进度环</div>
            <div class="container">
              <schedule-circle></schedule-circle>
            </div>
        </div> -->
      <div  class="mb16">
        <div class="title">基础柱状图</div>
        <div class="bar-container">
          <bar-chart  :series="pieData" :config="pieConfig"></bar-chart>
        </div>
      </div>
        <div class="pb16">
            <div class="title mb10">surface 表格</div>
            <div class="container" style="height: 800px;width: 1200px;">
              <surface-chart :point-list="tunnelPointList"></surface-chart>
            </div>
        </div>
    </div>
</template>
<script>
import PieChart from "./components/pieChart"
import LineChart from "./components/lineChart"
import BarChart from "./components/barChart"
import InversionBarChart from './components/inversionBarChart'
import surfaceChart from './components/surfaceChart'
import ScheduleCircle from './components/scheduleCircle'

import {tunnelPointList} from './constant/tunnelPoint'
export default {
    name:"echart",
    components:{
       /* PieChart,
        LineChart,

        InversionBarChart,*/
        //ScheduleCircle
      BarChart,
      surfaceChart
    },
    data(){
        return{
            chartBaseOptions:[
                {title:"title",name:"标题"},
                {title:"textStyle",name:"字体样式"},
                {title:"legend",name:"图例"},
                {title:"grid",name:"网格"},
                {title:"tooltip",name:"悬浮提示框"}
            ],
            chartTypeOptions:[

            ],
            pieData:[
                {name:"ruoweng",value:100},
                {name:"hongyu",value:80},
                {name:"tengteng",value:100},
                {name:"haohe",value:200},
                {name:"malong",value:100}
            ],
            pieConfig:{
                showTitle:true,
                title:"biaoti",
                grid:{
                    left: 40,
                    right: 5,
                    bottom: 20,
                    borderWidth: 0,
                    x: '10%',
                    y: '5%'
                },
                showArea:false
            },
            lineData:[],
            inversionBarData:[
                {name:"ruoweng",value:100},
                {name:"haohe",value:1200},
                {name:"zhiwei",value:2200},
                {name:"hongyu",value:3200},
                {name:"pengxu",value:2400},
                {name:"malong",value:5200}
            ],
            inversionBarConfig:{},
            tunnelPointList:tunnelPointList
        }
    },
    mounted(){

    }
}
</script>
<style lang="css" scoped>
.pie-container{
    display:block;
    width: 1500px;
    height: 500px;
    overflow: hidden;
    border: 1px solid #0c8032;
}
.line-container{
    display:block;
    width: 1500px;
    height: 500px;
    overflow: hidden;
    border: 1px solid #0c8032;
}
.bar-container{
    display:block;
    width: 1500px;
    height: 540px;
    overflow: hidden;
    border: 1px solid #0c8032;
}

.container{
    display:block;
    width: 100%;
    height: 200px;
    border: 1px solid #E4E4E4;

}

.chart-container{
    display:block;
    width: 100%;
    height: 460px;
    padding: 14px 14px;
}
</style>
