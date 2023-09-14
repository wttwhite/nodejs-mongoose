<template>
  <el-dialog :visible.sync="dialogFormVisible" width="80%">
    <el-form
      :inline="true"
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="200px"
    >
      <el-form-item label="类型名称" prop="label">
        <el-input
          v-model="formData.label"
          clearable
          maxlength="50"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveClick" v-loading="loading">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addTypes } from '@/apis/index'
export default {
  name: 'add-edit-dialog',
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      formData: {
        label: '',
      },
      rules: {
        label: [{ required: true, message: ' ' }],
      },
    }
  },
  created() {},
  methods: {
    showDialog() {
      this.dialogFormVisible = true
    },
    saveClick() {
      this.$refs['formRef'].validate(async (valid) => {
        if (!valid || this.loading) return
        const params = { ...this.formData }
        this.loading = true
        try {
          if (this.tableId) {
            await updateTypes(params)
            this.$message.success('编辑成功')
          } else {
            await addTypes(params)
            this.$message.success('新增成功')
          }
          this.loading = false
          this.dialogFormVisible = false
        } catch (error) {
          this.loading = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
