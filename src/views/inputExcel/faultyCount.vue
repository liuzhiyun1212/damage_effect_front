<template>
  <div>
    <div id="quarter"
            style="width: 100%; height: 200px;"
          ></div>
          <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
        </div>
        <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
          <p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          统计故障件型号-名称
        </p>
        <!-- <el-button type="primary" icon="el-icon-s-home"  @click="allInfo" style="float: right; margin-right: 10px; margin-top: 8px">全部信息</el-button> -->
        </div>
        <el-table
            v-loading="loading"
            :data="selectList"
            stripe
            height="250px"
            style="width: 100%;margin-top:0px !important"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="partsModelName"
              label="故障件型号-名称"
              :show-overflow-tooltip="true"

            >
            </el-table-column>
            <el-table-column
              prop="partsCount"
              label="故障件数量"
            >
            </el-table-column>
            <el-table-column
              prop="partsProportion"
              label="故障件发生数占比"
            >
            </el-table-column>
          </el-table>
  </div>
</template>

<script>
 import * as echarts from 'echarts';
import {selectFaultyCount,selectAllFaulty} from '@/api/system/dev';
import { log } from 'console';
export default {
    data() {
        return {
            // 筛选大列表
            allQualityList:[],
            // 质量发生时间总数
            qualityHappenList:[],
            // 表格判断条件list
            selectList:[],
            // 季度柱状图
            xQuarter:[],
            yQuarter:[],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 5,
                troubleName: null,
                troubleIntroduction: null
            },
            //故障件型号-名称列表
            modelNameList:[],
            //所有故障件
            allFaultyList:[],
            //故障件列表
            faultyCountList:[],
            //平均数
            averagePart: null,
            // FaultyPartsCount:{
            //     partsModelName:null,
            //     partsCount:null,
            // }

        }
    },
    methods: {
        // 故障件型号-名称
        selectFaultyCount(){
            selectFaultyCount().then(response => {
                this.faultyCountList = response;
                console.log(this.faultyCountList);
                this.selectList = this.faultyCountList               
            });
        },
        
        selectAllFaulty(){
            selectAllFaulty().then(response => {
                this.allFaultyList = response;
                console.log(this.allFaultyList);
                for(let i=0;i<this.allFaultyList.length;i++){
                this.xQuarter.push(this.allFaultyList[i].partsModelName)
                this.yQuarter.push(this.allFaultyList[i].partsCount)
                }
                this.chartView();
            });
        },
        chartView() {
        var myChart = echarts.init(document.getElementById("quarter"))
            var colorList = [];
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b} : {c}",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: this.xQuarter,
                textStyle: {
                    fontSize: 14,
                },
                },
                yAxis: {
                    axisLine: {
                    show: false
                    },
                    interval: 1,
                    axisTick: {
                    show: false
                    },
                    axisLabel: {
                    fontSize: 14,
                    color: '#999'
                    }
                },
                dataZoom: [
                    {
                    type: 'inside'
                    }
                ],
                series: [
                    {
                    type: 'bar',
                    showBackground: true,
                    barWidth: 20,
                    itemStyle: {
                    color: (params) => {
                        console.log("111",params);
                        console.log("222",this.faultyCountList);
                        debugger
                    // if(params.dataIndex == this.selectedDataIndex) {
                    if(this.faultyCountList.includes(params.name)) {
                        colorList[params.dataIndex] = 'red'
                    } else {
                        colorList[params.dataIndex] = 'blue'

                    }
                    return colorList[params.dataIndex]
                    }
                        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        // { offset: 0, color: '#83bff6' },
                        // { offset: 0.5, color: '#188df0' },
                        // { offset: 1, color: '#188df0' }
                        // ])
                    },
                    data: this.yQuarter
                    }
                ]
                };
        myChart.setOption(option);
            // echarts自适应
            window.addEventListener("resize", () => {
            myChart.resize();
            });
        },
    },
    created() {
        this.selectFaultyCount();
        this.selectAllFaulty();
    },
    mounted() {
        
    },

}
</script>

<style>
li:hover{
    color: red;
}
</style>