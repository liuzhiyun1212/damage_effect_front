import request from '@/utils/request'

// 查询成品件设计数据列表
export function listDesign(query) {
  return request({
    url: '/system/design/list',
    method: 'get',
    params: query
  })
}

// 查询成品件设计数据详细
export function getDesign(id) {
  return request({
    url: '/system/design/' + id,
    method: 'get'
  })
}

// 新增成品件设计数据
export function addDesign(data) {
  return request({
    url: '/system/design',
    method: 'post',
    data: data
  })
}

// 修改成品件设计数据
export function updateDesign(data) {
  return request({
    url: '/system/design',
    method: 'put',
    data: data
  })
}

// 删除成品件设计数据
export function delDesign(id) {
  return request({
    url: '/system/design/' + id,
    method: 'delete'
  })
}
