<template>
    <div>
        <div class="mb16">
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
        <div  class="mb16">
            <div class="title">基础柱状图</div>
            <div class="bar-container">
                <bar-chart  :series="pieData" :config="pieConfig"></bar-chart>
            </div>
        </div>
        <div class="pb16">
            <div class="title">横向柱状图</div>
            <div class="bar-container">
            <inversion-bar-chart :series="inversionBarData" :config="inversionBarConfig"></inversion-bar-chart>
            </div>
        </div>
    </div>
</template>
<script>
import PieChart from "./components/pieChart"
import LineChart from "./components/lineChart"
import BarChart from "./components/barChart"
import InversionBarChart from './components/inversionBarChart'
export default {
    name:"echart",
    components:{
        PieChart,
        LineChart,
        BarChart,
        InversionBarChart
    },
    data(){
        return{
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
            inversionBarData:[],
            inversionBarConfig:{}
        }
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

.chart-container{
    display:block;
    width: 100%;
    height: 460px;
}
</style>
