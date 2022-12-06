import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function list13(query) {
  return request({
    url: '/system/13/list',
    method: 'get',
    params: query
  })
}


export function Countrepair() {
  return request({
    url: '/system/13/Countrepair',
    method: 'get',
  })
}



// 查询【请填写功能名称】详细
export function get13(id) {
  return request({
    url: '/system/13/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function add13(data) {
  return request({
    url: '/system/13',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function update13(data) {
  return request({
    url: '/system/13',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function del13(id) {
  return request({
    url: '/system/13/' + id,
    method: 'delete'
  })
}
