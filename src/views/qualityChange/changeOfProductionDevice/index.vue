<template>
    <div>
        <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
            <h2>故障件生产设备变更情况</h2>
            <div ref="chart" :style="{ width: '100%', height: '380px' }"></div>
            <TimeLineChart />
        </el-card>
    </div>
</template>

<script>
import echarts from "echarts";
import { getChartData } from "../../../api/chart/useIntensity"
import TimeLineChart from "./timeLineChart.vue"

export default {
    name: "changeOfProductionDevice",
    components: {TimeLineChart},
    data() {
        return {
            loading: false,
            option: {
                color: ['#5470c6', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#91cc75'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value',
                    // splitArea:{
                    //     show:true
                    // },
                    boundaryGap: [0, 0.1]
                }],
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [],
            },
            xData: [
                {
                    name: '设备生产数',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [2, 1, 3, 2, 2, 3, 3]
                },
                {
                    name: '故障发生数',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [2, 1, 2, 1, 1, 2, 1]
                },
            ],
            yData: ['工人1', '工人2', '工人3', '工人4', '工人5', '工人6', '工人7']
        }
    },
    methods: {
        initChart() {
            let getchart = echarts.init(this.$refs.chart);
            getchart.clear()
            getchart.setOption(this.option);

            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                getchart.resize();
            });
        },

        getChartData() {
            getChartData().then(res => {
                console.log(res);
                let list = [];
                list.push(res.data.produceNumObj)
                list.push(res.data.faultNumObj)
                this.option.series = list
                this.option.yAxis.data = res.data.workerNameArray
                this.initChart()
            });
        },
    },

    mounted() {
        this.getChartData()
    },
}
</script>
