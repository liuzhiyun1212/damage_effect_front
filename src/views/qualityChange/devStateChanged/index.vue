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
        装备状态变更情况
      </p>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <div
            id="duibi"
            style="width: 100%; height: 400px;"
          ></div>
    </el-card> 
  </div>
</template>

<script>
 import * as echarts from 'echarts';
import {selectState1,selectQualityByState1,selectTroubleByState1} from '@/api/system/dev';
export default {
  data () {
    return {
      allList:[],
      // 装备状态列表
      stateList:[],
      // 故障件数量
      troubleList:[],
      // 质量问题总数
      qualityList:[],
    }
  },
  methods: {

    // selectState1(){
    //   selectState1(this.queryParams).then(response => {
                
    //         });
    //     },
    // selectQualityByState2(){
    //   selectQualityByState2(this.queryParams).then(response => {
                
    //         });
    //     },
    selectQualityByState1(){
      selectQualityByState1(this.queryParams).then(response => {
        for(let i=0;i<response.length;i++){
          this.stateList.push(response[i].quarter);
          this.qualityList.push(response[i].sum);
        }
        //hhhhhhhhhh高度适应
        var d =  document.getElementById("timeLine");
                var height=this.stateList.length*100;
                //  d.setAttribute(height,height+"px");
                d.style.cssText="height:"+height+"px";
        // console.log(this.stateList);
        // console.log(this.qualityList);
        this.getChart()
        });
    },
    
    selectTroubleByState1(){
      selectTroubleByState1(this.queryParams).then(response => {
        for(let i=0;i<response.length;i++){
          this.troubleList.push(response[i].sum);
        }
        this.getChart();
        // console.log(this.troubleList);
        });
    },
    // 对比堆叠图
    // 对比堆叠图
    getChart(){
            var myChart = echarts.init(document.getElementById("duibi"))
            var option = {
                title: {
                    text: '装备状态变更对比堆叠图'
                },
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
                    data: this.stateList,
                },
                series: [
                    {
                    name: '故障件数量',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.troubleList
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
    // this.selectState1();
    // this.selectQualityByState2();
    this.selectQualityByState1();
    this.selectTroubleByState1();
  },

}
</script>

<style>

</style>