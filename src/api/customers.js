import request from '@/utils/request'

export function getCustomersList() {
  return request({
    url: '/customers/listAll',
    method: 'get'
  })
}

export function newVip(cusInfo) {
  return request({
    url:'/customers/newVip',
    method: 'post',
    data: cusInfo
  })
}

export function updateVip(data) {
  return request({
    url:'/customers/updateVip',
    method: 'post',
    data
  })
}

export function deleteVip(data) {
  return request({
    url:'/customers/deleteVip',
    method: 'post',
    data
  })
}

export function descPoint(data) {
  return request({
    url:'/customers/descPoint',
    method: 'post',
    data
  })
}

export function refill(data) {
  return request({
    url:'/customers/refill',
    method: 'post',
    data
  })
}

export function changeBalance(data) {
  return request({
    url:'/customers/changeBalance',
    method: 'post',
    data
  })
}