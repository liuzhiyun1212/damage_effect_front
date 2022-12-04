import request from '@/utils/request'

// 查询9：装备使用数据列表
export function list9(query) {
  return request({
    url: '/system/9/list',
    method: 'get',
    params: query
  })
}

export function numQuality() {
  return request({
    url: '/system/9/numQuality',
    method: 'get',
  })
}

export function numFault() {
  return request({
    url: '/system/9/numFault',
    method: 'get',
  })
}


// 查询9：装备使用数据详细
export function get9(id) {
  return request({
    url: '/system/9/' + id,
    method: 'get'
  })
}

export function Countqua() {
  return request({
    url: '/system/9/Countqua',
    method: 'get'
  })
}





// 新增9：装备使用数据
export function add9(data) {
  return request({
    url: '/system/9',
    method: 'post',
    data: data
  })
}

// 修改9：装备使用数据
export function update9(data) {
  return request({
    url: '/system/9',
    method: 'put',
    data: data
  })
}

// 删除9：装备使用数据
export function del9(id) {
  return request({
    url: '/system/9/' + id,
    method: 'delete'
  })
}

// 下载导入模板
export function importTemplate() {
  return request({
    url: '/system/9/importTemplate',
    method: 'get'
  })
}