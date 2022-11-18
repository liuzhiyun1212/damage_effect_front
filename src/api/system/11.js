import request from '@/utils/request'

// 查询8:装备部署数据列表
export function list11(query) {
  return request({
    url: '/system/11/list',
    method: 'get',
    params: query
  })
}

// 查询8:装备部署数据详细
export function get11(id) {
  return request({
    url: '/system/11/' + id,
    method: 'get'
  })
}

// 新增8:装备部署数据
export function add11(data) {
  return request({
    url: '/system/11',
    method: 'post',
    data: data
  })
}

// 修改8:装备部署数据
export function update11(data) {
  return request({
    url: '/system/11',
    method: 'put',
    data: data
  })
}

// 删除8:装备部署数据
export function del11(id) {
  return request({
    url: '/system/11/' + id,
    method: 'delete'
  })
}
