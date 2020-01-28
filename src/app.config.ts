import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
    'pages/landing/landing',
    'pages/project/project',
    'pages/auth/auth',
    'pages/settings/settings',
  ],
  window: {
    navigationBarTitleText: 'sentry client',
    navigationBarBackgroundColor: '#282c34'
  }
};

export default config;
