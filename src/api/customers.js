import request from '@/utils/request'

export function getCustomersList() {
  return request({
    url: '/customers/listAll',
    method: 'get'
  })
}
