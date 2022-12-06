<!-- 4.2.2.14.装备使用强度变更情况 -->
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
      装备使用强度变更情况
    </p>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="季度" name="quarter" :lazy="true">
          <Quarter />
        </el-tab-pane>
        <el-tab-pane label="年度" name="year" :lazy="true">
          <Year />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Quarter from "./quarter.vue"
import Year from "./year.vue"
export default {
  components: {
    Quarter,
    Year,
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
