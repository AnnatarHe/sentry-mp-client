import React, { useState, useCallback } from 'react'
import {
  View,
  Input,
  Button,
  cloud,
  showLoading,
  hideLoading,
  showToast,
  Text
} from 'remax/wechat'

import './style.less'
import { EndpointType } from '@/service/endpoint'

type EndpointEditorProps = {
  onAdded(endpoint: EndpointType): void
}

const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

function EndpointEditor(props: EndpointEditorProps) {
  const [val, setVal] = useState('')

  const onAdd = useCallback(async () => {
    if (!urlRegexp.test(val)) {
      showToast({
        icon: 'none',
        title: '格式需要是 url: `https://sentry.io` 样式'
      })
      return
    }

    showLoading({
      mask: true,
      title: 'Submitting'
    })
    const u = new URL(val)
    props.onAdded({
      _id: Math.random().toString(),
      openid: '',
      origin: u.host
    })
  }, [val])

  const disabled = !urlRegexp.test(val)

  return (
    <View className='endpoint-editor'>
      <View className='input-raw'>
        <Input
          value={val}
          onInput={e => setVal(e.detail.value)}
          className='input'
          type='text'
          placeholder='https://sentry.io'
        />
        <Button
          onClick={onAdd}
          className={`confirm ${disabled ? 'disabled' : ''}`}
          disabled={disabled}
        >Add</Button>
      </View>
      <Text className='tip'>如果您是自己搭建的 sentry 请将域名写入上面的框，后续请求会使用新的域名访问，请务必确保能够被公网访问</Text>
    </View>
  )
}

export default EndpointEditor
