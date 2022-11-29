<!-- 故障件名称随时间变化情况 -->
<template>
  <div>
    <p
      style="
        font-family: Arial;
        font-size: 20px;
        font-weight: 600;
        display: inline-block;
        margin-left: 30px;
      "
    >
      故障件名称随时间变化情况统计
    </p>
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
import QuarterSum from "./quarterSum.vue"
import YearSum from "./yearSum.vue"
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
  created() {},
  mounted() {},
}
</script>

<style></style>
