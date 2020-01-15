<template>
    <div>
        <div class="header">echart  test  page</div>
        <div class="pie-container">
            <pie-chart :series="pieData" :config="pieConfig"></pie-chart>
        </div>
        <div class="line-container">
            <line-chart :series="pieData" :config="pieConfig"></line-chart>
        </div>
        <div class="bar-container">
            <bar-chart :series="pieData" :config="pieConfig"></bar-chart>
        </div>
    </div>
</template>
<script>
import PieChart from "./components/pieChart"
import LineChart from "./components/lineChart"
import BarChart from "./components/barChart"
export default {
    name:"test echart",
    components:{
        PieChart,
        LineChart,
        BarChart
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
            lineData:[]
        }
    }
}
</script>
<style lang="css" scoped>
.pie-container{
    display:block;
    width: 1500px;
    height: 500px;
    border: 1px solid #0c8032;
}
.line-container{
    display:block;
    width: 1500px;
    height: 500px;
    border: 1px solid #0c8032;
}
.bar-container{
    display:block;
    width: 1500px;
    height: 500px;
    border: 1px solid #0c8032;
}
</style>