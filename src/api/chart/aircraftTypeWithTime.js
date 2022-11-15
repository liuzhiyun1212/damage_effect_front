import request from '@/utils/request'

export function getCheckList(query) {
  return request({
    url: '/qualityAnalysis/aircraftTypeWithTime/getCheckList',
    method: 'get',
    params: query
  })
}

export function getChartData() {
  return request({
    url: '/qualityAnalysis/aircraftTypeWithTime/getChartData',
    method: 'get'
  })
}