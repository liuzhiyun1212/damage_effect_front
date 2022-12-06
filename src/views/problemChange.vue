<template>
  <div>
    <el-card style="margin-left: 0.5%; width: 99%; height: 1200px; float: left">
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
      <el-tabs :tab-position="tabPosition" :lazy="true">
        <el-tab-pane :lazy="true" label="装备改型情况"
          ><equipmentchange
        /></el-tab-pane>
        <el-tab-pane :lazy="true" label="装备能力提升情况"><equipmentAbilityenhancement/></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件改型情况"
          ><partsChange
        /></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件生产班组变更情况"
          ><partsGroupchange
        /></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件人员变更情况"
          ><partsMakepeople
        /></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件生产设备变更情况"
          ><partsMakeequip/></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件测量设备变更情况"
          ><measuringDevice/></el-tab-pane
        >
        <el-tab-pane :lazy="true" label="故障件原材料变更情况"
          ><partsMaterialChange
        /></el-tab-pane>
        <el-tab-pane :lazy="true" label="装备所用零件变更情况"
          ><faultyPartsChange/></el-tab-pane
        >
        <el-tab-pane :lazy="true" label="装备生产工艺变更情况"
          ><partsMakeWorkmanshipChanged></partsMakeWorkmanshipChanged
        ></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件维修班组变更情况"><repairGroupchange /></el-tab-pane>
        <el-tab-pane :lazy="true" label="故障件维修人员变更情况"
          >故障件安装方法</el-tab-pane
        >
        <el-tab-pane :lazy="true" label="故障件维修设备变更情况"
          >故障件安装方法</el-tab-pane
        >
        <el-tab-pane :lazy="true" label="故障件维修工艺变更情况"
          ><faultyRepairWayChange/></el-tab-pane
        >
        <el-tab-pane :lazy="true" label="装备使用强度变更情况"
          >故障件安装方法</el-tab-pane
        >
        <el-tab-pane :lazy="true" label="装备装备状态更情况"
          ><devStateChanged></devStateChanged
        ></el-tab-pane>
        <el-tab-pane :lazy="true" label="装备使用环境更情况"
          ><environmentChanged></environmentChanged
        ></el-tab-pane>
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

import equipmentchange from "@/views/monitor/refit/index.vue";
import partsChange from "@/views/qualityChange/troubleRemodel";
import repairGroupchange from "@/views/qualityChange/repairChange/index";
import partsGroupchange from "@/views/qualityChange/gradeChange/index"
import partsMakeequip from "@/views/qualityChange/changeOfProductionDevice/index"
import partsMakepeople from "@/views/qualityChange/zzh/peopleChange"
import partsMakeWorkmanshipChanged from "@/views/qualityChange/PartsMakeWorkmanshipChanged/index.vue"
import devStateChanged from "@/views/qualityChange/devStateChanged/index.vue"
import environmentChanged from "@/views/qualityChange/environmentChanged/index.vue"
import partsMaterialChange from "@/views/qualityChange/partsMaterialChange/index.vue"
import equipmentAbilityenhancement from "@/views/qualityChange/equipmentAbilityenhancement/index.vue";
import faultyPartsChange from "@/views/qualityChange/faultyPartsChange/faultyPartsChange.vue";
import measuringDevice from "@/views/qualityChange/changeOfMeasuringDevice/index";
import measuringDeviceStackChart from "@/views/qualityChange/changeOfMeasuringDevice/index.vue";
import faultyRepairWayChange from "@/views/qualityChange/faultyRepairWayChange/faultyRepairWayChange.vue";

export default {
  name: "problemChange",
  components: {
    equipmentchange,
    partsChange,
    partsGroupchange,
    partsMakeequip,
    partsMakepeople,
    partsMakeWorkmanshipChanged,
    devStateChanged,
    environmentChanged,
    partsMaterialChange,
    equipmentAbilityenhancement,
    measuringDevice,
    faultyPartsChange,
    measuringDeviceStackChart,
    repairGroupchange,
    faultyRepairWayChange
  },
  data() {
    return {
      tabPosition: "left",
    }
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
