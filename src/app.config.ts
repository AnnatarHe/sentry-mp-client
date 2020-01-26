import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
    'pages/landing/landing',
    'pages/index/index',
    'pages/auth/auth'
  ],
  window: {
    navigationBarTitleText: 'sentry client',
    navigationBarBackgroundColor: '#282c34'
  }
};

export default config;
