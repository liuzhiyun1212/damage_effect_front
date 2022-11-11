<template>
  <div class="app-container">
    <el-card>
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="dataList"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column label="名称" align="center" prop="name" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleUpdate(scope.row)"
              v-if="scope.row.parentId != 0"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      /-->
    </el-card>

    <!-- 修改数值对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-table v-loading="rloading" :data="constructionList">
        <el-table-column label="判明准则" align="center" prop="rule" />
        <el-table-column label="规则数值" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <div v-if = "scope.row.ruleData!='一致'">
              <el-form :inline="true" label-width="68px">
                <el-form-item prop="ruleData">
                  <el-input v-model="scope.row.ruleData" placeholder="请输入规则数值" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(scope.row)">确 定</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-else>
              <el-form :inline="true" label-width="68px">
                <el-form-item prop="ruleData">
                  <el-input v-model="scope.row.ruleData" placeholder="请输入规则数值" disabled/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(scope.row)" disabled>确 定</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listData, getData, delData, addData, updateData } from "@/api/system/changedata";
import { listConstruction, getConstruction, delConstruction, addConstruction, updateConstruction } from "@/api/system/construction";

export default {
  name: "change",
  data() {
    return {
      // 遮罩层
      loading: true,
      rloading: true,
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
      // 【请填写功能名称】表格数据
      dataList: [],
      constructionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        parentId: null
      },
      rqueryParams: {
        pageNum: 1,
        pageSize: 10,
        changeName: null,
        rule: null,
        ruleData: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listData(this.queryParams).then(response => {
        this.dataList = this.handleTree(response.data, "id");
        // this.dataList = response.rows;
        // this.total = response.total;
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
        name: null,
        parentId: null
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
      this.title = "添加";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getData(id).then(response => {
        this.rloading = true;
        this.rqueryParams.changeName = response.data.name
        listConstruction(this.rqueryParams).then(response1 => {
          this.constructionList = response1.rows;
          this.total = response1.total;
          this.rloading = false;
        });
        //this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
    },
    /** 提交按钮 */
    submitForm(row) {
      updateConstruction(row).then(response => {
        this.$modal.msgSuccess("修改成功");
        listConstruction(this.rqueryParams).then(response1 => {
          this.constructionList = response1.rows;
          this.total = response1.total;
          this.rloading = false;
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项？').then(function() {
        return delData(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/data/export', {
        ...this.queryParams
      }, `data_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style scoped>

</style>
