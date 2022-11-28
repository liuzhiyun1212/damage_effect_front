<template>
  <div class="app-container">
    <p
        style="
          font-family: Arial;
          font-size: 20px;
          font-weight: 600;
          display: inline-block;
          margin-left: 30px;
        "
      >
        质量问题高发故障模式
      </p>
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
        质量问题高发故障模式
      </p>
      <el-tooltip placement="top">
      <div slot="content">某故障件质量问题发生数大于质量问题故障模式平均发生数10%为质量问题高发故障模式</div>
      <i class="el-icon-question"  style="float: right; margin-right: 20px; margin-top: 8px; font-size: 40px;"></i>
    </el-tooltip>
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
     
      :data="formQualityList"
      @selection-change="handleSelectionChange"
      style="height: auto; margin-top: 20px; width: 99%"
    >
      <el-table-column type="index" align="center" label="序号" width="50" />
      <el-table-column
        label="高发故障模式"
        align="center"
        prop="qualityHigh"
      ></el-table-column>
      <el-table-column
        label="个数"
        align="center"
        prop="qualityHighCount"
      ></el-table-column>
      <el-table-column
        label="占比"
        align="center"
        prop="qualityProportion"
      >
      <template slot-scope="scope">
          <span>{{Math.round(scope.row.qualityProportion* 10000)/100+"%"}}</span>
        </template>
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
import {
  listProdeuctDesign3,
  getProdeuctDesign3,
  delProdeuctDesign3,
  addProdeuctDesign3,
  updateProdeuctDesign3,
  xyobject,
} from "@/api/system/prodeuctDesign3";
import {
  faultStatistics,
  listQualityProblem1,
  getQualityProblem1,
  delQualityProblem1,
  addQualityProblem1,
  updateQualityProblem1,
} from "@/api/system/qualityProblem1";
import * as echarts from "echarts";
export default {
  name: "ProdeuctDesign3",
  data() {
    return {
      //后端传的数据
      faultStatisticsArray: [],
      //质量问题高发故障模式、个数、总数、占比
      qualityHigh: [],
      qualityHighCount: [],
      qualityCountTotal: null,
      qualityProportion: [],

      formQualityList: [],

      se: [],
      pieData: [],
      xyObject: {},

      qualityProblem1List: [],

      prodeuctDesign3List: [],
      x: [],
      y: [],

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
        title: null,
        planeType: null,
        devCode: null,
        devUnit: null,
        devManufacture: null,
        devFactoryTime: null,
        devUseTime: null,
        devHappenTime: null,
        partsType: null,
        partsName: null,
        partsModel: null,
        partsCode: null,
        partsUnit: null,
        partsManufacture: null,
        partsFactoryTime: null,
        partsUseTime: null,
        faultPhenomenon: null,
        faultModel: null,
        environment: null,
        devRepaired: null,
        repairedTime: null,
        repairedFactory: null,
        repairedStaff: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  mounted() {
    //饼图
    this.testfaultStatistics();

    //改型时间线
    // this.getX();
    // this.getY();
  },
  created() {
    // this.getList();
  },

  methods: {
    //饼图时间线
    testfaultStatistics() {
      faultStatistics().then((response) => {
        this.faultStatisticsArray = response;
        console.log("faultStatisticsArray:", this.faultStatisticsArray);
        for (let index = 0; index < this.faultStatisticsArray.length; index++) {
          const element = this.faultStatisticsArray[index].modelCount;
          this.qualityCountTotal = this.qualityCountTotal + element;
        }
        console.log("总数：", this.qualityCountTotal);

        for (let index = 0; index < this.faultStatisticsArray.length; index++) {
          const mc = this.faultStatisticsArray[index].modelCount;
          if (mc / this.qualityCountTotal > 0.1) {
            // console.log("大于：",mc);
              if (index!=0 &&this.qualityHigh[index-1]==null) {
                this.qualityHigh[index-1] = this.faultStatisticsArray[index].faultModel;
              this.qualityHighCount[index-1] = this.faultStatisticsArray[index].modelCount;
              //三个之间占比
              this.qualityProportion[index-1] = mc / this.qualityCountTotal;
              }else{
                this.qualityHigh[index] = this.faultStatisticsArray[index].faultModel;
              this.qualityHighCount[index] = this.faultStatisticsArray[index].modelCount;
              //三个之间占比
              this.qualityProportion[index] = this.faultStatisticsArray[index].modelCount / this.qualityCountTotal;

              }

          }
        }
        this.queryParams.faultModel = this.qualityHigh;

        let sum = 0;
        for(let i = 0; i < this.qualityHighCount.length; ++i) {
            sum += this.qualityHighCount[i];
        }

        //占比 两个之间
        // for (let index = 0; index < this.qualityHighCount.length; index++) {
        //   this.qualityProportion[index] = this.qualityHighCount[index]/sum;
          
        // }

        for (let index = 0; index < this.qualityHigh.length; index++) {
          var x = {
            qualityHigh: null,
            qualityHighCount: null,
            qualityProportion: null,
          };
          x.qualityHigh = this.qualityHigh[index];
          x.qualityHighCount = this.qualityHighCount[index];
          x.qualityProportion = this.qualityProportion[index];
          this.formQualityList.push(x)
        }


        console.log("formQualityList:", this.formQualityList);
        console.log("高发：", this.qualityHigh);
        console.log("个数：", this.qualityHighCount);
        console.log("占比：", this.qualityProportion);
        this.dealPieData();
        this.initChart();
      });
    },

    dealPieData() {
      for (let index = 0; index < this.faultStatisticsArray.length; index++) {
        this.pieData.push({
          value: this.faultStatisticsArray[index].modelCount,
          name: this.faultStatisticsArray[index].faultModel,
          label: {
            position: "inside",
            formatter: `{d}%`,
          },
        });
      }
      console.log("pD", this.pieData);
    },

    dealRes() {
      for (var i = 0; i < this.xyObject.length; i++) {
        this.se.push({
          name: this.xyObject[i].finishedName,
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [
              {
                name: "",
                coord: [
                  this.xyObject[i].modifyTime,
                  this.xyObject[i].finishedName,
                ],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              },
            ],
          },
        });
      }
      // for (let j = 0; j < this.se.length; j++) {
      //   for (let i = 0; i < this.xyObject.length; i++) {
      //     this.se[j].data.push(j);
      //   }
      // }
    },

    getX() {
      xyobject().then((response) => {
        console.log("xyobject:", response);
        this.xyObject = response;
        this.dealRes();

        //去重
        for (let i = 0; i < response.length; i++) {
          let mark = 0;
          for (let j = 0; j < this.x.length; j++) {
            if (response[i].modifyTime === this.x[j]) {
              mark = -1;
            }
          }
          if (mark === 0) {
            this.x.push(response[i].modifyTime);
          }
        }
        console.log(this.x);
      });
    },

    getY() {
      xyobject().then((response) => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          let mark = 0;
          for (let j = 0; j < this.y.length; j++) {
            if (response[i].finishedName === this.y[j]) {
              mark = -1;
            }
          }
          if (mark === 0) {
            this.y.push(response[i].finishedName);
          }
        }
        console.log("y:", this.y);
        this.initChart();
        console.log("se:", this.se);
      });
    },

    initChart() {
      var chartDom = document.getElementById("echart-line");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        color: [
          "#45C2E0",
          "#FFC851",
          "#5A5476",
          "#1869A0",
          "#FF9393",
          "#fc8251",
          "#5470c6",
          "#91cd77",
          "#ef6567",
          "#f9c956",
          "#75bedc",
        ],
        title: {
          // text: '质量问题高发故障模式',
          // subtext: 'Fake Data',
          // left: 'center'
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
        },
        series: [
          {
            name: "故障模式",
            type: "pie",
            radius: "80%",
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize()
      })
    },

    /** 查询成品件设计数据列表 */
    getList() {
      this.loading = true;
      listQualityProblem1(this.queryParams).then((response) => {
        this.qualityProblem1List = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log("qualityProblem1List:", this.qualityProblem1List);
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
        title: null,
        planeType: null,
        devCode: null,
        devUnit: null,
        devManufacture: null,
        devFactoryTime: null,
        devUseTime: null,
        devHappenTime: null,
        partsType: null,
        partsName: null,
        partsModel: null,
        partsCode: null,
        partsUnit: null,
        partsManufacture: null,
        partsFactoryTime: null,
        partsUseTime: null,
        faultPhenomenon: null,
        faultModel: null,
        environment: null,
        devRepaired: null,
        repairedTime: null,
        repairedFactory: null,
        repairedStaff: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加质量问题数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getQualityProblem1(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改质量问题数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateQualityProblem1(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addQualityProblem1(this.form).then((response) => {
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
      this.$modal
        .confirm('是否确认删除质量问题数据编号为"' + ids + '"的数据项？')
        .then(function () {
          return delQualityProblem1(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/qualityProblem1/export",
        {
          ...this.queryParams,
        },
        `qualityProblem1_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
