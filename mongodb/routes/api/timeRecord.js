var express = require('express')
var router = express.Router()
const TimeRecordModel = require('../../models/timeRecordModel')

// 创建
router.post('/createTimeRecord', function (req, res, next) {
  TimeRecordModel.create(req.body)
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
// 更新
router.post('/updateTimeRecord', function (req, res, next) {
  console.log('req', req.body)
  TimeRecordModel.updateOne({ _id }, req.body)
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
// 删除
router.post('/deleteTimeRecord', function (req, res, next) {
  console.log('req', req.body)
  TimeRecordModel.deleteOne({ _id: req.body._id })
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
// 查询
router.get('/queryTimeRecord', function (req, res, next) {
  console.log('req', req.query)
  const { labelId } = req.query
  TimeRecordModel.find(labelId ? { labelId } : {}).then(data => {
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
