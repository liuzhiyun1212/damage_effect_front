import request from '@/utils/request'
  
  export function getChartData() {
    return request({
      url: '/qualityChange/changeOfProductionDevice/getChartData',
      method: 'get'
    })
  }