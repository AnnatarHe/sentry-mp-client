# sentry mp client (NOT sdk)

sentry 小程序客户端，方便查看最新的 bug

<img src='./docs/qrcode.jpg' width='200px' />

视频地址： [Sentry 小程序客户端](https://www.bilibili.com/video/BV1jf4y1m79T/)

## Dev

```bash
$ gulp # 复制云函数
$ npm run dev # 启动小程序开发 watcher
```

## 背景

线上有 bug，但是根据 “线上有 bug” 这么一段话怎么判断出到底是真的有问题还有谁在瞎 bb。大冬天的也不想起床开电脑查报错。所以这个小程序诞生了（虽然你可能一点儿都不想用）

它的主要目的是不用打开电脑就能看到一些 sentry 报错信息。做一些简单的预判断。同时支持转发给同事，如果你判断出某位同事负责这部分代码可以直接转发了。

功能比较简单，仅仅是胜在方便。

## 使用

首先您需要在 [sentry.io](https://sentry.io/settings/account/api/auth-tokens/) 中创建一个 token，放心，这个小程序只有非常基础的打点功能，你的 token 只保存在本地，这个小程序任何授权都不需要。

将 token 贴入到页面的输入框中（初次打开即会弹出）

<img src='./docs/auth.png' width='300px' />

成功可以看到您的所有项目列表，首页默认展示第一个项目。通过点击项目即可实现切换

<img src='./docs/projects.png' width='300px' />

点击可进入详情，简单看一下堆栈信息

<img src='./docs/issue.png' width='300px' />

如果不是你的 bug 你可以选择转发给其他人处理，或者你拿起电脑来处理。（其实是方便老板直接转发到开发群）

## 其他使用相关问题

如果是 自己/公司 搭建的 sentry 可以进入页面后点击左上角的设置按钮，配置新的 sentry 地址并更新 token 即可。请求从腾讯的云函数发出。

## 开发相关

拿着 [remax](https://github.com/remaxjs/remax) 试着写着玩，花了几天时间。数据管理 redux & redux-saga。ajax 使用自带的 `wx.request`

界面设计上惨不忍睹，哪位设计朋友实在看不下去了可以给我发设计稿。

## 最后的其他

有什么问题可以直接发 issue，代码看不顺眼也可以提 pull request，项目感兴趣可以直接拿去 fork。

不需要去读什么提问的智慧，如何正确问问题。我也不会用官方辞令含糊其辞地敷衍。

总之这就是个图方便的项目，没什么技术含量。硬要说有那些好的地方的话，我觉得代码写得还蛮好看的，结构也比较简单，新手接到应该很快就能上手。
