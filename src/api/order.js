import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/order/listAll',
    method: 'get'
  })
}

export function newOrder(order) {
  return request({
    url:'/order/newOrder',
    method: 'post',
    data: order
  })
}