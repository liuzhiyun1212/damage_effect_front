<!-- 4.2.2.8.故障件原材料变更情况 -->
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
      故障件原材料变更情况
    </p>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <!-- 改型时间线图 -->
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
          变更时间线
        </p>
      </div>
      <div
        id="MaterialChange_timeline"
        style="cursor: pointer; width: 100%; height: 300px"
      ></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import { listAllDev } from "@/api/system/dev"
import { listAllModifyData } from "@/api/system/modifyData.js"
export default {
  data() {
    return {
      //故障件
      parts: [],
      // 变更时间线折线图 x轴时间数据
      xData_timeline: [],
      // 变更时间线折线图 y轴原材料数据
      yData_timeline: [],
      // 变更时间线折线图 数据
      se_timeline: [],
      //表1所有数据
      data1: [],
      //表6所有数据
      data6: [],
    }
  },
  mounted() {
    //变更时间线折线图
    this.getData()
  },
  methods: {
    //日期格式化 年.月
    dateFormat(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      return `${y}.${m}`
    },
    // 高度适应 变更时间线
    getHeight_timeline() {
      var id_timeline = document.getElementById("MaterialChange_timeline")
      var height_timeline = this.yData_timeline.length * 100
      //d.setAttribute(height,height+"px");
      id_timeline.style.cssText = "height:" + height_timeline + "px"
    },
    // 获取数据 渲染
    getData() {
      listAllDev().then((response) => {
        this.data1 = response.rows
        // console.log("data1", this.data1)
        listAllModifyData().then((response) => {
          this.data6 = response.rows
          // console.log("data6", this.data6)

          this.dealY()
          this.dealX()
          this.dealSe()

          // console.log("parts", this.parts)
          // console.log("xData_timeline", this.xData_timeline)
          // console.log("yData_timeline", this.yData_timeline)
          // console.log("se_timeline", this.se_timeline)

          this.getHeight_timeline()
          this.init_Chart_MaterialChange_timeline()
        })
      })
    },

    // 处理X
    dealX() {
      for (let i = 0; i < this.data6.length; i++) {
        // 处理parts数组
        for (let j = 0; j < this.parts.length; j++) {
          if (
            this.data6[i].productName === this.parts[j].partsName &&
            this.data6[i].productModel === this.parts[j].partsModel &&
            this.data6[i].modifyType === "原材料来源变更"
          ) {
            let modifyT = {
              modifyTime: "",
              modifyMethod: "",
            }
            modifyT.modifyTime = this.dateFormat(this.data6[i].modifyTime)
            modifyT.modifyMethod = this.data6[i].modifyMethod
            this.parts[j].modify.push(modifyT)
          }
        }
        // console.log("parts", this.parts)
        // 处理X轴
        if (this.data6[i].modifyType === "原材料来源变更") {
          // 去重
          let flag = 0
          for (let k = 0; k < this.xData_timeline.length; k++) {
            if (
              this.dateFormat(this.data6[i].modifyTime) ===
              this.xData_timeline[k]
            ) {
              flag = 1
              break
            }
          }
          if (flag === 0) {
            this.xData_timeline.push(this.dateFormat(this.data6[i].modifyTime))
          }
        }
      }
      this.xData_timeline.sort()
      // console.log("xData_timeline", this.xData_timeline)
      //处理Y轴 删除空白节点
      for (let p = 0; p < this.parts.length; p++) {
        if (this.parts[p].modify.length === 0) {
          for (let q = 0; q < this.yData_timeline.length; q++) {
            if (
              this.parts[p].partsName + this.parts[p].partsModel ===
              this.yData_timeline[q]
            ) {
              this.yData_timeline.splice(q, 1)
            }
          }
        }
      }
      // console.log("yData_timeline", this.yData_timeline)
    },
    // 处理Y
    dealY() {
      for (let i = 0; i < this.data1.length; i++) {
        let flag = 0
        // 去重
        for (let j = 0; j < this.parts.length; j++) {
          if (
            this.data1[i].partsName === this.parts[j].partsName &&
            this.data1[i].partsModel === this.parts[j].partsModel
          ) {
            flag = 1
            break
          }
        }
        if (flag === 1) continue
        let part = {
          partsName: "",
          partsModel: "",
          modify: [],
        }
        part.partsName = this.data1[i].partsName
        part.partsModel = this.data1[i].partsModel
        this.parts.push(part)
      }
      // 排序
      var compare = function (obj1, obj2) {
        var pn1 = obj1.partsName
        var pm1 = obj1.partsModel
        var pn2 = obj2.partsName
        var pm2 = obj2.partsModel
        if (pn1 < pn2) {
          return -1
        } else if (pn1 > pn2) {
          return 1
        } else {
          if (pm1 < pm2) {
            return -1
          } else if (pm1 > pm2) {
            return 1
          } else {
            return 0
          }
        }
      }
      this.parts.sort(compare)
      // console.log("parts", this.parts)
      for (let k = 0; k < this.parts.length; k++) {
        this.yData_timeline.push(
          this.parts[k].partsName + this.parts[k].partsModel
        )
      }
      // console.log("yData_timeline", this.yData_timeline)
    },
    // 处理Se
    dealSe() {
      // console.log("parts", this.parts)
      // 处理se显示横线
      for (let i = 0; i < this.yData_timeline.length; i++) {
        let se = {
          name: this.yData_timeline[i],
          type: "line",
          data: [],
          markPoint: {
            symbol: "triangle",
            symbolSize: 20,
            data: [],
          },
        }
        for (let j = 0; j < this.xData_timeline.length; j++) {
          se.data.push(this.yData_timeline[i])
        }
        this.se_timeline.push(se)
      }
      // 处理markPoint
      for (let l = 0; l < this.se_timeline.length; l++) {
        for (let k = 0; k < this.parts.length; k++) {
          if (
            this.se_timeline[l].name ===
            this.parts[k].partsName + this.parts[k].partsModel
          ) {
            for (let m = 0; m < this.parts[k].modify.length; m++) {
              // 若出现相同时间多个原材料更换
              // if()
              {
                let mkp = {
                  name: "",
                  coord: [],
                  label: {
                    show: true,
                  },
                }
                mkp.name =
                  this.parts[k].modify[m].modifyTime +
                  " " +
                  this.parts[k].modify[m].modifyMethod

                mkp.coord = [
                  this.parts[k].modify[m].modifyTime,
                  this.se_timeline[l].name,
                ]
                this.se_timeline[l].markPoint.data.push(mkp)
              }
            }
          }
        }
      }

      // console.log("se_timeline", this.se_timeline)
    },

    //初始化 变更时间线折线图
    init_Chart_MaterialChange_timeline() {
      let MaterialChange_timeline_chart = echarts.init(
        document.getElementById("MaterialChange_timeline")
      )
      // echarts自适应
      window.addEventListener("resize", () => {
        MaterialChange_timeline_chart.resize()
      })
      MaterialChange_timeline_chart.setOption(
        this.set_Option_MaterialChange_timeline()
      )
    },
    // 初始化 变更时间线折线图
    set_Option_MaterialChange_timeline() {
      // 变更时间线折线图
      let option = {
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          // axisTick: { inside: true },
          type: "category",
          boundaryGap: false,
          data: this.xData_timeline,
          axisLabel: {
            // show: false,
            interval: 0,
            rotate: 50,
          },
        },
        yAxis: {
          type: "category",
          data: this.yData_timeline,
        },
        series: this.se_timeline,
      }
      return option
    },
  },
}
</script>

<style></style>
