import request from '@/utils/request'
  
  export function getChartData() {
    return request({
      url: '/qualityChange/changeOfProductionDevice/getChartData',
      method: 'get'
    })
  }

  export function getMeasuringDeviceChartList() {
    return request({
      url: '/qualityChange/changeOfMeasuringDevice/getMeasuringDeviceChart',
      method: 'get'
    })
  }