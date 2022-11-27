<template>
  <div>
    <div id="quarter" style="width: 100%; height: 200px"></div>
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
        季度质量问题发生统计
      </p>
      <el-button
        type="primary"
        icon="el-icon-s-home"
        @click="allInfo" style="margin-left: 20px;"
        >全部信息</el-button
      >
      <el-tooltip placement="top">
      <div slot="content">1.较上一季度增加或减少50%以上2.连续两个季度增加或减少20%以上3.连续三个季度呈单调变化趋势</div>
      <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 8px; font-size: 40px;"></i>
    </el-tooltip>
      
    </div>
    <el-button type="primary" @click="selectInfo('0')"
      >1.较上一季度增加或减少50%以上</el-button
    >
    <el-button type="primary" @click="selectInfo('1')"
      >2.连续两个季度增加或减少20%以上</el-button
    >
    <el-button type="primary" @click="selectInfo('2')"
      >3.连续三个季度呈单调变化趋势</el-button
    >
    <el-table
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
      }"
      :data="selectList"
      style="height: auto; margin-top: 20px; width: 99%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="quarter"
        label="季度"
        :show-overflow-tooltip="true"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="sum" label="质量问题数量" align="center">
      </el-table-column>
      <el-table-column prop="condition" label="满足条件" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {faultModelByQuarter,faultModelByQuarterSum} from '@/api/system/dev';
export default {
  data() {
    return {
      // 筛选大列表
      allQualityList: [],
      // 质量发生时间总数
      qualityHappenList: [],
      // 表格判断条件list
      selectList: [],
      // 季度柱状图
      xQuarter: [],
      xLength: null,
      yQuarter: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        troubleName: null,
        troubleIntroduction: null,
      },
      // 柱状图选中柱子
      selectedDataIndex: null,
    }
  },
  methods: {
    // 季度总数
    faultModelByQuarterSum() {
      faultModelByQuarterSum(this.queryParams).then((response) => {
        this.qualityHappenList = response
        // this.selectList = this.qualityHappenList;
        for (let i = 0; i < this.qualityHappenList.length; i++) {
          this.xQuarter.push(
            this.qualityHappenList[i].quarter +
              ":" +
              this.qualityHappenList[i].condition
          )
          this.yQuarter.push(this.qualityHappenList[i].sum)
          this.xLength = this.qualityHappenList[i].quarter.length
        }
        this.chartView()
      })
    },
    // 季度筛选
    faultModelByQuarter() {
      faultModelByQuarter(this.queryParams).then((response) => {
        this.allQualityList = response
        this.selectList = this.allQualityList
        // for(let i=0;i<this.allQualityList.length;i++){
        //     this.selectList.push(...this.allQualityList[i]);
        // }
        // console.log("aaaaaaaaaaa",this.allQualityList);
      })
    },
    // 表格条件筛选
    selectInfo(n) {
      this.selectList = []
      for (let i = 0; i < this.allQualityList.length; i++) {
        if (
          (this.allQualityList[i].condition === "1" ||
            this.allQualityList[i].condition === "1,2" ||
            this.allQualityList[i].condition === "1,2,3") &&
          n === "0"
        ) {
          this.selectList.push(this.allQualityList[i])
        } else if (
          (this.allQualityList[i].condition === "2" ||
            this.allQualityList[i].condition === "2,3" ||
            this.allQualityList[i].condition === "1,2,3") &&
          n === "1"
        ) {
          this.selectList.push(this.allQualityList[i])
        } else if (
          (this.allQualityList[i].condition === "3" ||
            this.allQualityList[i].condition === "2,3" ||
            this.allQualityList[i].condition === "1,2,3") &&
          n === "2"
        ) {
          this.selectList.push(this.allQualityList[i])
        }
      }
      // if(n==='0'){
      //     this.selectList = this.allQualityList[0];
      // }else if(n==='1'){
      //     this.selectList = this.allQualityList[1];
      // }else if(n==='2'){
      //     this.selectList = this.allQualityList[2];
      // }
    },
    allInfo() {
      this.queryParams.pageNum = 1
      this.faultModelByQuarter()
      //     qualityHappenSum(this.queryParams).then(response => {
      //     this.qualityHappenList = response;
      //     this.selectList = this.qualityHappenList;
      // });
    },
    chartView() {
      var myChart = echarts.init(document.getElementById("quarter"))
      var option = {
        /*title: {
                    text: '维保计划按种类统计',
                },*/
        tooltip: {
          trigger: "axis",
          formatter: (param) => {
            if (param[0].axisValueLabel.slice(this.xLength + 1) !== "null") {
              return (
                "满足条件:" + param[0].axisValueLabel.slice(this.xLength + 1)
              )
            }
          },
          // trigger: 'axis',
          // formatter: "{b} : {c}",
          // axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          // }
        },
        xAxis: {
          type: "category",
          data: this.xQuarter,
          textStyle: {
            fontSize: 14,
          },
          axisLabel: {
            rotate: 30, //文字旋转
            formatter: (params) => {
              return params.slice(0, this.xLength)
            },
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          interval: 1,
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 14,
            color: "#999",
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            barWidth: 20,
            itemStyle: {
              color: (params) => {
                console.log(params)
                if (params.name.slice(this.xLength + 1) !== "null") {
                  return "red"
                }
                return "blue"
              },
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              // { offset: 0, color: '#83bff6' },
              // { offset: 0.5, color: '#188df0' },
              // { offset: 1, color: '#188df0' }
              // ])
            },
            data: this.yQuarter,
          },
        ],
      }
      myChart.setOption(option)
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    },
  },
  created() {
    this.faultModelByQuarterSum();
    this.faultModelByQuarter();
  },
  mounted() {},
}
</script>

<style>
li:hover {
  color: red;
}
</style>
