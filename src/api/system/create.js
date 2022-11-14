import request from '@/utils/request'

// 查询产品制造数据列表
export function listCreate(query) {
  return request({
    url: '/system/create/list',
    method: 'get',
    params: query
  })
}

// 查询产品制造数据详细
export function getCreate(id) {
  return request({
    url: '/system/create/' + id,
    method: 'get'
  })
}

// 新增产品制造数据
export function addCreate(data) {
  return request({
    url: '/system/create',
    method: 'post',
    data: data
  })
}

// 修改产品制造数据
export function updateCreate(data) {
  return request({
    url: '/system/create',
    method: 'put',
    data: data
  })
}

// 删除产品制造数据
export function delCreate(id) {
  return request({
    url: '/system/create/' + id,
    method: 'delete'
  })
}

// 下载导入模板
export function importCreateTemplate() {
  return request({
    url: '/system/create/importTemplate',
    method: 'get'
  })
}
