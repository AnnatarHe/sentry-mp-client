// 云函数入口文件
import * as cloud from 'wx-server-sdk'
import * as url from 'url'

cloud.init({
  env: 'prod-819fo'
})

type eventRequest = {
  origin: string
}

// 云函数入口函数
exports.main = async (event: eventRequest, context: any) => {
  const u = url.parse(event.origin)

  const db = cloud.database()
  const endpoints = db.collection("endpoints")
  const { OPENID } = cloud.getWXContext()

  const result = await endpoints.add({
    data: {
      openid: OPENID,
      origin: `${u.protocol}//${u.host}`,
    }
  })

  return {
    result: {
      _id: result._id,
      openid: OPENID,
      origin: u.host
    }
  }
}
