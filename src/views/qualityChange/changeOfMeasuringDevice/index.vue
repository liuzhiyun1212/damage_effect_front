<template>
    <div>
        <h2 style="font-family: Arial; margin-left: 20px;">
            故障件测量设备变更情况
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
                    检测设备变更时间线
                </p>

                <el-tooltip placement="top">
                    <div slot="content">涉及到的故障件检测设备发生变更</div>
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
                    故障件检测设备变更情况
                </p>
                <el-tooltip placement="top">
                    <div slot="content">涉及高发故障模式的故障件的检测设备所检测的产品数以及产品对应的质量问题数</div>
                    <i class="el-icon-question"
                        style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
                </el-tooltip>
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
    name: "changeOfMeasuringDevice",
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
                // console.log(res);
                let list = [];
                list.push(res.data.produceNumObj)
                list.push(res.data.faultNumObj)
                this.option.series = list
                this.option.yAxis.data = res.data.equipmentNameArray
                this.getHeight_stacked()
                this.initChart()
            });
        },
    
        // 高度适应 对比堆叠图
        getHeight_stacked() {
            var id__stacked = this.$refs.measuring_device_stack_chart
            var height__stacked = this.option.yAxis.data.length * 80
            //d.setAttribute(height,height+"px");
            id__stacked.style.cssText = "height:" + height__stacked + "px"
        },
    },

    mounted() {
        this.getChartData()
    },
}
</script>
