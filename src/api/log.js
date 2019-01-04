import request from '@/utils/request'

export function logList() {
  return request({
    url: '/log/listAll',
    method: 'get'
  })
}

export function newLog(data) {
  return request({
		url: '/log/newLog',
		method: 'post',
    data
  })
}