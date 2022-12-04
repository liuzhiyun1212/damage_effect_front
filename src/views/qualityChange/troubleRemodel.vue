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
      故障件改型情况
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
          改型时间线
        </p>
      </div>
      <div id="trouble-time" :style="{ width: '100%', height: '400px' }"></div>

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
import {listProductChange} from "@/api/system/modify";
import * as echarts from "echarts";
import {numQuality, numFault} from "@/api/system/9";

export default {
  name: "Modify",
  data() {
    return {
      productChange: [],
      se: [],
      x: [],
      y: [],

      //堆叠图data
      yList:[],
      faultNum:[],
      qualityNum:[],


    };
  },
  created() {
    
  },
  mounted() {
    //对比堆叠图数据函数
    this.tsNumQuality();
    
    this.testChange();
  },
  methods: {
    tsNumQuality(){
      numQuality().then(res=>{
        for (let i = 0; i< res.length; i++) {

          this.yList[i] = res[i].partsModel+res[i].partsName;
          this.qualityNum[i] = res[i].partsNum;
        }
        console.log("ylist:",this.yList);
        console.log("qualityNum:",this.qualityNum);
      })

    numFault().then(re=>{
      for (let i = 0; i< re.length; i++) {
          this.faultNum[i] = re[i].partsNum;
        }
        console.log("faultNum:",this.faultNum);
    })
      
    },


    getX() {
      for (let index = 0; index < this.productChange.length; index++) {
        this.x[index] = this.productChange[index].modifyTime;
      }

      console.log("x:", this.x);
      this.dealRes();
    },

    getY() {
      //去重
      for (let i = 0; i <  this.productChange.length; i++) {
          let mark = 0;
          for (let j = 0; j <  this.productChange.length; j++) {
            if (this.productChange[i].productModel+this.productChange[i].productName === this.y[j]) {
              mark = -1;
            }
          }
          if (mark === 0) {
            this.y.push(this.productChange[i].productModel+this.productChange[i].productName);
          }
        }
      console.log("y:", this.y);
      this.initChart();
    },

    dealRes() {
      for (var i = 0; i < this.productChange.length; i++) {
        this.se.push({
          name: this.productChange[i].productModel,
          type: "line",
          data: [],

          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [
              {
                name: "",
                coord: [
                  this.productChange[i].modifyTime,
                  this.productChange[i].productModel +
                    this.productChange[i].productName,
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
      //   for(let i=0;i<this.productChange.length;i++){
      //     this.se[j].data.push(j);
      //   }
      // }
    },

    testChange() {
      
      listProductChange().then((res) => {
        this.productChange = res;
        console.log("productChange1:", this.productChange);
        this.getX();
        this.getY();
      });
      
    },

    initChart() {
      var chartDom = document.getElementById("trouble-time");
      var chartDom2 = document.getElementById("trouble-num");
      var myChart = echarts.init(chartDom);
      var myChart2 = echarts.init(chartDom2);
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

      var option2;
      option2= {
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
            name: '故障件生产数量',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.faultNum//[320, 302, 301, 334, 390, 330, 320]
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
            data: this.qualityNum//[120, 132, 101, 134, 90, 230, 210]
          },

        ]
      };
      option && myChart.setOption(option);
      option2 && myChart2.setOption(option2);
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize();
      });

      window.addEventListener("resize", () => {
        myChart2.resize();
      });
    },

    
  },
};
</script>
