<template>
  <div>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <p>故障件人员变更情况</p>
      <div id="main" style="width: 100%; height: 400px"></div>
      <div id="timeLine" style="width: 100%; height: 600px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {Countqua} from "@/api/system/9"
export default {
  name: "peopleChange",
  data() {
    return {
      yList:[],
      parts:[],
      qua:[],

    }
  },
  mounted() {
    this.getdata()
  },
  methods :{
    getdata(){
      Countqua().then((response) => {
        for(let i=0;i<response.length;i++){
          this.yList.push(response[i].person);
          this.parts.push(response[i].product);
          this.qua.push(response[i].quality);
        }
        this.initChart()
      })
    },
    initChart() {
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.setOption());
      console.log(this.setOption());
    },
    setOption(){
     let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: this.yList//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            name: '产品数量',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.qua//[320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '质量问题数',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.parts//[120, 132, 101, 134, 90, 230, 210]
          },

        ]
      };
     return option;
    }
  }
}
</script>

<style scoped>

</style>
