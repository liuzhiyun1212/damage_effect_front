<template>
  <div>
   <div class="app-container" style="width:95%;margin-left: 30px;background: #d2e9ff; margin-top: 10px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          style="width: 160px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品型号" prop="productModel">
        <el-input
          v-model="queryParams.productModel"
          placeholder="请输入产品型号"
          clearable
          style="width: 160px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变更类型" prop="modifyType">
        <el-input
          v-model="queryParams.modifyType"
          placeholder="请输入变更类型"
          clearable
          style="width: 160px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </el-form>
     </div>

    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport6"
          style="
            font-family: Arial;
            font-size: 10px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >产品制作变更数据导入</el-button>
<!--      </el-col>-->

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
<!--    </el-row>-->

    <el-table v-loading="loading" :data="modifyDataList"
              @selection-change="handleSelectionChange"
              :default-sort="defaultSort"
              @sort-change="handleSortChange"
              :header-cell-style="{
               background: '#84BBFE',
               color: '#fff',
               // fontSize: '14px',
               textAlign: 'center',
               // fontWeight: '600',
               fontFamily: '黑体',
               padding: '0',
                 }" style="margin-top: 10px" class="myTable">
      <el-table-column type="index"  align="center" label="序号"/>
      <el-table-column label="产品名称" align="center" prop="productName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="产品型号" align="center" prop="productModel" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="变更时间" align="center" prop="modifyTime" width="180" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.modifyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更类型" align="center" prop="modifyType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="变更方式" align="center" prop="modifyMethod" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
            v-hasPermi="['system:modifyData:edit']"
          >详情</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:modifyData:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:modifyData:remove']"
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

    </el-card>


    <el-dialog :title="upload.title" :visible.sync="upload.open6" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url6 + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate6">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open6 = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改对应文档中的7 产品制造变更数据对话框 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品型号" prop="productModel">
          <el-input v-model="form.productModel" placeholder="请输入产品型号" />
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

    <!-- 添加或修改对应文档中的7 产品制造变更数据详情对话框 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入产品名称" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="产品型号" prop="productModel">
          <el-input v-model="form.productModel" placeholder="请输入产品型号" readonly="readonly"/>
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
import { listModifyData, getModifyData, delModifyData, addModifyData, updateModifyData } from "@/api/system/modifyData";
import {getToken} from "@/utils/auth";
export default {
  name: "ModifyData",
  data() {
    return {
      upload: {
        // 是否显示弹出层（用户导入）
        open6: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url6: process.env.VUE_APP_BASE_API + "/system/modifyData/importData"
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 默认排序
      defaultSort: {prop:"modifyTime", order: 'descending'},
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 产品制造变更数据表格数据
      modifyDataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open1: false,
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productName: null,
        productModel: null,
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
    handleImport6() {
      this.upload.title = "产品制造变更数据导入";
      this.upload.open6 = true;
    },
    importTemplate6() {
      this.download('system/modifyData/importTemplate', {
      }, `ProductModifyData${new Date().getTime()}.xlsx`)
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
      this.upload.open3 = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    /** 查询产品制造变更数据列表 */
    getList() {
      this.loading = true;
      listModifyData(this.queryParams).then(response => {
        this.modifyDataList = response.rows;
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
        productName: null,
        productModel: null,
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
      this.title = "添加产品制造变更数据";
    },
    /** 修改按钮操作 */
    handleDetail(row) {
      this.reset();
      const id = row.id || this.ids
      getModifyData(id).then(response => {
        this.form = response.data;
        this.open2 = true;
        this.title = "产品制造变更数据详情";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getModifyData(id).then(response => {
        this.form = response.data;
        this.open1 = true;
        this.title = "修改产品制造变更数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateModifyData(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.getList();
            });
          } else {
            addModifyData(this.form).then(response => {
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
      const name = row.productName;
      this.$modal.confirm('是否确认删除产品制造变更数据名为"' + name + '"的数据项？').then(function() {
        return delModifyData(ids);
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
      this.download('system/modifyData/export', {
        ...this.queryParams
      }, `modifyData_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
