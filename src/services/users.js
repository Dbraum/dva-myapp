import { fetch } from '../utils'
import qs from 'qs'
import _ from 'lodash'

export async function query (params) {
  const url = _.isEmpty(params)?'/api/users':`/api/users?${qs.stringify(params)}`
  return fetch(url, {
    method: 'get',
  })
}

export async function create (params) {
  return fetch('/api/users', {
    method: 'post',
    body: params
  })
}

export async function remove (params) {
  return fetch('/api/users', {
    method: 'delete',
    body: params
  })
}

export async function update (params) {
  return fetch('/api/users', {
    method: 'put',
    body: params
  })
}
