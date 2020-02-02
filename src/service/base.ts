import { request, getStorageSync, setStorage, navigateTo } from "remax/wechat";
import { parseLink } from "./utils";
import { AppEndpoint, appEndpoint } from "./endpoint";

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

const API_TOKEN_KEY = 'app:token'

// 测试: 498c8c1549c44ea984dfa81e51dc2bab66b71cbd77f04c88a84faf5dc61acdc8
export let API_TOKEN = getStorageSync(API_TOKEN_KEY)
export async function updateAPIToken(t: string) {
  await setStorage({
    key: API_TOKEN_KEY,
    data: t
  });
  API_TOKEN = t;
}

export async function sentryRequest<T, R>(url: string, method: HTTPMethod,  body?: T) {
  const response = await request({
    url: `${AppEndpoint.AVAILABLE_ENDPOINTS[appEndpoint.host]}/api/0/${url}`,
    data: body,
    method,
    timeout: 5000,
    header: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  })

  if (response.statusCode === 401) {
    navigateTo({
      url: '/pages/auth/auth'
    })
    throw { errMsg: '401' }
  }

  if (response.statusCode >= 400) {
    throw response
  }

  const { prev, next, hasMore } = parseLink(response.header.Link)

  return {
    prev,
    next,
    hasMore,
    data: response.data
  } as {
    prev?: string,
    next?: string,
    hasMore: boolean,
    data: R
  }
}
