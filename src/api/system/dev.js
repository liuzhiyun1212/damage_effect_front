import request from '@/utils/request'

// 查询quality_problem列表
export function listDev(query) {
  return request({
    url: '/system/dev/list',
    method: 'get',
    params: query
  })
}

// 季度质量问题发生时间统计结果
export function qualityHappenSum(query) {
  return request({
    url: '/system/dev/qualityHappenSum',
    method: 'get',
    params: query
  })
}
// 季度质量问题发生时间筛选
export function oneQuality(query) {
  return request({
    url: '/system/dev/oneQuality',
    method: 'get',
    params: query
  })
}
// 年度质量问题发生时间统计结果
export function yearHappenSum(query) {
  return request({
    url: '/system/dev/yearHappenSum',
    method: 'get',
    params: query
  })
}
// 年度质量问题发生时间筛选
export function oneYear(query) {
  return request({
    url: '/system/dev/oneYear',
    method: 'get',
    params: query
  })
}
// 质量问题涉及到的机型总数
export function sumByplaneType(query) {
  return request({
    url: '/system/dev/sumByplaneType',
    method: 'get',
    params: query
  })
}
// 筛选质量问题涉及到的机型
export function selectPlaneType(query) {
  return request({
    url: '/system/dev/selectPlaneType',
    method: 'get',
    params: query
  })
}
// quality_problem详细
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
