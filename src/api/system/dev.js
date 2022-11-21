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

// 下载导入模板
export function importTemplate() {
  return request({
    url: '/system/dev/importTemplate',
    method: 'get'
  })
}

// 统计爆发故障件的型号-名称及数量
export function selectFaultyCount() {
  return request({
    url: '/system/dev/selectFaultyCount',
    method: 'get'
  })
}

// 统计所有故障件
export function selectAllFaulty() {
  return request({
    url: '/system/dev/selectAllFaulty',
    method: 'get'
  })
}

// 生产班组变更情况
export function selectByGradeFaultModel() {
  return request({
    url: '/system/dev/selectByGradeFaultModel',
    method: 'get'
  })
}
// 生产班组统计质量问题总数
export function qualitySumByGrade() {
  return request({
    url: '/system/dev/qualitySumByGrade',
    method: 'get'
  })
}
// 生产班组统计产品总数
export function productSumByGrade() {
  return request({
    url: '/system/dev/productSumByGrade',
    method: 'get'
  })
}
// 故障件生产班组变更
export function selectByGradeChanged() {
  return request({
    url: '/system/dev/selectByGradeChanged',
    method: 'get'
  })
}
// 时间线统计图用故障件生产班组变更
export function timeGradeChanged() {
  return request({
    url: '/system/dev/timeGradeChanged',
    method: 'get'
  })
}
// 统计高发故障模式环境
export function selectEnvironment() {
  return request({
    url: '/system/dev/selectEnvironment',
    method: 'get'
  })
}
// 统计高发故障模式环境装备数量
export function selectDevByEnvironment() {
  return request({
    url: '/system/dev/selectDevByEnvironment',
    method: 'get'
  })
}
// 统计高发故障模式环境质量问题数量
export function selectQualityByEnvironment() {
  return request({
    url: '/system/dev/selectQualityByEnvironment',
    method: 'get'
  })
}

