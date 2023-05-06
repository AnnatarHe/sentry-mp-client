import { getStorageSync, setStorage, navigateTo, showToast, request } from "remax/wechat"
import { parseLink } from "./utils"
import { AppEndpoint, appEndpoint } from "./endpoint";
import { SentryServerResponse } from "./types";

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
type proxyRequestParams = {
  endpointId: string
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

export async function sentryRequest<T, R>(url: string, method: HTTPMethod, body?: T) {
  const resp = await request({
    method,
    url: `${AppEndpoint.AVAILABLE_ENDPOINTS[appEndpoint.host]}/api/0/${url}`,
    header: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    timeout: 10000,
    data: body
  }).catch(e => {
    showToast({
      icon: 'none',
      title: e.toString()
    })
    throw e
  })

  console.log('resp',resp)

  if (resp.statusCode === 401) {
    navigateTo({
      url: '/pages/auth/auth'
    })
    throw { errMsg: '401' }
  }

  if (resp.statusCode >= 400) {
    throw resp
  }

  const { prev, next, hasMore } = parseLink(resp.data.link)
  return {
    prev,
    next,
    hasMore,
    data: resp.data
  } as SentryServerResponse<R>
}
