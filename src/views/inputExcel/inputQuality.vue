<template>
  <div class="app-container">
<!--    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="质量问题标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入质量问题标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装备出厂编号" prop="devCode">
        <el-input
          v-model="queryParams.devCode"
          placeholder="请输入装备出厂编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装备制造单位" prop="devUnit">
        <el-input
          v-model="queryParams.devUnit"
          placeholder="请输入装备制造单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装备制造批次" prop="devManufacture">
        <el-input
          v-model="queryParams.devManufacture"
          placeholder="请输入装备制造批次"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装备出厂时间" prop="devFactoryTime">
        <el-date-picker clearable
                        v-model="queryParams.devFactoryTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择装备出厂时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="装备使用时长" prop="devUseTime">
        <el-input
          v-model="queryParams.devUseTime"
          placeholder="请输入装备使用时长"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发生时间" prop="devHappenTime">
        <el-date-picker clearable
                        v-model="queryParams.devHappenTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择发生时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="故障件名称" prop="partsName">
        <el-input
          v-model="queryParams.partsName"
          placeholder="请输入故障件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件型号" prop="partsModel">
        <el-input
          v-model="queryParams.partsModel"
          placeholder="请输入故障件型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件出厂编号" prop="partsCode">
        <el-input
          v-model="queryParams.partsCode"
          placeholder="请输入故障件出厂编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件制造单位" prop="partsUnit">
        <el-input
          v-model="queryParams.partsUnit"
          placeholder="请输入故障件制造单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件制造批次" prop="partsManufacture">
        <el-input
          v-model="queryParams.partsManufacture"
          placeholder="请输入故障件制造批次"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障件出厂时间" prop="partsFactoryTime">
        <el-date-picker clearable
                        v-model="queryParams.partsFactoryTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择故障件出厂时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="故障件使用时长" prop="partsUseTime">
        <el-input
          v-model="queryParams.partsUseTime"
          placeholder="请输入故障件使用时长"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="发生地理环境" prop="environment">
        <el-input
          v-model="queryParams.environment"
          placeholder="请输入发生地理环境"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装备是否进行过大修" prop="devRepaired">
        <el-input
          v-model="queryParams.devRepaired"
          placeholder="请输入装备是否进行过大修"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大修时间" prop="repairedTime">
        <el-date-picker clearable
                        v-model="queryParams.repairedTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择大修时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="大修厂" prop="repairedFactory">
        <el-input
          v-model="queryParams.repairedFactory"
          placeholder="请输入大修厂"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大修人员" prop="repairedStaff">
        <el-input
          v-model="queryParams.repairedStaff"
          placeholder="请输入大修人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>-->
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
      <el-form-item label="装备出厂编号" prop="devCode">
        <el-input
          v-model="queryParams.devCode"
          placeholder="请输入装备出厂编号"
          clearable
          style="width: 240px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装备制造单位" prop="devUnit">
        <el-input
          v-model="queryParams.devUnit"
          placeholder="请输入装备制造单位"
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
          @click="handleImport"
        >质量问题数据导入</el-button>

<!--        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dev:add']"
        >新增</el-button>-->
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:dev:edit']"
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
          v-hasPermi="['system:dev:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:dev:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="devList" @selection-change="handleSelectionChange" :height="'500px'" :default-sort="defaultSort" @sort-change="handleSortChange" class="myTable">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="质量问题标题" align="center" prop="title" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="机型" align="center" prop="planeType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="装备出厂编号" align="center" prop="devCode" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="装备制造单位" align="center" prop="devUnit" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="装备制造批次" align="center" prop="devManufacture" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="装备出厂时间" align="center" prop="devFactoryTime" width="180" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.devFactoryTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="装备使用时长" align="center" prop="devUseTime" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="发生时间" align="center" prop="devHappenTime" width="180" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.devHappenTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障件种类" align="center" prop="partsType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
<!--      <el-table-column label="故障件名称" align="center" prop="partsName" />-->
<!--      <el-table-column label="故障件型号" align="center" prop="partsModel" />-->
<!--      <el-table-column label="故障件出厂编号" align="center" prop="partsCode" />-->
<!--      <el-table-column label="故障件制造单位" align="center" prop="partsUnit" />-->
<!--      <el-table-column label="故障件制造批次" align="center" prop="partsManufacture" />-->
<!--      <el-table-column label="故障件出厂时间" align="center" prop="partsFactoryTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.partsFactoryTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="故障件使用时长" align="center" prop="partsUseTime" />-->
<!--      <el-table-column label="故障现象" align="center" prop="faultPhenomenon" />-->
<!--      <el-table-column label="故障模式" align="center" prop="faultModel" />-->
<!--      <el-table-column label="发生地理环境" align="center" prop="environment" />-->
<!--      <el-table-column label="装备是否进行过大修" align="center" prop="devRepaired" />-->
<!--      <el-table-column label="大修时间" align="center" prop="repairedTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.repairedTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="大修厂" align="center" prop="repairedFactory" />-->
<!--      <el-table-column label="大修人员" align="center" prop="repairedStaff" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
            v-hasPermi="['system:dev:edit']"
          >详细</el-button>

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
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="质量问题标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入质量问题标题" />
        </el-form-item>
        <el-form-item label="机型" prop="title">
          <el-input v-model="form.planeType" placeholder="请输入机型" />
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
    <!-- 详细quality_problem对话框 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="质量问题标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入质量问题标题" readonly="readonly" />
        </el-form-item>
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="装备出厂编号" prop="devCode">
          <el-input v-model="form.devCode" placeholder="请输入装备出厂编号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="装备制造单位" prop="devUnit">
          <el-input v-model="form.devUnit" placeholder="请输入装备制造单位" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="装备制造批次" prop="devManufacture">
          <el-input v-model="form.devManufacture" placeholder="请输入装备制造批次" readonly="readonly" />
        </el-form-item>
        <el-form-item label="装备出厂时间" prop="devFactoryTime">
          <el-date-picker clearable
                          v-model="form.devFactoryTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择装备出厂时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="装备使用时长" prop="devUseTime">
          <el-input v-model="form.devUseTime" placeholder="请输入装备使用时长" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="发生时间" prop="devHappenTime">
          <el-date-picker clearable
                          v-model="form.devHappenTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择发生时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障件名称" prop="partsName">
          <el-input v-model="form.partsName" placeholder="请输入故障件名称" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="故障件型号" prop="partsModel">
          <el-input v-model="form.partsModel" placeholder="请输入故障件型号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="故障件出厂编号" prop="partsCode">
          <el-input v-model="form.partsCode" placeholder="请输入故障件出厂编号" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="故障件制造单位" prop="partsUnit">
          <el-input v-model="form.partsUnit" placeholder="请输入故障件制造单位" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="故障件制造批次" prop="partsManufacture">
          <el-input v-model="form.partsManufacture" placeholder="请输入故障件制造批次" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="故障件出厂时间" prop="partsFactoryTime">
          <el-date-picker clearable
                          v-model="form.partsFactoryTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择故障件出厂时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障件使用时长" prop="partsUseTime">
          <el-input v-model="form.partsUseTime" placeholder="请输入故障件使用时长" readonly="readonly" />
        </el-form-item>
        <el-form-item label="故障现象" prop="faultPhenomenon">
          <el-input v-model="form.faultPhenomenon" placeholder="请输入故障现象" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="故障模式" prop="faultModel">
          <el-input v-model="form.faultModel" placeholder="请输入故障模式" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="发生地理环境" prop="environment">
          <el-input v-model="form.environment" placeholder="请输入发生地理环境" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="装备是否进行过大修" prop="devRepaired">
          <el-input v-model="form.devRepaired" placeholder="请输入装备是否进行过大修" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="大修时间" prop="repairedTime">
          <el-date-picker clearable
                          v-model="form.repairedTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择大修时间" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="大修厂" prop="repairedFactory">
          <el-input v-model="form.repairedFactory" placeholder="请输入大修厂" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="大修人员" prop="repairedStaff">
          <el-input v-model="form.repairedStaff" placeholder="请输入大修人员" readonly="readonly"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
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
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAllDev, getDev, delDev, addDev, updateDev,importTemplate } from "@/api/system/dev";
import { getToken } from "@/utils/auth";
export default {
  name: "Dev",
  data() {
    return {
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/dev/importData"
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 默认排序
      defaultSort: {prop:"partsFactoryTime", order: 'descending'},
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
      open1: false,
      open2: false,

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
      this.open1 = false;
      this.open2 = false;
      this.reset();
    },
    handleImport() {
      this.upload.title = "质量问题数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('system/dev/importTemplate', {
      }, `QualityProblem${new Date().getTime()}.xlsx`)
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
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
      this.open1 = true;
      this.title = "添加quality_problem";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDev(id).then(response => {
        this.form = response.data;
        this.open1 = true;
        this.title = "质量问题修改";
      });
    },
    /** 详细按钮操作 */
    handleDetail(row) {
      this.reset();
      const id = row.id || this.ids
      getDev(id).then(response => {
        this.form = response.data;
        this.open2 = true;
        this.title = "质量问题详细信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDev(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.getList();
            });
          } else {
            addDev(this.form).then(response => {
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
      const name = row.title;
      this.$modal.confirm('是否确认删除质量问题数据名为"' + name + '"的数据项？').then(function() {
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
      this.download('system/dev/export', {
        ...this.queryParams
      }, `dev_${new Date().getTime()}.xlsx`)
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
