<template>
  <div ref="mychart" id="mychart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  // data() {
  //   return {}
  // },
  // methods: {
    mounted: function () {
      let myChart = echarts.init(this.$refs.mychart)
      let xData = ['金州', '沙河口', '旅顺口', '甘井子', '西岗区', '大黑山', '黑石礁'];
      let yData = [55, 55, 55, 55, 66, 77, 55];
      let option = {
        title: {
          text: "质量问题发生地理环境"
        },
        xAxis: {
          data: xData,
          type: "category"
        },
        yAxis: {},
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '20%',
            data: yData
          }
        ]
      }
      myChart.setOption(option)
    }
  }

</script>

<style scoped>
#mychart {
  width: 100%;
  height: 250px;
  border: 1px solid green;
}
</style>
