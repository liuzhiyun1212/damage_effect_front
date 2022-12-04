<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="机型" prop="planeType">
        <el-input
          v-model="queryParams.planeType"
          placeholder="请输入机型"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称" prop="partsName">
        <el-input
          v-model="queryParams.partsName"
          placeholder="请输入产品名称"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品型号" prop="partsModel">
        <el-input
          v-model="queryParams.partsModel"
          placeholder="请输入产品型号"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport5"
        >产品生产数量导入</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="List" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange" class="myTable">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="机型" align="center" prop="planeType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="产品名称" align="center" prop="partsName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="产品型号" align="center" prop="partsModel" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="出厂编号" align="center" prop="partsCode" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="出厂时间" align="center" prop="partsFactoryTime" width="180" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.partsFactoryTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品批次" align="center" prop="partsManufacture" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="制造班组" align="center" prop="partsMakeGroup" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="制造人员" align="center" prop="partsMakePeople" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="加工设备" align="center" prop="partsMakeQuipment" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
<!--      <el-table-column label="测量设备" align="center" prop="partsMeasuringQuipment" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="原材料来源" align="center" prop="rawMaterialPlace" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="零部件来源" align="center" prop="sparePartsPlace" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="生产工艺" align="center" prop="partsMakeWorkmanship" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>-->
<!--      <el-table-column label="测量设备" align="center" prop="partsMeasuringQuipment" />-->
<!--      <el-table-column label="原材料来源" align="center" prop="rawMaterialPlace" />-->
<!--      <el-table-column label="零部件来源" align="center" prop="sparePartsPlace" />-->
<!--      <el-table-column label="生产工艺" align="center" prop="partsMakeWorkmanship" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
            v-hasPermi="['system:9:edit']"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:9:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:9:remove']"
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


    <!-- 产品生产数量导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open5" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url5 + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <!--          <div class="el-upload__tip" slot="tip">
                      <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>-->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate5">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open5 = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改产品生产数量导入对话框对话框 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" />
        </el-form-item>
        <el-form-item label="产品名称" prop="partsName">
          <el-input v-model="form.partsName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品型号" prop="partsModel">
          <el-input v-model="form.partsModel" placeholder="请输入产品型号" />
        </el-form-item>
        <el-form-item label="出厂编号" prop="partsCode">
          <el-input v-model="form.partsCode" placeholder="请输入出厂编号" />
        </el-form-item>
        <el-form-item label="出厂时间" prop="partsFactoryTime">
          <el-date-picker clearable
                          v-model="form.partsFactoryTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择出厂时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品批次" prop="partsManufacture">
          <el-input v-model="form.partsManufacture" placeholder="请输入产品批次" />
        </el-form-item>
        <el-form-item label="制造班组" prop="partsMakeGroup">
          <el-input v-model="form.partsMakeGroup" placeholder="请输入制造班组" />
        </el-form-item>
        <el-form-item label="制造人员" prop="partsMakePeople">
          <el-input v-model="form.partsMakePeople" placeholder="请输入制造人员" />
        </el-form-item>
        <el-form-item label="加工设备" prop="partsMakeQuipment">
          <el-input v-model="form.partsMakeQuipment" placeholder="请输入加工设备" />
        </el-form-item>
        <el-form-item label="测量设备" prop="partsMeasuringQuipment">
          <el-input v-model="form.partsMeasuringQuipment" placeholder="请输入测量设备" />
        </el-form-item>
        <el-form-item label="原材料来源地" prop="rawMaterialPlace">
          <el-input v-model="form.rawMaterialPlace" placeholder="请输入原材料来源地" />
        </el-form-item>
        <el-form-item label="零部件来源地" prop="sparePartsPlace">
          <el-input v-model="form.sparePartsPlace" placeholder="请输入零部件来源地" />
        </el-form-item>
        <el-form-item label="生产工艺" prop="partsMakeWorkmanship">
          <el-input v-model="form.partsMakeWorkmanship" placeholder="请输入生产工艺" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 产品生产数量详情对话框对话框 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="产品名称" prop="partsName">
          <el-input v-model="form.partsName" placeholder="请输入产品名称" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="产品型号" prop="partsModel">
          <el-input v-model="form.partsModel" placeholder="请输入产品型号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="出厂编号" prop="partsCode">
          <el-input v-model="form.partsCode" placeholder="请输入出厂编号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="出厂时间" prop="partsFactoryTime">
          <el-date-picker clearable
                          v-model="form.partsFactoryTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择出厂时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品批次" prop="partsManufacture">
          <el-input v-model="form.partsManufacture" placeholder="请输入产品批次" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="制造班组" prop="partsMakeGroup">
          <el-input v-model="form.partsMakeGroup" placeholder="请输入制造班组" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="制造人员" prop="partsMakePeople">
          <el-input v-model="form.partsMakePeople" placeholder="请输入制造人员" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="加工设备" prop="partsMakeQuipment">
          <el-input v-model="form.partsMakeQuipment" placeholder="请输入加工设备" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="测量设备" prop="partsMeasuringQuipment">
          <el-input v-model="form.partsMeasuringQuipment" placeholder="请输入测量设备" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="原材料来源地" prop="rawMaterialPlace">
          <el-input v-model="form.rawMaterialPlace" placeholder="请输入原材料来源地" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="零部件来源地" prop="sparePartsPlace">
          <el-input v-model="form.sparePartsPlace" placeholder="请输入零部件来源地" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="生产工艺" prop="partsMakeWorkmanship">
          <el-input v-model="form.partsMakeWorkmanship" placeholder="请输入生产工艺" readonly="readonly"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list9, get9, del9, add9, update9 } from "@/api/system/9";
import {getToken} from "@/utils/auth";

export default {
  name: "9",
  data() {
    return {
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open5: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url5: process.env.VUE_APP_BASE_API + "/system/9/importData",
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 默认排序
      defaultSort: {prop:"partsFactoryTime", order: 'descending'},
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 9：产品生产数量表格数据
      List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open1: false,
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        planeType: null,
        partsName: null,
        partsModel: null,
        partsCode: null,
        partsFactoryTime: null,
        partsManufacture: null,
        partsMakeGroup: null,
        partsMakePeople: null,
        partsMakeQuipment: null,
      },
    // 表单参数
    form: {},
    // 表单校验
    rules: {
    }
  };
  },
  created() {
    this.getList();
  },
  methods: {
    handleImport5() {
      this.upload.title = "产品生产数量导入";
      this.upload.open5 = true;
    },
    importTemplate5() {
      this.download('system/data/importTemplate', {
      }, `PartsMakeNum9${new Date().getTime()}.xlsx`)
    },
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 产品设计文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open5 = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height:0vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    /** 查询9：产品生产数量列表 */
    getList() {
      this.loading = true;
      list9(this.queryParams).then(response => {
        this.List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open1 = false;
      this.open2 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        planeType: null,
        partsName: null,
        partsModel: null,
        partsCode: null,
        partsFactoryTime: null,
        partsManufacture: null,
        partsMakeGroup: null,
        partsMakePeople: null,
        partsMakeQuipment: null,
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
      this.queryParams.pageNum = 1;
      this.$refs.tables.sort(this.defaultSort.prop, this.defaultSort.order)
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
      this.title = "添加9：产品生产数量";
    },
    /** 详情按钮操作 */
    handleDetail(row) {
      this.reset();
      const id = row.id || this.ids
      get9(id).then(response => {
        this.form = response.data;
        this.open2 = true;
        this.title = "产品生产数量数据详情";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      get9(id).then(response => {
        this.form = response.data;
        this.open1 = true;
        this.title = "产品生产数量数据修改";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            update9(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.getList();
            });
          } else {
            add9(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open1 = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      const name = row.planeType;
      this.$modal.confirm('是否确认删除产品生成数量数据名为"' + name + '"的数据项？').then(function() {
        return delDesign(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.getList();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/9/export', {
        ...this.queryParams
      }, `9_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style lang="scss" scoped>
.myTable{
  width: 100%;
  height: 50%;
}

</style>
