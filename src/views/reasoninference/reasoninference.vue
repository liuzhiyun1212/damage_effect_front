<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-card>
            <el-tree
              :data="changeOptions"
              :props="defaultProps"
              :expand-on-click-node="false"
              ref="tree"
              node-key="id"
              default-expand-all
              highlight-current
              @node-click="handleNodeClick"
            />
          </el-card>
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;">原因推测及判断规则</span>
          </div>
          <div class="body">
            <h2>原因推测</h2>
            <div>{{reason}}</div>
            <h2>判断规则</h2>
            <div v-if = "this.if1==true"><el-button type="text" @click="handleRule(rule1)" style="font-size: 16px;">{{rule1}}</el-button></div>
            <p v-else style="font-size: 16px;">{{rule1}}</p>
            <div v-if = "this.if2==true"><el-button type="text" @click="handleRule(rule2)" style="font-size: 16px;">{{rule2}}</el-button></div>
            <p v-else style="font-size: 16px;">{{rule2}}</p>
            <div v-if = "this.if3==true"><el-button type="text" @click="handleRule(rule3)" style="font-size: 16px;">{{rule3}}</el-button></div>
            <p v-else style="font-size: 16px;">{{rule3}}</p>
            <div v-if = "this.if4==true"><el-button type="text" @click="handleRule(rule4)" style="font-size: 16px;">{{rule4}}</el-button></div>
            <p v-else style="font-size: 16px;">{{rule4}}</p>
          </div>
        </el-card>
        <hr />
        <el-card class="box-card" style="height: 350px;">
          <div slot="header" class="clearfix">
            <span>判断依据</span>
          </div>
          <div class="body">
            <div id="stackedLineChart" :style="{ width: '100%', height: '180px' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {changeDataTreeSelect} from "../../api/system/changedata";
import {devup1,devup2} from "../../api/system/reasonyuce";

export default {
  name: "reasoninference",
  data() {
    return {
      reason:"",
      rule1:"",
      rule2:"",
      rule3:"",
      rule4:"",
      if1:false,
      if2:false,
      if3:false,
      if4:false,
      dataList1:[],
      dataList2:[],
      dataList3:[],
      dataList4:[],
      total1:0,
      total2:0,
      total3:0,
      total4:0,
      // 变更项选项
      changeOptions: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      },
    };
  },
  created() {
    this.getchangeTree();
  },
  methods: {
    getchangeTree() {
      changeDataTreeSelect().then(response => {
        this.changeOptions = response.data;
        this.handleNodeClick({id:5,label:"装备型号升级"});
      });
    },
    handleNodeClick(data) {
      if(data.id>4){
        this.reason = "可能是由于"+data.label+"导致质量问题产生"
        this.handleLabel(data.label)
      }
    },
    handleLabel(label){
      this.if1 = false
      this.if2 = false
      this.if3 = false
      this.if4 = false
      this.dataList1 = []
      this.dataList2 = []
      this.dataList3 = []
      this.dataList4 = []
      this.total1 = 0
      this.total2 = 0
      this.total3 = 0
      this.total4 = 0
      if(label=="装备型号升级"){
        this.rule1 = "1.不同问题装备型号中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.问题装备型号技术状态进行升级时间与质量问题变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifdevup()
      }
    },
    handleRule(rule){
      if(rule=="2.问题装备型号技术状态进行升级时间与质量问题变化时间一致或不超过一定范围。"){
        this.ruledevup2()
      }
    },
    ifdevup(){
      devup2().then(response => {
        this.total2 = response.total
        if(this.total2>0){
          this.if2 = true
          this.ruledevup2()
        }
      })
    },
    ruledevup2(){
      devup2().then(response => {
        var biaozhuline = []
        for(let i =0;i<response.rows.length;i++){
          if(response.rows[i].devHappennum!=-1){
            this.dataList2.push(response.rows[i])
          }else{
            biaozhuline.push(response.rows[i])
          }
        }
        var name = []
        var date = ""
        var xdate = []
        var ndata = []
        var md = ""

        for (let i = 0; i < this.dataList2.length; i++) {
          date = this.dataList2[i].devHappenTime
          date = date.replace(/-/,'年第');
          date = date+"季度"
          if(xdate.indexOf(date) == -1){
            xdate.push(date)
          }
          if(name.indexOf(this.dataList2[i].planeType) == -1){
            name.push(this.dataList2[i].planeType)
          }
          md = {name:this.dataList2[i].planeType,time:date,num:this.dataList2[i].devHappennum}
          ndata.push(md)
        }
        var compare1 = function (x, y) {//比较函数
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          } else {
            return 0;
          }
        }
        xdate.sort(compare1)

        var ndata1 = []
        var md2 = ""
        for (let i = 0; i < biaozhuline.length; i++){
          date = biaozhuline[i].devHappenTime
          date = date.replace(/-/,'年第');
          date = date+"季度"
          md2 = {name:biaozhuline[i].planeType,time:date,num:xdate.indexOf(date)}
          ndata1.push(md2)
        }

        var fydata = new Array()
        for (let i = 0; i < name.length; i++){
          fydata[i] = new Array()
          for (let j = 0; j < xdate.length; j++){
            fydata[i][j]=0
          }
        }
        for (let i = 0; i < ndata.length; i++){
          let a = name.indexOf(ndata[i].name)
          let b = xdate.indexOf(ndata[i].time)
          fydata[a][b] = ndata[i].num
        }
        var by = ""
        var oy = []
        for (let i = 0; i < name.length; i++){
          var a1 = ""
          var a2 = []
          var a3 = ""
          for (let i1 = 0; i1 < ndata1.length; i1++){
            if(ndata1[i1].name==name[i]){
              a1 = { xAxis: ndata1[i1].num }
              a2.push(a1)
              a3 = ndata1[i1].date
            }
          }
          var mark = {
            symbol: 'triangle',
            label: { show: true, formatter: name[i]+'技术状态升级时间'},
            data: a2
          }
          by = {name:name[i], type: 'line',data: fydata[i], markLine:mark}
          oy.push(by)
        }
        // 渲染图表
        var myChart = echarts.init(document.getElementById('stackedLineChart'));
        var option={
          legend: {
            data: name
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xdate
          },
          yAxis: {
            minInterval:1,
            type: 'value'
          },
          series: oy,
        };
        option && myChart.setOption(option)
        // 刷新调整
        window.addEventListener('resize', () => {
          myChart.resize()
        })
      });
    },
  }
}
</script>

<style scoped lang="scss">
.box-card {
  padding: 10px;
  margin: 10px 5px;
}
</style>
