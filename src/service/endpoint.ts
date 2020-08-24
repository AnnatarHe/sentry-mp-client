import { getStorageSync, setStorage } from "remax/wechat"

export type EndpointType = {
  openid: string
  origin: string
  _id: string
}


export class AppEndpoint {
  private static HOST_KEY = 'app.host'
  private static CLOUD_ENDPINTID = 'app.cloud.hostID'
  private hostIndex: number = getStorageSync(AppEndpoint.HOST_KEY) || 0
  private hostID: string = getStorageSync(AppEndpoint.CLOUD_ENDPINTID) || ''

  public static get AVAILABLE_ENDPOINTS() {
    return JSON.parse(process.env.REMAX_APP_ENDPOINTS ?? '[]') as string[]
  }

  get host() {
    return this.hostIndex
  }

  set host(index: number) {
    this.hostIndex = index
    setStorage({ key: AppEndpoint.HOST_KEY, data: index })
  }

  get cloudEndpointID() {
    return this.hostID
  }

  set cloudEndpointID(hostID: string) {
    this.hostID = hostID
    setStorage({ key: AppEndpoint.CLOUD_ENDPINTID, data: hostID })
  }
}

export const appEndpoint = new AppEndpoint()
