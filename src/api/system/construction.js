import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listConstruction(query) {
  return request({
    url: '/system/construction/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConstruction(id) {
  return request({
    url: '/system/construction/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConstruction(data) {
  return request({
    url: '/system/construction',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConstruction(data) {
  return request({
    url: '/system/construction',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delConstruction(id) {
  return request({
    url: '/system/construction/' + id,
    method: 'delete'
  })
}
