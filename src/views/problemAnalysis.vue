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
    <el-tabs :tab-position="tabPosition" v-model="activeName" :lazy="true">
      <el-tab-pane label="质量问题发生时间"><QualityTime></QualityTime></el-tab-pane>
      <el-tab-pane label="质量问题涉及到的机型" name="second"><QualityPlaneType/></el-tab-pane>
      <el-tab-pane label="质量问题发生机型时间变化情况">质量问题发生机型时间变化情况</el-tab-pane>
      <el-tab-pane label="质量问题涉及到的机型使用强度随时间变换情况">质量问题涉及到的机型使用强度随时间变换情况</el-tab-pane>
      <el-tab-pane label="质量问题故障模式">质量问题故障模式</el-tab-pane>
      <el-tab-pane label="质量问题故障模式随时间变化情况">质量问题故障模式随时间变化情况</el-tab-pane>
      <el-tab-pane label="质量问题发生地理环境"><Environment/>质量问题发生地理环境</el-tab-pane>
      <el-tab-pane label="故障件种类">故障件种类</el-tab-pane>
      <el-tab-pane label="故障件名称">故障件名称</el-tab-pane>
      <el-tab-pane label="故障件随时间变化情况">故障件随时间变化情况</el-tab-pane>
      <el-tab-pane label="质故障件安装位置">质故障件安装位置</el-tab-pane>
      <el-tab-pane label="故障件安装方法">故障件安装方法</el-tab-pane>
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
export default {
  name: "problemAnalysis",
  components:{peopleChange,QualityTime,QualityPlaneType,Environment},
  data() {
    return {
      activeName:"second",
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
