<template>
  <div>aaaaaaaa</div>
</template>

<script>
 import * as echarts from 'echarts';
import {selectEnvironment,selectDevByEnvironment,selectQualityByEnvironment} from '@/api/system/dev';
export default {
    data () {
        return {
            
        }
    },
    methods: {
        // 统计高发故障模式环境
        selectEnvironment(){
            selectEnvironment(this.queryParams).then(response => {
                
        });
        },
        // 统计高发故障模式环境装备数量
        selectDevByEnvironment(){
            selectDevByEnvironment(this.queryParams).then(response => {
                
        });
        },
        // 统计高发故障模式环境质量问题数量
        selectQualityByEnvironment(){
            selectQualityByEnvironment(this.queryParams).then(response => {
                
            });
        },
    },
    created() {
        this.selectEnvironment();
        this.selectDevByEnvironment();
        this.selectQualityByEnvironment()
    },

}
</script>

<style>

</style>