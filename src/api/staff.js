import request from '@/utils/request'

export function getStaffList() {
  return request({
    url: '/staff/listAll',
    method: 'get'
  })
}

export function newStaff(staff) {
  return request({
    url: '/staff/newStaff',
    method: 'post',
    data: staff
  })
}

export function updateStaff(data) {
  return request({
    url:'/staff/updateStaff',
    method: 'post',
    data
  })
}

export function deleteStaff(data) {
  return request({
    url:'/staff/deleteStaff',
    method: 'post',
    data
  })
}