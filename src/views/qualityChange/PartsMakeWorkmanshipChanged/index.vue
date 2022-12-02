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
      装备生产工艺变更情况
      </p>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
        <div
            id="timeLine"
            style="width: 100%; height: 300px;"
          ></div>
          <div
            id="shengchanbanzu"
            style="width: 100%; height: 400px;"
          ></div>
          
          
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {
    selectByFaultModelMake,selectQualityByMakeWorkmanship,selectProductByMakeWorkmanship
} from "@/api/system/dev"
export default {
    data () {
        return {
            // 班组名称列表
            makeWorkmanshipList:[],
            // 时间线列表
            allList:[],
            // 质量总数
            qualityList:[],
            // 生产总数
            productList:[],
            xList:[],
            yGrade:[],
            yList:[],
            seriesData:[],
            // 时间线显示列表
            timeData:[],
        }
    },
    methods: {
        // // 高发故障模式的生产工艺
        // selectByFaultModelMake(){
        //     selectByFaultModelMake(this.queryParams).then(response => {
        //         this.makeWorkmanshipList = response;
        //         this.getChart();
        // });
        // },
        // 质量问题总数
        selectQualityByMakeWorkmanship(){
            selectQualityByMakeWorkmanship(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                    this.makeWorkmanshipList.push(response[i].quarter);
                    this.qualityList.push(response[i].sum);
                }
                this.getChart();
        });
        },
        // 产品总数
        selectProductByMakeWorkmanship(){
            selectProductByMakeWorkmanship(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                    this.productList.push(response[i].sum);
                }
                this.getChart();
        });
        },
                // 对比堆叠图
                getChart(){
            var myChart = echarts.init(document.getElementById("shengchanbanzu"))
            var option = {
                // title: {
                //     text: '故障件涉及生产班组对比堆叠图'
                // },
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
                    data: this.makeWorkmanshipList
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
                    data: this.productList
                    },
                    {
                    name: '质量问题总数',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.qualityList
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
        // this.selectByFaultModelMake();
        this.selectQualityByMakeWorkmanship();
        this.selectProductByMakeWorkmanship();
    },
}
</script>

<style>

</style>