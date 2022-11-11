import request from '@/utils/request'

// 查询9：装备使用数据列表
export function list9(query) {
  return request({
    url: '/system/9/list',
    method: 'get',
    params: query
  })
}

// 查询9：装备使用数据详细
export function get9(id) {
  return request({
    url: '/system/9/' + id,
    method: 'get'
  })
}

// 新增9：装备使用数据
export function add9(data) {
  return request({
    url: '/system/9',
    method: 'post',
    data: data
  })
}

// 修改9：装备使用数据
export function update9(data) {
  return request({
    url: '/system/9',
    method: 'put',
    data: data
  })
}

// 删除9：装备使用数据
export function del9(id) {
  return request({
    url: '/system/9/' + id,
    method: 'delete'
  })
}
