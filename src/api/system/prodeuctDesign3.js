import request from '@/utils/request'

// 查询成品件设计数据列表
export function listProdeuctDesign3(query) {
  return request({
    url: '/system/prodeuctDesign3/list',
    method: 'get',
    params: query
  })
}



export function xyobject(query) {
  return request({
    url: '/system/prodeuctDesign3/xyobject',
    method: 'get',
    params: query
  })
}

// 查询成品件设计数据详细
export function getProdeuctDesign3(id) {
  return request({
    url: '/system/prodeuctDesign3/' + id,
    method: 'get'
  })
}

// 新增成品件设计数据
export function addProdeuctDesign3(data) {
  return request({
    url: '/system/prodeuctDesign3',
    method: 'post',
    data: data
  })
}

// 修改成品件设计数据
export function updateProdeuctDesign3(data) {
  return request({
    url: '/system/prodeuctDesign3',
    method: 'put',
    data: data
  })
}

// 删除成品件设计数据
export function delProdeuctDesign3(id) {
  return request({
    url: '/system/prodeuctDesign3/' + id,
    method: 'delete'
  })
}
