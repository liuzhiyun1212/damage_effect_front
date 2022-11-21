<template>
  <div>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
<!--  <div>-->
<!--    <h2>故障件种类</h2>-->
<!--  </div>-->
  <div id="quarter" style="width: 100%; height: 300px;"> </div>
  <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
    <p
      style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          ">
      故障件种类
    </p>
    <el-tooltip placement="top">
      <div slot="content">若某故障件种类质量问题发生数大于质量问题故障件名称平均发生数50%，则质量问题在该故障件种类上集中爆发。</div>
      <i class="el-icon-question"></i>
    </el-tooltip>
  </div>
    <el-table
      v-loading="loading"
      :data="qualityProblem1List"
      stripe
      height="250px"
      style="width: 100%;margin-top:0px !important"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="partsType"
        label="故障件种类"
      >
      </el-table-column>
            <el-table-column
              prop="partsCount"
              label="故障件发生数"
            >
            </el-table-column>
      <el-table-column
        prop="partsProportion"
        label="故障件发生数占比"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { selectPartsTypeCount} from '@/api/system/dev';
export default {
  data() {
    return {
      // 表格判断条件list
      qualityProblem1List:[],
      // 柱状图
      xQuarter:[],
      yQuarter:[],
      //故障件种类列表
      TypeList:[],
      //所有故障件
      allFaultyList:[],
      //故障件列表
      faultyCountList:[],
      //平均数
      averageList:[],
      averageList1:[],
    }
  },
  created() {
    this.selectPartsTypeCount();
    // this.selectAllType();
  },
  methods: {

    selectPartsTypeCount(){
      selectPartsTypeCount().then(response => {
        this.qualityProblem1List = response;
        for(let i=0;i<this.qualityProblem1List.length;i++){
          this.xQuarter.push(this.qualityProblem1List[i].partsType)
          this.yQuarter.push(this.qualityProblem1List[i].partsCount)
          this.averageList.push(this.qualityProblem1List[i].partsProportion.replace("%",""))
          if(this.averageList[i]>100){
            this.averageList1[i]=this.qualityProblem1List[i].partsType
          }
        }
        this.chartView();
      });
    },
    chartView() {
      var myChart = echarts.init(document.getElementById("quarter"))
      var colorList = [];
      var option = {
        tooltip: {
          trigger: 'axis',
          formatter: "{b} : {c}",
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid:{
         y:"10%"
        },
        xAxis: {
          type: 'category',
          data: this.xQuarter,
          textStyle: {
            fontSize: 14,
          },
        },
        yAxis: {
          axisLine: {
            show: false
          },
          interval: 2,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 14,
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [{
            type: 'bar',
            showBackground: true,
            barWidth: 20,
            data: this.yQuarter,
            itemStyle: {
              color:(params) =>{
                console.log(params)
                  if(this.averageList1.includes(params.name)) {
                    colorList[params.dataIndex] = 'red'
                  } else {
                    colorList[params.dataIndex] = 'blue'
                  }
                return colorList[params.dataIndex]
              }
            },
            label: {
              show: true,     //开启显示
              position: 'inside',    //在上方显示
              textStyle: {        //数值样式
                color: 'white',
                fontSize: 14
              }
          },
          }],

      };
      myChart.setOption(option);
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  mounted() {
  },

}
</script>

