const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test1')
module.exports = function (success, error) {
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功')
    success()
  })
  mongoose.connection.on('error', () => {
    console.log('数据库连接失败')
    error()
  })
  mongoose.connection.on('close', () => {
    console.log('关闭数据库')
  })
}
