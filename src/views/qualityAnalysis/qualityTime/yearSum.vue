<template>
    <div>
        <div
            id="year"
            style="width: 100%; height: 200px;"
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
          年度质量问题发生统计
        </p>
        <el-button type="primary" icon="el-icon-s-home"  @click="allInfo" style="float: right; margin-right: 10px; margin-top: 8px">全部信息</el-button>
        </div>
        <ul>
            <li style="cursor: pointer;" @click="selectInfo('0')">较上一年度增加或减少50%以上</li>
            <li style="cursor: pointer;" @click="selectInfo('1')">连续两个年度增加或减少20%以上</li>
            <li style="cursor: pointer;" @click="selectInfo('2')">连续三个年度呈单调变化趋势</li>
        </ul>
        <el-table
            v-loading="loading"
            :data="selectList"
            stripe
            height="250px"
            style="width: 100%;margin-top:0px !important"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="quarter"
              label="年度"
              :show-overflow-tooltip="true"

            >
            </el-table-column>
            <el-table-column
              prop="sum"
              label="质量问题数量"
            >
            </el-table-column>
            <el-table-column
              prop="condition"
              label="满足条件"
            >
            </el-table-column>
          </el-table>
    </div>
 
</template>

<script>
 import * as echarts from 'echarts';
import {qualityHappenSum,oneQuality,oneYear,yearHappenSum} from '@/api/system/dev';
export default {
    data() {
        return {
            // 年度质量发生时间总数
            yearHappenList:[],
            // 年度筛选大列表
            allYearList:[],
            // 表格判断条件list
            selectList:[],
            // 年度柱状图
            xYear:[],
            yYear:[],
            xLength:null,
            // 查询参数
            queryParams: {
                    pageNum: 1,
                    pageSize: 5,
                    troubleName: null,
                    troubleIntroduction: null
                    },
            }
    },
    methods: {
        // 年度总数
    yearHappenSum(){
      yearHappenSum(this.queryParams).then(response => {
        console.log(response);
        this.yearHappenList = response;
        // this.selectList = this.yearHappenList;
        for(let i=0;i<this.yearHappenList.length;i++){
          this.xYear.push(this.yearHappenList[i].quarter+":"+this.yearHappenList[i].condition)
          this.yYear.push(this.yearHappenList[i].sum);
          this.xLength = this.yearHappenList[i].quarter.length;
        }
        // console.log("aaaaaaaaaaaaa",this.yearHappenList);
        this.getYear();
      });
    },
    // 年度筛选
    oneYear(){
      oneYear(this.queryParams).then(response => {
        this.allYearList = response;
        this.selectList = this.allYearList;
        // console.log("aaaaaaaaaaaaa",this.allYearList);
      });
    },
    // 表格条件筛选
    selectInfo(n){
            this.selectList = [];
            for(let i=0;i<this.allYearList.length;i++){
                if((this.allYearList[i].condition === '1' || this.allYearList[i].condition === '1,2'
                ||this.allYearList[i].condition === '1,2,3') && n==='0'){
                    this.selectList.push(this.allYearList[i]);
                }else if((this.allYearList[i].condition === '2' || this.allYearList[i].condition === '2,3'
                ||this.allYearList[i].condition === '1,2,3') && n==='1'){
                    this.selectList.push(this.allYearList[i]);
                }else if((this.allYearList[i].condition === '3' || this.allYearList[i].condition === '2,3'
                ||this.allYearList[i].condition === '1,2,3') && n==='2'){
                    this.selectList.push(this.allYearList[i])
                }
            }
        },
    allInfo() {
        this.queryParams.pageNum = 1;
        this.oneYear();
        },
    getYear(){
      var myChart = echarts.init(document.getElementById("year"))
          var option = {
            /*title: {
                text: '维保计划按种类统计',
            },*/
            tooltip: {
                trigger: 'axis',
                formatter: "{b} : {c}",
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: this.xYear,
              textStyle: {
                fontSize: 14,
              },
            },
            yAxis: {
                axisLine: {
                show: false
                },
                interval: 1,
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
            series: [
                {
                type: 'bar',
                showBackground: true,
                barWidth: 20,
                itemStyle: {
                  color: (params) => {
                            // console.log("aaaaaa",params.name.slice(this.xLength+1)!=='null');
                            if(params.name.slice(this.xLength+1)!=='null'){
                                return 'red'
                            }
                            return 'blue'
                        }
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    // { offset: 0, color: '#83bff6' },
                    // { offset: 0.5, color: '#188df0' },
                    // { offset: 1, color: '#188df0' }
                    // ])
                },
                data: this.yYear
                }
            ]
            };
      myChart.setOption(option);
        // echarts自适应
        window.addEventListener("resize", () => {
          myChart.resize();
        });
    }
    },
    created() {
        this.yearHappenSum();
        this.oneYear();
    },
    mounted() {
        
    },

}
</script>

<style>
li:hover{
    color: red;
}
</style>