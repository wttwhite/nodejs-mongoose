<template>
  <hs-layout>
    <hs-breadcrumb slot="page-breadcrumb" :list="breadcrumbList" />
    <el-form
      slot="search"
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      label-width="90px"
      @submit.prevent
    >
      <el-form-item label="类型">
        <el-input
          v-model="searchForm.label"
          clearable
          maxlength="50"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item class="common-search-btn-box">
        <el-button type="primary" icon="el-icon-search" @click="getDataList(1)">
          查询
        </el-button>
        <el-button
          plain
          @click="resetDataList(DefaultSearchForm)"
          icon="el-icon-refresh"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <section slot="btnBox">
      <el-button type="primary" @click="addClick">新增</el-button>
    </section>
    <el-table
      :data="pageData"
      height="100%"
      stripe
      ref="tableRef"
      v-loading="tableLoading"
      :header-cell-style="$HeaderCellStyle"
    >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="_id" label="_id" />
      <el-table-column prop="label" label="类型" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" @click="editClick(row)">编辑</el-button>
          <el-button type="text" @click="delClick(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addEditDialogVue ref="addEditDialogVue" @updateTable="updateTable" />
    <hs-pagination
      slot="footer"
      @refresh="getDataList"
      :page-no.sync="searchForm.pageNo"
      :page-size.sync="searchForm.pageSize"
      :total="pageTotal"
    />
  </hs-layout>
</template>
<script>
import { getPageDataApi, deleteApi } from '@/apis/common'
import addEditDialogVue from './dialog-add-edit.vue'
const DefaultSearchForm = () => {
  return {
    pageNo: 1,
    pageSize: 10,
    label: '',
  }
}
export default {
  name: 'types-page',
  components: { addEditDialogVue },
  data() {
    return {
      tableLoading: false,
      breadcrumbList: ['普通表格页面'],
      pageTotal: 0,
      pageData: [],
      searchForm: DefaultSearchForm(),
      DefaultSearchForm: Object.freeze(DefaultSearchForm()),
      pageUrl: '/types/queryTypes',
    }
  },
  created() {
    this.getDataList(1)
  },
  methods: {
    updateTable() {
      this.getDataList(1)
    },
    addClick() {
      this.$refs.addEditDialogVue.showDialog()
    },
    editClick(row) {
      this.$refs.addEditDialogVue.showDialog(row)
    },
    delClick(row) {
      this.$confirm(`确认删除吗, 是否继续?`, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleteApi('/types/deleteTypes', {
          _id: row._id,
        })
        this.$message.success('删除成功')
        this.getDataList(1)
      })
    },
    resetDataList(DefaultSearchForm) {
      this.searchForm = { ...DefaultSearchForm }
      this.getDataList(1)
    },
    searchFormFormat(params) {
      return params
    },
    async getDataList(pageNo) {
      pageNo && (this.searchForm.pageNo = pageNo)
      let params = { ...this.searchForm }
      this.searchFormFormat && (params = await this.searchFormFormat(params))
      this.tableLoading = true
      getPageDataApi(this.pageUrl, this.pageMethod || 'get', params)
        .then((res) => {
          this.pageData = res.records || []
          this.pageTotal = res.total || 0
          this.$nextTick(() => {
            this.$refs.tableRef.doLayout()
          })
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
  },
}
</script>
<style></style>
