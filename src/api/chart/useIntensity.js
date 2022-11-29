import request from '@/utils/request'

export function getCheckList(query) {
    return request({
      url: '/qualityAnalysis/useIntensity/getCheckList',
      method: 'get',
      params: query
    })
  }
  
  export function getChartData() {
    return request({
      url: '/qualityAnalysis/useIntensity/getChartData',
      method: 'get'
    })
  }