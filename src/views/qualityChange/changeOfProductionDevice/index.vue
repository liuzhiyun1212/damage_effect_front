<template>
    <div>
        <h2 style="font-family: Arial; margin-left: 20px;">
            故障件生产设备变更情况
        </h2>
        <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
            <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
                <p style="
                    font-family: Arial;
                    font-size: 16px;
                    font-weight: 600;
                    display: inline-block;
                    margin-left: 20px;
                ">
                    生产设备变更时间线
                </p>

                <el-tooltip placement="top">
                    <div slot="content">涉及到的故障件生产设备发生变更</div>
                    <i class="el-icon-question"
                        style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
                </el-tooltip>

            </div>
            <TimeLineChart />
            <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
                <p style="
                font-family: Arial;
                font-size: 16px;
                font-weight: 600;
                display: inline-block;
                margin-left: 20px;
                ">
                    故障件生产设备变更情况
                </p>
                <el-tooltip placement="top">
                    <div slot="content">涉及高发故障模式的故障件的生产设备所生产的产品数以及产品对应的质量问题数</div>
                    <i class="el-icon-question"
                        style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
                </el-tooltip>
            </div>
            <div ref="production_device_stack_chart" :style="{ width: '100%', height: '380px' }"></div>
        </el-card>
    </div>
</template>

<script>
import echarts from "echarts";
import { getChartData } from "../../../api/chart/changeOfProductionDevice"
import TimeLineChart from "./timeLineChart.vue"

export default {
    name: "changeOfProductionDevice",
    components: { TimeLineChart },
    data() {
        return {
            loading: false,
            option: {
                // color: ['#5470c6', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#91cc75'],
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
            let getchart = echarts.init(this.$refs.production_device_stack_chart);
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
