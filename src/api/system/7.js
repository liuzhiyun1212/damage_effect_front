import request from '@/utils/request'

// 查询7：产品生产数量列表
export function list7(query) {
  return request({
    url: '/system/7/list',
    method: 'get',
    params: query
  })
}

// 查询7：产品生产数量详细
export function get7(id) {
  return request({
    url: '/system/7/' + id,
    method: 'get'
  })
}

// 新增7：产品生产数量
export function add7(data) {
  return request({
    url: '/system/7',
    method: 'post',
    data: data
  })
}

// 修改7：产品生产数量
export function update7(data) {
  return request({
    url: '/system/7',
    method: 'put',
    data: data
  })
}

// 删除7：产品生产数量
export function del7(id) {
  return request({
    url: '/system/7/' + id,
    method: 'delete'
  })
}
