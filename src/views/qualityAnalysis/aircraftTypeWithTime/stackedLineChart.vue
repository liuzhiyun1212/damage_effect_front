<template>
    <div>
        <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
            <!-- <h2>质量问题发生机型随时间变化情况</h2> -->
            <div ref="stackedLineChart" :style="{ width: '100%', height: '180px' }"></div>

            <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
                <p style="
                    font-family: Arial;
                    font-size: 16px;
                    font-weight: 600;
                    display: inline-block;
                    margin-left: 20px;
                ">
                    质量问题发生机型随时间变化情况
                </p>
                <el-button type="primary" icon="el-icon-s-home" @click="allCheck"
                    style="float: right; margin-right: 10px; margin-top: 8px">全部信息</el-button>
            </div>

            <div>
                <!-- <el-select v-model="checkedMethodName" placeholder="请选择" @change="changeCheckMethod">
                <el-option v-for="item in checkMethodList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->
                <el-button type="primary" @click="check1()">1、较上一时间增加或减少50%以上</el-button>
                <el-button type="primary" @click="check2()">2、连续两个时间段增加或减少20%以上</el-button>
                <el-button type="primary" @click="check3()">3、连续三个时间段呈单调变化趋势</el-button>
            </div>

            <div>
                <el-table 
                    :data="tableData" 
                    v-loading="loading" 
                    style="height:auto; margin-top: 20px; width:99%"
                    :header-cell-style="{
                        background: '#84BBFE',
                        color: '#fff',
                        fontSize: '14px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontFamily: '黑体',
                        padding: '0',
                    }" 
                    :header-row-style="{
                        height: '20',
                    }">
                    <el-table-column label="序号" type="index">
                    </el-table-column>
                    <el-table-column prop="aircraftType" label="机型">
                    </el-table-column>
                    <el-table-column prop="changeRange" label="变动幅度">
                    </el-table-column>
                    <el-table-column prop="eldTime" label="起始时间">
                    </el-table-column>
                    <el-table-column prop="eldTimeNum" label="前一时间数量">
                    </el-table-column>
                    <el-table-column prop="recentTime" label="结束时间" >
                    </el-table-column>
                    <el-table-column prop="recentTimeNum" label="后一时间数量" >
                    </el-table-column>
                    <el-table-column prop="checkCondition" label="符合的条件" >
                    </el-table-column>
                </el-table>
            </div>

            <el-table></el-table>
        </el-card>
    </div>
</template>

<script>
import echarts from "echarts";
import { getCheckList, getChartData } from "../../../api/chart/aircraftTypeWithTime"

export default {
    name: "aircraftTypeAndTime",
    data() {
        return {
            loading:false,
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
                    interval: 1,
                    type: 'value'
                },
                series: []
            },
            // legend: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            xData: ['2022第一季度', '2022第二季度', '2022第三季度'],
            tableData: [
                {
                    aircraftType: '',
                    changeRange: '',
                    eldTime: '',
                    eldTimeNum: 0,
                    recentTime: '',
                    recentTimeNum: 0,
                    checkCondition: ''
                },
            ],
            // checkMethodList: [{
            //     value: 'check1',
            //     label: '较上一时间增加或减少50%以上'
            // }, {
            //     value: 'check2',
            //     label: '连续两个时间段增加或减少20%以上'
            // }, {
            //     value: 'check3',
            //     label: '连续三个时间段呈单调变化趋势'
            // }],
            //筛选方法
            checkedMethodName: 'allCheck',
            // 查询参数
            queryParams: {
                checkedMethodName: 'allCheck'
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
                console.log('筛选条件 :>> ', res);
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
        },
        check1() {
            this.checkedMethodName = "check1"
            this.getCheckList()
        },
        check2() {
            this.checkedMethodName = "check2"
            this.getCheckList()
        },
        check3() {
            this.checkedMethodName = "check3"
            this.getCheckList()
        },
        allCheck() {
            this.checkedMethodName = "allCheck"
            this.getCheckList()
        },
    },
    mounted() {
        this.getXData()
        this.getCheckList()
        this.getChartData()
    },
}
</script>
