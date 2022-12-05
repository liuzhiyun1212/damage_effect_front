<template>
    <div>
        <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
            <h2>故障件测量设备变更情况</h2>
            <TimeLineChart />
            <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
                <p style="
                font-family: Arial;
                font-size: 16px;
                font-weight: 600;
                display: inline-block;
                margin-left: 20px;
                ">
                    故障件测量设备变更情况
                </p>
            </div>
            <div ref="measuring_device_stack_chart" :style="{ width: '100%', height: '380px' }"></div>
        </el-card>
    </div>
</template>

<script>
import echarts from "echarts";
import { getMeasuringDeviceChartList } from "../../../api/chart/changeOfProductionDevice"
import TimeLineChart from "./timeLineChart.vue"

export default {
    name: "changeOfProductionDevice",
    components: { TimeLineChart },
    data() {
        return {
            loading: false,
            option: {
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
        }
    },
    methods: {
        initChart() {
            let getchart = echarts.init(this.$refs.measuring_device_stack_chart);
            getchart.clear()
            getchart.setOption(this.option);

            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                getchart.resize();
            });
        },

        getChartData() {
            getMeasuringDeviceChartList().then(res => {
                console.log(res);
                let list = [];
                list.push(res.data.produceNumObj)
                list.push(res.data.faultNumObj)
                this.option.series = list
                this.option.yAxis.data = res.data.equipmentNameArray
                this.initChart()
            });
        },
    },

    mounted() {
        this.getChartData()
    },
}
</script>
