import { request, getStorageSync, setStorage } from "remax/wechat";

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

export async function sentryRequest<T>(url: string, method: HTTPMethod,  body: any) {
  const response = await request({
    url,
    data: body,
    method,
    timeout: 2000,
    header: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  })

  if (response.statusCode >= 400) {
    throw response
  }

  return response.data as T
}
