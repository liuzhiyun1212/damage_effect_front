<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <div id="main" style="height: 600px"></div>
      </div></el-col>
    </el-row>
<!--    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="故障件种类" prop="faultKind">
        <el-input
          v-model="queryParams.faultKind"
          placeholder="请输入故障件种类"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件名称" prop="faultName">
        <el-input
          v-model="queryParams.faultName"
          placeholder="请输入故障件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件出厂编号" prop="faultNumber">
        <el-input
          v-model="queryParams.faultNumber"
          placeholder="请输入故障件出厂编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件制作单位" prop="faultManufacturer">
        <el-input
          v-model="queryParams.faultManufacturer"
          placeholder="请输入故障件制作单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件制造批次" prop="faultBatch">
        <el-input
          v-model="queryParams.faultBatch"
          placeholder="请输入故障件制造批次"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件出厂时间" prop="faultTime">
        <el-date-picker clearable
          v-model="queryParams.faultTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择故障件出厂时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="故障件使用时间" prop="faultUsetime">
        <el-date-picker clearable
          v-model="queryParams.faultUsetime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择故障件使用时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="故障现象" prop="faultPhenomenon">
        <el-input
          v-model="queryParams.faultPhenomenon"
          placeholder="请输入故障现象"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障模式" prop="faultModel">
        <el-input
          v-model="queryParams.faultModel"
          placeholder="请输入故障模式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障发生地点" prop="faultPlace">
        <el-input
          v-model="queryParams.faultPlace"
          placeholder="请输入故障发生地点"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否维修" prop="faultRepair">
        <el-input
          v-model="queryParams.faultRepair"
          placeholder="请输入是否维修"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大修时间" prop="repairTime">
        <el-date-picker clearable
          v-model="queryParams.repairTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择大修时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="大修厂" prop="repairFactory">
        <el-input
          v-model="queryParams.repairFactory"
          placeholder="请输入大修厂"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大修人员" prop="repairStaff">
        <el-input
          v-model="queryParams.repairStaff"
          placeholder="请输入大修人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:faultchange:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:faultchange:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:faultchange:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:faultchange:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table v-loading="loading" :data="faultchangeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="故障序号" align="center" prop="faultId" />
      <el-table-column label="故障件种类" align="center" prop="faultKind" />
      <el-table-column label="故障件名称" align="center" prop="faultName" />
      <el-table-column label="故障件型号" align="center" prop="faultType" />
      <el-table-column label="故障件出厂编号" align="center" prop="faultNumber" />
      <el-table-column label="故障件制作单位" align="center" prop="faultManufacturer" />
      <el-table-column label="故障件制造批次" align="center" prop="faultBatch" />
      <el-table-column label="故障件出厂时间" align="center" prop="faultTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障件使用时间" align="center" prop="faultUsetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultUsetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障现象" align="center" prop="faultPhenomenon" />
      <el-table-column label="故障模式" align="center" prop="faultModel" />
      <el-table-column label="故障发生地点" align="center" prop="faultPlace" />
      <el-table-column label="是否维修" align="center" prop="faultRepair" />
      <el-table-column label="大修时间" align="center" prop="repairTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.repairTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大修厂" align="center" prop="repairFactory" />
      <el-table-column label="大修人员" align="center" prop="repairStaff" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:faultchange:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:faultchange:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改故障模式变更对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="故障件种类" prop="faultKind">
          <el-input v-model="form.faultKind" placeholder="请输入故障件种类" />
        </el-form-item>
        <el-form-item label="故障件名称" prop="faultName">
          <el-input v-model="form.faultName" placeholder="请输入故障件名称" />
        </el-form-item>
        <el-form-item label="故障件出厂编号" prop="faultNumber">
          <el-input v-model="form.faultNumber" placeholder="请输入故障件出厂编号" />
        </el-form-item>
        <el-form-item label="故障件制作单位" prop="faultManufacturer">
          <el-input v-model="form.faultManufacturer" placeholder="请输入故障件制作单位" />
        </el-form-item>
        <el-form-item label="故障件制造批次" prop="faultBatch">
          <el-input v-model="form.faultBatch" placeholder="请输入故障件制造批次" />
        </el-form-item>
        <el-form-item label="故障件出厂时间" prop="faultTime">
          <el-date-picker clearable
            v-model="form.faultTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择故障件出厂时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障件使用时间" prop="faultUsetime">
          <el-date-picker clearable
            v-model="form.faultUsetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择故障件使用时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障现象" prop="faultPhenomenon">
          <el-input v-model="form.faultPhenomenon" placeholder="请输入故障现象" />
        </el-form-item>
        <el-form-item label="故障模式" prop="faultModel">
          <el-input v-model="form.faultModel" placeholder="请输入故障模式" />
        </el-form-item>
        <el-form-item label="故障发生地点" prop="faultPlace">
          <el-input v-model="form.faultPlace" placeholder="请输入故障发生地点" />
        </el-form-item>
        <el-form-item label="是否维修" prop="faultRepair">
          <el-input v-model="form.faultRepair" placeholder="请输入是否维修" />
        </el-form-item>
        <el-form-item label="大修时间" prop="repairTime">
          <el-date-picker clearable
            v-model="form.repairTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择大修时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="大修厂" prop="repairFactory">
          <el-input v-model="form.repairFactory" placeholder="请输入大修厂" />
        </el-form-item>
        <el-form-item label="大修人员" prop="repairStaff">
          <el-input v-model="form.repairStaff" placeholder="请输入大修人员" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFaultchange, delFaultchange, addFaultchange, updateFaultchange } from "@/api/system/faultchange";
import * as echarts from "echarts";
import {listFaultchange} from "@/api/system/faultchange";
import {oneYear} from "@/api/system/dev";

export default {
  name: "Faultchange",
  data() {
    return {

      //echarts数据
      option: {
        title: {
          text: '故障模式随时间变更折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['fault1', 'fault2', 'fault3', 'fault4', 'fault5']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '2021一季度',
            '2021二季度',
            '2021三季度',
            '2021四季度',
            '2022一季度',
            '2022二季度',
            '2022三季度'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'fault1',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'fault2',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'fault3',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'fault4',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'fault5',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
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
      // 故障模式变更表格数据
      faultchangeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        faultKind: null,
        faultName: null,
        faultType: null,
        faultNumber: null,
        faultManufacturer: null,
        faultBatch: null,
        faultTime: null,
        faultUsetime: null,
        faultPhenomenon: null,
        faultModel: null,
        faultPlace: null,
        faultRepair: null,
        repairTime: null,
        repairFactory: null,
        repairStaff: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        devHappenTime: [
          {required: true, message: "发生时间不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, 'dark');
    myChart.setOption(this.option);
  },
  methods: {
    /** 查询质量问题数据列表 */
    getList() {
      this.loading = true;
      listFaultchange(this.queryParams).then(response => {
        this.faultchangeList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.option.series

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
        faultId: null,
        faultKind: null,
        faultName: null,
        faultType: null,
        faultNumber: null,
        faultManufacturer: null,
        faultBatch: null,
        faultTime: null,
        faultUsetime: null,
        faultPhenomenon: null,
        faultModel: null,
        faultPlace: null,
        faultRepair: null,
        repairTime: null,
        repairFactory: null,
        repairStaff: null
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
      this.ids = selection.map(item => item.faultId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加故障模式变更";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const faultId = row.faultId || this.ids
      getFaultchange(faultId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改故障模式变更";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.faultId != null) {
            updateFaultchange(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFaultchange(this.form).then(response => {
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
      const faultIds = row.faultId || this.ids;
      this.$modal.confirm('是否确认删除故障模式变更编号为"' + faultIds + '"的数据项？').then(function() {
        return delFaultchange(faultIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/faultchange/export', {
        ...this.queryParams
      }, `faultchange_${new Date().getTime()}.xlsx`)
    }
}
};
</script>
