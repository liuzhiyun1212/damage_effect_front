<template>
  <div>
    <h2  style="
          font-family: Arial;

          margin-left: 20px;
        ">故障件生产人员变更情况</h2>
    <el-card style="width: 98%; margin-left: 20px; margin-top: 10px">

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
          <div slot="content">涉及高发故障模式的故障件的生产人员有大量新员工和大量老员工离职换岗的情况</div>
          <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
        </el-tooltip>

      </div>
      <div id="timeLine" style="width: 100%; height: 450px"></div>
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
            <div slot="content">涉及高发故障模式的故障件的生产人员所生产的产品数以及产品对应的质量问题数</div>
            <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
          </el-tooltip>

        </div>
      <div id="main" style="width: 100%; height: 450px"></div>

        <!--<iframe src="//player.bilibili.com/player.html?aid=978257347&bvid=BV1p44y1L7zG&cid=489572698&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
-->

    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {Countqua} from "@/api/system/9"
import {getPeoplechange} from "@/api/system/modifyData"
export default {
  name: "peopleChange",
  data() {
    return {
      yList:[],
      parts:[],
      qua:[],
      line:[],
      xdate:[],
      ydate:[],
      se:[],
    }
  },
  mounted() {
    this.getdata()

  },
  methods :{
    getdata(){
      Countqua().then((response) => {
        for(let i=0;i<response.length;i++){
          this.yList.push(response[i].person);
          this.parts.push(response[i].product);
          this.qua.push(response[i].quality);
        }
        this.getHeight_stacked();

        this.getlinedata()

      })
    },


    // 高度适应 改型时间线
    getHeight_timeline() {
      var id__timeline = document.getElementById("timeLine")
      var height__timeline = this.se.length * 80
      //d.setAttribute(height,height+"px");
      id__timeline.style.cssText = "height:" + height__timeline + "px"
    },
    // 高度适应 对比堆叠图
    getHeight_stacked() {
      var id__stacked = document.getElementById("main")
      var height__stacked = this.yList.length * 40
      //d.setAttribute(height,height+"px");
      id__stacked.style.cssText = "height:" + height__stacked + "px"
    },





    getlinedata(){
      getPeoplechange().then((response) => {
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

        this.getHeight_timeline();
        this.initChart()
      });
    },


    initChart() {
      var myChart = echarts.init(document.getElementById('main'));
      var myChart2 = echarts.init(document.getElementById('timeLine'));
      myChart.setOption(this.setOption());
      myChart2.setOption(this.setOption2(),true);

      console.log(this.setOption());
    },
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

              /*if(dataGet[val].name.length>5)*/
                return dataGet[val].name;
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
            data: [
              /*  {
                  name: "起始坐标",
                  coord: ["Wed", i],
                  label: {
                    show: true,

                    formatter: function (item) {
                      return "故障发生";
                    },
                  },
                },*/
              /*{
                name:'故障类型：'+data[i].trou ,
                coord: [data[i].date,i],
                label: {
                  show: true,
                  /!*formatter: function (item) {
                    return "预测故障发生";
                  },*!/
                },
              },*/
            ],
          },
        });
      }
     /* if(data.length<4){
        for(let i=0;i<this.name.length;i++){
          let mark=0;
          for(let j=0;j<data.length;j++){
            if(data[j].equip===this.name[i])
              mark=-1;
          }
          if(mark===0) {
            this.se.push({
              name: this.name[i],
              type: "line",
              data: [],
              markPoint: {
                symbolSize: 20,
                symbol: 'triangle',
                data: [
                  {
                    name: '',
                    coord: [],
                    label: {
                      show: true,
                      /!*formatter: function (item) {
                      return "预测故障发生";
                    },*!/
                    },
                  },
                ],
              },
            });
          }
          if(this.se.length===4)
            break;
        }
      }*/
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
  }
}
</script>

<style scoped>

</style>
