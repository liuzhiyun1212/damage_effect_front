<!-- 装备改型情况-->
<template>
  <div>
    <div
      id="remodel_timeline"
      style="cursor: pointer; width: 100%; height: 300px"
    ></div>
    <div class="app-container">
      <el-table
        v-loading="loading"
        :data="dataList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" prop="id" />
        <el-table-column label="机型" align="center" prop="planeType" />
        <el-table-column
          label="装备改型时间"
          align="center"
          prop="remodelDate"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.remodelDate, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="装备改型措施"
          align="center"
          prop="remodelMeasure"
        />
        <el-table-column label="装备制造单位" align="center" prop="makeUnit" />
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import {
  listData,
  listDataAll,
  getData,
  delData,
  addData,
  updateData,
} from "@/api/system/data"
import * as echarts from "echarts"

export default {
  name: "Data",
  data() {
    return {
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
      // 装备设计/改型数据表格数据
      dataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        planeType: null,
        remodelDate: null,
        remodelMeasure: null,
        makeUnit: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 所有数据表
      totalDataList: [],
      // 改型时间线折线图 x轴时间数据
      xData: [],
      // 改型时间线折线图 y轴机型数据
      yData: [],
      //改型时间线折线图 数据
      se: [],
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getdata()
  },
  methods: {
    dateFormat(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      return `${y}.${m}`
    },
    getdata() {
      listDataAll().then((response) => {
        let markX = 0
        let markY = 0
        for (let i = 0; i < response.length; i++) {
          markX = 0
          markY = 0
          this.totalDataList.push(response[i])
          for (let j = 0; j < this.totalDataList.length; j++) {
            if (this.xData[j] == this.dateFormat(response[i].remodelDate)) {
              markX = -1
            }
            if (this.yData[j] == response[i].planeType) {
              markY = -1
            }
          }
          if (markX === 0) {
            this.xData.push(this.dateFormat(response[i].remodelDate))
          }
          if (markY === 0) {
            this.yData.push(response[i].planeType)
          }
        }
        this.xData.sort()
        this.yData.sort()
        console.log(this.totalDataList)
        console.log("xData:" + this.xData)
        console.log("yData:" + this.yData)
        this.dealRes()
        this.init_Chart_remodel_timeline()
      })
    },
    dealRes() {
      for (var i = 0; i < this.yData.length; i++) {
        this.se.push({
          name: this.yData[i],
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: "triangle",
            data: [],
          },
        })
        for (var y = 0; y < this.xData.length; y++) {
          this.se[i].data.push(this.yData[i])
        }
        for (var y = 0; y < this.totalDataList.length; y++) {
          if(this.totalDataList[y].planeType === this.yData[i]){
            var mkp={
              name: this.yData[i],
              coord: [this.dateFormat(this.totalDataList[y].remodelDate), this.yData[i]],
              label: {
                show: true,
              },
            }
            this.se[i].markPoint.data.push(mkp)
          }
        }
      }
    },
    //初始化 改型时间线折线图
    init_Chart_remodel_timeline() {
      let this_ = this
      let remodel_timeline_chart = echarts.init(
        document.getElementById("remodel_timeline")
      )
      remodel_timeline_chart.resize() //自适应大小
      remodel_timeline_chart.setOption(this.set_Option_remodel_timeline())
      console.log(this.se)
    },
    // 初始化 改型时间线折线图
    set_Option_remodel_timeline() {
      // 改型时间线折线图
      let option = {
        tooltip: {
          show : true,
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
        },
        yAxis: {
          type: "category",
          data: this.yData,
        },
        series: this.se,
      }
      return option
    },

    /** 查询装备设计/改型数据列表 */
    getList() {
      this.loading = true
      listData(this.queryParams).then((response) => {
        this.dataList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        planeType: null,
        remodelDate: null,
        remodelMeasure: null,
        makeUnit: null,
      }
      this.resetForm("form")
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm")
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加装备设计/改型数据"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getData(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = "修改装备设计/改型数据"
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateData(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功")
              this.open = false
              this.getList()
            })
          } else {
            addData(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功")
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除装备设计/改型数据编号为"' + ids + '"的数据项？')
        .then(function () {
          return delData(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess("删除成功")
        })
        .catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/data/export",
        {
          ...this.queryParams,
        },
        `data_${new Date().getTime()}.xlsx`
      )
    },
  },
}
</script>
