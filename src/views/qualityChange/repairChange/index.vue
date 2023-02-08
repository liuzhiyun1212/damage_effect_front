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
      故障件维修班组变更情况
    </p>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
      <div
        id="repairGroupTimeLine"
        style="width: 100%; height: 300px;"
      ></div>
      <div
        id="repairGroup"
        style="width: 100%; height: 400px;"
      ></div>

    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {
  selectByGroupFaultModel,
  qualitySumByGroup,
  partsSumByGroup,
  selectByGroupChanged,
  timeGradeChanged1,
} from "@/api/system/dev"
export default {
  data() {
    return {
      // 班组名称列表
      gradeList:[],
      // 时间线列表
      allList:[],
      // 质量总数
      qualityList:[],
      // 维修总数
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
    // // 高度适应
    // getHeight(myChart,option){
    //    var d =  document.getElementById("timeLine");
    //    var height=this.yList.length*150;
    //    console.log("yyyyyy"+this.yList.length);
    //  //  d.setAttribute(height,height+"px");
    //    d.style.cssText="height:"+height+"px";
    //    //myChart.setOption(option);
    // },
    // 对比堆叠图高度适应

    // 故障件维修班组变更情况
    // selectByGradeFaultModel(){
    //     selectByGradeFaultModel(this.queryParams).then(response => {
    //         this.gradeList = response;
    //         this.getChart();
    // });
    // },

    // 维修班组统计质量问题总数
    qualitySumByGroup(){
      qualitySumByGroup(this.queryParams).then(response => {
        for(let i=0;i<response.length;i++){
          this.qualityList.push(response[i].sum);
          this.gradeList.push(response[i].quarter);
        }
        console.log("质量问题总数",response);
        this.getChart();
        // console.log("2222",this.qualityList);
      });
    },
    // 维修班组统计产品总数
    partsSumByGroup(){
      partsSumByGroup(this.queryParams).then(response => {
        for(let i=0;i<response.length;i++){
          this.productList.push(response[i].sum);
        }
        console.log("产品总数",response);
        this.getChart();
      });
    },
    dealRes(data) {
      var l1=[];

      var count=0;
      for (var i = 0; i < data.length; i++) {
        this.seriesData.push({
          name: data[i].name,
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [
              {
                name: "故障类型：" + data[i].name,
                coord: [data[i].list, data[i].name],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              },
            ],
          },
        })

        count += data[i].list.length
      }

      for (let i = 0; i < this.allList.length; i++) {
        for (let j = 0; j < this.seriesData.length; j++) {
          if (this.allList[i].name === this.seriesData[j].name) {
            for (let k = 0; k < this.allList[i].list.length; k++) {
              this.seriesData[j].markPoint.data.push({
                // name:'故障类型：'+data[i].name,
                coord: [this.allList[i].list[k], j],
                label: {
                  show: true,
                  /*formatter: function (item) {
                                    return "预测故障发生";
                                },*/
                },
              })
            }
          }
        }
      }
      //   console.log(count);
      for (let j = 0; j < this.seriesData.length; j++) {
        for (let i = 0; i < count; i++) this.seriesData[j].data.push(j)
      }
      // console.log("11111111", this.allList)
    },
    // 故障件维修班组变更
    selectByGroupChanged(){
      selectByGroupChanged(this.queryParams).then(response => {
        console.log("维修班组变更",response)
        let arr=[];
        let time1=[];
        for(let i=0;i<response.length;i++){
          arr.push(response[i].name);
          time1.push(response[i].time);
        }
        this.yList = arr.filter(function(item,index){
          return arr.indexOf(item) === index;
        });
        console.log("yList",this.yList)
        this.xList = time1.filter(function(item,index){
          return time1.indexOf(item) === index;
        });
        console.log("xList",this.xList)
        //hhhhhhhhhh高度适应
        var d =  document.getElementById("repairGroupTimeLine");
        var height=this.yList.length*100;
        //  d.setAttribute(height,height+"px");
        d.style.cssText="height:"+height+"px";
        this.getTime();

      });
    },
    // 时间线统计列表
    timeGradeChanged1(){
      timeGradeChanged1(this.queryParams).then(response => {
        console.log("时间线统计列表",response)
        this.allList=response;
        this.dealRes(this.allList);
        this.selectByGroupChanged();
        // this.getHeight();
        // this.getTime();
        // console.log("1111111",this.allList);
      });
    },

    // 对比堆叠图
    getChart(){
      var myChart = echarts.init(document.getElementById("repairGroup"))
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
      var myChart = echarts.init(document.getElementById("repairGroupTimeLine"))
      var option = {
        // title: {
        //     text: '故障件维修班组变更时间线'
        // },
        //             tooltip: {
        //                 trigger: 'axis',
        // axisPointer: {
        //   type: 'cross'
        // }
        // },
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
          data: this.xList,
          axisLabel: {
            formatter: params=>{
              return params.slice(0,10);

            }
          },
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
      //this.getHeight(myChart,option);
      myChart.setOption(option);
      // console.log(this.seriesData);
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  created() {
    // this.selectByGradeFaultModel()
    this.qualitySumByGroup()
    this.partsSumByGroup()
    this.selectByGroupChanged()
    this.timeGradeChanged1()
  },
  mounted() {},
}
</script>

<style></style>
