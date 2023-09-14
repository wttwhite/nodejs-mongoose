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
