import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function list12(query) {
  return request({
    url: '/system/12/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function get12(id) {
  return request({
    url: '/system/12/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function add12(data) {
  return request({
    url: '/system/12',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function update12(data) {
  return request({
    url: '/system/12',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function del12(id) {
  return request({
    url: '/system/12/' + id,
    method: 'delete'
  })
}
