import request from '@/utils/request'

export function getRecordList() {
  return request({
    url: '/record/listAll',
    method: 'get'
  })
}

export function exchangeReward(data) {
  return request({
    url: '/record/exchangeReward',
    method: 'post',
    data
  })
}