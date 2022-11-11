import request from '@/utils/request'

// 查询8:装备部署数据列表
export function list8(query) {
  return request({
    url: '/system/8/list',
    method: 'get',
    params: query
  })
}

// 查询8:装备部署数据详细
export function get8(id) {
  return request({
    url: '/system/8/' + id,
    method: 'get'
  })
}

// 新增8:装备部署数据
export function add8(data) {
  return request({
    url: '/system/8',
    method: 'post',
    data: data
  })
}

// 修改8:装备部署数据
export function update8(data) {
  return request({
    url: '/system/8',
    method: 'put',
    data: data
  })
}

// 删除8:装备部署数据
export function del8(id) {
  return request({
    url: '/system/8/' + id,
    method: 'delete'
  })
}
