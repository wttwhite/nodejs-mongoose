<template>
  <el-dialog :visible.sync="dialogFormVisible" width="70%">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="200px"
      style="margin-right: 200px; margin-top: 40px"
    >
      <el-form-item label="类型" prop="labelId">
        <el-select v-model="formData.labelId">
          <el-option
            v-for="(item, index) in labelList"
            :key="index"
            :value="item._id"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跟进时间" prop="time">
        <el-date-picker
          v-model="formData.time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          v-model="formData.remark"
          clearable
          maxlength="500"
          placeholder="请输入"
          :rows="5"
          show-word-limit
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
import { addTimeRecord, updateTimeRecord } from '@/apis/index'
import dayjs from 'dayjs'
export default {
  name: 'add-edit-dialog',
  props: {
    labelList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      formData: {
        labelId: '',
        time: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
        remark: '',
      },
      rules: {
        labelId: [{ required: true, message: ' ' }],
        time: [{ required: true, message: ' ' }],
      },
    }
  },
  created() {},
  methods: {
    showDialog(data) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.formRef?.resetFields()
        data &&
          (this.formData = {
            ...data,
          })
      })
    },
    saveClick() {
      this.$refs['formRef'].validate(async (valid) => {
        if (!valid || this.loading) return
        const labelSelectedInx = this.labelList.findIndex((item) => {
          return item._id === this.formData.labelId
        })
        const params = {
          ...this.formData,
          label: this.labelList[labelSelectedInx].label,
        }
        this.loading = true
        try {
          if (this.formData._id) {
            await updateTimeRecord(params)
            this.$message.success('编辑成功')
          } else {
            await addTimeRecord(params)
            this.$message.success('新增成功')
          }
          this.loading = false
          this.dialogFormVisible = false
          this.$emit('updateTable')
        } catch (error) {
          this.loading = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
