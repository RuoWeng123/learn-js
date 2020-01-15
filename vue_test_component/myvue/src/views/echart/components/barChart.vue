<template>
    <div class="chart-container">
        <div id="barchartContainer"  style="height:500px"></div>
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
            this.chartObj = echarts.init(document.getElementById("barchartContainer"))
            let self = this
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
                        type: 'bar',
                        barWidth: '60%',
                        data: this.series
                    }
                ]
            })
        }
    },
    mounted() {
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
