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
        :style="style_timeline"
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
        :style="style_stacked"
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
      // 飞机改型时间
      plane_remodel_time: [],

      //改型时间线图样式
      style_timeline: "cursor: pointer; width: 100%; height: 300px",
      //对比堆叠图样式
      style_stacked: "cursor: pointer; width: 100%; height: 300px",

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

    //获取数据 渲染 改型时间线折线图
    getData2() {
      listDataAll().then((response) => {
        // console.log(response)
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
            if (this.yData_timeline[k] === response[i].planeType) {
              markY = -1
              break
            }
          }
          if (markY === 0) {
            this.yData_timeline.push(response[i].planeType)
          }
        }
        this.xData_timeline.sort()
        this.yData_timeline.sort()

        // console.log(this.totalDataList2)
        // console.log("xData_timeline:" + this.xData_timeline)
        // console.log("yData_timeline:" + this.yData_timeline)
        this.dealRes2()
        this.init_Chart_remodel_timeline()
      })
    },
    dealRes2() {
      for (var i = 0; i < this.yData_timeline.length; i++) {
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
        for (var y = 0; y < this.xData_timeline.length; y++) {
          this.se_timeline[i].data.push(this.yData_timeline[i])
        }
        for (var y = 0; y < this.totalDataList2.length; y++) {
          if (this.totalDataList2[y].planeType === this.yData_timeline[i]) {
            var mkp = {
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
      remodel_timeline_chart.resize() //自适应大小
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
        for (let i = 0; i < response.rows.length; i++) {
          let markY = 0
          this.totalDataList1.push(response.rows[i])

          for (let j = 0; j < this.yData_stacked.length; j++) {
            if (this.yData_stacked[j] === response.rows[i].planeType) {
              markY = -1
              break
            }
          }
          if (markY === 0) {
            this.yData_stacked.push(response.rows[i].planeType)
          }
        }
        //console.log(this.totalDataList1)
        this.yData_stacked.sort()
        //console.log("yData_stacked:" + this.yData_stacked)
        this.dealRes1()
        this.init_Chart_compared_stacked()
      })
    },
    dealRes1() {
      console.log("totalDataList1:", this.totalDataList1)
      //console.log("totalDataList2:", this.totalDataList2)
      // console.log("se_timeline:", this.se_timeline)

      // 飞机改型时间表 plane_remodel_time[]
      for (var k = 0; k < this.totalDataList2.length; k++) {
        var flag = 0
        for (var l = 0; l < this.plane_remodel_time.length; l++) {
          if (
            this.totalDataList2[k].planeType ===
            this.plane_remodel_time[l].planeType
          ) {
            flag = 1
            this.plane_remodel_time[l].remodelDate.push(
              this.dateFormat(this.totalDataList2[k].remodelDate)
            )
          }
        }
        if (flag === 0) {
          this.plane_remodel_time.push({
            planeType: this.totalDataList2[k].planeType,
            remodelDate: [this.dateFormat(this.totalDataList2[k].remodelDate)],
          })
        }
      }
      //插入时间间隔最大的飞机类型的数量
      var max = 0
      for (var l = 0; l < this.plane_remodel_time.length; l++) {
        this.plane_remodel_time[l].remodelDate.sort()
        if (this.plane_remodel_time[l].remodelDate.length > max) {
          max = this.plane_remodel_time[l].remodelDate.length
        }
      }
      console.log("plane_remodel_time:", this.plane_remodel_time)
      console.log("max:", max)

      for (var x = 0; x <= max; x++) {
        let se = {
          name: "第" + x + "次改型",
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
        for (var i = 0; i < this.plane_remodel_time.length; i++) {
          se.data.push(0)
        }
        if (x === 0) se.name = "未改型"
        this.se_stacked.push(se)
      }

      console.log("se_stacked", this.se_stacked)

      let aaa = []
      aaa = JSON.parse(JSON.stringify(this.se_stacked))
      //循环所有质量问题表
      for (var j = 0; j < this.totalDataList1.length; j++) {
        //循环飞机改型时间表
        for (var y = 0; y < this.plane_remodel_time.length; y++) {
          //找到对应机型
          if (
            this.plane_remodel_time[y].planeType ===
            this.totalDataList1[j].planeType
          ) {
            var key = -1
            //循环对应机型的改型时间数组
            for (
              var z = 0;
              z < this.plane_remodel_time[y].remodelDate.length;
              z++
            ) {
              //找到对应的时间间隔 (比他稍大一个)
              if (
                this.dateFormat(this.totalDataList1[j].devHappenTime) <
                this.plane_remodel_time[y].remodelDate[z]
              ) {
                key = z
                break
              }
            }
            if (key === -1) {
              key = this.plane_remodel_time[y].remodelDate.length
            }
            aaa[key].data[y]++
          }
        }
      }
      console.log(aaa)
      for (var q = 0; q < aaa.length; q++) {
        for (var p = 0; p < aaa[q].data.length; p++) {
          if (aaa[q].data[p] === 0) aaa[q].data[p] = ""
        }
      }
      this.se_stacked = aaa
    },
    //初始化 对比堆叠图
    init_Chart_compared_stacked() {
      let compared_stacked_chart = echarts.init(
        document.getElementById("compared_stacked")
      )
      compared_stacked_chart.resize() //自适应大小
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
