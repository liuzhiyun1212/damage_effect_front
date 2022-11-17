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
            <span>判断依据{{yiju}}</span>
          </div>
          <div class="body">
            <div id="stackedLineChart" :style="{ width: '100%', height: '250px' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {changeDataTreeSelect} from "../../api/system/changedata";
import {devcapup1,devcapup2, devup1, devup2} from "../../api/system/reasonyuce";

export default {
  name: "reasoninference",
  data() {
    return {
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
      this.yiju = ""
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
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      myChart.clear()
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
      }
    },
    handleRule(rule){
      var myChart = echarts.init(document.getElementById('stackedLineChart'));
      myChart.clear()
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
    },
    ifdevup(){
      devup1().then(response1 => {
        devup2().then(response => {
          this.total1 = response1.total
          this.total2 = response.total
          if(this.total1>0&&this.total2>0){
            this.if1 = true
            this.if2 = true
            this.ruledevup1()
          }else if(this.total1>0){
            this.if1 = true
            this.ruledevup1()
          }else if(this.total2>0){
            this.if2 = true
            this.ruledevup2()
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
            this.ruledevcapup1()
          }else if(this.total1>0){
            this.if1 = true
            this.ruledevcapup1()
          }else if(this.total2>0){
            this.if2 = true
            this.ruledevcapup2()
          }
        })
      })
    },
    ruledevup1(){
      devup1().then(response => {
        this.yiju = "（判断规则1）"
        this.dataList1 = response.rows

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
          if(xdate.indexOf(this.dataList1[i].devHappenTime) == -1){
            xdate.push(this.dataList1[i].devHappenTime)
          }
          md = {name:date,id:this.dataList1[i].planeType,time:this.dataList1[i].devHappenTime,num:this.dataList1[i].devHappennum}
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
          let a = i+1;
          xdate1.push("型号"+a)
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
        for (let i = 0;;){
          let aaa = false
          for (let j = 0; j < fydata[0].length; j++){
            if(fydata[i][j]>0){
              aaa = true
            }
          }
          if(aaa==false){
            xdate1.splice(i,1)
            xdate.splice(i,1)
            fydata.splice(i,1)
            ydata.splice(i,1)
          }
          if(i==fydata.length-1){
            break;
          }
          if(aaa==true){
            i++
          }
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
            axisLabel:{
              interval: 0
            },
          },
          series: oy,
        };
        option && myChart.setOption(option)
        // 刷新调整
        window.addEventListener('resize', () => {
          myChart.resize()
        })
      })
    },
    ruledevup2(){
      devup2().then(response => {
        this.yiju = "（判断规则2）"
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
          if(xdate.indexOf(date) == -1){
            xdate.push(date)
          }
          if(name.indexOf(this.dataList2[i].modelSeries) == -1){
            name.push(this.dataList2[i].modelSeries)
          }
          md = {name:this.dataList2[i].modelSeries,id:this.dataList2[i].planeType,time:date,num:this.dataList2[i].devHappennum}
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
          md2 = {name:biaozhuline[i].modelSeries,id:this.dataList2[i].planeType,time:date,num:xdate.indexOf(date)}
          ndata1.push(md2)
        }

        var fydata = new Array()
        var ydata = new Array()
        for (let i = 0; i < name.length; i++){
          fydata[i] = new Array()
          ydata[i] = new Array()
          for (let j = 0; j < xdate.length; j++){
            fydata[i][j]=0
            ydata[i][j]=""
          }
        }
        for (let i = 0; i < ndata.length; i++){
          let a = name.indexOf(ndata[i].name)
          let b = xdate.indexOf(ndata[i].time)
          fydata[a][b] = ndata[i].num
          ydata[a][b] = ndata[i].id
        }
        for (let i = 0;;){
          let aaa = false
          for (let j = 0; j < fydata.length; j++){
            if(fydata[j][i]>0){
              aaa = true
            }
          }
          if(aaa==false){
            for (let i1 = 0; i1 < ndata1.length; i1++){
              if(ndata1[i1].time==xdate[i]){
                aaa = true
              }
            }
          }
          if(aaa==false){
            xdate.splice(i,1)
            for (let j = 0; j < fydata.length; j++){
              fydata[j].splice(i,1)
              ydata[j].splice(i,1)
            }
          }
          if(i==fydata[0].length-1){
            break;
          }
          if(aaa==true){
            i++
          }
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
          var a3 = ""
          for (let i1 = 0; i1 < ndata1.length; i1++){
            if(ndata1[i1].name==name[i]){
              a1 = { xAxis: xdate.indexOf(ndata1[i1].time) }
              a2.push(a1)
              a3 = ndata1[i1].date
            }
          }
          var mark = {
            symbol: 'triangle',
            label: { show: true, formatter: name[i]+'技术状态升级时间'},
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
                    let a = name.indexOf(params[i].seriesName)
                    let b = xdate.indexOf(getName)
                    let d = ydata[a][b]
                    html += d + ': ' + params[i].value + '次<br/>';
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
      });
    },
    ruledevcapup1(){
      devcapup1().then(response => {
        this.yiju = "（判断规则1）"
        this.dataList1 = response.rows
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
        for (let i = 0;;){
          let aaa = false
          for (let j = 0; j < fydata[0].length; j++){
            if(fydata[i][j]>0){
              aaa = true
            }
          }
          if(aaa==false){
            xdate1.splice(i,1)
            xdate.splice(i,1)
            fydata.splice(i,1)
          }
          if(i==fydata.length-1){
            break;
          }
          if(aaa==true){
            i++
          }
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
            axisLabel:{
              interval: 0
            },
          },
          series: oy,
        };
        option && myChart.setOption(option)
        // 刷新调整
        window.addEventListener('resize', () => {
          myChart.resize()
        })
      })
    },
    ruledevcapup2(){
      devcapup2().then(response => {
        this.yiju = "（判断规则2）"
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
          md2 = {name:biaozhuline[i].planeType,time:date}
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
        for (let i = 0;;){
          let aaa = false
          for (let j = 0; j < fydata.length; j++){
            if(fydata[j][i]>0){
              aaa = true
            }
          }
          if(aaa==false){
            for (let i1 = 0; i1 < ndata1.length; i1++){
              if(ndata1[i1].time==xdate[i]){
                aaa = true
              }
            }
          }
          if(aaa==false){
            xdate.splice(i,1)
            for (let j = 0; j < fydata.length; j++){
              fydata[j].splice(i,1)
            }
          }
          if(i==fydata[0].length-1){
            break;
          }
          if(aaa==true){
            i++
          }
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
          var a3 = ""
          for (let i1 = 0; i1 < ndata1.length; i1++){
            if(ndata1[i1].name==name[i]){
              a1 = { xAxis:xdate.indexOf(ndata1[i1].time) }
              a2.push(a1)
              a3 = ndata1[i1].date
            }
          }
          var mark = {
            symbol: 'triangle',
            label: { show: true, formatter: name[i]+'能力提升时间'},
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
