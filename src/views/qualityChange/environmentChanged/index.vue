<template>
  <div><div
            id="duibi"
            style="width: 100%; height: 400px;"
          ></div></div>
</template>

<script>
 import * as echarts from 'echarts';
import {selectEnvironment,selectDevByEnvironment,selectQualityByEnvironment} from '@/api/system/dev';
export default {
    data () {
        return {
            // 使用环境
            enList:[],
            // 装备总数
            devList:[],
            // 质量问题总数
            qList:[],
        }
    },
    methods: {
        // 统计高发故障模式环境装备数量
        selectDevByEnvironment(){
            selectDevByEnvironment(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                    this.enList.push(response[i].quarter);
                    this.devList.push(response[i].sum);
                }
                
                //hhhhhhhhhh高度适应
                var d =  document.getElementById("timeLine");
                var height=this.enList.length*150;
                //  d.setAttribute(height,height+"px");
                d.style.cssText="height:"+height+"px";
                //  this.timeGradeChanged();
                this.getTime();
                this.getHeight();
                this.getChart();
                
        });
        },
        // 统计高发故障模式环境质量问题数量
        selectQualityByEnvironment(){
            selectQualityByEnvironment(this.queryParams).then(response => {
                console.log("xxxxxxx",response);
                for(let i=0;i<response.length;i++){
                    this.qList.push(response[i].sum);
                }
            this.getChart();
            });
        },
        // 对比堆叠图
        getChart(){
            var myChart = echarts.init(document.getElementById("duibi"))
            var option = {
                title: {
                    text: '故障件涉及生产班组对比堆叠图'
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
                    data: this.enList
                },
                series: [
                    {
                    name: '装备数量',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.devList
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
                    data: this.qList
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
        // this.selectEnvironment();
        this.selectDevByEnvironment();
        this.selectQualityByEnvironment()
    },

}
</script>

<style>

</style>