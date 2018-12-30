import request from '@/utils/request'

export function getStaffList() {
  return request({
    url: '/staff/listAll',
    method: 'get'
  })
}
