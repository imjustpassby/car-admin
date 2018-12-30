import request from '@/utils/request'

export function getStorageList() {
  return request({
    url: '/storage/listAll',
    method: 'get'
  })
}
