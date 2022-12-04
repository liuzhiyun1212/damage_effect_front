<template>
  <div>
    <h2  style="
          font-family: Arial;

          margin-left: 20px;
        ">装备能力提升情况</h2>
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
          能力提升时间线
        </p>

        <el-tooltip placement="top">
          <div slot="content">某机型能力提升的时间节点</div>
          <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
        </el-tooltip>

      </div>
      <div id="ability_timeLine" style="width: 100%; height: 450px"></div>
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
      <div id="abilityCompare" style="width: 100%; height: 450px"></div>

      <!--<iframe src="//player.bilibili.com/player.html?aid=978257347&bvid=BV1p44y1L7zG&cid=489572698&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
-->

    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import {getEquipmentability, getEquipmentabilitycompare} from "@/api/system/data5"
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
      first:[],
      second:[],
      third:[],
      fourth:[],
    }
  },
  mounted() {
    this.getdata()

  },
  methods :{
    getdata(){
      getEquipmentabilitycompare().then((response) => {
        for(let i=0;i<response.length;i++){
          this.yList.push(response[i].planeType);
          if(response[i].one===0)
            this.first.push("");else
          this.first.push(response[i].one);
          if(response[i].two===0)
            this.second.push("");else
          this.second.push(response[i].two);
          if(response[i].three===0)
            this.third.push("");else
          this.third.push(response[i].three);
          if(response[i].four===0)
            this.fourth.push("");else
          this.fourth.push(response[i].four);
          console.log(this.first);
        }
        this.getHeight_stacked();

        this.getlinedata()

      })
    },


    // 高度适应 改型时间线
    getHeight_timeline() {
      var id__timeline = document.getElementById("ability_timeLine")
      var height__timeline = this.se.length * 80
      //d.setAttribute(height,height+"px");
      id__timeline.style.cssText = "height:" + height__timeline + "px"
    },
    // 高度适应 对比堆叠图
    getHeight_stacked() {
      var id__stacked = document.getElementById("abilityCompare")
      var height__stacked = this.yList.length * 50+70
      //d.setAttribute(height,height+"px");
      id__stacked.style.cssText = "height:" + height__stacked + "px"
    },





    getlinedata(){
      getEquipmentability().then((response) => {
        this.line=response;
        console.log(response)

        for(let i=0;i<this.line.length;i++){
          for(let j=0;j<this.line[i].list.length;j++){
            this.xdate.push(this.line[i].list[j]);
          }
          this.ydate.push(this.line[i].planeType)
        }
        this.xdate = Array.from(new Set(this.xdate));
        this.xdate.sort();
        //   console.log(this.ydate)

        this.dealRes(this.line)
       // console.log(this.line)

        this.getHeight_timeline();
        this.initChart()
      });
    },


    initChart() {
      var myChart = echarts.init(document.getElementById('abilityCompare'));
      var myChart2 = echarts.init(document.getElementById('ability_timeLine'));
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
            name: '1.0',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.first//[320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '2.0',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.second//[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '3.0',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.third//[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '4.0',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.fourth//[120, 132, 101, 134, 90, 230, 210]
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
              console.log(val);
              /*if(dataGet[val].name.length>5)*/
              if(dataGet.length===1&&val===0){
                return dataGet[0].name
              }
              else if(dataGet.length>1){
                return dataGet[val].name;
              }

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
          name: data[i].planeType,
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
          if(this.se[i].name===this.line[j].planeType){
            for(let k=0;k<this.line[j].list.length;k++){
              this.se[i].markPoint.data.push({
                name:this.line[j].planeType ,
                coord: [this.line[j].list[k], i],
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
