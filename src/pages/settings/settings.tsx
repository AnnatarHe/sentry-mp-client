import React, { useState, useCallback, useEffect } from 'react'
import { View, Navigator, Text, Picker } from 'remax/wechat'

import styles from './style.module.less'
import NavigationBar from '@/components/navigationbar/navigationbar'
import { useNavigateUp } from '@/components/navigationbar/navigation-hooks'

import './style.less'
import { AppEndpoint, appEndpoint, EndpointType } from '@/service/endpoint'
import EndpointEditor from '@/components/endpoint-editor/endpoint-editor'

// function useEndpoint() {
//   const [endpointID, setEndpointID] = useState(appEndpoint.cloudEndpointID)

//   const updateEndpint = useCallback((event: any) => {
//     const index = ~~event.detail.value
//     console.log('update', index)
//     setEndpointID()

//   return {
//     endpointIndex,
//     updateEndpint
//   }
// }

type EndpointListResponse = {
  result: {
    result: EndpointType[]
  }
}


function useEndpoints() {
  const [endpoints, setEndpoints] = useState<EndpointType[]>([])
  const [current, setCurrent] = useState(appEndpoint.cloudEndpointID)

  const onAdd = useCallback((nv: EndpointType) => {
    setEndpoints(e => [...e].concat(nv))
    if (endpoints.length === 0) {
      appEndpoint.cloudEndpointID = nv._id
      setCurrent(nv._id)
    }
  }, [endpoints.length])

  const onUpdateCurrent = useCallback((event: any) => {
    const index = ~~event.detail.value
    const _id = endpoints[index]._id
    appEndpoint.cloudEndpointID = _id
    setCurrent(_id)
  }, [endpoints])

  return {
    endpoints,
    onAdd,
    current,
    onUpdateCurrent,
  }
}

function SettingsPage() {
  const onNavigateUp = useNavigateUp()
  const { endpoints, onAdd, current, onUpdateCurrent } = useEndpoints()
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

        <View className={styles.endpint + ' ' + styles.item}>
          <Picker
            mode='selector'
            range={endpoints}
            rangeKey='origin'
            value={endpoints.find(e => e._id === current)?.origin}
            onChange={onUpdateCurrent}
          >
            <View className={styles.endpointRow}>
              <Text className={styles.name}>Endpoint: {endpoints.find(e => e._id === current)?.origin}</Text>
              <Text className={styles.endpintIcon}>⬇</Text>
            </View>
          </Picker>
        </View>
        <EndpointEditor
          onAdded={(endpoint: EndpointType) => {
            onAdd(endpoint)
          }}
        />
      </View>
    </View>
  )
}

export default SettingsPage
