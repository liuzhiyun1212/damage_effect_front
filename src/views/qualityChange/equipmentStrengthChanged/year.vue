<!-- 年度 -->
<template>
  <div>
    <!-- 折线图 -->
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
        装备强度使用变更折线图
      </p>
      <el-tooltip placement="top">
        <div slot="content">质量问题涉及装备使用强度的年度变更情况</div>
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
    <div
      id="yearLine"
      style="cursor: pointer; width: 100%; height: 300px"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import { listAllDev } from "@/api/system/dev"
import { list12All } from "@/api/system/12.js"

export default {
  name: "",

  data() {
    return {
      // 表1所有数据
      data1: [],
      // 表12所有数据
      data12: [],
      // 装备使用强度
      equipment: [],
      // {
      //   planeType: "机型1A",
      //   strength: [
      //     {
      //       year: 2020,
      //       flightHours: 333,
      //     },
      //     {
      //       year: 2022,
      //       flightHours: 444,
      //     },
      //   ],
      // },
      // 强度变更折线图 x轴时间数据
      xData: [],
      // 强度变更折线图 数据
      se: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据 渲染
    getData() {
      listAllDev().then((response) => {
        this.data1 = response.rows
        // console.log("data1", this.data1)
        list12All().then((response) => {
          this.data12 = response.rows
          // console.log("data12", this.data12)

          this.dealData()
          this.dealX()
          this.dealSe()

          // console.log("equipment", this.equipment)
          // console.log("xData", this.xData)
          // console.log("se", this.se)

          this.init_Chart_yearLine()
        })
      })
    },

    //处理数据 得到equipment数组
    dealData() {
      // 机型去重
      for (let i = 0; i < this.data1.length; i++) {
        let flag = 0
        for (let j = 0; j < this.equipment.length; j++) {
          if (this.data1[i].planeType === this.equipment[j].planeType) {
            flag = 1
            break
          }
        }
        if (flag === 0) {
          let equipmentT = {
            planeType: "",
            strength: [],
          }
          equipmentT.planeType = this.data1[i].planeType
          this.equipment.push(equipmentT)
        }
      }
      //加入年 飞行时间
      for (let k = 0; k < this.data12.length; k++) {
        for (let l = 0; l < this.equipment.length; l++) {
          if (this.data12[k].planeType === this.equipment[l].planeType) {
            let flag = 0
            let year = this.data12[k].date.slice(0, 4)
            let flightHours = this.data12[k].flightHours
            for (let o = 0; o < this.equipment[l].strength.length; o++) {
              if (year === this.equipment[l].strength[o].year) {
                flag = 1
                this.equipment[l].strength[o].flightHours += flightHours
                break
              }
            }
            if (flag === 0) {
              let strengthT = {
                year: "",
                flightHours: "",
              }
              strengthT.year = year
              strengthT.flightHours = flightHours
              this.equipment[l].strength.push(strengthT)
            }
          }
        }
      }
      // 平均飞行时间
      for (let x = 0; x < this.equipment.length; x++) {
        for (let y = 0; y < this.equipment[x].strength.length; y++) {
          this.equipment[x].strength[y].flightHours /= 12
        }
      }
      // 去空
      for (let p = 0; p < this.equipment.length; p++) {
        if (this.equipment[p].strength.length === 0) {
          this.equipment.splice(p, 1)
        }
      }

      // 排序
      var compare1 = function (obj1, obj2) {
        var pt1 = obj1.planeType
        var pt2 = obj2.planeType
        if (pt1 < pt2) {
          return -1
        } else if (pt1 > pt2) {
          return 1
        } else {
          return 0
        }
      }
      this.equipment.sort(compare1)

      var compare2 = function (obj1, obj2) {
        var y1 = obj1.year
        var y2 = obj2.year

        if (y1 < y2) {
          return -1
        } else if (y1 > y2) {
          return 1
        } else {
          return 0
        }
      }
      for (let q = 0; q < this.equipment.length; q++) {
        this.equipment[q].strength.sort(compare2)
      }

      console.log("equipment", this.equipment)
    },

    // 处理X轴
    dealX() {
      for (let i = 0; i < this.equipment.length; i++) {
        for (let j = 0; j < this.equipment[i].strength.length; j++) {
          let flag = 0
          let t = this.equipment[i].strength[j].year + "年"
          for (let k = 0; k < this.xData.length; k++) {
            if (t === this.xData[k]) {
              flag = 1
              break
            }
          }
          if (flag === 0) {
            this.xData.push(t)
          }
        }
      }
      this.xData.sort()
      // console.log("xData", this.xData)
    },
    // 处理Se
    dealSe() {
      for (let i = 0; i < this.equipment.length; i++) {
        let seT = {
          name: "",
          data: [],
          type: "line",
        }
        seT.name = this.equipment[i].planeType
        for (let k = 0; k < this.xData.length; k++) {
          let flag = 0
          for (let j = 0; j < this.equipment[i].strength.length; j++) {
            let t = this.equipment[i].strength[j].year + "年"
            if (t === this.xData[k]) {
              flag = 1
              seT.data.push(this.equipment[i].strength[j].flightHours)
            }
          }
          if (flag === 0) {
            seT.data.push(0)
          }
        }
        this.se.push(seT)
      }
      // console.log("se", this.se)
    },

    //初始化 强度变更折线图
    init_Chart_yearLine() {
      let yearLine_chart = echarts.init(document.getElementById("yearLine"))
      // echarts自适应
      window.addEventListener("resize", () => {
        yearLine_chart.resize()
      })
      yearLine_chart.setOption(this.set_Option_yearLine())
    },
    // 初始化 强度变更折线图
    set_Option_yearLine() {
      // 变更时间线折线图
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        xAxis: {
          // axisTick: { inside: true },
          type: "category",
          boundaryGap: false,
          data: this.xData,
          // axisLabel: {
          //   // show: false,
          //   interval: 0,
          //   rotate: 50,
          // },
        },
        yAxis: {
          type: "value",
        },
        series: this.se,
      }
      return option
    },
  },
}
</script>

<style></style>
