import request from '@/utils/request'

// 查询产品改型数据列表
export function listModify(query) {
  return request({
    url: '/system/modify/list',
    method: 'get',
    params: query
  })
}

// 查询产品改型数据详细
export function getModify(id) {
  return request({
    url: '/system/modify/' + id,
    method: 'get'
  })
}

// 新增产品改型数据
export function addModify(data) {
  return request({
    url: '/system/modify',
    method: 'post',
    data: data
  })
}

// 修改产品改型数据
export function updateModify(data) {
  return request({
    url: '/system/modify',
    method: 'put',
    data: data
  })
}

// 删除产品改型数据
export function delModify(id) {
  return request({
    url: '/system/modify/' + id,
    method: 'delete'
  })
}
