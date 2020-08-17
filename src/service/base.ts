import { getStorageSync, setStorage, navigateTo, cloud } from "remax/wechat"
import { parseLink } from "./utils"

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

const API_TOKEN_KEY = 'app:token'

export let API_TOKEN = getStorageSync(API_TOKEN_KEY)
export async function updateAPIToken(t: string) {
  await setStorage({
    key: API_TOKEN_KEY,
    data: t
  });
  API_TOKEN = t;
}
cloud.init({
  env: 'prod-819fo'
})

type proxyRequestParams = {
  method: string
  token: string
  url: string
  body: any
}

interface proxyResponse<T> {
  errMsg: string
  requestID: string
  result: {
    link: string
    status: number
    body: T
  }
}

function cloudRequest<T>(params: proxyRequestParams): Promise<proxyResponse<T>> {
  return cloud.callFunction({
    name: 'hello',
    data: params
  }).then((res: proxyResponse<T>) => res)
}

export async function sentryRequest<T, R>(url: string, method: HTTPMethod, body?: T) {
  const resp = await cloudRequest<R>({
    method,
    token: API_TOKEN,
    url,
    body
  })

  console.log(resp)

  if (resp.result.status === 401) {
    navigateTo({
      url: '/pages/auth/auth'
    })
    throw { errMsg: '401' }
  }

  if (resp.result.status >= 400) {
    throw resp
  }

  const { prev, next, hasMore } = parseLink(resp.result.link)
  return {
    prev,
    next,
    hasMore,
    data: resp.result.body
  } as {
    prev?: string,
    next?: string,
    hasMore: boolean,
    data: R
  }
}
