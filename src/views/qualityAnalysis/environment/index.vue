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
        质量问题发生地理环境
      </p>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <div
            id="environment"
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
        质量问题高发地理环境
        </p>
        <el-tooltip placement="top">
      <div slot="content">若某地理环境质量问题发生数大于质量问题地理环境平均发生数50%，则质量问题在该地理环境集中爆发</div>
      <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 8px; font-size: 40px;"></i>
    </el-tooltip>
        </div>
        <el-table :header-cell-style="{
            background: '#84BBFE',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '600',
            fontFamily: '黑体',
            padding: '0',
          }"
          :header-row-style="{
    height: '20',
  }" :data="selectList" style="height:auto;margin-top: 20px;width:99%">
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="quarter"
              label="质量问题高发地理环境"
              :show-overflow-tooltip="true" align="center"

            >
            </el-table-column>
            <el-table-column
              prop="sum"
              label="质量问题数量" align="center"
            >
            </el-table-column>
          </el-table>
    </el-card>
  </div>
</template>

<script>
 import * as echarts from 'echarts';
import {highSumByEnvironment,sumByEnvironment} from '@/api/system/dev';
export default {
    data () {
        return {
            // 地理环境总列表
            allList:[],
            // 筛选地理环境
            planeList:[],
            // 表格判断条件list
            selectList:[],
            // 柱状图
            xPlane:[],
            yPlane:[],
            xLength:null,
            average:0,
        }
    },
    methods: {
        sumByEnvironment(){
            sumByEnvironment(this.queryParams).then(response => {
                this.allList = response;
            var count=0;
            for(let i=0;i<this.allList.length;i++){
                this.xPlane.push(this.allList[i].quarter)
                this.yPlane.push(this.allList[i].sum);
                count += this.allList[i].sum;
                this.average = count/this.allList.length;
                this.getChart();
        }
        this.xLength = this.allList.length;
        });
        },
        highSumByEnvironment(){
            highSumByEnvironment(this.queryParams).then(response => {
                this.planeList = response;
                this.selectList = this.planeList;
                // console.log("xxxxxxxxxxx",this.planeList);
        });
        },
        getChart(){
            var myChart = echarts.init(document.getElementById("environment"))
          var option = {
            /*title: {
                text: '维保计划按种类统计',
            },*/
            tooltip: {
                trigger: 'axis',
                formatter:  (param)=> {
                            if(param[0].data >= this.average*0.5){
                            return param[0].name + "质量问题集中爆发";
                        }
                    }
            },
            xAxis: {
                type: 'category',
                data: this.xPlane,
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
            series: [
                {
                type: 'bar',
                showBackground: true,
                barWidth: 20,
                itemStyle: {
                  color: (params) => {
                                if(params.data >= Math.round(this.average*0.5)){
                                    return 'red';
                                }else{
                                    return 'blue'
                                }

                        }
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    // { offset: 0, color: '#83bff6' },
                    // { offset: 0.5, color: '#188df0' },
                    // { offset: 1, color: '#188df0' }
                    // ])
                },
                label: {
                    show: true,
                    position: 'inside'
                },
                data: this.yPlane
                }
            ]
            };
         myChart.setOption(option);
        // echarts自适应
        window.addEventListener("resize", () => {
          myChart.resize();
        });
        },
    },
    created() {
        this.sumByEnvironment();
        this.highSumByEnvironment();
    },

}
</script>

<style>

</style>
