import request from '@/utils/request'

// 查询装备设计/改型数据列表
export function listData(query) {
  return request({
    url: '/system/data/list',
    method: 'get',
    params: query
  })
}

// 查询所有装备设计/改型数据列表
export function listDataAll() {
  return request({
    url: "/system/data/listall",
    method: "get",
  })
}

// 查询装备设计/改型数据详细
export function getData(id) {
  return request({
    url: '/system/data/' + id,
    method: 'get'
  })
}

// 新增装备设计/改型数据
export function addData(data) {
  return request({
    url: '/system/data',
    method: 'post',
    data: data
  })
}

// 修改装备设计/改型数据
export function updateData(data) {
  return request({
    url: '/system/data',
    method: 'put',
    data: data
  })
}

// 删除装备设计/改型数据
export function delData(id) {
  return request({
    url: '/system/data/' + id,
    method: 'delete'
  })
}
