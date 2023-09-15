import request from './http'

export function addTypes(data) {
  return request({
    url: '/types/createTypes',
    method: 'post',
    data,
  })
}
export function updateTypes(data) {
  return request({
    url: '/types/updateTypes',
    method: 'post',
    data,
  })
}
export function queryTypesAll(params) {
  return request({
    url: '/types/queryTypesAll',
    method: 'get',
    params,
  })
}

export function addTimeRecord(data) {
  return request({
    url: '/timeRecord/createTimeRecord',
    method: 'post',
    data,
  })
}
export function updateTimeRecord(data) {
  return request({
    url: '/timeRecord/updateTimeRecord',
    method: 'post',
    data,
  })
}
