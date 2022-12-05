<template>
    <div>
        <div ref="device_time_line" style="cursor: pointer; width: 100%; height: 200px"></div>
    </div>
</template>

<script>
import * as echarts from "echarts"

import { selectByProduceDeviceChanged, timeProduceDeviceChanged } from "@/api/system/dev"

export default {
    name: 'timeLineChart',
    data() {
        //这里存放数据
        return {
            // 时间线列表
            allList: [],
            // 质量总数
            qualityList: [],
            // 生产总数
            productList: [],
            xList: [],
            yList: [],
            seriesData: [],
            // 时间线显示列表
            timeData: [],
        };
    },

    //方法集合
    methods: {
        // 故障件生产设备变更
        selectByProduceDeviceChanged() {
            selectByProduceDeviceChanged(this.queryParams).then(response => {
                let arr = [];
                let time1 = [];
                for (let i = 0; i < response.length; i++) {
                    arr.push(response[i].name);
                    time1.push(response[i].time);
                }
                this.yList = arr.filter(function (item, index) {
                    return arr.indexOf(item) === index;
                });
                this.xList = time1.filter(function (item, index) {
                    return time1.indexOf(item) === index;
                });
                //高度适应
                var d = this.$refs.device_time_line;
                var height = this.yList.length * 100;
                //  d.setAttribute(height,height+"px");
                d.style.cssText = "height:" + height + "px";
                this.getTime();
            });
        },

        // 时间线统计列表
        timeProduceDeviceChanged() {
            timeProduceDeviceChanged(this.queryParams).then(response => {
                console.log("timeProduceDeviceChanged", response);
                this.allList = response;
                this.dealRes(this.allList);
                this.selectByProduceDeviceChanged();
                // this.getHeight();
                this.getTime();
                // console.log("1111111",this.allList);
            });
        },

        dealRes(data) {
            console.log("dealRes",data);
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                // console.log("data["+i+"].name", data[i].name);
                this.seriesData.push({
                    name: data[i].name,
                    type: "line",
                    data: [],
                    markPoint: {
                        symbolSize: 20,
                        symbol: "triangle",
                        data: [
                            {
                                name: "故障类型：" + data[i].name,
                                coord: [data[i].list, data[i].name],
                                label: {
                                    show: true,
                                    /*formatter: function (item) {
                                      return "预测故障发生";
                                    },*/
                                },
                            },
                        ],
                    },
                })

                count += data[i].list.length
            }

            // console.log("this.allList",this.allList)
            // console.log("this.seriesData",this.seriesData)
            //获取某个设备的日期list
            for (let i = 0; i < this.allList.length; i++) {
                for (let j = 0; j < this.seriesData.length; j++) {
                    //名字一样说明是同一个设备，然后遍历这个设备的日期list
                    if (this.allList[i].name === this.seriesData[j].name) {
                        for (let k = 0; k < this.allList[i].list.length; k++) {
                            this.seriesData[j].markPoint.data.push({
                                name:this.allList[i].name,
                                //三角形标记的位置，第一个是横坐标，第二个值是第几行，
                                coord: [this.allList[i].list[k], j],
                                label: {
                                    show: true,
                                    /*formatter: function (item) {
                                                      return "预测故障发生";
                                                  },*/
                                },
                            })
                        }
                    }
                }
            }
            //画横线,j表示第几行，count表示横坐标有几个点；即在第j行填count个点
            for (let j = 0; j < this.seriesData.length; j++) {
                for (let i = 0; i < count; i++) this.seriesData[j].data.push(j)
            }
        },

        // 时间线
        getTime() {
            let dataGet = this.yList
            var myChart = echarts.init(this.$refs.device_time_line)
            var option = {
                // title: {
                //     text: '故障件生产班组变更时间线'
                // },
                tooltip: {
                    trigger: 'item',
                    formatter(params) {
                        // console.log("@@@,",params);
                        if(params.componentType==="markPoint"){
                            return params.name+'\n'+params.data.coord[0].substring(0,10)
                        }
                        return params.seriesName+'\n'+params.name.substring(0,10)
                    }
                },
                legend: {},
                // toolbox: {
                //     show: true,
                //     feature: {
                //         dataZoom: {
                //             yAxisIndex: 'none'
                //         },
                //         dataView: { readOnly: false },
                //         magicType: { type: ['line', 'bar'] },
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xList,
                    axisLabel: {
                        formatter: params => {
                            return params.slice(0, 10);
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    interval: 1,
                    axisLabel: {
                        margin: 20,
                        formatter: function (val, index) {
                            return dataGet[val];
                        },
                    },
                    // axisLabel: {
                    // formatter: '设备{value} '
                    // }
                },
                series: this.seriesData,
                // color: ['#5470c6', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#91cc75', '#ee6666'],
            };
            //this.getHeight(myChart,option);
            this.$nextTick(myChart.setOption(option));
            // console.log(this.seriesData);
            // echarts自适应
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        }
    },

    mounted() {
        this.selectByProduceDeviceChanged()
        this.timeProduceDeviceChanged()
    },
}
</script>
<style scoped>

</style>
