<template>
  <div>
    <ul>
        <li>质量问题发生时间:   季度{{this.count1Quarter}}年度{{this.count1Year}}</li>
    </ul>
  </div>
</template>

<script>
import {oneQuality,oneYear,selectPlaneType,faultStatistics} from '@/api/system/dev';
import { getCheckList} from "@/api/chart/aircraftTypeWithTime";
import { getCheckList as useIntensity} from "@/api/chart/useIntensity"

export default {
    data () {
        return {
            count1Quarter:[],
            count1Year:[],
            count2:[],
            count3:[],
            count4:[],
            count5:[],
        }
    },
    methods: {
        // 4.2.1.1
    oneQuality() {
      oneQuality(this.queryParams).then((response) => {
        this.count1Quarter = response.length;
      })
    },
    oneYear() {
        oneYear(this.queryParams).then((response) => {
        this.count1Year = response.length;
      })
    },
    // 4.2.1.2
    selectPlaneType() {
        selectPlaneType(this.queryParams).then((response) => {
        this.count2 = response.length;
      })
    },
    // 4.2.1.3
    getCheckList() {
        let queryParams = {checkedMethodName: 'allCheck'}
            getCheckList(queryParams).then(res => {
                this.count3 = res.rows.length;
                // console.log(res.rows.length);
            });
        },
    // 4.2.1.4
    useIntensity() {
        let queryParams = {checkedMethodName: 'allCheck'}
        useIntensity(queryParams).then(res => {
            this.count4 = res.rows.length;
                // console.log(res.rows.length);
            });
    },
    // 4.2.1.5
    faultStatistics() {
        faultStatistics(this.queryParams).then(response => {
            this.count5 = response.length;
                console.log(this.count5);
            });
    },
    },
    
    created() {
        this.oneQuality();
        this.oneYear();
        this.selectPlaneType();
        this.getCheckList();
        this.useIntensity();
        this.faultStatistics();
    },
}
</script>

<style>

</style>