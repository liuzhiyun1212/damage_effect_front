import request from '@/utils/request'

export function getCheckList(query) {
  return request({
    url: '/qualityAnalysis/getCheckList',
    method: 'get',
    params: query
  })
}

export function getChartData() {
  return request({
    url: '/qualityAnalysis/getChartData',
    method: 'get'
  })
}