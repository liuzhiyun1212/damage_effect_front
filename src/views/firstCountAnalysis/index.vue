<template>
  <div>
    <ul>
        <li>质量问题发生时间:   季度{{this.count1Quarter}}年度{{this.count1Year}}</li>
    </ul>
  </div>
</template>

<script>
import {oneQuality,oneYear,selectPlaneType,faultStatistics,faultModelByYearSum,faultModelByQuarterSum,
    highSumByEnvironment,selectFaultyCount,nameAndModelByQuarter,nameAndModelByYear} from '@/api/system/dev';
import { getCheckList} from "@/api/chart/aircraftTypeWithTime";
import { getCheckList as useIntensity} from "@/api/chart/useIntensity";
import {pointCount} from "@/api/system/design.js"

export default {
    data () {
        return {
            count1Quarter:[],
            count1Year:[],
            count2:[],
            count3:[],
            count4:[],
            count5:[],
            count6Quarter:[],
            count6Year:[],
            count7:[],
            count8:[],
            count9:[],
            count10Quarter:[],
            count10Year:[],
            count11:[],
            count12:[],
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
                // console.log(this.count5);
            });
    },
    // 4.2.1.6
    faultModelByQuarterSum() {
        faultModelByQuarterSum(this.queryParams).then(response => {
            this.count6Quarter = response.length;
                // console.log(this.count6Quarter);
            });
    },
    faultModelByYearSum(){
        faultModelByYearSum(this.queryParams).then(response => {
            this.count6Year = response.length;
                // console.log(this.count6Year);
            });
    },
    // 4.2.1.7
    highSumByEnvironment(){
        highSumByEnvironment(this.queryParams).then(response => {
            this.count7 = response.length;
                // console.log(this.count7);
            });
    },
    // 4.2.1.8

    // 4.2.1.9
    selectFaultyCount(){
        selectFaultyCount(this.queryParams).then(response => {
            this.count9 = response.length;
                // console.log(this.count9);
            });
    },
    // 4.2.1.10
    nameAndModelByQuarter(){
        nameAndModelByQuarter(this.queryParams).then(response => {
            this.count10Quarter = response.length;
                // console.log(this.count10);
            });
    },
    nameAndModelByYear(){
        nameAndModelByYear(this.queryParams).then(response => {
            this.count10Year = response.length;
                // console.log(this.count11);
            });
    },
    // 4.2.1.11
    pointCount(){
        pointCount(this.queryParams).then(response => {
            this.count11 = response.length;
                console.log(this.count11);
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
        this.faultModelByQuarterSum();
        this.faultModelByYearSum();
        this.highSumByEnvironment();
        this.selectFaultyCount();
        this.nameAndModelByQuarter();
        this.nameAndModelByYear();
        this.pointCount();
    },
}
</script>

<style>

</style>