import request from '@/utils/request'

// 查询故障模式变更列表
export function listFaultchange(query) {
  return request({
    url: '/system/faultchange/list',
    method: 'get',
    params: query
  })
}

// 查询故障模式变更详细
export function getFaultchange(faultId) {
  return request({
    url: '/system/faultchange/' + faultId,
    method: 'get'
  })
}

// 新增故障模式变更
export function addFaultchange(data) {
  return request({
    url: '/system/faultchange',
    method: 'post',
    data: data
  })
}

// 修改故障模式变更
export function updateFaultchange(data) {
  return request({
    url: '/system/faultchange',
    method: 'put',
    data: data
  })
}

// 删除故障模式变更
export function delFaultchange(faultId) {
  return request({
    url: '/system/faultchange/' + faultId,
    method: 'delete'
  })
}
