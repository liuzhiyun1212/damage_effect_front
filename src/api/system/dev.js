import request from '@/utils/request'

// 查询quality_problem列表
export function listDev(query) {
  return request({
    url: '/system/dev/list',
    method: 'get',
    params: query
  })
}

// 查询quality_problem列表
export function listAllDev(query) {
  return request({
    url: '/system/dev/listAll',
    method: 'get',
    params: query
  })
}

// 查询quality_problem详细
export function getDev(id) {
  return request({
    url: '/system/dev/' + id,
    method: 'get'
  })
}

// 新增quality_problem
export function addDev(data) {
  return request({
    url: '/system/dev',
    method: 'post',
    data: data
  })
}

// 修改quality_problem
export function updateDev(data) {
  return request({
    url: '/system/dev',
    method: 'put',
    data: data
  })
}

// 删除quality_problem
export function delDev(id) {
  return request({
    url: '/system/dev/' + id,
    method: 'delete'
  })
}

// 下载导入模板
export function importTemplate() {
  return request({
    url: '/system/dev/importTemplate',
    method: 'get'
  })
}

