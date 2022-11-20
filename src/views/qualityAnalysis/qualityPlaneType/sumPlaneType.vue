<template>
  <div>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <div
            id="plane"
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
        质量问题集中爆发的机型(若某机型质量问题发生数大于质量问题机型平均发生数50%，则质量问题在该机型上集中爆发)
        </p>
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
              label="质量问题高发机型"
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
import {sumByplaneType,selectPlaneType} from '@/api/system/dev';
export default {
    data() {
        return {
            // 机型总列表
            allList:[],
            // 筛选机型
            planeList:[],
            // 表格判断条件list
            selectList:[],
            // 柱状图
            xPlane:[],
            yPlane:[],
            xLength:null,
            average:0,
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
        sumByplaneType(){
            sumByplaneType(this.queryParams).then(response => {
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
        // 筛选机型超过平均的50%
        selectPlaneType(){
            selectPlaneType(this.queryParams).then(response => {
                this.planeList = response;
                this.selectList = this.planeList;
                console.log("xxxxxxxxxxx",this.planeList);
        });
        },
        getChart(){
            var myChart = echarts.init(document.getElementById("plane"))
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
                interval: 5,
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
                                if(params.data >= this.average*0.5){
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
        this.sumByplaneType();
        this.selectPlaneType();
    },
    mounted() {
        
    },

}
</script>

<style>

</style>