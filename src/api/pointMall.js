import request from '@/utils/request'

export function getRewardList() {
  return request({
    url: '/pointMall/listAll',
    method: 'get'
  })
}

export function newReward(reward) {
  return request({
    url: '/pointMall/newReward',
    method: 'post',
    data: reward
  })
}

export function updateReward(data) {
  return request({
    url: '/pointMall/updateReward',
    method: 'post',
    data
  })
}

export function deleteReward(data) {
  return request({
    url: '/pointMall/deleteReward',
    method: 'post',
    data
  })
}