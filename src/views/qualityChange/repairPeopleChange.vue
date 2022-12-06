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
      <div id="repair_compare" :style="{ width: '100%', height: '400px' }"></div>


    </el-card>


  </div>
</template>

<script>
import {repairPeople} from "@/api/system/10";
import {Countrepair} from "@/api/system/13";
import * as echarts from "echarts";
import {Countqua} from "@/api/system/9";

export default {
  name: "repairPeople",
  data() {
    return {
      peopleChange: [],
      se: [],
      x: [],
      y: [],
      yList:[],
      parts:[],
      qua:[],

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
      Countrepair().then((response) => {
          for(let i=0;i<response.length;i++){
            this.yList.push(response[i].person);
            this.parts.push(response[i].repaire);
            this.qua.push(response[i].quality);
          }
          this.getHeight_stacked();
          this.getHeight_timeline();
        this.initChart();
      })
    },

    getHeight_timeline() {
      var id__timeline = document.getElementById("repair-people-time")
      var height__timeline = this.se.length * 40
      //d.setAttribute(height,height+"px");
      id__timeline.style.cssText = "height:" + height__timeline + "px"
    },
    // 高度适应 对比堆叠图
    getHeight_stacked() {
      var id__stacked = document.getElementById("repair_compare")
      var height__stacked = this.yList.length * 80
      //d.setAttribute(height,height+"px");
      id__stacked.style.cssText = "height:" + height__stacked + "px"
    },
    //对比堆叠图的数据配置
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
    },

    getX() {
      for (let index = 0; index < this.peopleChange.length; index++) {
        this.x[index] = this.peopleChange[index].modifyTime;
      }

      /*console.log("x:", this.x);*/
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
      var myChart2 = echarts.init(document.getElementById('repair_compare'));
      myChart2.setOption(this.setOption());
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
