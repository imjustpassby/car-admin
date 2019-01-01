import request from '@/utils/request'

export function getPurchasePay() {
  return request({
    url: '/purchasePay/listAll',
    method: 'get'
  })
}

export function addPurchasePay(data) {
  return request({
    url: '/purchasePay/addPay',
    method: 'post',
    data
  })
}