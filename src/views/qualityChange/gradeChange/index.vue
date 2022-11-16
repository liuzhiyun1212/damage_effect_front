<template>
  <div>aaaaaaaaaa</div>
</template>

<script>
 import * as echarts from 'echarts';
import {selectByGradeFaultModel,qualitySumByGrade} from '@/api/system/dev';
export default {
    data() {
        return {
            allList:[],
        }
    },
    methods: {
        // 故障件生产班组变更情况
        selectByGradeFaultModel(){
            selectByGradeFaultModel(this.queryParams).then(response => {
                this.allList = response;
        });
        },
        // 生产班组统计质量问题总数
        qualitySumByGrade(){
            qualitySumByGrade(this.queryParams).then(response => {
        });
        },
    },
    created() {
        this.selectByGradeFaultModel();
        this.qualitySumByGrade();
    },
    mounted() {
        
    },
}
</script>

<style>

</style>