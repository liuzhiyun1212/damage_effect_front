<template>
    <div>
        <h2>质量问题发生机型随时间变化情况</h2>
        <div ref="stackedLineChart" :style="{ width: '100%', height: '180px' }"></div>

        <div>
            <el-select v-model="checkedMethodName" placeholder="请选择" @change="changeCheckMethod">
                <el-option v-for="item in checkMethodList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="序号" type="index" width="180">
                </el-table-column>
                <el-table-column prop="aircraftType" label="机型" width="180">
                </el-table-column>
                <el-table-column prop="changeRange" label="变动幅度" width="180">
                </el-table-column>
                <el-table-column prop="eldTime" label="起始时间" width="180">
                </el-table-column>
                <el-table-column prop="eldTimeNum" label="前一时间数量" width="180">
                </el-table-column>
                <el-table-column prop="recentTime" label="结束时间" width="180">
                </el-table-column>
                <el-table-column prop="recentTimeNum" label="后一时间数量" width="180">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import { getCheckList, getChartData } from "../../../api/chart/aircraftTypeWithTime"

export default {
    name: "aircraftTypeAndTime",
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.legend
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        // saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            },
            // legend: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            xData: ['2022第一季度', '2022第二季度', '2022第三季度'],
            tableData: [],
            checkMethodList: [{
                value: 'check1',
                label: '较上一时间增加或减少50%以上'
            }, {
                value: 'check2',
                label: '连续两个时间段增加或减少20%以上'
            }, {
                value: 'check3',
                label: '连续三个时间段呈单调变化趋势'
            }],
            checkedMethodName: 'check1',
            // 查询参数
            queryParams: {
                checkedMethodName:'check1'
            },
        }
    },
    methods: {
        initChart() {
            let getchart = echarts.init(this.$refs.stackedLineChart);
            getchart.clear()
            getchart.setOption(this.option);

            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                getchart.resize();
            });
        },

        getCheckList() {
            this.queryParams.checkedMethodName = this.checkedMethodName;
            getCheckList(this.queryParams).then(res => {
                // console.log('筛选条件一 :>> ', res);
                this.tableData = res.rows
            });
        },
        getChartData() {
            getChartData().then(res => {
                this.option.series = res.data.list
                this.option.xAxis.data = res.data.xdata
                console.log("res", res);
                this.initChart()
            });
        },
        //获取横坐标名
        getXData() {
            this.option.xAxis.data = this.xData
        },

        changeCheckMethod() {
            this.queryParams.checkedMethodName = this.checkedMethodName
            this.getCheckList()
        }
    },
    mounted() {
        this.getXData()
        this.getCheckList()
        this.getChartData()
    },
}
</script>
