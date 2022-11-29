<template>
  <div>
    <div id="parts_name_time_quarter" style="width: 100%; height: 200px"></div>
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
        季度故障件名称发生统计
      </p>
      <el-button
        type="primary"
        icon="el-icon-s-home"
        @click="allInfo"
        style="margin-left: 20px"
        >全部信息</el-button
      >
      <el-tooltip placement="top">
        <div slot="content">
          1.较上一季度增加或减少50%以上2.连续两个季度增加或减少20%以上3.连续三个季度呈单调变化趋势
        </div>
        <i
          class="el-icon-question"
          style="
            float: right;
            margin-right: 20px;
            margin-top: 8px;
            font-size: 40px;
          "
        ></i>
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
      <el-table-column prop="sum" label="不同故障件数量" align="center">
      </el-table-column>
      <el-table-column prop="condition" label="满足条件" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as echarts from "echarts"
import { qualityHappenSum, oneQuality } from "@/api/system/dev"
import {
  nameAndModelByQuarter,
  nameAndModelByQuarterSum,
} from "@/api/system/dev"
export default {
  data() {
    return {
      // 季度筛选大列表
      allQualityList: [],
      // 故障件名称总数
      qualityHappenList: [],
      // 表格判断条件list
      selectList: [],
      // 季度柱状图
      xQuarter: [],
      seQuarter: [],
      xLength: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        troubleName: null,
        troubleIntroduction: null,
      },
    }
  },
  methods: {
    // 柱状图的实现
    qualityHappenSum() {
      nameAndModelByQuarterSum(this.queryParams).then((response) => {
        // console.log("nameAndModelByQuarter", response)
        this.qualityHappenList = response
        // this.selectList = this.qualityHappenList;
        for (let i = 0; i < this.qualityHappenList.length; i++) {
          this.xQuarter.push(
            this.qualityHappenList[i].quarter +
              ":" +
              this.qualityHappenList[i].condition
          )
          this.seQuarter.push(this.qualityHappenList[i].sum)
        }
        this.xLength = this.qualityHappenList[0].quarter.length
        // console.log("xQuarter", this.xQuarter)
        // console.log("seQuarter", this.seQuarter)
        // console.log("xLength", this.xLength)
        this.getQuality()
      })
    },
    // 季度筛选
    oneQuality() {
      nameAndModelByQuarter(this.queryParams).then((response) => {
        // console.log("nameAndModelByQuarter", response)
        this.allQualityList = response
        this.selectList = response
      })
    },
    // 表格条件筛选
    selectInfo(n) {
      this.selectList = []
      for (let j = 0; j < 3; j++) {
        if (n === j.toString()) {
          for (let i = 0; i < this.allQualityList.length; i++) {
            if (
              this.allQualityList[i].condition.search((j + 1).toString()) !== -1
            ) {
              this.selectList.push(this.allQualityList[i])
            }
          }
        }
      }
    },
    // 显示所有表数据
    allInfo() {
      this.oneQuality()
    },
    // 初始化图参数
    getQuality() {
      var myChart = echarts.init(document.getElementById("parts_name_time_quarter"))
      var option = {
        tooltip: {
          trigger: "axis",
          formatter: (param) => {
            // console.log(param);
            if (param[0].axisValueLabel.slice(this.xLength + 1) !== "null") {
              return (
                "满足条件:" + param[0].axisValueLabel.slice(this.xLength + 1)
              )
            }
          },
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
          type: "value",
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
                //console.log(params)
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
            data: this.seQuarter,
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
    this.qualityHappenSum()
    this.oneQuality()
  },
  mounted() {},
}
</script>

<style>
li:hover {
  color: red;
}
</style>
