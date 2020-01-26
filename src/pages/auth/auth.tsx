import * as React from 'react'
import { View } from 'remax/wechat'

import styles from './style.module.less'
import TokenInput from '@/components/token-input/token-input'
import NavigationBar from '@/components/navigationbar/navigationbar'

function AuthPage() {
  return (
    <View className={styles.auth}>
      <NavigationBar hasHolder={false}>
        auth
      </NavigationBar>
      <View className={styles.body}>
      <TokenInput />
      </View>
    </View>
  )
}

export default AuthPage
