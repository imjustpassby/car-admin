import request from '@/utils/request'

export function getMonthlyPay() {
  return request({
    url: '/monthlyPay/listAll',
    method: 'get'
  })
}

export function addMonthlyPay(data) {
  return request({
    url: '/monthlyPay/addPay',
    method: 'post',
    data
  })
}