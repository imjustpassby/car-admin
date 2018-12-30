import request from '@/utils/request'

export function getRewardList() {
  return request({
    url: '/pointMall/listAll',
    method: 'get'
  })
}
