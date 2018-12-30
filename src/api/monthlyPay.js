import request from '@/utils/request'

export function getMonthlyPay() {
  return request({
    url: '/monthlyPay/listAll',
    method: 'get'
  })
}
