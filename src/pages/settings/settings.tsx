import React from 'react'
import { View, Navigator, Text } from 'remax/wechat'

import styles from './style.module.less'

function SettingsPage() {
  return (
    <View className={styles.settings}>
      <Navigator className={styles.item} url='/pages/auth/auth'>
        <Text className={styles.name}>
        重新绑定 Token
        </Text>
        <Text>
        ▶
        </Text>
      </Navigator>
    </View>
  )
}

export default SettingsPage
