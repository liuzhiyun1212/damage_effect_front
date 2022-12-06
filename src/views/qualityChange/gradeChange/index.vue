<template>
  <div>
    
    <h2  style="
          font-family: Arial;

          margin-left: 20px;
        ">故障件生产班组变更情况</h2>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
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

        <el-tooltip placement="top">
          <div slot="content">涉及到的故障件生产班组发生变更</div>
          <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
        </el-tooltip>

      </div>
        <div
            id="compareTimeLine"
            style="width: 100%; height: 300px;"
          ></div>
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


          <el-tooltip placement="top">
            <div slot="content">涉及高发故障模式的故障件的生产班组所生产的产品数以及产品对应的质量问题数</div>
            <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
          </el-tooltip>

        </div>
          <div
            id="compare"
            style="width: 100%; height: 400px;"
          ></div>
          
          
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {
  selectByGradeFaultModel,
  qualitySumByGrade,
  productSumByGrade,
  selectByGradeChanged,
  timeGradeChanged,
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

        // 故障件生产班组变更情况
        // selectByGradeFaultModel(){
        //     selectByGradeFaultModel(this.queryParams).then(response => {
        //         this.gradeList = response;
        //         this.getChart();
        // });
        // },

        // 生产班组统计质量问题总数
        qualitySumByGrade(){
            qualitySumByGrade(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                  this.qualityList.push(response[i].sum);
                  this.gradeList.push(response[i].quarter);
                }
                
                console.log("2222",response);
                this.getChart();
                // console.log("2222",this.qualityList);
        });
        },
        // 生产班组统计产品总数
        productSumByGrade(){
            productSumByGrade(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                  this.productList.push(response[i].sum);
                }
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
      console.log("11111111", this.allList)
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
                 //hhhhhhhhhh高度适应
                var d =  document.getElementById("compareTimeLine");
                var height=this.yList.length*100;
                //  d.setAttribute(height,height+"px");
                d.style.cssText="height:"+height+"px";
                //  this.timeGradeChanged();
                this.getTime();

        });
        },
        // 时间线统计列表
        timeGradeChanged(){
            timeGradeChanged(this.queryParams).then(response => {
                this.allList=response;
                this.dealRes(this.allList);
                this.selectByGradeChanged();
                // this.getHeight();
                this.getTime();
                // console.log("1111111",this.allList);
        });
        },
        
        // 对比堆叠图
        getChart(){
            var myChart = echarts.init(document.getElementById("compare"))
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
            var myChart = echarts.init(document.getElementById("compareTimeLine"))
            var option = {
                // title: {
                //     text: '故障件生产班组变更时间线'
                // },
    //             tooltip: {
    //                 trigger: 'axis',
    // axisPointer: {
    //   type: 'cross'
    // }
                // },
                legend: {},
                // toolbox: {
                //     show: true,
                //     feature: {
                //     dataZoom: {
                //         yAxisIndex: 'none'
                //     },
                //     dataView: { readOnly: false },
                //     magicType: { type: ['line', 'bar'] },
                //     restore: {},
                //     saveAsImage: {}
                //     }
                // },
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
    this.qualitySumByGrade()
    this.productSumByGrade()
    this.selectByGradeChanged()
    this.timeGradeChanged()
  },
  mounted() {},
}
</script>

<style></style>
