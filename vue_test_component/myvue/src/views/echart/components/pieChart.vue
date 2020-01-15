<template>
    <div class="chart-container">
        <div id="piechartContainer"  style="height:500px"></div>
    </div>
</template>

<script>
import echarts from "echarts"
const COLOR = ["#11c2c1","#6066e4","#E36E81","#FFCB00"]
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
            this.chartObj = echarts.init(document.getElementById("piechartContainer"))
            let self = this
            this.chartObj.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: this.series.map(v=>v.name)
                },
                series: [
                    {
                        name: this.config.title,
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
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
#piechartContainer{
    display: flex;
    flex:1;

}
</style>
