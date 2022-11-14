<!-- 装备改型情况-->
<template>
  <div>
    <div
      id="remodel_timeline"
      style="cursor: pointer; width: 100%; height: 300px"
    ></div>
  </div>
</template>

<script>
import {
  listDataAll,
} from "@/api/system/data"
import * as echarts from "echarts"

export default {
  name: "Data",
  data() {
    return{
      // 所有数据表
      totalDataList: [],
      // 改型时间线折线图 x轴时间数据
      xData: [],
      // 改型时间线折线图 y轴机型数据
      yData: [],
      //改型时间线折线图 数据
      se: [],
    }
  },

  mounted() {
    this.getdata()
  },
  methods: {
    dateFormat(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      return `${y}.${m}`
    },
    getdata() {
      listDataAll().then((response) => {
        let markX = 0
        let markY = 0
        for (let i = 0; i < response.length; i++) {
          markX = 0
          markY = 0
          this.totalDataList.push(response[i])
          for (let j = 0; j < this.totalDataList.length; j++) {
            if (this.xData[j] == this.dateFormat(response[i].remodelDate)) {
              markX = -1
            }
            if (this.yData[j] == response[i].planeType) {
              markY = -1
            }
          }
          if (markX === 0) {
            this.xData.push(this.dateFormat(response[i].remodelDate))
          }
          if (markY === 0) {
            this.yData.push(response[i].planeType)
          }
        }
        this.xData.sort()
        this.yData.sort()
        console.log(this.totalDataList)
        console.log("xData:" + this.xData)
        console.log("yData:" + this.yData)
        this.dealRes()
        this.init_Chart_remodel_timeline()
      })
    },
    dealRes() {
      for (var i = 0; i < this.yData.length; i++) {
        this.se.push({
          name: this.yData[i],
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [],
          },
        })
        for (var y = 0; y < this.xData.length; y++) {
          this.se[i].data.push(this.yData[i])
        }
        for (var y = 0; y < this.totalDataList.length; y++) {
          if(this.totalDataList[y].planeType === this.yData[i]){
            var mkp={
              name: this.yData[i],
              coord: [this.dateFormat(this.totalDataList[y].remodelDate), this.yData[i]],
              label: {
                show: true,
              },
            }
            this.se[i].markPoint.data.push(mkp)
          }
        }
      }
    },
    //初始化 改型时间线折线图
    init_Chart_remodel_timeline() {
      let this_ = this
      let remodel_timeline_chart = echarts.init(
        document.getElementById("remodel_timeline")
      )
      remodel_timeline_chart.resize() //自适应大小
      remodel_timeline_chart.setOption(this.set_Option_remodel_timeline())
      console.log(this.se)
    },
    // 初始化 改型时间线折线图
    set_Option_remodel_timeline() {
      // 改型时间线折线图
      let option = {
        tooltip: {
          show : true,
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
        },
        yAxis: {
          type: "category",
          data: this.yData,
        },
        series: this.se,
      }
      return option
    },
  },
}
</script>
