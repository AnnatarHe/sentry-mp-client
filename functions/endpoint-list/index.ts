// 云函数入口文件
import * as cloud from 'wx-server-sdk'

cloud.init({
  env: 'prod-819fo'
})
// 云函数入口函数
exports.main = async (event: any, context: any) => {
  const db = cloud.database()
  const endpoints = db.collection("endpoints")
  const { OPENID } = cloud.getWXContext()

  const result = await endpoints.where({ openid: OPENID }).get()

  return {
    result: result.data
  }
}
