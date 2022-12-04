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
      故障件维修人员变更情况
    </p>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
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
          时间线
        </p>
      </div>
      <div id="repair-people-time" :style="{ width: '100%', height: '400px' }"></div>

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
      <div id="trouble-num" :style="{ width: '100%', height: '400px' }"></div>

     
    </el-card>

    
  </div>
</template>

<script>
import {repairPeople} from "@/api/system/10";
import * as echarts from "echarts";

export default {
  name: "repairPeople",
  data() {
    return {
      peopleChange: [],
      se: [],
      x: [],
      y: [],


    };
  },
  created() {
    
  },
  mounted() {
    
    this.tsRepairPeople();
  },
  methods: {
    tsRepairPeople(){
        repairPeople().then(res=>{
            this.peopleChange = res;
            this.getX();
            this.getY();
        })
    },


    getX() {
      for (let index = 0; index < this.peopleChange.length; index++) {
        this.x[index] = this.peopleChange[index].modifyTime;
      }

      console.log("x:", this.x);
      this.dealRes();
    },

    getY() {
      //去重
      for (let i = 0; i <  this.peopleChange.length; i++) {
          let mark = 0;
          for (let j = 0; j <  this.peopleChange.length; j++) {
            if (this.peopleChange[i].partsModel+this.peopleChange[i].partsName === this.y[j]) {
              mark = -1;
            }
          }
          if (mark === 0) {
            this.y.push(this.peopleChange[i].partsModel+this.peopleChange[i].partsName);
          }
        }
      console.log("y:", this.y);
      this.initChart();
    },

    dealRes() {
      for (var i = 0; i < this.peopleChange.length; i++) {
        this.se.push({
          name: this.peopleChange[i].partsModel,
          type: "line",
          data: [],

          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [
              {
                name: "",
                coord: [
                  this.peopleChange[i].modifyTime,
                  this.peopleChange[i].partsModel +
                    this.peopleChange[i].partsName,
                ],
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
        for (let u = 0; u < this.x.length; u++) {
          this.se[i].data.push(i);
        }
      }
      // for(let j=0;j<this.se.length;j++){
      //   for(let i=0;i<this.peopleChange.length;i++){
      //     this.se[j].data.push(j);
      //   }
      // }
    },

    initChart() {
      var chartDom = document.getElementById("repair-people-time");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          // text: '故障件改型时间线'
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}",
          axisPointer: {
            axis: "x",
            type: "line", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },

        // tooltip: {
        //   trigger: 'item',
        //   //鼠标悬浮不显示
        //   showContent:false,
        // },
        /**图例 水平 */
        // legend: { orient: 'horizontal'},
        //右工具
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: { readOnly: false },
        //     magicType: { type: ['line', 'bar'] },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          //x轴两边留白
          boundaryGap: false,
          // data : this.xData,
          data: this.x,
        },

        yAxis: {
          type: "category",
          data: this.y,
        },
        series: this.se,
      };


      option && myChart.setOption(option);
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize();
      });

    },

    
  },
};
</script>
