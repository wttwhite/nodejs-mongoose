var express = require('express')
var router = express.Router()
const TypesModel = require('../../models/typesModels')

// 创建类型
router.post('/createTypes', function (req, res, next) {
  TypesModel.create({
    label: req.body.label
  })
    .then(() => {
      res.json({
        code: 0,
        msg: 'success',
        data: true
      })
    })
    .catch(err => {
      console.log('err', err)
    })
})
// 更新类型
router.post('/updateTypes', function (req, res, next) {
  console.log('req', req.body)
})
// 删除类型
router.post('/deleteTypes', function (req, res, next) {
  console.log('req', req.body)
})
// 查询类型
router.get('/queryTypes', function (req, res, next) {
  console.log('req', req.query)
  TypesModel.find().then(data => {
    res.json({
      code: 0,
      msg: 'success',
      data: {
        records: data
      }
    })
  })
})

module.exports = router
