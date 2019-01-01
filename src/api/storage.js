import request from '@/utils/request'

export function getStorageList() {
  return request({
    url: '/storage/listAll',
    method: 'get'
  })
}

export function newFitting(fitting) {
  return request({
    url: '/storage/newFitting',
    method: 'post',
    data: fitting
  })
}

export function updateFitting(fitting) {
  return request({
    url: '/storage/updateFitting',
    method: 'post',
    data: fitting
  })
}

export function deleteFitting(fitting) {
  return request({
    url: '/storage/deleteFitting',
    method: 'post',
    data: fitting
  })
}

export function descFitting(fittings) {
  return request({
    url: '/storage/descFitting',
    method: 'post',
    data: fittings
  })
}