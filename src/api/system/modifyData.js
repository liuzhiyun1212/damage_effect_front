import request from '@/utils/request'

// 查询产品制造变更数据列表
export function listModifyData(query) {
  return request({
    url: '/system/modifyData/list',
    method: 'get',
    params: query
  })
}

// 查询产品制造变更数据详细
export function getModifyData(id) {
  return request({
    url: '/system/modifyData/' + id,
    method: 'get'
  })
}

// 新增产品制造变更数据
export function addModifyData(data) {
  return request({
    url: '/system/modifyData',
    method: 'post',
    data: data
  })
}

// 修改产品制造变更数据
export function updateModifyData(data) {
  return request({
    url: '/system/modifyData',
    method: 'put',
    data: data
  })
}

// 删除产品制造变更数据
export function delModifyData(id) {
  return request({
    url: '/system/modifyData/' + id,
    method: 'delete'
  })
}

// 下载导入模板
export function importModifyDataTemplate() {
  return request({
    url: '/system/modifyData/importTemplate',
    method: 'get'
  })
}
