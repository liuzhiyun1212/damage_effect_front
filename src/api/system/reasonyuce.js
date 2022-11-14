import request from '@/utils/request'

// devup1
export function devup1() {
  return request({
    url: '/system/reasonrule/devup1',
    method: 'get'
  })
}

// devup2
export function devup2() {
  return request({
    url: '/system/reasonrule/devup2',
    method: 'get'
  })
}
