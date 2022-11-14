<template>
  <div class="app-container">
       <div id="echart-line" :style="{width: '100%', height: '400px'}"></div>  
  </div>
</template>

<script>
import { listProdeuctDesign3, getProdeuctDesign3, delProdeuctDesign3, addProdeuctDesign3, updateProdeuctDesign3 ,xyobject} from "@/api/system/prodeuctDesign3";
import { listQualityProblem1, getQualityProblem1, delQualityProblem1, addQualityProblem1, updateQualityProblem1 } from "@/api/system/qualityProblem1";
import * as echarts from "echarts";
export default {
  name: "ProdeuctDesign3",
  data() {
    return {
      count:null,
      se:[],
      se2:[],
      xyObject:{},
      // xData: [],
      // yData: [],
      prodeuctDesign3List: [],
      x:[],
      y:[],

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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        planeType: null,
        finishedType: null,
        finishedName: null,
        finishedModel: null,
        finishedManufacturer: null,
        frame: null,
        upperMiddleLower: null,
        leftMiddleRight: null,
        installMethod: null,
        rawMaterial: null,
        spareParts: null,
        modifyTime: null,
        modifyMeasures: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  mounted() {
    
    this.getX();
    
    this.getY();
    
  },


  methods: {

    dealRes() {
      for (var i = 0; i < this.xyObject.length; i++) {
        this.se.push({
          name: this.xyObject[i].finishedName,
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: 'triangle',
            data: [{
                name: "11",
                coord: [this.xyObject[i].modifyTime,this.xyObject[i].finishedName],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              }],
                 
              },}
        );
      };
      for(let j=0;j<this.se.length;j++){
        for(let i=0;i<this.xyObject.length;i++){
          this.se[j].data.push(j);
        }
      }
      },

    getX(){
      xyobject().then(response => {
        console.log("xyobject:",response);
        this.xyObject =response;
        this.dealRes();

          for(let i=0;i<response.length;i++){
            let mark=0;
            for(let j=0;j<this.x.length;j++){
                if(response[i].modifyTime===this.x[j]){
                  mark=-1
                }
            }
            if(mark===0){
              this.x.push(response[i].modifyTime)
            }
          }
          console.log(this.x);
      });
    },

    getY(){
          xyobject().then(response => {
            console.log(response);
              for(let i=0;i<response.length;i++){
                let mark=0;
                for(let j=0;j<this.y.length;j++){
                    if(response[i].finishedName===this.y[j]){
                      mark=-1
                    }
                }
                if(mark===0){
                  this.y.push(response[i].finishedName)
                }
              }
              console.log("y:",this.y);
              this.initChart();
              console.log("se:",this.se);
          });
          
        },


    initChart(){
      var chartDom = document.getElementById('echart-line');
      var myChart = echarts.init(chartDom);
      var option;
      option = {

        title: {
          text: '故障件改型情况'
        },
        tooltip: {
          trigger: 'item'
        },
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
          type: 'category',
          //x轴两边留白
          boundaryGap: false,
          // data : this.xData,
          data: this.x,
        },

        yAxis: {
         type: "category",
         data:this.y,

        },
         series: this.se
         //[
        //   {
        //     name: 'Highest',
        //     type: 'line',
        //      data: this.se2,
          
        //      markPoint: {
        //        symbolSize: 20,
        //         symbol: "triangle",
        //         data: this.se,
        //      },
            
        //   },
        //   // {
        //   //   /**第二个 */
        //   //   name: 'Lowest',
        //   //   type: 'line',
        //   //   data: [1, -2, 2, 5, 3, 2, 0],
        //   //   // markPoint: {
        //   //   //   data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        //   //   // },
        //   //   // markLine: {
        //   //   //   data: [
        //   //   //     { type: 'average', name: 'Avg' },
        //   //   //     [
        //   //   //       {
        //   //   //         symbol: 'none',
        //   //   //         x: '90%',
        //   //   //         yAxis: 'max'
        //   //   //       },
        //   //   //       {
        //   //   //         symbol: 'circle',
        //   //   //         label: {
        //   //   //           position: 'start',
        //   //   //           formatter: 'Max'
        //   //   //         },
        //   //   //         type: 'max',
        //   //   //         name: '最高点'
        //   //   //       }
        //   //   //     ]
        //   //   //   ]
        //   //   // }
        //   // }
        // ]
      };
      option && myChart.setOption(option);
    },








      /**获取名称纵坐标 */
      getYNameList(){
        listProdeuctDesign3(this.queryParams).then(response => {
            const list = response.rows;
            for (let index = 0; index < list.length; index++) {
              const element = list[index];
              this.yData[index] = element.finishedName;
            }
            console.log(this.yData);
      });
      },

      /**获取时间横坐标 */
      getXTimeList(){
        listProdeuctDesign3(this.queryParams).then(response => {
            const list = response.rows;
            for (let index = 0; index < list.length; index++) {
              const element = list[index];
              this.xData[index] = element.modifyTime;
            }
            
            console.log(this.xData);
            
      });
      },

    


    /** 查询成品件设计数据列表 */
    getList() {
      this.loading = true;
      listProdeuctDesign3(this.queryParams).then(response => {
        this.prodeuctDesign3List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        planeType: null,
        finishedType: null,
        finishedName: null,
        finishedModel: null,
        finishedManufacturer: null,
        frame: null,
        upperMiddleLower: null,
        leftMiddleRight: null,
        installMethod: null,
        rawMaterial: null,
        spareParts: null,
        modifyTime: null,
        modifyMeasures: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加成品件设计数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getProdeuctDesign3(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改成品件设计数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateProdeuctDesign3(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProdeuctDesign3(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除成品件设计数据编号为"' + ids + '"的数据项？').then(function() {
        return delProdeuctDesign3(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/prodeuctDesign3/export', {
        ...this.queryParams
      }, `prodeuctDesign3_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
