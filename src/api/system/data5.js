import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listData5(query) {
  return request({
    url: '/system/data5/list',
    method: 'get',
    params: query
  })
}
//4.2.2.2折线图
export function getEquipmentability() {
  return request({
    url: '/system/data5/getEquipmentability',
    method: 'get',
  })
}
//4.2.2.2对比图
export function getEquipmentabilitycompare() {
  return request({
    url: '/system/data5/getEquipmentabilitycompare',
    method: 'get',
  })
}


// 查询【请填写功能名称】详细
export function getData5(id) {
  return request({
    url: '/system/data5/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addData5(data) {
  return request({
    url: '/system/data5',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateData5(data) {
  return request({
    url: '/system/data5',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delData5(id) {
  return request({
    url: '/system/data5/' + id,
    method: 'delete'
  })
}

// 下载导入模板
export function importManufacturingTemplate() {
  return request({
    url: '/system/data5/importTemplate',
    method: 'get'
  })
}
