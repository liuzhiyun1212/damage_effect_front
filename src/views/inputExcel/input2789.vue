<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport3"
        >装备设计/改型数导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport5"
        >产品生产数量导入</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport6"
        >装备部署数据导入</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport4"
        >装备使用数据导入</el-button>
      </el-col>

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
    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange" :height="'500px'">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="机型" align="center" prop="planeType" />
      <el-table-column label="装备改型时间" align="center" prop="remodelDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.remodelDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="装备改型措施" align="center" prop="remodelMeasure" />
      <el-table-column label="装备制造单位" align="center" prop="makeUnit" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dev:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dev:remove']"
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

    <!-- 添加或修改quality_problem对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="质量问题标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入质量问题标题" />
        </el-form-item>
        <el-form-item label="装备出厂编号" prop="devCode">
          <el-input v-model="form.devCode" placeholder="请输入装备出厂编号" />
        </el-form-item>
        <el-form-item label="装备制造单位" prop="devUnit">
          <el-input v-model="form.devUnit" placeholder="请输入装备制造单位" />
        </el-form-item>
        <el-form-item label="装备制造批次" prop="devManufacture">
          <el-input v-model="form.devManufacture" placeholder="请输入装备制造批次" />
        </el-form-item>
        <el-form-item label="装备出厂时间" prop="devFactoryTime">
          <el-date-picker clearable
                          v-model="form.devFactoryTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择装备出厂时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="装备使用时长" prop="devUseTime">
          <el-input v-model="form.devUseTime" placeholder="请输入装备使用时长" />
        </el-form-item>
        <el-form-item label="发生时间" prop="devHappenTime">
          <el-date-picker clearable
                          v-model="form.devHappenTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择发生时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障件名称" prop="partsName">
          <el-input v-model="form.partsName" placeholder="请输入故障件名称" />
        </el-form-item>
        <el-form-item label="故障件型号" prop="partsModel">
          <el-input v-model="form.partsModel" placeholder="请输入故障件型号" />
        </el-form-item>
        <el-form-item label="故障件出厂编号" prop="partsCode">
          <el-input v-model="form.partsCode" placeholder="请输入故障件出厂编号" />
        </el-form-item>
        <el-form-item label="故障件制造单位" prop="partsUnit">
          <el-input v-model="form.partsUnit" placeholder="请输入故障件制造单位" />
        </el-form-item>
        <el-form-item label="故障件制造批次" prop="partsManufacture">
          <el-input v-model="form.partsManufacture" placeholder="请输入故障件制造批次" />
        </el-form-item>
        <el-form-item label="故障件出厂时间" prop="partsFactoryTime">
          <el-date-picker clearable
                          v-model="form.partsFactoryTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择故障件出厂时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障件使用时长" prop="partsUseTime">
          <el-input v-model="form.partsUseTime" placeholder="请输入故障件使用时长" />
        </el-form-item>
        <el-form-item label="故障现象" prop="faultPhenomenon">
          <el-input v-model="form.faultPhenomenon" placeholder="请输入故障现象" />
        </el-form-item>
        <el-form-item label="故障模式" prop="faultModel">
          <el-input v-model="form.faultModel" placeholder="请输入故障模式" />
        </el-form-item>
        <el-form-item label="发生地理环境" prop="environment">
          <el-input v-model="form.environment" placeholder="请输入发生地理环境" />
        </el-form-item>
        <el-form-item label="装备是否进行过大修" prop="devRepaired">
          <el-input v-model="form.devRepaired" placeholder="请输入装备是否进行过大修" />
        </el-form-item>
        <el-form-item label="大修时间" prop="repairedTime">
          <el-date-picker clearable
                          v-model="form.repairedTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择大修时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="大修厂" prop="repairedFactory">
          <el-input v-model="form.repairedFactory" placeholder="请输入大修厂" />
        </el-form-item>
        <el-form-item label="大修人员" prop="repairedStaff">
          <el-input v-model="form.repairedStaff" placeholder="请输入大修人员" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 装备设计/改型数据导入对话框 -->
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
<!--  装备使用数据导入  -->
    <el-dialog :title="upload.title" :visible.sync="upload.open4" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url4 + '?updateSupport=' + upload.updateSupport"
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
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate4">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open4 = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 产品生产数量数据导入对话框 -->
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
    <!-- 装备部署数据导入对话框 -->
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
          <!--          <div class="el-upload__tip" slot="tip">
                      <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>-->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate6">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open6 = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 维修变更数据导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open7" width="400px" append-to-body>
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
          <!--          <div class="el-upload__tip" slot="tip">
                      <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>-->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate7">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open6 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAllDev, getDev, delDev, addDev, updateDev,importTemplate } from "@/api/system/dev";
import { importDesignTemplate } from "@/api/system/design";
import { importModifyTemplate } from "@/api/system/modify";
import { importCreateTemplate } from "@/api/system/create";
import { importModifyDataTemplate } from "@/api/system/modifyData";
import { getToken } from "@/utils/auth";
export default {
  name: "Input lfb",
  data() {
    return {
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open3: false,
        open4: false,
        open5: false,
        open6: false,
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
        url3: process.env.VUE_APP_BASE_API + "/system/data/importData",
        url4: process.env.VUE_APP_BASE_API + "/system/12/importData",
        url5: process.env.VUE_APP_BASE_API + "/system/7/importData",
        url6: process.env.VUE_APP_BASE_API + "/system/11/importData",
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
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // quality_problem表格数据
      devList: [],
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
        repairedStaff: null
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
    /** 查询quality_problem列表 */
    getList() {
      this.loading = true;
      listAllDev(this.queryParams).then(response => {
        this.devList = response.rows.reverse();
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    handleImport3() {
      this.upload.title = "装备设计/改型数据导入";
      this.upload.open3 = true;
    },
    handleImport4() {
      this.upload.title = "装备使用数据导入";
      this.upload.open4 = true;
    },
    handleImport5() {
      this.upload.title = "产品生产数量数据导入";
      this.upload.open5 = true;
    },
    handleImport6() {
      this.upload.title = "装备部署导入";
      this.upload.open6 = true;
    },
    handleImport7() {
      this.upload.title = "维修变更数据";
      this.upload.open7 = true;
    },
    /** 下载装备设计/改型数据模板操作 */
    importTemplate3() {
      this.download('system/data/importTemplate', {
      }, `EquipmentDesignData${new Date().getTime()}.xlsx`)
    },
    /** 下载装备使用数据模板操作 */
    importTemplate4() {
      this.download('system/12/importTemplate', {
      }, `EquipmentUseData12${new Date().getTime()}.xlsx`)
    },
    /** 下载产品生产数量模板操作 */
    importTemplate5() {
      this.download('system/7/importTemplate', {
      }, `ProductQuantity7${new Date().getTime()}.xlsx`)
    },
    /** 下载装备部署模板操作 */
    importTemplate6() {
      this.download('system/11/importTemplate', {
      }, `EquipmentDeploymentData11${new Date().getTime()}.xlsx`)
    },
    /** 下载装备使用数据模板操作 */
    importTemplate7() {
      this.download('system/10/importTemplate', {
      }, `RepairModifyData10${new Date().getTime()}.xlsx`)
    },

    // 提交上传文件
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
        repairedStaff: null
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
      this.title = "添加quality_problem";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDev(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改quality_problem";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDev(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDev(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除quality_problem编号为"' + ids + '"的数据项？').then(function() {
        return delDev(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/dev/export', {
        ...this.queryParams
      }, `dev_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
