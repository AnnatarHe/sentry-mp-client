import * as React from 'react'
import { View, navigateBack } from 'remax/wechat'

import styles from './style.module.less'
import TokenInput from '@/components/token-input/token-input'
import NavigationBar from '@/components/navigationbar/navigationbar'
import { useNavigateUp } from '@/components/navigationbar/navigation-hooks'

function AuthPage() {
  const onNavigateUp = useNavigateUp()
  return (
    <View className={styles.auth}>
      <NavigationBar
        hasHolder={false}
        onBack={onNavigateUp}>
        auth
      </NavigationBar>
      <View className={styles.body}>
        <TokenInput />
      </View>
    </View>
  )
}

export default AuthPage
