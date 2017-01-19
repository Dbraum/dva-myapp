import { fetch } from '../utils'

export async function myCity(params) {
  return fetch('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get'
  })
}

export async function queryWeather(params) {
  return fetch('http://www.zuimeitianqi.com/zuimei/queryWeather', {
    method: 'get'
  })
}

export async function query(params) {
  return fetch('/api/dashboard', {
    method: 'get'
  })
}
