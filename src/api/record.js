import request from '@/utils/request'

export function getRecordList() {
  return request({
    url: '/record/listAll',
    method: 'get'
  })
}
