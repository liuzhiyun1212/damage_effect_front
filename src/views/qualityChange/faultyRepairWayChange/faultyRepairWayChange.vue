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
      故障件维修工艺变更情况
    </p>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
        <p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          改型时间线
        </p>
      </div>
      <div id="repairRemodel_timeline" :style="{ width: '100%', height: '400px' }"></div>

      <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
          <p
            style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
          >
            对比堆叠图
          </p>


          <el-tooltip placement="top">
            <div slot="content">高发故障模式涉及到的故障件的生产工艺所生产的产品数以及产品对应的质量问题数</div>
            <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 12px; font-size: 30px;"></i>
          </el-tooltip>

        </div>
          <div
            id="repairDuibi"
            style="width: 100%; height: 400px;"
          ></div>
    </el-card>
  </div>
</template>

<script>
import { 
  listRepairWayChange,
  listFaultyCountByRepairWay
} from "@/api/system/10";
import { 
  selectFaultyCount
} from "@/api/system/dev";

import * as echarts from "echarts";

export default {
  name: "FaultyRepairWayChange",
  data() {
    return {
      productChange: [],
      se: [],
      x: [],
      y: [],
      // 故障件名称列表
      partsNameList:[],
      // 故障件数列表
      qualityNumList:[],
      // 生产总数
      productList:[],
      //爆发故障件名称列表
      burstPartsList:[],
      // 维修工艺名称
      modelWayList:[],
      // 对比堆叠图x轴数据
      se_stacked: [],
      // 维修工艺列表
      repairWaysList:{},
      //名称型号字典
      nameModelMap:{},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 产品改型数据表格数据
      modifyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        planeType: null,
        productType: null,
        productName: null,
        productModel: null,
        modifyTime: null,
        modifyMeasures: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.listFaultyCountByRepairWay1();
    
  },
  mounted() {
    this.listRepairWayChange();
    this.getBurstPartsNameList();
    
  },
  methods: {
    getX() {
      for (let index = 0; index < this.productChange.length; index++) {
        this.x[index] = this.productChange[index].modifyTime;
      }
      
      // console.log("x:", this.x);
      
    },
    getY() {
      // debugger
      let flag = 0;
      for (let index = 0; index < this.productChange.length; index++) {
        if (!this.y.includes(this.productChange[index].productModel + this.productChange[index].productName)){
          this.y[flag] = this.productChange[index].productModel + this.productChange[index].productName;  
          flag++;
        }
        
      }
      // console.log("y:", this.y);
      
      
    },

    dealRes() {
      // debugger
      for (var i = 0; i < this.productChange.length; i++) {
        this.se.push({
          name: this.productChange[i].productModel,
          type: "line",
          data: [],
          // markPoint: {
          //   symbol: "triangle",
          //   symbolSize: 20,
          //   data: [],
          // },
          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [
              {
                name: this.productChange[i].productModel+" "+this.productChange[i].productName+" "+this.productChange[i].modifyTime+" "+this.repairWaysList[this.productChange[i].productModel+" "+this.productChange[i].productName],
                coord: [
                  this.productChange[i].modifyTime,
                  this.productChange[i].productModel +
                    this.productChange[i].productName,
                ],
                label: {
                  show: true,
                },
              },
            ],
          },
        });
        for (let u = 0; u < this.x.length; u++) {
          this.se[i].data.push(i);
        }
        for (let y = 0; y < this.x.length; y++) {
          if (this.x[y] === this.y[i]) {
            //console.log(this.x[y]);
            let mkp = {
              name:
                this.x[y].productName +
                " "+
                this.x[y].productModel +
                " " +
                this.dateFormat(this.x[y]),
              coord: [
                this.dateFormat(this.x[y]),
                this.y[i],
              ],
              label: {
                show: true,
              },
            }
            this.se[i].markPoint.data.push(mkp)
          }
        }
      }
      
    },

    listRepairWayChange() {
      listRepairWayChange().then((res) => {
        this.productChange = res;
        // console.log("productChange1:", this.productChange);
        this.getX();
        this.getY();
        this.dealRes();
        this.getHeight_timeline();
        this.init_Chart_remodel_timeline()
        // this.initChart();
      });
    },

    initChart() {
      // debugger
      var chartDom = document.getElementById("repairRemodel_timeline");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          // text: '故障件改型时间线'
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}",
          axisPointer: {
            axis: "x",
            type: "line", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },

        // tooltip: {
        //   trigger: 'item',
        //   //鼠标悬浮不显示
        //   showContent:false,
        // },
        /**图例 水平 */
        // legend: { orient: 'horizontal'},
        //右工具
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: { readOnly: false },
        //     magicType: { type: ['line', 'bar'] },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          //x轴两边留白
          boundaryGap: false,
          // data : this.xData,
          data: this.x,
        },

        yAxis: {
          type: "category",
          data: this.y,
        },
        series: this.se,
      };
      option && myChart.setOption(option);
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
   
    getBurstPartsNameList(){
      this.burstPartsList=[],
      this.nameModelMap={}
      selectFaultyCount().then(response => {
        for(let i=0;i<response.length;i++){
          if(!this.burstPartsList.includes(response[i].partsModelName)){
            const strArr = response[i].partsModelName.split('-', 3)
            let name = strArr[0]+"-"+strArr[1]+" "+strArr[2]
            this.burstPartsList.push(name)
          } 
        }
        for(let m=0;m<this.burstPartsList.length;m++){
          const strArr2 = this.burstPartsList[m].split(' ', 2)
          this.nameModelMap[strArr2[0]]=strArr2[1]
        }
        // console.log("字典",this.nameModelMap)
        this.listFaultyCountByRepairWay();
      });
    },

    // 高发故障模式涉及到的维修工艺生成故障件数目
    listFaultyCountByRepairWay(){
      this.qualityNumList=[]
      this.partsNameList=[]
      this.modelWayList=[],
      // console.log("000",this.burstPartsList)
      listFaultyCountByRepairWay().then(response => {  
        for(let i=0;i<response.length;i++){
          if(this.burstPartsList.includes(response[i].partsModelName)){
            const strArr = response[i].partsModelName.split(' ', 2)
            this.qualityNumList.push(response[i].partsCount);
            if(!this.partsNameList.includes(strArr[1])){
              this.partsNameList.push(strArr[1]);
            }
            let modelWay = strArr[0]+" "+response[i].partsProportion
            if(!this.modelWayList.includes(modelWay)){
              this.modelWayList.push(modelWay);
            }
          }
          
          // this.repairWaysList[response[i].partsModelName] = response[i].partsProportion
        }
        // console.log("111",this.qualityNumList);
        // console.log("222",this.partsNameList);
        // console.log("333",this.modelWayList);
        this.dealRes1(); 
        
        // this.getChart();
      });
    },
    //处理字典数据
    listFaultyCountByRepairWay1(){
      console.log("000",this.burstPartsList)
      listFaultyCountByRepairWay().then(response => {  
        for(let i=0;i<response.length;i++){
          this.repairWaysList[response[i].partsModelName] = response[i].partsProportion
        }
      });
    },
    // 高度适应 改型时间线
    getHeight_timeline() {
      var id__timeline = document.getElementById("repairRemodel_timeline")
      var height__timeline = this.y.length * 100
      //d.setAttribute(height,height+"px");
      id__timeline.style.cssText = "height:" + height__timeline + "px"
    },
    //初始化 改型时间线折线图
    init_Chart_remodel_timeline() {
      let remodel_timeline_chart = echarts.init(
        document.getElementById("repairRemodel_timeline")
      )
      // echarts自适应
      window.addEventListener("resize", () => {
        remodel_timeline_chart.resize()
      })
      remodel_timeline_chart.setOption(this.set_Option_remodel_timeline())
      //console.log(this.se_timeline)
    },
    // 初始化 改型时间线折线图
    set_Option_remodel_timeline() {
      // 改型时间线折线图
      let option = {
        // tooltip: {
        //   formatter: (param) => {
        //     console.log("param",param);
        //   },
        //   //axisPointer: {
        //   //   axis: "y",
        //   // },
        //   show: true,
        //   trigger: "item",
        // },
        // tooltip: {
        //   trigger: "axis", //'Temperature : <br/>{b} : {c}°C'
        //   formatter: "{b}",
        //   axisPointer: {
        //     axis: "x",
        //   },
        // },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          // axisTick: { inside: true },
          type: "category",
          boundaryGap: false,
          data: this.x,
          axisLabel: {
            // show: false,
            interval: 0,
            rotate: 50,
          },
        },
        yAxis: {
          type: "category",
          data: this.y,
        },
        series: this.se,
      }
      return option
    },
    // 处理堆叠图数据
    dealRes1() {

      //插入se_stacked数据
      for (let l = 0; l < this.modelWayList.length; l++) {
        let se = {
          name: "",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [],
        }
        for (let i = 0; i < this.partsNameList.length; i++) {
            se.data.push(0)
          }
        this.se_stacked.push(se)
      }

      console.log("se",this.se_stacked)
      // 放入名称对应型号+维修工艺的数量
      for(let i = 0; i < this.se_stacked.length; i++){
        this.se_stacked[i].name = this.modelWayList[i]
        const strArr = this.modelWayList[i].split(' ', 2)
        for(let j = 0; j < this.partsNameList.length; j++){
          if(this.nameModelMap[strArr[0]]===this.partsNameList[j]){
            this.se_stacked[i].data[j]=this.qualityNumList[i]
            break
          }
        }
      }
      this.getHeight_stacked()
      this.init_Chart_compared_stacked()
      // let plane_remodel_time1 = []
      // console.log(
      //   "JSON.parse",
      //   JSON.parse(JSON.stringify(this.plane_remodel_time))
      // )
      // plane_remodel_time1.push(
      //   JSON.parse(JSON.stringify(this.plane_remodel_time))
      // )
      // plane_remodel_time1 = JSON.parse(JSON.stringify(this.plane_remodel_time))

      // console.log("plane_remodel_time1", plane_remodel_time1)

      //循环所有质量问题表
      // for (let i = 0; i < this.DataList1.length; i++) {
      //   //循环飞机改型时间表
      //   for (let j = 0; j < plane_remodel_time1.length; j++) {
      //     //找到对应机型
      //     if (
      //       this.DataList1[i].modelSeries === plane_remodel_time1[j].modelSeries
      //     ) {
      //       let flag = 0
      //       for (let k = 0; k < plane_remodel_time1[j].remodel.length; k++) {
      //         if (
      //           this.DataList1[i].planeType ===
      //           plane_remodel_time1[j].remodel[k].planeType
      //         ) {
      //           plane_remodel_time1[j].remodel[k].is++
      //           flag = 1
      //           break
      //         }
      //       }
      //       if (flag === 0) {
      //         let plane = {
      //           date: "",
      //           is: 1,
      //           planeType: this.DataList1[i].planeType,
      //         }
      //         //console.log("plane", plane)
      //         plane_remodel_time1[j].remodel.unshift(plane)
      //       }
      //       break
      //     }
      //   }
      // }

      // this.plane_remodel_time = plane_remodel_time1
      // //console.log("plane_remodel_time", this.plane_remodel_time)

      // let ii = 0
      // for (let i = 0; i < this.plane_remodel_time.length; i++) {
      //   for (let j = 0; j < this.plane_remodel_time[i].remodel.length; j++) {
      //     this.se_stacked[ii].name =
      //       this.plane_remodel_time[i].remodel[j].planeType
      //     this.se_stacked[ii].data[i] = this.plane_remodel_time[i].remodel[j].is
      //     ii++
      //   }
      // }
      // //console.log("se_stacked_", this.se_stacked)

      // for (let q = 0; q < this.se_stacked.length; q++) {
      //   let jj = 0
      //   for (let p = 0; p < this.se_stacked[q].data.length; p++) {
      //     if (this.se_stacked[q].data[p] !== 0) {
      //       jj = 1
      //       break
      //     }
      //   }
      //   if (jj === 0) {
      //     this.se_stacked.splice(q, 1)
      //     q--
      //   }
      // }

      // for (let q = 0; q < this.se_stacked.length; q++) {
      //   for (let p = 0; p < this.se_stacked[q].data.length; p++) {
      //     if (this.se_stacked[q].data[p] === 0) {
      //       this.se_stacked[q].data[p] = ""
      //     }
      //   }
      // }
    },
    //初始化 对比堆叠图
    init_Chart_compared_stacked() {
      let compared_stacked_chart = echarts.init(
        document.getElementById("repairDuibi")
      )
      // echarts自适应
      window.addEventListener("resize", () => {
        compared_stacked_chart.resize()
      })
      compared_stacked_chart.setOption(this.set_Option_compared_stacked(), true)
    },
    //初始化 对比堆叠图
    set_Option_compared_stacked() {
      // 对比堆叠图
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: this.partsNameList,
        },
        series: this.se_stacked,
      }
      return option
    },
    getHeight_stacked() {
      var id__stacked = document.getElementById("repairDuibi")
      var height__stacked = this.partsNameList.length * 100
      //d.setAttribute(height,height+"px");
      id__stacked.style.cssText = "height:" + height__stacked + "px"
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        planeType: null,
        productType: null,
        productName: null,
        productModel: null,
        modifyTime: null,
        modifyMeasures: null,
      };
      this.resetForm("form");
    },
  },
};
</script>
