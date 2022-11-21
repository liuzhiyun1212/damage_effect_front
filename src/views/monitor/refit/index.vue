<!-- 装备改型情况-->
<template>
  <div>
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
          改型时间线
        </p>
      </div>
      <div
        id="remodel_timeline"
        style="cursor: pointer; width: 100%; height: 300px"
      ></div>

      <!-- 对比堆叠图 -->
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
          对比堆叠图
        </p>
      </div>
      <div
        id="compared_stacked"
        style="cursor: pointer; width: 100%; height: 300px"
      ></div>
    </el-card>
  </div>
</template>

<script>
import { listDataAll } from "@/api/system/data"
import { listAllDev } from "@/api/system/dev"
import * as echarts from "echarts"

export default {
  name: "Data",
  data() {
    return {
      // 所有数据表1
      totalDataList1: [],
      // 所有数据表2
      totalDataList2: [],
      // 表1数据整理
      DataList1: [],
      // 飞机改型时间
      plane_remodel_time: [],

      // 改型时间线折线图 x轴时间数据
      xData_timeline: [],
      // 改型时间线折线图 y轴机型数据
      yData_timeline: [],
      // 改型时间线折线图 数据
      se_timeline: [],

      // 对比堆叠图 y轴机型数据
      yData_stacked: [],
      // 对比堆叠图 数据
      se_stacked: [],
    }
  },

  mounted() {
    //改型时间线折线图
    this.getData2()
    //对比堆叠图
    this.getData1()
  },

  methods: {
    //日期格式化 年.月
    dateFormat(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      return `${y}.${m}`
    },
    // 高度适应 改型时间线
    getHeight_timeline() {
      var id__timeline = document.getElementById("remodel_timeline")
      var height__timeline = this.yData_timeline.length * 100
      //d.setAttribute(height,height+"px");
      id__timeline.style.cssText = "height:" + height__timeline + "px"
    },
    // 高度适应 对比堆叠图
    getHeight_stacked() {
      var id__stacked = document.getElementById("compared_stacked")
      var height__stacked = this.yData_stacked.length * 100
      //d.setAttribute(height,height+"px");
      id__stacked.style.cssText = "height:" + height__stacked + "px"
    },

    //获取数据 渲染 改型时间线折线图
    getData2() {
      listDataAll().then((response) => {
        //console.log("data2", response)
        for (let i = 0; i < response.length; i++) {
          let markX = 0
          let markY = 0
          this.totalDataList2.push(response[i])
          for (let j = 0; j < this.xData_timeline.length; j++) {
            if (
              this.xData_timeline[j] ===
              this.dateFormat(response[i].remodelDate)
            ) {
              markX = -1
              break
            }
          }
          if (markX === 0) {
            this.xData_timeline.push(this.dateFormat(response[i].remodelDate))
          }

          for (let k = 0; k < this.yData_timeline.length; k++) {
            if (this.yData_timeline[k] === response[i].modelSeries) {
              markY = -1
              break
            }
          }
          if (markY === 0) {
            this.yData_timeline.push(response[i].modelSeries)
          }
        }
        this.xData_timeline.sort()
        this.yData_timeline.sort()

        // console.log(this.totalDataList2)
        // console.log("xData_timeline:" + this.xData_timeline)
        // console.log("yData_timeline:" + this.yData_timeline)
        this.dealRes2()
        this.getHeight_timeline()
        this.init_Chart_remodel_timeline()

        //console.log("totalDataList2", this.totalDataList2)
        // 飞机改型时间表 plane_remodel_time[]
        for (let k = 0; k < this.totalDataList2.length; k++) {
          let flag = 0
          for (let l = 0; l < this.plane_remodel_time.length; l++) {
            if (
              this.totalDataList2[k].modelSeries ===
              this.plane_remodel_time[l].modelSeries
            ) {
              flag = 1
              this.plane_remodel_time[l].remodel.push({
                planeType: this.totalDataList2[k].planeType,
                date: this.dateFormat(this.totalDataList2[k].remodelDate),
                is: 0,
              })
            }
          }
          if (flag === 0) {
            this.plane_remodel_time.push({
              modelSeries: this.totalDataList2[k].modelSeries,
              remodel: [
                {
                  planeType: this.totalDataList2[k].planeType,
                  date: this.dateFormat(this.totalDataList2[k].remodelDate),
                  is: 0,
                },
              ],
            })
          }
        }
        var compare1 = function (obj1, obj2) {
          var val1 = obj1.modelSeries
          var val2 = obj2.modelSeries
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
        this.plane_remodel_time.sort(compare1)
        var compare2 = function (obj1, obj2) {
          var val1 = obj1.date
          var val2 = obj2.date
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
        for (let i = 0; i < this.plane_remodel_time.length; i++) {
          this.plane_remodel_time[i].remodel.sort(compare2)
        }

        //console.log("plane_remodel_time", this.plane_remodel_time)
      })
    },
    dealRes2() {
      for (let i = 0; i < this.yData_timeline.length; i++) {
        this.se_timeline.push({
          name: this.yData_timeline[i],
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [],
          },
        })
        for (let y = 0; y < this.xData_timeline.length; y++) {
          this.se_timeline[i].data.push(this.yData_timeline[i])
        }
        for (let y = 0; y < this.totalDataList2.length; y++) {
          if (this.totalDataList2[y].modelSeries === this.yData_timeline[i]) {
            let mkp = {
              name: this.yData_timeline[i],
              coord: [
                this.dateFormat(this.totalDataList2[y].remodelDate),
                this.yData_timeline[i],
              ],
              label: {
                show: true,
              },
            }
            this.se_timeline[i].markPoint.data.push(mkp)
          }
        }
      }
    },
    //初始化 改型时间线折线图
    init_Chart_remodel_timeline() {
      let remodel_timeline_chart = echarts.init(
        document.getElementById("remodel_timeline")
      )
      // echarts自适应
      window.addEventListener("resize", () => {
        remodel_timeline_chart.resize()
      })
      remodel_timeline_chart.setOption(this.set_Option_remodel_timeline())
      //console.log(this.se_timeline)
    },
    // 初始化 改型时间线折线图
    set_Option_remodel_timeline() {
      // 改型时间线折线图
      let option = {
        // tooltip: {
        //   show: true,
        //   trigger: "axis",
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData_timeline,
          axisLabel: { interval: 0, rotate: 50 },
        },
        yAxis: {
          type: "category",
          data: this.yData_timeline,
        },
        series: this.se_timeline,
      }
      return option
    },

    //获取数据渲染 对比堆叠图
    getData1() {
      listAllDev().then((response) => {
        //console.log("data1", response.rows)
        for (let i = 0; i < response.rows.length; i++) {
          let markY = 0

          let pr = {
            planeType: "",
            modelSeries: "",
            devHappenTime: "",
          }
          pr.planeType = response.rows[i].planeType
          pr.devHappenTime = this.dateFormat(response.rows[i].devHappenTime)
          for (let j = 0; j < this.plane_remodel_time.length; j++) {
            if (
              this.plane_remodel_time[j].modelSeries ===
              response.rows[i].planeType.substring(
                0,
                this.plane_remodel_time[j].modelSeries.length
              )
            ) {
              pr.modelSeries = this.plane_remodel_time[j].modelSeries
            }
          }
          this.DataList1.push(pr)

          for (let k = 0; k < this.yData_stacked.length; k++) {
            if (this.yData_stacked[k] === pr.modelSeries) {
              markY = 1
              break
            }
          }
          if (markY === 0) {
            //console.log(pr.modelSeries)
            this.yData_stacked.push(pr.modelSeries)
          }
        }
        this.yData_stacked.sort()

        //console.log("DataList1", this.DataList1)
        //console.log("yData_stacked:" + this.yData_stacked)

        this.getHeight_stacked()
        this.dealRes1()
        this.init_Chart_compared_stacked()
      })
    },
    dealRes1() {
      //插入时间间隔最大的飞机类型的数量
      var max = 0
      for (let l = 0; l < this.plane_remodel_time.length; l++) {
        if (this.plane_remodel_time[l].remodel.length > max) {
          max = this.plane_remodel_time[l].remodel.length
        }
      }
      //console.log("plane_remodel_time:", this.plane_remodel_time)
      //console.log("max:", max)

      //插入se_stacked数据
      for (let l = 0; l < this.plane_remodel_time.length; l++) {
        for (let x = 0; x <= max; x++) {
          let se = {
            name: "",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          }
          for (let i = 0; i < this.plane_remodel_time.length; i++) {
            se.data.push(0)
          }
          this.se_stacked.push(se)
        }
      }
      //console.log("se_stacked", this.se_stacked)

      let plane_remodel_time1 = []
      // console.log(
      //   "JSON.parse",
      //   JSON.parse(JSON.stringify(this.plane_remodel_time))
      // )
      // plane_remodel_time1.push(
      //   JSON.parse(JSON.stringify(this.plane_remodel_time))
      // )
      plane_remodel_time1 = JSON.parse(JSON.stringify(this.plane_remodel_time))

      // console.log("plane_remodel_time1", plane_remodel_time1)

      //循环所有质量问题表
      for (let i = 0; i < this.DataList1.length; i++) {
        //循环飞机改型时间表
        for (let j = 0; j < plane_remodel_time1.length; j++) {
          //找到对应机型
          if (
            this.DataList1[i].modelSeries === plane_remodel_time1[j].modelSeries
          ) {
            let flag = 0
            for (let k = 0; k < plane_remodel_time1[j].remodel.length; k++) {
              if (
                this.DataList1[i].planeType ===
                plane_remodel_time1[j].remodel[k].planeType
              ) {
                plane_remodel_time1[j].remodel[k].is++
                flag = 1
                break
              }
            }
            if (flag === 0) {
              let plane = {
                date: "",
                is: 1,
                planeType: this.DataList1[i].planeType,
              }
              //console.log("plane", plane)
              plane_remodel_time1[j].remodel.unshift(plane)
            }
            break
          }
        }
      }

      this.plane_remodel_time = plane_remodel_time1
      //console.log("plane_remodel_time", this.plane_remodel_time)

      let ii = 0
      for (let i = 0; i < this.plane_remodel_time.length; i++) {
        for (let j = 0; j < this.plane_remodel_time[i].remodel.length; j++) {
          this.se_stacked[ii].name =
            this.plane_remodel_time[i].remodel[j].planeType
          this.se_stacked[ii].data[i] = this.plane_remodel_time[i].remodel[j].is
          ii++
        }
      }
      //console.log("se_stacked_", this.se_stacked)

      for (let q = 0; q < this.se_stacked.length; q++) {
        let jj = 0
        for (let p = 0; p < this.se_stacked[q].data.length; p++) {
          if (this.se_stacked[q].data[p] !== 0) {
            jj = 1
            break
          }
        }
        if (jj === 0) {
          this.se_stacked.splice(q, 1)
          q--
        }
      }

      for (let q = 0; q < this.se_stacked.length; q++) {
        for (let p = 0; p < this.se_stacked[q].data.length; p++) {
          if (this.se_stacked[q].data[p] === 0) {
            this.se_stacked[q].data[p] = ""
          }
        }
      }
    },
    //初始化 对比堆叠图
    init_Chart_compared_stacked() {
      let compared_stacked_chart = echarts.init(
        document.getElementById("compared_stacked")
      )
      // echarts自适应
      window.addEventListener("resize", () => {
        compared_stacked_chart.resize()
      })
      compared_stacked_chart.setOption(this.set_Option_compared_stacked(), true)
    },
    //初始化 对比堆叠图
    set_Option_compared_stacked() {
      // 对比堆叠图
      let option = {
        // tooltip: {
        //   show: true,
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow",
        //   },
        // },
        legend: {},
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: this.yData_stacked,
        },
        series: this.se_stacked,
      }
      return option
    },
  },
}
</script>
