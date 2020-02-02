import React, { useState, useCallback } from 'react'
import { View, Navigator, Text, Picker } from 'remax/wechat'

import styles from './style.module.less'
import NavigationBar from '@/components/navigationbar/navigationbar'
import { useNavigateUp } from '@/components/navigationbar/navigation-hooks'

import './style.less'
import { AppEndpoint, appEndpoint } from '@/service/endpoint'

function useEndpoint() {
  const [endpointIndex, setEndpointIndex] = useState(appEndpoint.host)

  const updateEndpint = useCallback((index: number) => {
    appEndpoint.host = index
    setEndpointIndex(index)
  }, [])

  return {
    endpointIndex,
    updateEndpint
  }
}

function SettingsPage() {
  const onNavigateUp = useNavigateUp()

  const { endpointIndex, updateEndpint } = useEndpoint()

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

        <View className={styles.endpint + ' ' + styles.item }>
          <Picker
            mode='selector'
            range={AppEndpoint.AVAILABLE_ENDPOINTS}
            value={endpointIndex}
            onChange={updateEndpint}
          >
            <View className={styles.endpointRow}>
              <Text className={styles.name}>Endpoint: {AppEndpoint.AVAILABLE_ENDPOINTS[endpointIndex].replace('https://', '')}</Text>
              <Text className={styles.endpintIcon}>⬇</Text>
            </View>
          </Picker>
        </View>

      </View>
    </View>
  )
}

export default SettingsPage
