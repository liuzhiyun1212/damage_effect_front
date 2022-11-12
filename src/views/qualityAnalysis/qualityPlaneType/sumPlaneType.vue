<template>
  <div>aaaa</div>
</template>

<script>
import {sumByplaneType,selectPlaneType} from '@/api/system/dev';
import { log } from 'console';
export default {
    data() {
        return {
            // 机型总列表
            allList:[],
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
        sumByplaneType(){
            sumByplaneType(this.queryParams).then(response => {
            this.allList = response;
            console.log("xxxxxxxxxxx",this.allList);
        });
        },
    },
    created() {
        this.sumByplaneType();
    },
    mounted() {
        
    },

}
</script>

<style>

</style>