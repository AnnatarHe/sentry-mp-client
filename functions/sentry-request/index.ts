// 云函数入口文件
import * as cloud from 'wx-server-sdk'
import fetch from 'node-fetch'

cloud.init({
  env: 'prod-819fo'
})

type eventRequest = {
  endpointId: string
  method: string
  token: string
  url: string
  body: string
}

// 云函数入口函数
exports.main = async (event: eventRequest, context: any) => {
  const db = cloud.database()
  const endpoints = db.collection("endpoints")

  let endpointUrl = ''
  const endpoint = await endpoints.where({ _id: event.endpointId }).get()
  if (!endpoint || endpoint.data.length < 1) {
    endpointUrl = 'https://sentry.io'
  } else {
    endpointUrl = endpoint.data[0].origin
  }

  const resp = await fetch(
    `${endpointUrl}/api/0/${event.url}`,
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
