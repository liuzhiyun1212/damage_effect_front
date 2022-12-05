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
          <div slot="content">涉及高发故障模式的故障件的生产工艺变更情况</div>
          <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
        </el-tooltip>
      </div>
        <div
            id="Maketechnique_timeLine"
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
          <div slot="content">装备不同能力状态下所发生的质量问题数</div>
          <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
        </el-tooltip>

      </div>



          <div
            id="Maketechnique"
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
import {getMaketechnique} from "@/api/system/modifyData";
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
  created() {
    // this.selectByFaultModelMake();
    /*this.selectQualityByMakeWorkmanship();
    this.selectProductByMakeWorkmanship();*/
    this.getlinedata();
  },
    methods: {
        // // 高发故障模式的生产工艺
        // selectByFaultModelMake(){
        //     selectByFaultModelMake(this.queryParams).then(response => {
        //         this.makeWorkmanshipList = response;
        //         this.getChart();
        // });
        // },

      getlinedata(){
        getMaketechnique().then((response) => {
          this.line=response;

          for(let i=0;i<this.line.length;i++){
            for(let j=0;j<this.line[i].listdate.length;j++){
              this.xdate.push(this.line[i].listdate[j]);
            }
            this.ydate.push(this.line[i].partsmodel+"-"+this.line[i].partsname)
          }
          this.xdate = Array.from(new Set(this.xdate));
          this.xdate.sort();
          //   console.log(this.ydate)

          this.dealRes(this.line)
          console.log(this.line)
          this.selectQualityByMakeWorkmanship();
          this.selectProductByMakeWorkmanship();
          this.getHeight_timeline();
          this.getHeight_stacked();
          this.initChart()
        });
      },


      getHeight_timeline() {
        var id__timeline = document.getElementById("Maketechnique_timeLine")
        var height__timeline = this.se.length * 80
        //d.setAttribute(height,height+"px");
        id__timeline.style.cssText = "height:" + height__timeline + "px"
      },
      // 高度适应 对比堆叠图
      getHeight_stacked() {
        var id__stacked = document.getElementById("Maketechnique")
        var height__stacked = this.yList.length * 40
        //d.setAttribute(height,height+"px");
        id__stacked.style.cssText = "height:" + height__stacked + "px"
      },


        // 质量问题总数
        selectQualityByMakeWorkmanship(){
            selectQualityByMakeWorkmanship(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                    this.makeWorkmanshipList.push(response[i].quarter);
                    this.qualityList.push(response[i].sum);
                }
               /* this.getChart();*/
        });
        },
        // 产品总数
        selectProductByMakeWorkmanship(){
            selectProductByMakeWorkmanship(this.queryParams).then(response => {
                for(let i=0;i<response.length;i++){
                    this.productList.push(response[i].sum);
                }
                /*this.getChart();*/
        });
        },
                // 对比堆叠图
                setOption(){
            /*var myChart = echarts.init(document.getElementById("shengchanbanzu"))*/
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
            return option;
           /* myChart.setOption(option);*/
            // echarts自适应
          /*  window.addEventListener("resize", () => {
            myChart.resize();
            });*/
            },

      initChart() {
        var myChart = echarts.init(document.getElementById('Maketechnique'));
        var myChart2 = echarts.init(document.getElementById('Maketechnique_timeLine'));
        myChart.setOption(this.setOption(),true);
        myChart2.setOption(this.setOption2(),true);
        window.addEventListener("resize", () => {
          myChart.resize();
          myChart2.resize();
        });
        console.log(this.setOption());
      },


      setOption2() {
        let dataGet = this.se;
        console.log(dataGet);
        let option = {
          tooltip: {
            trigger: 'axis',//'Temperature : <br/>{b} : {c}°C'
            formatter: '{b}',
            axisPointer:{
              axis:'x',
            },
          },
          axisPointer:{
            //axis:'y',
          },
          grid: {
            left: '0px',
            right: '40px',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLine: { lineStyle: { color: "black" } },
            axisLabel: {
              margin:20,
            },
            data:this.xdate, //["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
            //splitNumber : 4,
            minInterval: 1,
            nameTextStyle:{
              width:5,
              overflow:'ellipsis',
            },
            axisLine: { lineStyle: { color: "black" } },
            axisLabel: {
              margin:20,
              formatter: function (val,index) {

                if(dataGet.length===1&&val===0){
                  return dataGet[0].name
                }
                else if(dataGet.length>1){
                  return dataGet[val].name;
                }
                /*if(dataGet[val].name.length>5)*/
                /*return dataGet[val].name;*/
              },
            },
          },
          series: this.se,
        };
        return option;
      },
      dealRes(data) {
        for (let i = 0; i < data.length; i++) {
          this.se.push({
            name: data[i].partsmodel+"-"+data[i].partsname,
            type: "line",
            data: [],
            markPoint: {
              symbolSize: 20,
              symbol: 'triangle',
              data: [],
            },
          });
        }
        for(let j=0;j<this.se.length;j++){
          for(let i=0;i<this.xdate.length;i++){
            this.se[j].data.push(j);
          }
        }
        this.dealmark()
      },
      dealmark(){
        for(let i=0;i<this.se.length;i++){
          for(let j=0;j<this.line.length;j++){
            if(this.se[i].name===this.line[j].partsmodel+"-"+this.line[j].partsname){
              for(let k=0;k<this.line[j].listdate.length;k++){
                this.se[i].markPoint.data.push({
                  name:this.line[j].partsmodel+"-"+this.line[j].partsname ,
                  coord: [this.line[j].listdate[k], i],
                })
              }
            }
          }
        }
      },
    },

}
</script>

<style>

</style>
