<template>
  <div>aaaa</div>
</template>

<script>
import {sumByplaneType,selectPlaneType} from '@/api/system/dev';
export default {
    data() {
        return {
            // 机型总列表
            allList:[],
            // 筛选机型
            planeList:[],
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
        // 筛选机型超过平均的50%
        selectPlaneType(){
            selectPlaneType(this.queryParams).then(response => {
                this.planeList = response;
                console.log("xxxxxxxxxxx",this.planeList);
        });
        },
    },
    created() {
        this.sumByplaneType();
        this.selectPlaneType();
    },
    mounted() {
        
    },

}
</script>

<style>

</style>