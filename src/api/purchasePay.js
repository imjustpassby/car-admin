import request from '@/utils/request'

export function getPurchasePay() {
  return request({
    url: '/purchasePay/listAll',
    method: 'get'
  })
}
