import request from '@/utils/request'

// 装备型号升级:1.不同问题装备型号中，某种故障模式质量问题数量存在较大差异
export function devup1() {
  return request({
    url: '/system/reasonrule/devup1',
    method: 'get'
  })
}

// 装备型号升级:2.问题装备型号技术状态进行升级时间与质量问题变化时间一致或不超过一定范围
export function devup2() {
  return request({
    url: '/system/reasonrule/devup2',
    method: 'get'
  })
}

//装备能力提升:1.同一型号的不同能力状态中，某种故障模式质量问题数量存在较大差异
export function devcapup1() {
  return request({
    url: '/system/reasonrule/devcapup1',
    method: 'get'
  })
}

//装备能力提升:2.问题装备型号能力提升时间与质量问题变化时间一致或不超过一定范围
export function devcapup2() {
  return request({
    url: '/system/reasonrule/devcapup2',
    method: 'get'
  })
}

//产品改型:1.不同故障件型号中，某种故障模式质量问题数量存在较大差异
export function prochaange1() {
  return request({
    url: '/system/reasonrule/prochaange1',
    method: 'get'
  })
}

//产品改型:2.相同故障件型号的不同安装方式中，某种故障模式质量问题数量存在较大差异
export function prochaange2() {
  return request({
    url: '/system/reasonrule/prochaange2',
    method: 'get'
  })
}

//产品改型:3.相同故障件型号的不同安装位置中，某种故障模式质量问题数量存在较大差异
export function prochaange3() {
  return request({
    url: '/system/reasonrule/prochaange3',
    method: 'get'
  })
}

//产品改型:4.故障件型号技术状态升级时间与质量问题数量变化时间一致或不超过一定范围
export function prochaange4() {
  return request({
    url: '/system/reasonrule/prochaange4',
    method: 'get'
  })
}

//生产班组发生变化:1.不同生产班组生产的相同故障件型号中，某种故障模式质量问题数量存在较大差异
export function proteam1() {
  return request({
    url: '/system/reasonrule/proteam1',
    method: 'get'
  })
}

//生产班组发生变化:2.某故障件型号生产班组发生调整时间与质量问题数量变化时间一致或不超过一定范围
export function proteam2() {
  return request({
    url: '/system/reasonrule/proteam2',
    method: 'get'
  })
}
