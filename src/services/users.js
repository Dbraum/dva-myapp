import { fetch } from '../utils'

export async function query (params) {
  return fetch('/api/users', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return fetch('/api/users', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return fetch('/api/users', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return fetch('/api/users', {
    method: 'put',
    data: params
  })
}
