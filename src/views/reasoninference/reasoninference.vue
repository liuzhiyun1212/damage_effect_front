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
            >
              <span slot-scope="{data}" :class="backData.indexOf(data.id)!=-1? 'pass' : ''">
                {{data.label}}
              </span>
            </el-tree>
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
        <el-card v-if = "this.ifsplit==true" class="box-card" style="height: 450px;">
          <div v-if = "this.if1==true" >
            <el-tabs v-model="activeName" @tab-click="handleClickTab">
              <el-tab-pane v-if = "this.total1>0" label="季度" name="quarter" :lazy="true"></el-tab-pane>
              <el-tab-pane v-if = "this.total2>0" label="年度" name="year" :lazy="true"></el-tab-pane>
            </el-tabs>
          </div>
          <div v-else slot="header" class="clearfix">
            <span>判断依据</span>
          </div>
          <div class="body">
            <div id="stackedLineChart1" :style="{ width: '100%', height: '350px' }"></div>
          </div>
        </el-card>
        <el-card v-else class="box-card" style="height: 450px;">
          <div slot="header" class="clearfix">
            <span>判断依据{{yiju}}</span>
          </div>
          <div class="body">
            <div id="stackedLineChart" :style="{ width: '100%', height: '350px' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {changeDataTreeSelect} from "../../api/system/changedata";
import {
  devcapup1,
  devcapup2,
  devup1,
  devup2,
  prochaange1,
  prochaange2,
  prochaange3,
  prochaange4,
  proteam1,
  proteam2,
  properson1,
  properson2,
  promakedev1,
  promakedev2,
  promakedev3,
  promeasuringdev1,
  promeasuringdev2,
  promeasuringdev3,
  ProMakeWorkmanship1,
  ProMakeWorkmanship2,
  ProMakeWorkmanship3,
  prorepairteam1,
  prorepairteam2,
  ProRepairWorkmanship1,
  ProRepairWorkmanship2,
  devusechangequarter,
  devusechangeyear,
  ProMakePlace1,
  ProMakePlace2,
  ProMakePlace3,
  ProMakePlace4,
  prorepairperson1,
  prorepairperson2,
  prorepairdev1,
  prorepairdev2,
} from "../../api/system/reasonyuce";

export default {
  name: "reasoninference",
  data() {
    return {
      backData:[],
      activeName:"quarter",
      ifsplit:false,
      reason:"",
      yiju : "",
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
    handleClickTab(tab) {
      this.activeName = tab.name;
      this.dataList2 = []
      var myChart2 = echarts.init(document.getElementById('stackedLineChart1'));
      myChart2.clear()
      if(this.activeName=="quarter"){
        devusechangequarter().then(response1 => {
          this.printdevusechangequarter(response1.rows)
        })
      }else if(this.activeName=="year"){
        devusechangeyear().then(response2 => {
          this.printdevusechangeyear(response2.rows)
        })
      }
    },
    extension(chart) {
      // 注意这里，是以X轴显示内容过长为例，如果是y轴的话，需要把params.componentType == 'xAxis'改为yAxis
      // 判断是否创建过div框,如果创建过就不再创建了
      // 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
      var elementDiv = document.getElementById('extension')
      if (!elementDiv) {
        var div = document.createElement('div')
        div.setAttribute('id', 'extension')
        div.style.display = 'block'
        document.querySelector('html').appendChild(div)
      }
      chart.on('mouseover', function (params) {
        if (params.componentType == 'yAxis') {
          var elementDiv = document.querySelector('#extension')
          //设置悬浮文本的位置以及样式
          var elementStyle =
            'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
          elementDiv.style.cssText = elementStyle
          elementDiv.innerHTML = params.value
          document.querySelector('html').onmousemove = function (event) {
            var elementDiv = document.querySelector('#extension')
            var xx = event.pageX - 10
            var yy = event.pageY + 15
            // console.log('22', xx)
            elementDiv.style.top = yy + 'px'
            elementDiv.style.left = xx + 'px'
          }
        }
      })
      chart.on('mouseout', function (params) {
        //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        if (params.componentType == 'yAxis') {
          var elementDiv = document.querySelector('#extension')

          elementDiv.style.cssText = 'display:none'
        }
      })
    },
    getchangeTree() {
      changeDataTreeSelect().then(response => {
        this.changeOptions = response.data;
        this.handleNodeClick({id:5,label:"装备型号升级"});
      });
    },
    handleNodeClick(data) {
      if(data.id>4){
        this.reason = "可能是由于"+data.label+"导致质量问题产生"
        this.yiju = ""
        this.handleLabel(data.label)
      }
    },
    handleLabel(label){
      if(this.ifsplit==false){
        var myChart = echarts.init(document.getElementById('stackedLineChart'));
        myChart.clear()
      }else{
        var myChart2 = echarts.init(document.getElementById('stackedLineChart1'));
        myChart2.clear()
      }
      this.yiju = ""
      this.ifsplit=false
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
      this.rule1 = ""
      this.rule2 = ""
      this.rule3 = ""
      this.rule4 = ""
      if(label=="装备型号升级"){
        this.rule1 = "1.不同问题装备型号中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.问题装备型号技术状态进行升级时间与质量问题变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifdevup()
      }
      if(label=="装备能力提升"){
        this.rule1 = "1.同一型号的不同能力状态中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.问题装备型号能力提升时间与质量问题变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifdevcapup()
      }
      if(label=="产品改型"){
        this.rule1 = "1.不同故障件型号中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.相同故障件型号的不同安装方式中，某种故障模式质量问题数量存在较大差异；"
        this.rule3 = "3.相同故障件型号的不同安装位置中，某种故障模式质量问题数量存在较大差异；"
        this.rule4 = "4.故障件型号技术状态升级时间与质量问题数量变化时间一致或不超过一定范围。"
        this.ifprochaange()
      }
      if(label=="生产班组发生变化"){
        this.rule1 = "1.不同生产班组生产的相同故障件型号中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.某故障件型号生产班组发生调整时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifproteam()
      }
      if(label=="生产人员发生变化"){
        this.rule1 = "1.不同生产人员生产的相同故障件中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.大量生产新员工入职或老员工离职/换岗与质量问题数量变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifproperson()
      }
      if(label=="生产设备发生变化"){
        this.rule1 = "1.不同生产设备生产的相同故障件中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.生产线大量新设备开始使用时间与质量问题数量变化时间一致或不超过一定范围；"
        this.rule3 = "3.生产线进行升级或更换时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule4 = ""
        this.ifpromakedev()
      }
      if(label=="测量设备发生变化"){
        this.rule1 = "1.不同测量设备测量的相同故障件中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.故障件生产中测量设备批量更换时间与质量问题数量变化时间一致或不超过一定范围；"
        this.rule3 = "3.故障件出厂检测的测量设备批量更换时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule4 = ""
        this.ifpromeasuringdev()
      }
      if(label=="生产工艺发生变化"){
        this.rule1 = "1.不同生产工艺生产的故障件中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.故障件生产工艺变更时间与质量问题数量变化时间一致或不超过一定范围；"
        this.rule3 = "3.故障件检测方法变更时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule4 = ""
        this.ifProMakeWorkmanship()
      }
      if(label=="维修班组发生变化"){
        this.rule1 = "1.不同维修班组生产的相同故障件型号中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.某故障件型号维修班组发生调整时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifprorepairteam()
      }
      if(label=="维修工艺发生变化"){
        this.rule1 = "1.不同维修工艺维修的故障件中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.故障件维修工艺变更时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifProRepairWorkmanship()
      }
      if(label=="供应链发生变化"){
        this.rule1 = "1.不同故障件所用原材料来源中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.不同故障件所用零部件来源中，某种故障模式质量问题数量存在较大差异；"
        this.rule3 = "3.故障件相关原材料或原材料供应商更换时间与质量问题数量变化时间一致或不超过一定范围；"
        this.rule4 = "4.故障件所需零部件供应商发生变更时间与质量问题数量变化时间一致或不超过一定范围。"
        this.ifProMakePlace()
      }
      if(label=="使用强度发生变化"){
        this.ifsplit = true
        this.rule1 = "1.年度/季度平均飞行小时变更时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule2 = ""
        this.rule3 = ""
        this.rule4 = ""
        this.ifdevusechange()
      }
      if(label=="维修人员发生变化"){
        this.rule1 = "1.不同维修人员生产的相同故障件中，某种故障模式质量问题数量存在较大差异；"
        this.rule2 = "2.大量维修新员工入职或老员工离职/换岗与质量问题数量变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifprorepairperson()
      }
      if(label=="维修设备发生变化"){
        this.rule1 = "1.维修线大量新设备开始使用时间与质量问题数量变化时间一致或不超过一定范围；"
        this.rule2 = "2.维修线进行升级或更换时间与质量问题数量变化时间一致或不超过一定范围。"
        this.rule3 = ""
        this.rule4 = ""
        this.ifprorepairdev()
      }
    },
    handleRule(rule){
      if(this.ifsplit==false){
        var myChart = echarts.init(document.getElementById('stackedLineChart'));
        myChart.clear()
      }else{
        var myChart2 = echarts.init(document.getElementById('stackedLineChart1'));
        myChart2.clear()
      }
      this.dataList1 = []
      this.dataList2 = []
      this.dataList3 = []
      this.dataList4 = []
      if(rule=="1.不同问题装备型号中，某种故障模式质量问题数量存在较大差异；"){
        this.ruledevup1()
      }
      if(rule=="2.问题装备型号技术状态进行升级时间与质量问题变化时间一致或不超过一定范围。"){
        this.ruledevup2()
      }
      if(rule=="1.同一型号的不同能力状态中，某种故障模式质量问题数量存在较大差异；"){
        this.ruledevcapup1()
      }
      if(rule=="2.问题装备型号能力提升时间与质量问题变化时间一致或不超过一定范围。"){
        this.ruledevcapup2()
      }
      if(rule=="1.不同故障件型号中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleprochaange1()
      }
      if(rule=="2.相同故障件型号的不同安装方式中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleprochaange2()
      }
      if(rule=="3.相同故障件型号的不同安装位置中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleprochaange3()
      }
      if(rule=="4.故障件型号技术状态升级时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleprochaange4()
      }
      if(rule=="1.不同生产班组生产的相同故障件型号中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleproteam1()
      }
      if(rule=="2.某故障件型号生产班组发生调整时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleproteam2()
      }
      if(rule=="1.不同生产人员生产的相同故障件中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleproperson1()
      }
      if(rule=="2.大量生产新员工入职或老员工离职/换岗与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleproperson2()
      }
      if(rule=="1.不同生产设备生产的相同故障件中，某种故障模式质量问题数量存在较大差异；"){
        this.rulepromakedev1()
      }
      if(rule=="2.生产线大量新设备开始使用时间与质量问题数量变化时间一致或不超过一定范围；"){
        this.rulepromakedev2()
      }
      if(rule=="3.生产线进行升级或更换时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.rulepromakedev3()
      }
      if(rule=="1.不同测量设备测量的相同故障件中，某种故障模式质量问题数量存在较大差异；"){
        this.rulepromeasuringdev1()
      }
      if(rule=="2.故障件生产中测量设备批量更换时间与质量问题数量变化时间一致或不超过一定范围；"){
        this.rulepromeasuringdev2()
      }
      if(rule=="3.故障件出厂检测的测量设备批量更换时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.rulepromeasuringdev3()
      }
      if(rule=="1.不同生产工艺生产的故障件中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleProMakeWorkmanship1()
      }
      if(rule=="2.故障件生产工艺变更时间与质量问题数量变化时间一致或不超过一定范围；"){
        this.ruleProMakeWorkmanship2()
      }
      if(rule=="3.故障件检测方法变更时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleProMakeWorkmanship3()
      }
      if(rule=="1.不同维修班组生产的相同故障件型号中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleprorepairteam1()
      }
      if(rule=="2.某故障件型号维修班组发生调整时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleprorepairteam2()
      }
      if(rule=="1.不同维修工艺维修的故障件中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleProRepairWorkmanship1()
      }
      if(rule=="2.故障件维修工艺变更时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleProRepairWorkmanship2()
      }
      if(rule=="1.年度/季度平均飞行小时变更时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruledevusechange()
      }
      if(rule=="1.不同故障件所用原材料来源中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleProMakePlace1()
      }
      if(rule=="2.不同故障件所用零部件来源中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleProMakePlace2()
      }
      if(rule=="3.故障件相关原材料或原材料供应商更换时间与质量问题数量变化时间一致或不超过一定范围；"){
        this.ruleProMakePlace3()
      }
      if(rule=="4.故障件所需零部件供应商发生变更时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleProMakePlace4()
      }
      if(rule=="1.不同维修人员生产的相同故障件中，某种故障模式质量问题数量存在较大差异；"){
        this.ruleprorepairperson1()
      }
      if(rule=="2.大量维修新员工入职或老员工离职/换岗与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleprorepairperson2()
      }
      if(rule=="1.维修线大量新设备开始使用时间与质量问题数量变化时间一致或不超过一定范围；"){
        this.ruleprorepairdev1()
      }
      if(rule=="2.维修线进行升级或更换时间与质量问题数量变化时间一致或不超过一定范围。"){
        this.ruleprorepairdev2()
      }
    },
    ifprorepairperson(){
      prorepairperson1().then(response1 => {
        prorepairperson2().then(response => {
          this.total1 = response1.total
          this.total2 = response.total
          if(this.total1>0&&this.total2>0){
            this.if1 = true
            this.if2 = true
            this.printprorepairperson1(response1.rows)
          }else if(this.total1>0){
            this.if1 = true
            this.printprorepairperson1(response1.rows)
          }else if(this.total2>0){
            this.if2 = true
            this.printprorepairperson2(response.rows)
          }
        })
      })
    },
    ifprorepairdev(){
      prorepairdev1().then(response1 => {
        prorepairdev2().then(response => {
          this.total1 = response1.total
          this.total2 = response.total
          if(this.total1>0&&this.total2>0){
            this.if1 = true
            this.if2 = true
            this.printprorepairdev1(response1.rows)
          }else if(this.total1>0){
            this.if1 = true
            this.printprorepairdev1(response1.rows)
          }else if(this.total2>0){
            this.if2 = true
            this.printprorepairdev2(response.rows)
          }
        })
      })
    },
    ifProMakePlace(){
      ProMakePlace1().then(response1 => {
        ProMakePlace2().then(response2 => {
          ProMakePlace3().then(response3 => {
            ProMakePlace4().then(response4 => {
              this.total1 = response1.total;
              this.total2 = response2.total;
              this.total3 = response3.total;
              this.total4 = response4.total;
              if(this.total1>0){
                this.if1 = true
              }
              if(this.total2>0){
                this.if2 = true
              }
              if(this.total3>0){
                this.if3 = true
              }
              if(this.total4>0){
                this.if4 = true
              }
              if(this.total1>0){
                this.printProMakePlace1(response1.rows)
              }else if(this.total2>0){
                this.printProMakePlace2(response2.rows)
              }else if(this.total3>0){
                this.printProMakePlace3(response3.rows)
              }else if(this.total4>0){
                this.printProMakePlace4(response4.rows)
              }
            })
          })
        })
      })
    },
    ifdevusechange(){
      devusechangequarter().then(response1 => {
        devusechangeyear().then(response2 => {
          this.total1 = response1.total;
          this.total2 = response2.total;
          if(this.total1>0||this.total2>0){
            this.if1 = true
          }
          if(this.total1>0){
            this.activeName="quarter"
            this.printdevusechangequarter(response1.rows)
          }else if(this.total2>0){
            this.activeName="year"
            this.printdevusechangeyear(response2.rows)
          }
        })
      })
    },
    ifProRepairWorkmanship(){
      ProRepairWorkmanship1().then(response1 => {
        ProRepairWorkmanship2().then(response2 => {
          this.total1 = response1.total;
          this.total2 = response2.total;
          if(this.total1>0){
            this.if1 = true
          }
          if(this.total2>0){
            this.if2 = true
          }
          if(this.total1>0){
            this.printProRepairWorkmanship1(response1.rows)
          }else if(this.total2>0){
            this.printProRepairWorkmanship2(response2.rows)
          }
        })
      })
    },
    ifprorepairteam(){
      prorepairteam1().then(response1 => {
        prorepairteam2().then(response => {
          this.total1 = response1.total
          this.total2 = response.total
          if(this.total1>0&&this.total2>0){
            this.if1 = true
            this.if2 = true
            this.printprorepairteam1(response1.rows)
          }else if(this.total1>0){
            this.if1 = true
            this.printprorepairteam1(response1.rows)
          }else if(this.total2>0){
            this.if2 = true
            this.printprorepairteam2(response.rows)
          }
        })
      })
    },
    ifProMakeWorkmanship(){
      ProMakeWorkmanship1().then(response1 => {
        ProMakeWorkmanship2().then(response2 => {
          ProMakeWorkmanship3().then(response3 => {
            this.total1 = response1.total;
            this.total2 = response2.total;
            this.total3 = response3.total;
            if(this.total1>0){
              this.if1 = true
            }
            if(this.total2>0){
              this.if2 = true
            }
            if(this.total3>0){
              this.if3 = true
            }
            if(this.total1>0){
              this.printProMakeWorkmanship1(response1.rows)
            }else if(this.total2>0){
              this.printProMakeWorkmanship2(response2.rows)
            }else if(this.total3>0){
              this.printProMakeWorkmanship3(response3.rows)
            }
          })
        })
      })
    },
    ifpromeasuringdev(){
      promeasuringdev1().then(response1 => {
        promeasuringdev2().then(response2 => {
          promeasuringdev3().then(response3 => {
            this.total1 = response1.total;
            this.total2 = response2.total;
            this.total3 = response3.total;
            if(this.total1>0){
              this.if1 = true
            }
            if(this.total2>0){
              this.if2 = true
            }
            if(this.total3>0){
              this.if3 = true
            }
            if(this.total1>0){
              this.printpromeasuringdev1(response1.rows)
            }else if(this.total2>0){
              this.printpromeasuringdev2(response2.rows)
            }else if(this.total3>0){
              this.printpromeasuringdev3(response3.rows)
            }
          })
        })
      })
    },
    ifpromakedev(){
      promakedev1().then(response1 => {
        promakedev2().then(response2 => {
          promakedev3().then(response3 => {
            this.total1 = response1.total;
            this.total2 = response2.total;
            this.total3 = response3.total;
            if(this.total1>0){
              this.if1 = true
            }
            if(this.total2>0){
              this.if2 = true
            }
            if(this.total3>0){
              this.if3 = true
            }
            if(this.total1>0){
              this.printpromakedev1(response1.rows)
            }else if(this.total2>0){
              this.printpromakedev2(response2.rows)
            }else if(this.total3>0){
              this.printpromakedev3(response3.rows)
            }
          })
        })
      })
    },
    ifproperson(){
      properson1().then(response1 => {
        properson2().then(response2 => {
          this.total1 = response1.total;
          this.total2 = response2.total;
          if(this.total1>0){
            this.if1 = true
          }
          if(this.total2>0){
            this.if2 = true
          }
          if(this.total1>0){
            this.printproperson1(response1.rows)
          }else if(this.total2>0){
            this.printproperson2(response2.rows)
          }
        })
      })
    },
    ifproteam(){
      proteam1().then(response1 => {
        proteam2().then(response2 => {
          this.total1 = response1.total;
          this.total2 = response2.total;
          if(this.total1>0){
            this.if1 = true
          }
          if(this.total2>0){
            this.if2 = true
          }
          if(this.total1>0){
            this.printproteam1(response1.rows)
          }else if(this.total2>0){
            this.printproteam2(response2.rows)
          }
        })
      })
    },
    ifprochaange(){
      prochaange1().then(response1 => {
        prochaange2().then(response2 => {
          prochaange3().then(response3 => {
            prochaange4().then(response4 => {
              this.total1 = response1.total;
              this.total2 = response2.total;
              this.total3 = response3.total;
              this.total4 = response4.total;
              if(this.total1>0){
                this.if1 = true
              }
              if(this.total2>0){
                this.if2 = true
              }
              if(this.total3>0){
                this.if3 = true
              }
              if(this.total4>0){
                this.if4 = true
              }
              if(this.total1>0){
                this.printprochaange1(response1.rows)
              }else if(this.total2>0){
                this.printprochaange2(response2.rows)
              }else if(this.total3>0){
                this.printprochaange3(response3.rows)
              }else if(this.total4>0){
                this.printprochaange4(response4.rows)
              }
            })
          })
        })
      })
    },
    ifdevup(){
      devup1().then(response1 => {
        devup2().then(response => {
          this.total1 = response1.total
          this.total2 = response.total
          if(this.total1>0&&this.total2>0){
            this.if1 = true
            this.if2 = true
            this.printdevup1(response1.rows)
          }else if(this.total1>0){
            this.if1 = true
            this.printdevup1(response1.rows)
          }else if(this.total2>0){
            this.if2 = true
            this.printdevup2(response.rows)
          }
        })
      })
    },
    ifdevcapup(){
      devcapup1().then(response1 => {
        devcapup2().then(response => {
          this.total1 = response1.total
          this.total2 = response.total
          if(this.total1>0&&this.total2>0){
            this.if1 = true
            this.if2 = true
            this.printdevcapup1(response1.rows)
          }else if(this.total1>0){
            this.if1 = true
            this.printdevcapup1(response1.rows)
          }else if(this.total2>0){
            this.if2 = true
            this.printdevcapup2(response.rows)
          }
        })
      })
    },
    ruledevup1(){
      devup1().then(response => {
        this.printdevup1(response.rows)
      })
    },
    ruledevup2(){
      devup2().then(response => {
        this.printdevup2(response.rows)
      });
    },
    ruledevcapup1(){
      devcapup1().then(response => {
        this.printdevcapup1(response.rows)
      })
    },
    ruledevcapup2(){
      devcapup2().then(response => {
        this.printdevcapup2(response.rows)
      });
    },
    ruleProMakePlace1(){
      ProMakePlace1().then(response => {
        this.printProMakePlace1(response.rows)
      })
    },
    ruleProMakePlace2(){
      ProMakePlace2().then(response => {
        this.printProMakePlace2(response.rows)
      })
    },
    ruleProMakePlace3(){
      ProMakePlace3().then(response => {
        this.printProMakePlace3(response.rows)
      })
    },
    ruleProMakePlace4(){
      ProMakePlace4().then(response => {
        this.printProMakePlace4(response.rows)
      })
    },
    ruleproteam1(){
      proteam1().then(response => {
        this.printproteam1(response.rows)
      })
    },
    ruleproteam2(){
      proteam2().then(response => {
        this.printproteam2(response.rows)
      })
    },
    ruleproperson1(){
      properson1().then(response => {
        this.printproperson1(response.rows)
      })
    },
    ruleproperson2(){
      properson2().then(response => {
        this.printproperson2(response.rows)
      })
    },
    rulepromakedev1(){
      promakedev1().then(response => {
        this.printpromakedev1(response.rows)
      })
    },
    rulepromakedev2(){
      promakedev2().then(response => {
        this.printpromakedev2(response.rows)
      })
    },
    rulepromakedev3(){
      promakedev3().then(response => {
        this.printpromakedev3(response.rows)
      })
    },
    rulepromeasuringdev1(){
      promeasuringdev1().then(response => {
        this.printpromeasuringdev1(response.rows)
      })
    },
    rulepromeasuringdev2(){
      promeasuringdev2().then(response => {
        this.printpromeasuringdev2(response.rows)
      })
    },
    rulepromeasuringdev3(){
      promeasuringdev3().then(response => {
        this.printpromeasuringdev3(response.rows)
      })
    },
    ruleProMakeWorkmanship1(){
      ProMakeWorkmanship1().then(response => {
        this.printProMakeWorkmanship1(response.rows)
      })
    },
    ruleProMakeWorkmanship2(){
      ProMakeWorkmanship2().then(response => {
        this.printProMakeWorkmanship2(response.rows)
      })
    },
    ruleProMakeWorkmanship3(){
      ProMakeWorkmanship3().then(response => {
        this.printProMakeWorkmanship3(response.rows)
      })
    },
    ruleprorepairteam1(){
      prorepairteam1().then(response => {
        this.printprorepairteam1(response.rows)
      })
    },
    ruleprorepairteam2(){
      prorepairteam2().then(response => {
        this.printprorepairteam2(response.rows)
      })
    },
    ruleProRepairWorkmanship1(){
      ProRepairWorkmanship1().then(response => {
        this.printProRepairWorkmanship1(response.rows)
      })
    },
    ruleProRepairWorkmanship2(){
      ProRepairWorkmanship2().then(response => {
        this.printProRepairWorkmanship2(response.rows)
      })
    },
    ruledevusechange(){
      devusechangequarter().then(response1 => {
        devusechangeyear().then(response2 => {
          this.total1 = response1.total;
          this.total2 = response2.total;
          if(this.total1>0){
            this.activeName="quarter"
            this.printdevusechangequarter(response1.rows)
          }else if(this.total2>0){
            this.activeName="year"
            this.printdevusechangeyear(response2.rows)
          }
        })
      })
    },
    ruleprochaange1(){
      prochaange1().then(response => {
        this.printprochaange1(response.rows)
      })
    },
    ruleprochaange2(){
      prochaange2().then(response => {
        this.printprochaange2(response.rows)
      })
    },
    ruleprochaange3(){
      prochaange3().then(response => {
        this.printprochaange3(response.rows)
      })
    },
    ruleprochaange4(){
      prochaange4().then(response => {
        this.printprochaange4(response.rows)
      })
    },
    ruleprorepairperson1(){
      prorepairperson1().then(response => {
        this.printprorepairperson1(response.rows)
      })
    },
    ruleprorepairperson2(){
      prorepairperson2().then(response => {
        this.printprorepairperson2(response.rows)
      });
    },
    ruleprorepairdev1(){
      prorepairdev1().then(response => {
        this.printprorepairdev1(response.rows)
      })
    },
    ruleprorepairdev2(){
      prorepairdev2().then(response => {
        this.printprorepairdev2(response.rows)
      });
    },
    printdevup1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].modelSeries + "-" + this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].planeType) == -1){
          xdate.push(this.dataList1[i].planeType)
        }
        md = {name:date,id:this.dataList1[i].planeType,time:this.dataList1[i].planeType,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printdevup2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        if(name.indexOf(this.dataList2[i].modelSeries) == -1){
          name.push(this.dataList2[i].modelSeries)
        }
        md = {name:this.dataList2[i].modelSeries,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      var date1 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].modelSeries
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].modelSeries
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].modelSeries
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].modelSeries
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].modelSeries
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis: xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'技术状态升级时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printdevcapup1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].planeType + "-" + this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].capabilityStatus) == -1){
          xdate.push(this.dataList1[i].capabilityStatus)
        }
        md = {name:date,time:this.dataList1[i].capabilityStatus,num:this.dataList1[i].devHappennum}
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
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i], type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];
            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printdevcapup2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      var date1 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].planeType
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].planeType
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].planeType
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].planeType
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].planeType
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'能力提升时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printprochaange1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "-" + this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].planeType) == -1){
          xdate.push(this.dataList1[i].planeType)
        }
        md = {name:date,id:this.dataList1[i].planeType,time:this.dataList1[i].planeType,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printprochaange2(rows){
      this.yiju = "（判断规则2）"
      this.dataList2 = rows
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"+this.dataList2[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList2[i].installMethod) == -1){
          xdate.push(this.dataList2[i].installMethod)
        }
        md = {name:date,time:this.dataList2[i].installMethod,id:this.dataList2[i].installMethod,num:this.dataList2[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i], type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];
            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printprochaange3(rows){
      this.yiju = "（判断规则3）"
      this.dataList3 = rows
      var name = []
      var date = ""
      var xdate = []
      var xx = []
      var x = ""
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList3.length; i++) {
        date = this.dataList3[i].partsName + "（" + this.dataList3[i].partsModel + "）"+this.dataList3[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        xx = this.dataList3[i].installWhere.split('/')
        let xx1 = ""
        let xx2 = ""
        switch (xx[1]) {
          case "1":
            xx1 = "上"
            break
          case "2":
            xx1 = "中"
            break
          case "3":
            xx1 = "下"
            break
          default:
            xx1 = ""
        }
        switch (xx[2]) {
          case "1":
            xx2 = "左"
            break
          case "2":
            xx2 = "中"
            break
          case "3":
            xx2 = "右"
            break
          default:
            xx2 = ""
        }
        x = '（'+xx[0]+'框，'+xx1+'，'+xx2+'）'
        if(xdate.indexOf(x) == -1){
          xdate.push(x)
        }
        md = {name:date,id:x,time:x,num:this.dataList3[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i], type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];
            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName+'（框，上中下，左中右）' + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printprochaange4(rows){
      this.yiju = "（判断规则4）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList4.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList4.length; i++) {
        date = this.dataList4[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        if(name.indexOf(this.dataList4[i].partsName) == -1){
          name.push(this.dataList4[i].partsName)
        }
        md = {name:this.dataList4[i].partsName,time:date,num:this.dataList4[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      var date1 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis: xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'技术状态升级时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printproteam1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakeGroup) == -1){
          xdate.push(this.dataList1[i].partsMakeGroup)
        }
        md = {name:date,id:this.dataList1[i].partsMakeGroup,time:this.dataList1[i].partsMakeGroup,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printproteam2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'生产班组变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printproperson1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakePeople) == -1){
          xdate.push(this.dataList1[i].partsMakePeople)
        }
        md = {name:date,id:this.dataList1[i].partsMakePeople,time:this.dataList1[i].partsMakePeople,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printproperson2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = biaozhuline[i].installMethod
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa&&biaozhuline[i].installMethod==biaozhuline[j].installMethod){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = biaozhuline[i].installMethod
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa&&biaozhuline[i].installMethod!=biaozhuline[j].installMethod){
            sss = j
            if(date2.indexOf(biaozhuline[sss].installMethod)==-1){
              date2 += "和"+biaozhuline[sss].installMethod
            }
            biaozhuline.splice(sss,1)
          }
        }
        if(date2==null){
          date2 = "生产人员变更"
        }
        md2 = {name:date1,time:date,type:date1+date2}
        ndata1.push(md2)
      }
      for (let i = 0; i < ndata1.length; i++){
        date2 = ndata1[i].type
        let sss = -1
        for (let j = i; j < ndata1.length; j++){
          date = ndata1[i].time
          let aaa = ndata1[j].type
          if(ndata1[i].time==ndata1[j].time&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "、"+aaa
            }
            ndata1.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      ndata1 = []
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printpromakedev1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakeQuipment) == -1){
          xdate.push(this.dataList1[i].partsMakeQuipment)
        }
        md = {name:date,id:this.dataList1[i].partsMakeQuipment,time:this.dataList1[i].partsMakeQuipment,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printpromakedev2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'生产线大量新设备开始使用时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printpromakedev3(rows){
      this.yiju = "（判断规则3）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList3.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList3.length; i++) {
        date = this.dataList3[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList3[i].partsName + "（" + this.dataList3[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList3[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'生产线进行升级或更换时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printpromeasuringdev1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMeasuringQuipment) == -1){
          xdate.push(this.dataList1[i].partsMeasuringQuipment)
        }
        md = {name:date,id:this.dataList1[i].partsMeasuringQuipment,time:this.dataList1[i].partsMeasuringQuipment,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printpromeasuringdev2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'生产中测量设备批量更换时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printpromeasuringdev3(rows){
      this.yiju = "（判断规则3）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList3.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList3.length; i++) {
        date = this.dataList3[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList3[i].partsName + "（" + this.dataList3[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList3[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'出厂检测的测量设备批量更换时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printProMakeWorkmanship1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakeWorkmanship) == -1){
          xdate.push(this.dataList1[i].partsMakeWorkmanship)
        }
        md = {name:date,id:this.dataList1[i].partsMakeWorkmanship,time:this.dataList1[i].partsMakeWorkmanship,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printProMakeWorkmanship2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'生产工艺变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printProMakeWorkmanship3(rows){
      this.yiju = "（判断规则3）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList3.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList3.length; i++) {
        date = this.dataList3[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList3[i].partsName + "（" + this.dataList3[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList3[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'检测方法变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printprorepairteam1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakeGroup) == -1){
          xdate.push(this.dataList1[i].partsMakeGroup)
        }
        md = {name:date,id:this.dataList1[i].partsMakeGroup,time:this.dataList1[i].partsMakeGroup,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printprorepairteam2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'维修班组变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printProRepairWorkmanship1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakeWorkmanship) == -1){
          xdate.push(this.dataList1[i].partsMakeWorkmanship)
        }
        md = {name:date,id:this.dataList1[i].partsMakeWorkmanship,time:this.dataList1[i].partsMakeWorkmanship,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printProRepairWorkmanship2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'维修工艺变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printdevusechangequarter(rows){
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      var date1 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].planeType
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].planeType
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].planeType
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].planeType
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].planeType
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'平均飞行小时变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart1'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printdevusechangeyear(rows){
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      var date1 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].planeType
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].planeType
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].planeType
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].planeType
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].planeType
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'平均飞行小时变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart1'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printProMakePlace1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].rawMaterialPlace) == -1){
          xdate.push(this.dataList1[i].rawMaterialPlace)
        }
        md = {name:date,id:this.dataList1[i].rawMaterialPlace,time:this.dataList1[i].rawMaterialPlace,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printProMakePlace2(rows){
      this.yiju = "（判断规则2）"
      this.dataList2 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"+this.dataList2[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList2[i].sparePartsPlace) == -1){
          xdate.push(this.dataList2[i].sparePartsPlace)
        }
        md = {name:date,id:this.dataList2[i].sparePartsPlace,time:this.dataList2[i].sparePartsPlace,num:this.dataList2[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printProMakePlace3(rows){
      this.yiju = "（判断规则3）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList3.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList3.length; i++) {
        date = this.dataList3[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList3[i].partsName + "（" + this.dataList3[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList3[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = biaozhuline[i].installMethod
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa&&biaozhuline[i].installMethod==biaozhuline[j].installMethod){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = biaozhuline[i].installMethod
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa&&biaozhuline[i].installMethod!=biaozhuline[j].installMethod){
            sss = j
            if(date2.indexOf(biaozhuline[sss].installMethod)==-1){
              date2 += "和"+biaozhuline[sss].installMethod
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {name:date1,time:date,type:date1+date2}
        ndata1.push(md2)
      }
      for (let i = 0; i < ndata1.length; i++){
        date2 = ndata1[i].type
        let sss = -1
        for (let j = i; j < ndata1.length; j++){
          date = ndata1[i].time
          let aaa = ndata1[j].type
          if(ndata1[i].time==ndata1[j].time&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "、"+aaa
            }
            ndata1.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      ndata1 = []
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printProMakePlace4(rows){
      this.yiju = "（判断规则4）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList4.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList4.length; i++) {
        date = this.dataList4[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList4[i].partsName + "（" + this.dataList4[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList4[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'零部件供应商变更时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printprorepairperson1(rows){
      this.yiju = "（判断规则1）"
      this.dataList1 = rows

      var name = []
      var date = ""
      var xdate = []
      var ndata = []
      var md = ""

      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"+this.dataList1[i].faultModel
        if(name.indexOf(date) == -1){
          name.push(date)
        }
        if(xdate.indexOf(this.dataList1[i].partsMakePeople) == -1){
          xdate.push(this.dataList1[i].partsMakePeople)
        }
        md = {name:date,id:this.dataList1[i].partsMakePeople,time:this.dataList1[i].partsMakePeople,num:this.dataList1[i].devHappennum}
        ndata.push(md)
      }
      var xdate1 = []
      for (let i = 0; i < xdate.length; i++){
        xdate1.push(xdate[i])
      }
      var fydata = new Array()
      var ydata = new Array()
      for (let i = 0; i < xdate.length; i++){
        fydata[i] = new Array()
        ydata[i] = new Array()
        for (let j = 0; j < name.length; j++){
          fydata[i][j]=0
          ydata[i][j]=""
        }
      }
      for (let i = 0; i < ndata.length; i++){
        let a = name.indexOf(ndata[i].name)
        let b = xdate.indexOf(ndata[i].time)
        fydata[b][a] = ndata[i].num
        ydata[b][a] = ndata[i].id
      }
      var by = ""
      var oy = []
      var labelOption = {
        normal: {
          show : true,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < xdate.length; i++){
        by = {name:xdate1[i],type: 'bar',stack: 'total',data: fydata[i],label: labelOption}
        oy.push(by)
      }
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  let a = name.indexOf(getName)
                  let b = xdate1.indexOf(params[i].seriesName)
                  html += ydata[b][a] + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: xdate1
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          minInterval:1,
          type: 'value',
        },
        yAxis: {
          data: name,
          type: 'category',
          scale: true,
          triggerEvent: true,
          axisLabel:{
            interval: 0,
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
          },
        },
        series: oy,
      };
      option && myChart.setOption(option)
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      this.extension(myChart);
    },
    printprorepairperson2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = biaozhuline[i].installMethod
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa&&biaozhuline[i].installMethod==biaozhuline[j].installMethod){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = biaozhuline[i].installMethod
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa&&biaozhuline[i].installMethod!=biaozhuline[j].installMethod){
            sss = j
            if(date2.indexOf(biaozhuline[sss].installMethod)==-1){
              date2 += "和"+biaozhuline[sss].installMethod
            }
            biaozhuline.splice(sss,1)
          }
        }
        if(date2==null){
          date2 = "生产人员变更"
        }
        md2 = {name:date1,time:date,type:date1+date2}
        ndata1.push(md2)
      }
      for (let i = 0; i < ndata1.length; i++){
        date2 = ndata1[i].type
        let sss = -1
        for (let j = i; j < ndata1.length; j++){
          date = ndata1[i].time
          let aaa = ndata1[j].type
          if(ndata1[i].time==ndata1[j].time&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "、"+aaa
            }
            ndata1.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      ndata1 = []
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printprorepairdev1(rows){
      this.yiju = "（判断规则1）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList1.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList1.length; i++) {
        date = this.dataList1[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList1[i].partsName + "（" + this.dataList1[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList1[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'维修线大量新设备开始使用时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    },
    printprorepairdev2(rows){
      this.yiju = "（判断规则2）"
      var biaozhuline = []
      for(let i =0;i<rows.length;i++){
        if(rows[i].devHappennum!=-1){
          this.dataList2.push(rows[i])
        }else{
          biaozhuline.push(rows[i])
        }
      }
      var name = []
      var date = ""
      var date1 = ""
      var xdate = []
      var ndata = []
      var md = ""
      for (let i = 0; i < this.dataList2.length; i++) {
        date = this.dataList2[i].devHappenTime
        if(xdate.indexOf(date) == -1){
          xdate.push(date)
        }
        date1 = this.dataList2[i].partsName + "（" + this.dataList2[i].partsModel + "）"
        if(name.indexOf(date1) == -1){
          name.push(date1)
        }
        md = {name:date1,time:date,num:this.dataList2[i].devHappennum}
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
      var ndatatt = []
      var md2 = ""
      var date2 = ""
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1==aaa){
            biaozhuline.splice(j,1)
          }
        }
      }
      var bb = []
      for (let i = 0; i < biaozhuline.length; i++){
        bb.push(biaozhuline[i])
      }
      for (let i = 0; i < biaozhuline.length; i++){
        date = biaozhuline[i].devHappenTime
        date1 = biaozhuline[i].partsName + "（" + biaozhuline[i].partsModel + "）"
        date2 = date1
        let sss = -1
        for (let j = i; j < biaozhuline.length; j++){
          let aaa = biaozhuline[j].partsName + "（" + biaozhuline[j].partsModel + "）"
          if(date==biaozhuline[j].devHappenTime&&i!=j&&date1!=aaa){
            sss = j
            if(date2.indexOf(aaa)==-1){
              date2 += "和"+aaa
            }
            biaozhuline.splice(sss,1)
          }
        }
        md2 = {time:date,type:date2}
        ndatatt.push(md2)
      }
      for (let i = 0; i < bb.length; i++){
        for (let j = 0; j < ndatatt.length; j++){
          date = bb[i].devHappenTime
          date1 = bb[i].partsName + "（" + bb[i].partsModel + "）"
          if(date==ndatatt[j].time){
            md2 = {name:date1,time:date,type:ndatatt[j].type}
            ndata1.push(md2)
          }
        }
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
      var labelOption = {
        normal: {
          show : false,
          formatter: function(params) {
            // params是每根柱子的对象
            var html = '';
            if (params.value > 0) {
              // 千万不要html += '';
              html = params.value
              return html;
            }
            // 没有数据的返回'' 不是返回0
            return html;
          },
        }
      }
      for (let i = 0; i < name.length; i++){
        var a1 = ""
        var a2 = []
        for (let i1 = 0; i1 < ndata1.length; i1++){
          if(ndata1[i1].name==name[i]){
            a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
            a2.push(a1)
          }
        }
        var mark = {
          symbol: 'triangle',
          label: { show: true,
            formatter: function(params){
              let a = ""
              for (let i1 = 0; i1 < ndata1.length; i1++){
                if(ndata1[i1].time==xdate[params.value]){
                  a = ndata1[i1].type
                }
              }
              return a+'维修线进行升级或更换时间'
            }
          },
          data: a2
        }
        by = {name:name[i], type: 'line',data: fydata[i], markLine:mark,label: labelOption}
        oy.push(by)
      }
      // 渲染图表
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      var option={
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var html = '';
            if (params.length != 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value != 0
                  && params[i].value != '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '次<br/>';
                }
              }
            }
            if(html == getName + '<br/>'||html == ''){
              return null
            }
            return html;
          }
        },
        legend: {
          data: name
        },
        grid: {
          left: '1%',
          right: '4.2%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          name:"年-季度",
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval: 0
          },
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
    }
  }
}
</script>

<style scoped lang="scss">
.box-card {
  padding: 10px;
  margin: 10px 5px;
}
.pass {
  background-color: red;
}
</style>
