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
  const { _id, label } = req.body
  TypesModel.updateOne({ _id }, { label })
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
// 删除类型
router.post('/deleteTypes', function (req, res, next) {
  console.log('req', req.body)
  TypesModel.deleteOne({ _id: req.body._id })
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
// 查询所有类型
router.get('/queryTypesAll', function (req, res, next) {
  console.log('req', req.query)
  TypesModel.find().then(data => {
    console.log('data', data)
    res.json({
      code: 0,
      msg: 'success',
      data
    })
  })
})

module.exports = router
