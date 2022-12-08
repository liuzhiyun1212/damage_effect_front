<template>
<div>
  <el-card style="margin-left: 0.5%; width:99%; height: 1200px; float:left">
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
    <el-tabs :tab-position="tabPosition" :lazy="true" @tab-click="handleLoad" v-model="activeName">
      <el-tab-pane label="质量问题发生时间" :lazy="true" name="a"><QualityTime :key="timer"></QualityTime></el-tab-pane>
      <el-tab-pane label="质量问题涉及到的机型" :lazy="true" name="b"><QualityPlaneType :key="timer"/></el-tab-pane>
      <el-tab-pane label="质量问题发生机型时间变化情况" :lazy="true" name="c"><AircraftTypeWithTime :key="timer"/></el-tab-pane>
      <el-tab-pane label="质量问题涉及到的机型使用强度随时间变换情况" :lazy="true" name="d"><UseIntensity :key="timer"/></el-tab-pane>
      <el-tab-pane label="质量问题故障模式" :lazy="true" name="e"><QualityTroublePie :key="timer"/></el-tab-pane>
      <el-tab-pane label="质量问题故障模式随时间变化情况" :lazy="true" name="f"><QualityByFaultModel :key="timer"></QualityByFaultModel></el-tab-pane>
      <el-tab-pane label="质量问题发生地理环境" :lazy="true" name="g"><Environment :key="timer"></Environment></el-tab-pane>
      <el-tab-pane label="故障件种类" :lazy="true" name="h"><PartsType :key="timer"/></el-tab-pane>
      <el-tab-pane label="故障件名称" :lazy="true" name="i"><FaultyCount :key="timer"></FaultyCount></el-tab-pane>
      <el-tab-pane label="故障件随时间变化情况" :lazy="true" name="j"><PartsTime :key="timer"></PartsTime></el-tab-pane>
      <el-tab-pane label="故障件安装位置" :lazy="true" name="k"><ThreeD1 :key="timer"></ThreeD1></el-tab-pane>
      <el-tab-pane label="故障件安装方法" :lazy="true" name="l"><ThreeD2 :key="timer"/></el-tab-pane>
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
      timer:'',
      activeName: 'c'
    }
  },
  methods: {
    updateType () {
      let type = this.$route.query.type
      // 判断type的值，更改activeName的值
      if (type === 'a') {
        this.activeName = 'a'
      } else if (type === 'b') {
        this.activeName = 'b'
      // eslint-disable-next-line keyword-spacing
      }else if (type === 'c') {
        this.activeName = 'c'
      }else if (type === 'd') {
        this.activeName = 'd'
      }else if (type === 'e') {
        this.activeName = 'e'
      }else if (type === 'f') {
        this.activeName = 'f'
      }else if (type === 'g') {
        this.activeName = 'g'
      }else if (type === 'h') {
        this.activeName = 'h'
      }else if (type === 'i') {
        this.activeName = 'i'
      }else if (type === 'j') {
        this.activeName = 'j'
      }else if (type === 'k') {
        this.activeName = 'k'
      }else if (type === 'l') {
        this.activeName = 'l'
      }
    },
    handleLoad () {
      this.timer = new Date().getTime()
    }
  },
  mounted() {
    this.updateType();
  },
}
</script>
<style lang="scss" scoped>

//   /deep/ .el-tabs--left .el-tabs__item.is-left {
//     text-align: left;
// }
</style>
<style>
.el-tabs--left .el-tabs__item.is-left {
    text-align: left;
}
</style>
