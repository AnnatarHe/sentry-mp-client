// 云函数入口文件
import * as cloud from 'wx-server-sdk'

cloud.init({
  env: 'prod-819fo'
})

type eventRequest = {
  id: string
}

// 云函数入口函数
exports.main = async (event: eventRequest, context: any) => {

  const db = cloud.database()
  const endpoints = db.collection("endpoints")
  const { OPENID } = cloud.getWXContext()

  const endpoint = await endpoints.where({ _id: event.id }).remove()

  return {
    endpoint
  }
}
