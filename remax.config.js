const path = require('path')
// remax.config.js
const less = require('@remax/plugin-less');
// remax.config.js 默认配置
module.exports = {
    // 配置项目路径，默认当前路径
    cwd: process.cwd(),
    // 是否显示 build 进度，默认显示
    progress: true,
    // 指定代码的根目录，默认 src
    rootDir: 'src',
    // build 目录，默认 dist
    output: 'dist',
    // 是否开启 wxml/axml 文件压缩
    compressTemplate: process.env.NODE_ENV === 'production',
    // 是否将 px 转换为 rpx, 默认是 true
    pxToRpx: true,
  plugins: [less()],
};
