<template>
<div>
  <el-card style="margin-left: 0.5%; width:99%; float:left">
   <!-- <p>质量问题发生时间</p>
    <p>质量问题涉及到的机型</p>
    <p>质量问题发生机型时间变化情况</p>
    <p>质量问题涉及到的机型使用强度随时间变换情况</p>
    <p>质量问题故障模式</p>
    <p>质量问题故障模式随时间变化情况</p>
    <p>质量问题发生地理环境</p>
    <p>故障件种类</p>
    <p>故障件名称</p>
    <p>故障件随时间变化情况</p>
    <p>质故障件安装位置</p>
    <p>故障件安装方法</p>-->
    <el-tabs :tab-position="tabPosition" v-model="activeName">
      <el-tab-pane label="质量问题发生时间" :lazy="true"><QualityTime></QualityTime></el-tab-pane>
      <el-tab-pane label="质量问题涉及到的机型" :lazy="true"><QualityPlaneType/></el-tab-pane>
      <el-tab-pane label="质量问题发生机型时间变化情况" :lazy="true"><AircraftTypeWithTime/></el-tab-pane>
      <el-tab-pane label="质量问题涉及到的机型使用强度随时间变换情况" :lazy="true"><UseIntensity/></el-tab-pane>
      <el-tab-pane label="质量问题故障模式" :lazy="true"><QualityTroublePie/></el-tab-pane>
      <el-tab-pane label="质量问题故障模式随时间变化情况" :lazy="true"><QualityByFaultModel></QualityByFaultModel></el-tab-pane>
      <el-tab-pane label="质量问题发生地理环境" :lazy="true"><Environment></Environment></el-tab-pane>
      <el-tab-pane label="故障件种类" :lazy="true"><PartsType/></el-tab-pane>
      <el-tab-pane label="故障件名称" :lazy="true"><FaultyCount></FaultyCount></el-tab-pane>
      <el-tab-pane label="故障件随时间变化情况" :lazy="true"><PartsTime></PartsTime></el-tab-pane>
      <el-tab-pane label="质故障件安装位置" :lazy="true"><ThreeD1></ThreeD1></el-tab-pane>
      <el-tab-pane label="故障件安装方法" :lazy="true"></el-tab-pane>
    </el-tabs>
  </el-card>
 <!-- <el-card style="margin-left: 15%; width:84%; height:800px;margin-top: 20px;">
    <iframe src="//localhost/qualityChange/peopleChange" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"
      style="width:95%;height: 600px;"
    > </iframe>

  </el-card>-->


</div>
</template>

<script>
import peopleChange from "@/views/qualityChange/zzh/peopleChange";
import QualityTime from "@/views/qualityAnalysis/qualityTime/index";
import QualityPlaneType from "@/views/qualityAnalysis/qualityPlaneType/sumPlaneType";
import Environment from "@/views/qualityAnalysis/environment/index";
import AircraftTypeWithTime from "@/views/qualityAnalysis/aircraftTypeWithTime/index";
import UseIntensity from "@/views/qualityAnalysis/useIntensity/index";
import QualityTroublePie from "@/views/qualityAnalysis/qualityTroublePie/index";
import QualityByFaultModel from "@/views/qualityAnalysis/qualityByFaultModel/index";
import PartsType from "@/views/qualityAnalysis/partsType/index";
import FaultyCount from "@/views/inputExcel/faultyCount";
import PartsTime from "@/views/qualityAnalysis/partsTime/index";
import ThreeD1 from "@/views/qualityAnalysis/installPosition/threeD1";
import ThreeD2 from "@/views/qualityAnalysis/installPosition/threeD2";
export default {
  name: "problemAnalysis",
  components:{peopleChange,QualityTime,QualityPlaneType,Environment,AircraftTypeWithTime,
    UseIntensity,QualityTroublePie,QualityByFaultModel,PartsType,FaultyCount,PartsTime,ThreeD1,ThreeD2},
  data() {
    return {
      // activeName:"second",
      tabPosition: 'left',
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>

<style scoped>

</style>
