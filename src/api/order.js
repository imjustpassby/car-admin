import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/order/listAll',
    method: 'get'
  })
}
