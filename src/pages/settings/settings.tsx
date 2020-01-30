import React from 'react'
import { View, Navigator, Text } from 'remax/wechat'

import styles from './style.module.less'
import NavigationBar from '@/components/navigationbar/navigationbar'
import { useNavigateUp } from '@/components/navigationbar/navigation-hooks'

import './style.less'

function SettingsPage() {
  const onNavigateUp = useNavigateUp()

  return (
    <View className={styles.settings + ' settings-page'}>
      <NavigationBar onBack={onNavigateUp} hasHolder>
        Settings
      </NavigationBar>
      <View className={styles.body}>
        <Navigator className={styles.item} url='/pages/auth/auth'>
          <Text className={styles.name}>
            重新绑定 Token
          </Text>
          <Text>
            ▶
          </Text>
        </Navigator>
      </View>
    </View>
  )
}

export default SettingsPage
