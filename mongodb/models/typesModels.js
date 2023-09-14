const mongoose = require('mongoose')
// 设置集合中文档的属性以及属性值的类型
const TypesSchema = new mongoose.Schema({
  label: String // 类型名称
})

// 创建模型对象， 对文档操作的封装对象
const TypesModel = mongoose.model('typeList', TypesSchema)
module.exports = TypesModel
