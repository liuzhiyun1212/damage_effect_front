<!-- 故障件名称随时间变化情况 -->
<template>
  <div>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="季度" name="quarter" :lazy="true">
          <QuarterSum />
        </el-tab-pane>
        <el-tab-pane label="年度" name="year" :lazy="true">
          <YearSum />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts"
import YearSum from "./yearSum.vue"
import QuarterSum from "./quarterSum.vue"
export default {
  components: {
    YearSum,
    QuarterSum,
  },
  data() {
    return {
      activeName: "quarter",
    }
  },
  methods: {},
  created() {
    // this.yearHappenSum();
    // this.oneYear();
  },
  mounted() {
    // this.chartView();
    // this.getYear();
  },
}
</script>

<style></style>
