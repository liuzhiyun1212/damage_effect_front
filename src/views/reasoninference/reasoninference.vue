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
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {changeDataTreeSelect} from "../../api/system/changedata";

export default {
  name: "reasoninference",
  data() {
    return {
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
      });
    },
  }
}
</script>

<style scoped>

</style>
