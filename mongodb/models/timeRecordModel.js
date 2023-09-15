const mongoose = require('mongoose')
// 设置集合中文档的属性以及属性值的类型
const TimeRecordSchema = new mongoose.Schema({
  label: String, // 类型名称
  labelId: String, // 类型
  time: String, // 时间
  remark: String // 备注
})

// 创建模型对象， 对文档操作的封装对象
const TimeRecordModel = mongoose.model('timeRecord', TimeRecordSchema)
module.exports = TimeRecordModel
