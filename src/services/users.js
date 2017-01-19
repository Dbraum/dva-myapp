import { fetch } from '../utils'

export async function query (params) {
  return fetch('/api/users', {
    method: 'get'
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
