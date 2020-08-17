// 云函数入口文件
import * as cloud from 'wx-server-sdk'
import fetch from 'node-fetch'

cloud.init()

type eventRequest = {
  method: string
  token: string
  url: string
  body: string
}

// 云函数入口函数
exports.main = async (event: eventRequest, context: any) => {
  const resp = await fetch(
    `https://sentry.io/api/0/${event.url}`,
    {
      body: event.body,
      method: event.method,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${event.token}`
      }
    })

  const status = resp.status
  const link = resp.headers.get('link')

  const body = await resp.json()
  return {
    link,
    body,
    status
  }
}
