import request from '@/utils/request'

// 查询质量问题数据列表
export function listQualityProblem1(query) {
  return request({
    url: '/system/qualityProblem1/list',
    method: 'get',
    params: query
  })
}


export function faultStatistics(query) {
  return request({
    url: '/system/qualityProblem1/faultStatistics',
    method: 'get',
    params: query
  })
}







// 查询质量问题数据详细
export function getQualityProblem1(id) {
  return request({
    url: '/system/qualityProblem1/' + id,
    method: 'get'
  })
}

// 新增质量问题数据
export function addQualityProblem1(data) {
  return request({
    url: '/system/qualityProblem1',
    method: 'post',
    data: data
  })
}

// 修改质量问题数据
export function updateQualityProblem1(data) {
  return request({
    url: '/system/qualityProblem1',
    method: 'put',
    data: data
  })
}

// 删除质量问题数据
export function delQualityProblem1(id) {
  return request({
    url: '/system/qualityProblem1/' + id,
    method: 'delete'
  })
}
