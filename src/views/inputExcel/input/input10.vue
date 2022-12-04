<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="机型" prop="partsName">
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
      <el-form-item label="变更类型" prop="modifyType">
        <el-input
          v-model="queryParams.modifyType"
          placeholder="请输入变更类型"
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
          @click="handleImport7"
        >维修变更数据导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="List" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange" class="myTable">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="产品名称" align="center" prop="partsName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="产品型号" align="center" prop="partsModel" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="变更时间" align="center" prop="modifyTime" width="180" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.modifyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更类型" align="center" prop="modifyType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']" />
      <el-table-column label="变更方式" align="center" prop="modifyMethod" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
            v-hasPermi="['system:10:edit']"
          >详细</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:10:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:10:remove']"
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

    <!-- 修变更数据导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open7" width="400px" append-to-body>
     <el-upload
      ref="upload"
      :limit="1"
      accept=".xlsx, .xls"
      :headers="upload.headers"
      :action="upload.url7 + '?updateSupport=' + upload.updateSupport"
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
        <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate7">下载模板</el-link>
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitFileForm">确 定</el-button>
      <el-button @click="upload.open7 = false">取 消</el-button>
    </div>
  </el-dialog>
    <!-- 修改维修变更数据导入对话框 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="产品名称" prop="partsName">
          <el-input v-model="form.partsName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品型号" prop="partsModel">
          <el-input v-model="form.partsModel" placeholder="请输入产品型号" />
        </el-form-item>
        <el-form-item label="变更时间" prop="modifyTime">
          <el-date-picker clearable
                          v-model="form.modifyTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择变更时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="变更方式" prop="modifyMethod">
          <el-input v-model="form.modifyMethod" placeholder="请输入变更方式" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 维修变更数据导入详情对话框 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="产品名称" prop="partsName">
          <el-input v-model="form.partsName" placeholder="请输入产品名称" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="产品型号" prop="partsModel">
          <el-input v-model="form.partsModel" placeholder="请输入产品型号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="变更时间" prop="modifyTime">
          <el-date-picker clearable
                          v-model="form.modifyTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择变更时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="变更方式" prop="modifyMethod">
          <el-input v-model="form.modifyMethod" placeholder="请输入变更方式" readonly="readonly"/>
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
import { list10, get10, del10, add10, update10 } from "@/api/system/10";
import {getToken} from "@/utils/auth";

export default {
  name: "10",
  data() {
    return {
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open7: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url7: process.env.VUE_APP_BASE_API + "/system/10/importData"
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 默认排序
      defaultSort: {prop:"modifyTime", order: 'descending'},
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
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
        partsName: null,
        partsModel: null,
        modifyTime: null,
        modifyType: null,
        modifyMethod: null
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
    handleImport7() {
      this.upload.title = "维修变更数据";
      this.upload.open7 = true;
    },
    importTemplate7() {
      this.download('system/10/importTemplate', {
      }, `RepairModifyData10${new Date().getTime()}.xlsx`)
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
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      list10(this.queryParams).then(response => {
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
        partsName: null,
        partsModel: null,
        modifyTime: null,
        modifyType: null,
        modifyMethod: null
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleDetail(row) {
      this.reset();
      const id = row.id || this.ids
      get10(id).then(response => {
        this.form = response.data;
        this.open2 = true;
        this.title = "维修变更数据详情";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      get10(id).then(response => {
        this.form = response.data;
        this.open1 = true;
        this.title = "维修变更数据修改";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            update10(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.getList();
            });
          } else {
            add10(this.form).then(response => {
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
      const name = row.partsName;
      this.$modal.confirm('是否确认删除维修变更数据名为"' + name + '"的数据项？').then(function() {
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
      this.download('system/10/export', {
        ...this.queryParams
      }, `10_${new Date().getTime()}.xlsx`)
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
