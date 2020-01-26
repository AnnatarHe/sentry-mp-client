import React, { useEffect } from 'react'
import { View, Text, Image, redirectTo } from 'remax/wechat'

import styles from './style.module.less'
import { API_TOKEN } from '@/service/base'
import { fetchAllOrganizations, fetchAllProjects } from '@/service/organizations'
import { useDispatch } from 'react-redux'
import { PROJECT_FETCH_SAGA } from '@/redux/constants/project'

function Landing() {

  const dispatch = useDispatch()

  useEffect(() => {
    if (!API_TOKEN) {
      redirectTo({
        url: '/pages/auth/auth'
      })
      return
    }

    dispatch({ type: PROJECT_FETCH_SAGA })

  }, [])

  return (
    <View className={styles.landing}>
      <Text className={styles.text}>loading</Text>
    </View>
  )
}

export default Landing
