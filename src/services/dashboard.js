import { fetch } from '../utils'


export async function query(params) {
  return fetch('/api/dashboard', {
    method: 'get'
  })
}
