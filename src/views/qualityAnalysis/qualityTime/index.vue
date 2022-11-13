<template>
  <div>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="季度" name="quarter" :lazy="true">
        <QuarterSum/>
      </el-tab-pane>
      <el-tab-pane label="年度" name="year" :lazy="true">
        <YearSum/>
      </el-tab-pane>
    </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
import {qualityHappenSum,oneQuality,oneYear,yearHappenSum} from '@/api/system/dev';
import YearSum from "./yearSum.vue";
import QuarterSum from "./quarterSum.vue";
export default {
  components:{
    YearSum,QuarterSum
  },
  data() {
    return {
      activeName:"quarter",
      // 查询参数
      queryParams: {
              pageNum: 1,
              pageSize: 5,
              troubleName: null,
              troubleIntroduction: null
            },
      
      
    }
  },
  methods: {
    
    
  },
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

<style>

</style>