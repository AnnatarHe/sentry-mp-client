import React, { useState, useCallback } from 'react'
import { View, Text, Input, Button, reLaunch, showToast } from 'remax/wechat'

import styles from './token-input.module.less'
import { updateAPIToken } from '@/service/base'

function TokenInput() {
  const [token, setToken] = useState('')

  const onSubmit = useCallback(async () => {
    // 64 位长度
    if (token.length > 255 && token.length < 63) {
      showToast({
        icon: 'none',
        title: 'token 不合法'
      })
      return
    }
    await updateAPIToken(token)
    reLaunch({
      url: '/pages/landing/landing'
    })
  }, [token])

  return (
    <View className={styles.field}>
      <Text className={styles.tip}>通过 sentry.io -> settings -> API -> Auth Tokens 生成新的 token 贴入</Text>
      <Input
        placeholder='粘贴 token'
        className={styles.input}
        value={token}
        onInput={e => {setToken(e.detail.value.trim())}}
      />
      <Button className={styles.btn} onClick={onSubmit}>Confirm</Button>
    </View>
  )
}

export default TokenInput
