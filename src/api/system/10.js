import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function list10(query) {
  return request({
    url: '/system/10/list',
    method: 'get',
    params: query
  })
}

export function repairPeople() {
  return request({
    url: '/system/10/repairPeople',
    method: 'get',
  })
}


// 查询【请填写功能名称】详细
export function get10(id) {
  return request({
    url: '/system/10/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function add10(data) {
  return request({
    url: '/system/10',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function update10(data) {
  return request({
    url: '/system/10',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function del10(id) {
  return request({
    url: '/system/10/' + id,
    method: 'delete'
  })
}

// 获取故障件维修工艺变更时间
export function listRepairWayChange() {
  return request({
    url: '/system/10/listRepairWayChange',
    method: 'get',
  })
}

// 获取高发故障模式涉及到的维修工艺生成故障件数
export function listFaultyCountByRepairWay() {
  return request({
    url: '/system/10/listFaultyCountByRepairWay',
    method: 'get',
  })
}
