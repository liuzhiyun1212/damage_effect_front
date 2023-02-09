<template>
  <div>
    <el-card style="margin-left: 0.5%; width:100%;height: 1000px;">
      <div class="mainContainer" style="width: 50%;float: left;">
        <p style="text-align: center; color:blue; font-weight: 1000;font-size: 25px;">问题规律分析统计</p>
        <ul class="leftContent">
          <li class="labelContent" @click="hand(1)">
            <el-button type="text" @click="hand(1)" style="font-size: 16px;color: white;">质量问题发生时间</el-button>
            <span class="label-body">
                        <span class="problem">问题数:&nbsp;&nbsp;</span>
                        <span style="font-style: italic; font-size: 2vh;padding-right: 10px;">年度</span><span style="padding-right: 20px;">{{this.count1Year}}</span>
                        <span style="font-style: italic; font-size: 2vh;padding-right: 10px;">季度</span><span>{{this.count1Quarter}}</span>
                    </span>
          </li>
          <li class="labelContent" @click="hand(2)">
            <el-button type="text" @click="hand(2)" style="font-size: 16px;color: white;">质量问题涉及到的机型</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count2}}</span>
          </li>
          <li class="labelContent" @click="hand(3)">
            <el-button type="text" @click="hand(3)" style="font-size: 16px;color: white;">质量问题发生机型随时间变化情况</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count3}}</span>
          </li>
          <li class="labelContent" @click="hand(4)">
            <el-button type="text" @click="hand(4)" style="font-size: 16px;color: white;">涉及到的机型使用强度随时间变化</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count4}}</span>
          </li>
          <li class="labelContent" @click="hand(5)">
            <el-button type="text" @click="hand(5)" style="font-size: 16px;color: white;">质量问题高发故障模式</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count5}}</span>
          </li>
          <li class="labelContent" @click="hand(6)">
            <el-button type="text" @click="hand(6)" style="font-size: 16px;color: white;">质量问题故障模式随时间变化情况</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">年度</span><span style="padding-right: 20px;">{{this.count6Year}}</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">季度</span><span>{{this.count6Quarter}}</span>
                    </span>
          </li>
          <li class="labelContent" @click="hand(7)">
            <el-button type="text" @click="hand(7)" style="font-size: 16px;color: white;">质量问题发生地理环境</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count7}}</span>
          </li>
          <li class="labelContent" @click="hand(8)">
            <el-button type="text" @click="hand(8)" style="font-size: 16px;color: white;">故障件种类</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count8}}</span>
          </li>
          <li class="labelContent" @click="hand(9)">
            <el-button type="text" @click="hand(9)" style="font-size: 16px;color: white;">故障件名称</el-button>
            <span class="label-body">

                    <span class="problem">问题数:</span>{{this.count9}}</span>
          </li>
          <li class="labelContent" @click="hand(10)">
            <el-button type="text" @click="hand(10)" style="font-size: 16px;color: white;">故障件名称随时间变化情况统计</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">年度</span><span style="padding-right: 20px;">{{this.count10Year}}</span>
                        <span style="font-style: italic; font-size: 18px;padding-right: 10px;">季度</span><span>{{this.count10Quarter}}</span>
                    </span>
          </li>
          <li class="labelContent" @click="hand(11)">
            <el-button type="text" @click="hand(11)" style="font-size: 16px;color: white;">故障件安装位置</el-button>
            <span class="label-body">
                    <span class="problem">问题数:</span>{{this.count11}}</span>
          </li>
          <li class="labelContent" @click="hand(12)">
            <el-button type="text" @click="hand(12)" style="font-size: 16px;color: white;">故障件安装方法</el-button>
            <span class="label-body">
                    <span class="problem">问题数:&nbsp;&nbsp;</span>
                     </span>
          </li>
        </ul>
      </div>
      <div class="mainContainer" style="width: 50%;float: left;">
        <p style="text-align: center; color:blue; font-weight: 1000;font-size: 25px;">原因推测分析</p>
        <ul class="rightContent">
          <li @click="handle(1)" :class="if1==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(1)" style="font-size: 16px;color: white;">装备型号升级</el-button>
          </li>
          <li @click="handle(2)" :class="if2==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(2)" style="font-size: 16px;color: white;">产品改型</el-button>
          </li>
          <li @click="handle(3)" :class="if3==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(3)" style="font-size: 16px;color: white;">装备能力提升</el-button>
          </li>
          <li @click="handle(4)" :class="if4==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(4)" style="font-size: 16px;color: white;">生产班组发生变化</el-button>
          </li>
          <li @click="handle(5)" :class="if5==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(5)" style="font-size: 16px;color: white;">生产人员发生变化</el-button>
          </li>
          <li @click="handle(6)" :class="if6==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(6)" style="font-size: 16px;color: white;">生产设备发生变化</el-button>
          </li>
          <li @click="handle(7)" :class="if7==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(7)" style="font-size: 16px;color: white;">测量设备发生变化</el-button>
          </li>
          <li @click="handle(8)" :class="if8==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(8)" style="font-size: 16px;color: white;">供应链发生变化</el-button>
          </li>
          <li @click="handle(9)" :class="if9==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(9)" style="font-size: 16px;color: white;">生产工艺发生变化</el-button>
          </li>
          <li @click="handle(10)" :class="if10==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(10)" style="font-size: 16px;color: white;">维修班组发生变化</el-button>
          </li>
          <li @click="handle(11)" :class="if11==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(11)" style="font-size: 16px;color: white;">维修人员发生变化</el-button>
          </li>
          <li @click="handle(12)" :class="if12==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(12)" style="font-size: 16px;color: white;">维修设备发生变化</el-button>
          </li>
          <li @click="handle(13)" :class="if13==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(13)" style="font-size: 16px;color: white;">维修工艺发生变化</el-button>
          </li>
          <li @click="handle(14)" :class="if14==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(14)" style="font-size: 16px;color: white;">使用强度发生变化</el-button>
          </li>
          <li @click="handle(15)" :class="if15==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(15)" style="font-size: 16px;color: white;">装备状态发生变化</el-button>
          </li>
          <li @click="handle(16)" :class="if16==true? 'pass' : 'LabelContent'">
            <el-button type="text" @click="handle(16)" style="font-size: 16px;color: white;">使用环境发生变化</el-button>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- <ul>
        <li>质量问题发生时间:   季度<span>{{this.count1Quarter}}</span>年度<span>{{this.count1Year}}</span></li>
        <li>质量问题涉及到的机型:   <span>{{this.count2}}</span></li>
        <li>质量问题发生机型随时间变化情况:   <span>{{this.count3}}</span></li>
        <li>质量问题高发故障模式:   <span>{{this.count5}}</span></li>
        <li>质量问题故障模式随时间变化情况:   季度<span>{{this.count6Quarter}}</span>年度<span>{{this.count6Year}}</span></li>
        <li>质量问题发生地理环境:   <span>{{this.count7}}</span></li>
        <li>故障件种类:   <span>{{this.count8}}</span></li>
        <li>故障件名称:   <span>{{this.count9}}</span></li>
        <li>故障件名称随时间变化情况统计:   季度<span>{{this.count10Quarter}}</span>年度<span>{{this.count10Year}}</span></li>
        <li>故障件安装位置:   <span>{{this.count11}}</span></li>
    </ul> -->
  </div>
</template>

<script>
import {oneQuality,oneYear,selectPlaneType,faultStatistics,faultModelByYearSum,faultModelByQuarterSum,
  highSumByEnvironment,selectFaultyCount,selectAllType,nameAndModelByQuarter,nameAndModelByYear} from '@/api/system/dev';
import { getCheckList} from "@/api/chart/aircraftTypeWithTime";
import { getCheckList as useIntensity} from "@/api/chart/useIntensity";
import {pointCount} from "@/api/system/design.js"
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
  devstatus1,
  devstatus2,
  useenvironment1,
} from "../../api/system/reasonyuce";

export default {
  data () {
    return {
      count1Quarter:[],
      count1Year:[],
      count2:[],
      count3:[],
      count4:[],
      count5:[],
      count6Quarter:[],
      count6Year:[],
      count7:[],
      count8:[],
      count9:[],
      count10Quarter:[],
      count10Year:[],
      count11:[],
      count12:[],
      if1:false,
      if2:false,
      if3:false,
      if4:false,
      if5:false,
      if6:false,
      if7:false,
      if8:false,
      if9:false,
      if10:false,
      if11:false,
      if12:false,
      if13:false,
      if14:false,
      if15:false,
      if16:false,
    }
  },
  methods: {
    handleRedTab() {
      devup1().then(devup1 => {
        devup2().then(devup2 => {
          if(devup1.total>0||devup2.total>0){
            this.if1=true
          }
        })
      })
      prochaange1().then(prochaange1 => {
        prochaange2().then(prochaange2 => {
          prochaange3().then(prochaange3 => {
            prochaange4().then(prochaange4 => {
              if(prochaange1.total>0||prochaange2.total>0||prochaange3.total>0||prochaange4.total>0){
                this.if2=true
              }
            })
          })
        })
      })
      devcapup1().then(devcapup1 => {
        devcapup2().then(devcapup2 => {
          if(devcapup1.total>0||devcapup2.total>0){
            this.if3=true
          }
        })
      })
      proteam1().then(proteam1 => {
        proteam2().then(proteam2 => {
          if(proteam1.total>0||proteam2.total>0){
            this.if4=true
          }
        })
      })
      properson1().then(properson1 => {
        properson2().then(properson2 => {
          if(properson1.total>0||properson2.total>0){
            this.if5=true
          }
        })
      })
      promakedev1().then(promakedev1 => {
        promakedev2().then(promakedev2 => {
          promakedev3().then(promakedev3 => {
            if(promakedev1.total>0||promakedev2.total>0||promakedev3.total>0){
              this.if6=true
            }
          })
        })
      })
      promeasuringdev1().then(promeasuringdev1 => {
        promeasuringdev2().then(promeasuringdev2 => {
          promeasuringdev3().then(promeasuringdev3 => {
            if(promeasuringdev1.total>0||promeasuringdev2.total>0||promeasuringdev3.total>0){
              this.if7=true
            }
          })
        })
      })
      ProMakePlace1().then(ProMakePlace1 => {
        ProMakePlace2().then(ProMakePlace2 => {
          ProMakePlace3().then(ProMakePlace3 => {
            ProMakePlace4().then(ProMakePlace4 => {
              if(ProMakePlace1.total>0||ProMakePlace2.total>0||ProMakePlace3.total>0||ProMakePlace4.total>0){
                this.if8=true
              }
            })
          })
        })
      })
      ProMakeWorkmanship1().then(ProMakeWorkmanship1 => {
        ProMakeWorkmanship2().then(ProMakeWorkmanship2 => {
          ProMakeWorkmanship3().then(ProMakeWorkmanship3 => {
            if(ProMakeWorkmanship1.total>0||ProMakeWorkmanship2.total>0||ProMakeWorkmanship3.total>0){
              this.if9=true
            }
          })
        })
      })
      prorepairteam1().then(prorepairteam1 => {
        prorepairteam2().then(prorepairteam2 => {
          if(prorepairteam1.total>0||prorepairteam2.total>0){
            this.if10=true
          }
        })
      })
      prorepairperson1().then(prorepairperson1 => {
        prorepairperson2().then(prorepairperson2 => {
          if(prorepairperson1.total>0||prorepairperson2.total>0){
            this.if11=true
          }
        })
      })
      prorepairdev1().then(prorepairdev1 => {
        prorepairdev2().then(prorepairdev2 => {
          if(prorepairdev1.total>0||prorepairdev2.total>0){
            this.if12=true
          }
        })
      })
      ProRepairWorkmanship1().then(ProRepairWorkmanship1 => {
        ProRepairWorkmanship2().then(ProRepairWorkmanship2 => {
          if(ProRepairWorkmanship1.total>0||ProRepairWorkmanship2.total>0){
            this.if13=true
          }
        })
      })
      devusechangequarter().then(devusechangequarter => {
        devusechangeyear().then(devusechangeyear => {
          if(devusechangequarter.total>0||devusechangeyear.total>0){
            this.if14=true
          }
        })
      })
      devstatus1().then(devstatus1 => {
        devstatus2().then(devstatus2 => {
          if(devstatus1.total>0||devstatus2.total>0){
            this.if15=true
          }
        })
      })
      useenvironment1().then(useenvironment1 => {
        if(useenvironment1.total>0){
          this.if16=true
        }
      })
    },
    handle(x){
      switch(x){
        case 1:
          this.$router.push({ path: '/reasoninference', query: {type:'5',label:'装备型号升级'} })
          break;
        case 2:
          this.$router.push({ path: '/reasoninference', query: {type:'6',label:'产品改型'} })
          break;
        case 3:
          this.$router.push({ path: '/reasoninference', query: {type:'7',label:'装备能力提升'} })
          break;
        case 4:
          this.$router.push({ path: '/reasoninference', query: {type:'8',label:'生产班组发生变化'} })
          break;
        case 5:
          this.$router.push({ path: '/reasoninference', query: {type:'9',label:'生产人员发生变化'} })
          break;
        case 6:
          this.$router.push({ path: '/reasoninference', query: {type:'10',label:'生产设备发生变化'} })
          break;
        case 7:
          this.$router.push({ path: '/reasoninference', query: {type:'11',label:'测量设备发生变化'} })
          break;
        case 8:
          this.$router.push({ path: '/reasoninference', query: {type:'12',label:'供应链发生变化'} })
          break;
        case 9:
          this.$router.push({ path: '/reasoninference', query: {type:'13',label:'生产工艺发生变化'} })
          break;
        case 10:
          this.$router.push({ path: '/reasoninference', query: {type:'14',label:'维修班组发生变化'} })
          break;
        case 11:
          this.$router.push({ path: '/reasoninference', query: {type:'15',label:'维修人员发生变化'} })
          break;
        case 12:
          this.$router.push({ path: '/reasoninference', query: {type:'16',label:'维修设备发生变化'} })
          break;
        case 13:
          this.$router.push({ path: '/reasoninference', query: {type:'17',label:'维修工艺发生变化'} })
          break;
        case 14:
          this.$router.push({ path: '/reasoninference', query: {type:'18',label:'使用强度发生变化'} })
          break;
        case 15:
          this.$router.push({ path: '/reasoninference', query: {type:'19',label:'装备状态发生变化'} })
          break;
        case 16:
          this.$router.push({ path: '/reasoninference', query: {type:'20',label:'使用环境发生变化'} })
          break;
      }
    },
    hand(x){
      switch(x){
        case 1:
          this.$router.push({ path: '/problemAnalysis', query: {type:'a'} })
          break;
        case 2:
          this.$router.push({ path: '/problemAnalysis', query: {type:'b'} })
          break;
        case 3:
          this.$router.push({ path: '/problemAnalysis', query: {type:'c'} })
          break;
        case 4:
          this.$router.push({ path: '/problemAnalysis', query: {type:'d'} })
          break;
        case 5:
          this.$router.push({ path: '/problemAnalysis', query: {type:'e'} })
          break;
        case 6:
          this.$router.push({ path: '/problemAnalysis', query: {type:'f'} })
          break;
        case 7:
          this.$router.push({ path: '/problemAnalysis', query: {type:'g'} })
          break;
        case 8:
          this.$router.push({ path: '/problemAnalysis', query: {type:'h'} })
          break;
        case 9:
          this.$router.push({ path: '/problemAnalysis', query: {type:'i'} })
          break;
        case 10:
          this.$router.push({ path: '/problemAnalysis', query: {type:'j'} })
          break;
        case 11:
          this.$router.push({ path: '/problemAnalysis', query: {type:'k'} })
          break;
        case 12:
          this.$router.push({ path: '/problemAnalysis', query: {type:'l'} })
          break;

      }
    },
    // 4.2.1.1
    oneQuality() {
      oneQuality(this.queryParams).then((response) => {
        this.count1Quarter = response.length;
      })
    },
    oneYear() {
      oneYear(this.queryParams).then((response) => {
        this.count1Year = response.length;
      })
    },
    // 4.2.1.2
    selectPlaneType() {
      selectPlaneType(this.queryParams).then((response) => {
        this.count2 = response.length;
      })
    },
    // 4.2.1.3
    getCheckList() {
      let queryParams = {checkedMethodName: 'allCheck'}
      getCheckList(queryParams).then(res => {
        this.count3 = res.rows.length;
        // console.log(res.rows.length);
      });
    },
    // 4.2.1.4
    useIntensity() {
      let queryParams = {checkedMethodName: 'allCheck'}
      useIntensity(queryParams).then(res => {
        this.count4 = res.rows.length;
        // console.log(res.rows.length);
      });
    },
    // 4.2.1.5
    faultStatistics() {
      faultStatistics(this.queryParams).then(response => {
        this.count5 = response.length;
        // console.log(this.count5);
      });
    },
    // 4.2.1.6
    faultModelByQuarterSum() {
      faultModelByQuarterSum(this.queryParams).then(response => {
        this.count6Quarter = response.length;
        // console.log(this.count6Quarter);
      });
    },
    faultModelByYearSum(){
      faultModelByYearSum(this.queryParams).then(response => {
        this.count6Year = response.length;
        // console.log(this.count6Year);
      });
    },
    // 4.2.1.7
    highSumByEnvironment(){
      highSumByEnvironment(this.queryParams).then(response => {
        this.count7 = response.length;
        // console.log(this.count7);
      });
    },
    // 4.2.1.8
    selectAllType(){
      selectAllType(this.queryParams).then(response => {
        this.count8 = response.length;
        // console.log("xxxxxxxxx",this.count8);
      });
    },
    // 4.2.1.9
    selectFaultyCount(){
      selectFaultyCount(this.queryParams).then(response => {
        this.count9 = response.length;
        // console.log(this.count9);
      });
    },
    // 4.2.1.10
    nameAndModelByQuarter(){
      nameAndModelByQuarter(this.queryParams).then(response => {
        this.count10Quarter = response.length;
        // console.log(this.count10);
      });
    },
    nameAndModelByYear(){
      nameAndModelByYear(this.queryParams).then(response => {
        this.count10Year = response.length;
        // console.log(this.count11);
      });
    },
    // 4.2.1.11
    pointCount(){
      pointCount(this.queryParams).then(response => {
        this.count11 = response.length;
        // console.log(this.count11);
      });
    },
  },

  created() {
    this.oneQuality();
    this.oneYear();
    this.selectPlaneType();
    this.getCheckList();
    this.useIntensity();
    this.faultStatistics();
    this.faultModelByQuarterSum();
    this.faultModelByYearSum();
    this.highSumByEnvironment();
    this.selectFaultyCount();
    this.nameAndModelByQuarter();
    this.nameAndModelByYear();
    this.pointCount();
    this.selectAllType();
    this.handleRedTab();
  },
}
</script>

<style  scoped>
/* 综合css */

.leftContent li{
  display: block;
  float: left;
  color: #ffffff;
  width: 40%;
  height: 70px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  margin-left: 5px;
}

.rightContent li{
  display: block;
  float: left;
  color: #ffffff;
  width: 40%;
  height: 70px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  margin-left: 5px;
}
.rightContent .pass {
  background-color: red;
}
/* .rightContent .right{
    display: block;
    float:right;
    color: #ffffff;
    width: 25%;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 5px;
    padding-top: 5px;
    margin-left: 600px;
} */
.rightContent li{
  background-color: #0082bd;
}
.problem::after{
  content: "　 ";
}
/* li{
    float:left;width:190px;padding:5px;
    display: block;
    width: 150px;
    float: left;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 10px;
    color: white;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
} */
.leftContent li:first-child{
  background-color: #0082bd;
  /* display: inline-block; */
}
.leftContent li:nth-child(2){
  background-color: #3bb54b;
}

.leftContent li:nth-child(3){
  background-color: #19599d;
}
.leftContent li:nth-child(4){
  background-color: #cb5454;
}
.leftContent li:nth-child(5){
  background-color: #0082bd;
}
.leftContent li:nth-child(6){
  background-color: #3bb54b;
}
.leftContent li:nth-child(7){
  background-color: #19599d;
}
.leftContent li:nth-child(8){
  background-color: #cb5454;
}
.leftContent li:nth-child(9){
  background-color: #19599d;
}
.leftContent li:nth-child(10){
  background-color: #ff7f27;
}
.leftContent li:nth-child(11){
  background-color: #3bb54b;
}
.leftContent li:nth-child(12){
  background-color: #19599d;
}
.leftContent .labelContent .label-body {
  display: block;
  cursor: pointer;
  /* text-align: center; */
  margin-top: 1px;
  /* font-size: 15px; */
}
/* .leftContent .labelContent .label-title {
    font-family: 微软雅黑;
    font-size: 18px;
    opacity: 2;
    display: inline-block;
    padding-left: 14px;
}
.leftContent .labelContent .label-body {
    opacity: 0.7;
    padding-left: 14px;
    font-family: DIN Alternate Bold, Arial;
    font-size: 25px;
    display: block;
    cursor: pointer;
    margin-top: 1px;
}
.leftContent {
    position: relative;
    background-repeat: no-repeat;
    background-position: 0 0;
    left: 17px;
    width: 300px;
    height: 250px;
    padding: 14px 0px 0px 16px;
} */
</style>

