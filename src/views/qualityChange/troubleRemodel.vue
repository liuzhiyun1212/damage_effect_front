<template>
  <div class="app-container">
     <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <div id="echart-line" :style="{ width: '100%', height: '400px' }"></div>
     
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
        故障件改型情况
      </p>
    </div>


        <el-table 
      :header-cell-style="{
        background: '#84BBFE',
        color: '#fff',
        fontSize: '14px',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: '黑体',
        padding: '0',
      }"
      :header-row-style="{
        height: '20',
      }"
     
      :data="productChange"
      @selection-change="handleSelectionChange"
      style="height: auto; margin-top: 20px; width: 99%"
    >
      <el-table-column type="index" align="center" label="序号" width="50" />
      <el-table-column
        label="故障件型号"
        align="center"
        prop="productModel"
      ></el-table-column>
      <el-table-column
        label="故障件名称"
        align="center"
        prop="productName"
      ></el-table-column>
      <el-table-column
        label="改型时间"
        align="center"
        prop="modifyTime"
      >
      </el-table-column>
      <!-- <el-table-column label="质量问题标题" align="center" prop="title" />
     
      <el-table-column label="故障件种类" align="center" prop="partsType" />
      <el-table-column label="故障件名称" align="center" prop="partsName" />
      <el-table-column label="故障模式" align="center" prop="faultModel" /> -->
    </el-table>



     </el-card>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listModify, getModify, delModify, addModify, updateModify, listProductChange } from "@/api/system/modify";
import * as echarts from "echarts";

export default {
  name: "Modify",
  data() {
    return {

      productChange:[],
      se:[],
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
        modifyMeasures: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    
  },
  mounted(){
    this.testChange();
    
    
  },
  methods: {
    getX(){
      for (let index = 0; index < this.productChange.length; index++) {
        this.x[index]  = this.productChange[index].modifyTime;
      }
      
      console.log("x:",this.x);
      this.dealRes();

    },
    getY(){
      let flag =0;
      for (let index = 0; index < this.productChange.length; index++) {
        if (this.productChange[index-flag].productModel+this.productChange[index-flag].productName ==this.y[index-flag-1]) {
          flag =flag+1;
          console.log("faefa",flag);
        }
        else{
          this.y[index-flag] = this.productChange[index-flag].productModel+this.productChange[index-flag].productName;

        }    
      }
      console.log("y222:",this.y);
      this.initChart();
    },




    dealRes() {
      for (var i = 0; i < this.productChange.length; i++) {
        this.se.push({
          name: this.productChange[i].productModel,
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: 'triangle',
            data: [{
                name: "",
                coord: [
                  this.productChange[i].modifyTime,
                  this.productChange[i].productModel+this.productChange[i].productName],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              }],
                 
              },}
        );
        for (let u = 0; u < this.x.length; u++) {
          this.se[i].data.push(i);
        }
      };
      // for(let j=0;j<this.se.length;j++){
      //   for(let i=0;i<this.productChange.length;i++){
      //     this.se[j].data.push(j);
      //   }
      // }
      
      },




    testChange(){
     listProductChange().then(res=>{
      this.productChange = res;
      console.log("productChange1:",this.productChange);
      this.getX();
      this.getY();

     })
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
          trigger: 'item',
          //鼠标悬浮不显示
          showContent:false, 
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
      };
      option && myChart.setOption(option);
      // echarts自适应
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    },


    /** 查询产品改型数据列表 */
    getList() {
      this.loading = true;
      listModify(this.queryParams).then(response => {
        this.modifyList = response.rows;
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
        productType: null,
        productName: null,
        productModel: null,
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
      this.title = "添加产品改型数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getModify(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品改型数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateModify(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addModify(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除产品改型数据编号为"' + ids + '"的数据项？').then(function() {
        return delModify(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/modify/export', {
        ...this.queryParams
      }, `modify_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
