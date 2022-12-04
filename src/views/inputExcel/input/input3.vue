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
      <el-form-item label="成品件名称" prop="finishedName">
        <el-input
          v-model="queryParams.finishedName"
          placeholder="请输入成品件名称"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成品件安装方法" prop="installMethod">
        <el-input
          v-model="queryParams.installMethod"
          placeholder="请输入成品件安装方法"
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
          @click="handleImport3"
        >产品设计数据导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="designList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange" class="myTable">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column label="机型" align="center" prop="planeType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="成品件种类" align="center" prop="finishedType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="成品件名称" align="center" prop="finishedName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="成品件型号" align="center" prop="finishedModel" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']" />
      <el-table-column label="成品件制造单位" align="center" prop="finishedManufacturer" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="框" align="center" prop="frame" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="上中下" align="center" prop="upperMiddleLower" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="左中右" align="center" prop="leftMiddleRight" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="成品件安装方法" align="center" prop="installMethod" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
<!--      <el-table-column label="原材料" align="center" prop="rawMaterial" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="零部件" align="center" prop="spareParts" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>-->
<!--      <el-table-column label="原材料" align="center" prop="rawMaterial" />-->
<!--      <el-table-column label="零部件" align="center" prop="spareParts" />-->
<!--      <el-table-column label="成品件改型时间" align="center" prop="modifyTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.modifyTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="成品件改型措施" align="center" prop="modifyMeasures" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
            v-hasPermi="['system:design:edit']"
          >详情</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:design:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:design:remove']"
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

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open3" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url3 + '?updateSupport=' + upload.updateSupport"
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
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate3">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open3 = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 产品设计详情对话框 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="成品件种类" prop="finishedType">
          <el-input v-model="form.finishedType" placeholder="请输入成品件种类" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="成品件名称" prop="finishedName">
          <el-input v-model="form.finishedName" placeholder="请输入成品件名称" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="成品件型号" prop="finishedModel">
          <el-input v-model="form.finishedModel" placeholder="成品件型号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="成品件制造单位" prop="finishedManufacturer">
          <el-input v-model="form.finishedManufacturer" placeholder="请输入成品件制造单位" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="框" prop="frame">
          <el-input v-model="form.frame" placeholder="请输入框" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="上中下" prop="upperMiddleLower">
          <el-input v-model="form.upperMiddleLower" placeholder="请输入上中下" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="左中右" prop="leftMiddleRight">
          <el-input v-model="form.leftMiddleRight" placeholder="请输入左中右" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="成品安装方法" prop="installMethod">
          <el-input v-model="form.installMethod" placeholder="请输入成品安装方法" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="原材料" prop="rawMaterial">
          <el-input v-model="form.rawMaterial" placeholder="原材料" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="零部件" prop="spareParts">
          <el-input v-model="form.spareParts" placeholder="请输入零部件" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="成品改型时间" prop="modifyTime">
          <el-date-picker clearable
                          v-model="form.modifyTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择成品改型时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成品改型措施" prop="modifyMeasures">
          <el-input v-model="form.modifyMeasures" placeholder="请输入改型措施" readonly="readonly"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 产品设计修改对话框 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" />
        </el-form-item>
        <el-form-item label="成品件种类" prop="finishedType">
          <el-input v-model="form.finishedType" placeholder="请输入成品件种类" />
        </el-form-item>
        <el-form-item label="成品件名称" prop="finishedName">
          <el-input v-model="form.finishedName" placeholder="请输入成品件名称" />
        </el-form-item>
        <el-form-item label="成品件型号" prop="finishedModel">
          <el-input v-model="form.finishedModel" placeholder="成品件型号" />
        </el-form-item>
        <el-form-item label="成品件制造单位" prop="finishedManufacturer">
          <el-input v-model="form.finishedManufacturer" placeholder="请输入成品件制造单位" />
        </el-form-item>
        <el-form-item label="框" prop="frame">
          <el-input v-model="form.frame" placeholder="请输入框" />
        </el-form-item>
        <el-form-item label="上中下" prop="upperMiddleLower">
          <el-input v-model="form.upperMiddleLower" placeholder="请输入上中下" />
        </el-form-item>
        <el-form-item label="左中右" prop="leftMiddleRight">
          <el-input v-model="form.leftMiddleRight" placeholder="请输入左中右" />
        </el-form-item>
        <el-form-item label="成品安装方法" prop="installMethod">
          <el-input v-model="form.installMethod" placeholder="请输入成品安装方法" />
        </el-form-item>
        <el-form-item label="原材料" prop="rawMaterial">
          <el-input v-model="form.rawMaterial" placeholder="原材料" />
        </el-form-item>
        <el-form-item label="零部件" prop="spareParts">
          <el-input v-model="form.spareParts" placeholder="请输入零部件" />
        </el-form-item>
        <el-form-item label="成品改型时间" prop="modifyTime">
          <el-date-picker clearable
                          v-model="form.modifyTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择成品改型时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成品改型措施" prop="modifyMeasures">
          <el-input v-model="form.modifyMeasures" placeholder="请输入改型措施" />
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
import { listDesign, getDesign, delDesign, addDesign, updateDesign } from "@/api/system/design";
import {getToken} from "@/utils/auth";
export default {
  name: "Design",
  data() {
    return {
      upload: {
        // 是否显示弹出层（用户导入）
        open3: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url3: process.env.VUE_APP_BASE_API + "/system/design/importData",
      },
      // 遮罩层
      loading: true,
      // 默认排序
      defaultSort: {prop:"modifyTime", order: 'descending'},
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
      // 成品件设计数据表格数据
      designList: [],
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
  created() {
    this.getList();
  },
  methods: {
    handleImport3() {
      this.upload.title = "产品设计数据导入";
      this.upload.open3 = true;
    },
    importTemplate3() {
      this.download('system/design/importTemplate', {
      }, `ProductDesign${new Date().getTime()}.xlsx`)
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
    /** 查询成品件设计数据列表 */
    getList() {
      this.loading = true;
      listDesign(this.queryParams).then(response => {
        this.designList = response.rows;
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
      this.title = "添加成品件设计数据";
    },
    /** 详情按钮操作 */
    handleDetail(row) {
      this.reset();
      const id = row.id || this.ids
      getDesign(id).then(response => {
        this.form = response.data;
        this.open2 = true;
        this.title = "产品设计数据详情";
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDesign(id).then(response => {
        this.form = response.data;
        this.open1 = true;
        this.title = "修改产品设计数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDesign(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.getList();
            });
          } else {
            addDesign(this.form).then(response => {
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
      const name = row.planeType;
      this.$modal.confirm('是否确认删除产品设计数据名为"' + name + '"的数据项？').then(function() {
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
      this.download('system/design/export', {
        ...this.queryParams
      }, `design_${new Date().getTime()}.xlsx`)
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
