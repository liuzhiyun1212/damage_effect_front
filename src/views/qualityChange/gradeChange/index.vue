<template>
  <div>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
        <div
            id="duibi"
            style="width: 100%; height: 200px;"
          ></div>
          <div
            id="timeLine"
            style="width: 100%; height: 200px;"
          ></div>
          
    </el-card>
  </div>
</template>

<script>
 import * as echarts from 'echarts';
import {selectByGradeFaultModel,qualitySumByGrade,productSumByGrade,selectByGradeChanged,timeGradeChanged} from '@/api/system/dev';
export default {
    data() {
        return {
            // 班组名称列表
            gradelList:[],
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
            // yList2:[],
        }
    },
    methods: {
        // 故障件生产班组变更情况
        selectByGradeFaultModel(){
            selectByGradeFaultModel(this.queryParams).then(response => {
                this.gradeList = response;
                this.getChart();
        });
        },
        // 生产班组统计质量问题总数
        qualitySumByGrade(){
            qualitySumByGrade(this.queryParams).then(response => {
                this.qualityList = response;
                this.getChart();
                // console.log("2222",this.qualityList);
        });
        },
        // 生产班组统计产品总数
        productSumByGrade(){
            productSumByGrade(this.queryParams).then(response => {
                this.productList = response;
                this.getChart();
        });
        },
        dealRes(data) {
            var l1=[];
      for (var i = 0; i < data.length; i++) {
        this.seriesData.push({
          name: data[i].name,
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: 'triangle',
            data: [
              {
                name:'故障类型：'+data[i].name,
                coord: [data[i].list,data[i].name],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              },
            ],
          },
        });
        
      }

      for(let i=0;i<this.allList.length;i++){
            for(let j=0;j<this.seriesData.length;j++){
                if(this.allList[i].name===this.seriesData[j].name){
                    for(let k=0;k<this.allList[i].list.length;k++){
                        this.seriesData[j].markPoint.data.push(
                            {
                               // name:'故障类型：'+data[i].name,
                                coord: [this.allList[i].list[k],j],
                                label: {
                                show: true,
                                /*formatter: function (item) {
                                    return "预测故障发生";
                                },*/
                                },
                            }
                        );
                    }
                }
            }
      }

      for(let j=0;j<this.seriesData.length;j++){
        for(let i=0;i<this.xList.length;i++)
    
          this.seriesData[j].data.push(j);
      }
       console.log(this.seriesData);
    },
        // 时间线统计列表
        timeGradeChanged(){
            timeGradeChanged(this.queryParams).then(response => {
                this.allList=response;
                this.selectByGradeChanged();
                this.dealRes(this.allList);
                this.getTime();
                console.log("1111111",this.allList);
        });
        },
        // 故障件生产班组变更
        selectByGradeChanged(){
            selectByGradeChanged(this.queryParams).then(response => {
                let arr=[];
                let time1=[];
                for(let i=0;i<response.length;i++){
                    arr.push(response[i].name);
                    time1.push(response[i].time);
                }
                this.yList = arr.filter(function(item,index){
                    return arr.indexOf(item) === index;  
                });
                this.xList = time1.filter(function(item,index){
                    return time1.indexOf(item) === index;  
                });
                // this.dealRes(this.yList.length);
                console.log("3333",this.xList);
                this.getTime();

        });
        },
        // 对比堆叠图
        getChart(){
            var myChart = echarts.init(document.getElementById("duibi"))
            var option = {
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
                    data: this.gradeList
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
        // 时间线
        getTime(){
            let dataGet = this.yList
            var myChart = echarts.init(document.getElementById("timeLine"))
            var option = {
                title: {
                    text: 'Temperature Change in the Coming Week'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {},
                toolbox: {
                    show: true,
                    feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xList
                },
                yAxis: {
                    type: 'value',
                    interval:1,
                    axisLabel: {
                        margin:20,
                        formatter: function (val,index) {
                        return dataGet[val];
                        },
          },
                    // axisLabel: {
                    // formatter: '设备{value} '
                    // }
                },
                series: this.seriesData
                };

            myChart.setOption(option);
            console.log(this.seriesData);
            // echarts自适应
            window.addEventListener("resize", () => {
            myChart.resize();
            });
        }
    },
    created() {
        this.selectByGradeFaultModel();
        this.qualitySumByGrade();
        this.productSumByGrade();
        this.selectByGradeChanged();
        this.timeGradeChanged();
    },
    mounted() {
        
    },
}
</script>

<style>

</style>