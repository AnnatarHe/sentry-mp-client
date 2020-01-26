import React, { useEffect } from 'react'
import { View, Text, Image, redirectTo } from 'remax/wechat'

import styles from './style.module.less'
import { API_TOKEN } from '@/service/base'
import { fetchAllOrganizations, fetchAllProjects } from '@/service/organizations'

function Landing() {

  useEffect(() => {
    if (!API_TOKEN) {
      redirectTo({
        url: '/pages/auth/auth'
      })
      return
    }

    console.log('landing')

    fetchAllProjects().then(projects => {
      console.log(projects)
      // TODO: set to local storage
    })

  }, [])

  return (
    <View className={styles.landing}>
      <Text className={styles.text}>loading</Text>
    </View>
  )
}

export default Landing
