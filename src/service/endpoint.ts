import { getStorageSync, setStorage } from "remax/wechat"

export class AppEndpoint {
  private static HOST_KEY = 'app.host'
  private hostIndex: number = getStorageSync(AppEndpoint.HOST_KEY) || 0

  public static get AVAILABLE_ENDPOINTS() {
    return [
      'https://sentry.io'
    ]
  }

  get host() {
    return this.hostIndex
  }

  set host(index: number) {
    this.hostIndex = index
    setStorage({ key: AppEndpoint.HOST_KEY, data: index })
  }
}

export const appEndpoint = new AppEndpoint()
