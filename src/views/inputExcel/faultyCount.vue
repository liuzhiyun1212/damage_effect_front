<template>
  <div>
    <p
        style="
          font-family: Arial;
          font-size: 20px;
          font-weight: 600;
          display: inline-block;
          margin-left: 30px;
        "
      >
        故障件名称
      </p>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <div id="partsname"
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
        <el-tooltip placement="top">
            <!-- <div slot="content">多行信息<br/>第二行信息</div> -->
             <div slot="content">若某故障件名称质量问题发生数大于质量问题故障件名称平均发生数50%，则质量问题在该故障件名称上集中爆发。</div>
            <!-- <el-button icon="el-icon-question" circle></el-button> -->
            <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 8px; font-size: 40px;"></i>
        </el-tooltip>
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
              label="故障件发生数"
            >
            </el-table-column>
            <el-table-column
              prop="partsProportion"
              label="故障件发生数占比"
            >
            </el-table-column>
          </el-table>
        </el-card>
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
            loading: false,
            //爆发故障件名字列表
            faultyList:[],
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
                this.faultyCountList = [],
                this.faultyList = [],
                this.faultyCountList = response;
                console.log("问题爆发",this.faultyCountList);
                this.selectList = this.faultyCountList
                for(let i=0;i<this.faultyCountList.length;i++){
                    this.faultyList.push(this.faultyCountList[i].partsModelName)
                }
                console.log(this.faultyList);
                console.log("aaaaa",this.selectList.length);
                this.selectAllFaulty();
            });
        },

        selectAllFaulty(){
            selectAllFaulty().then(response => {
                this.xQuarter = [],
                this.yQuarter = [],
                this.allFaultyList = response;

                console.log("全部",this.allFaultyList);
                for(let i=0;i<this.allFaultyList.length;i++){
                    this.xQuarter.push(this.allFaultyList[i].partsModelName)
                    this.yQuarter.push(this.allFaultyList[i].partsCount)
                }
                // this.chartView(this.faultyCountList);
                this.chartView();
            });
        },
        chartView() {
            var myChart = echarts.init(document.getElementById("partsname"))
            var colorList = [];
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b} : {c}",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
              grid:{
                y:"10%"
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
                    interval: 2,
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
                            // console.log("111",params);
                            console.log("222",this.faultyList);
                            // debugger
                        // if(params.dataIndex == this.selectedDataIndex) {
                            if(this.faultyList.includes(params.name)) {

                                colorList[params.dataIndex] = 'red'
                            } else {
                                colorList[params.dataIndex] = 'blue'
                            }
                            return colorList[params.dataIndex]
                        }
                    },
                    label: {
                      show: true,     //开启显示
                      position: 'inside',    //在上方显示
                      textStyle: {        //数值样式
                        color: 'white',
                        fontSize: 14
                      }
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
        // this.selectAllFaulty();
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
