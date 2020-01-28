import React, { useEffect } from 'react'
import { View, Text, Image, redirectTo } from 'remax/wechat'
import { useDispatch } from 'react-redux'
import qs from 'query-string'
import { API_TOKEN } from '@/service/base'
import { PROJECT_FETCH_SAGA } from '@/redux/constants/project'


import styles from './style.module.less'

type LandingPageProps = {
  location: {
    query: {
      id?: string,
      to?: string
    }
  }
}

function Landing(props: LandingPageProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!API_TOKEN) {
      redirectTo({
        url: '/pages/auth/auth'
      })
      return
    }

    const { to, ...params } = props.location.query

    dispatch({
      type: PROJECT_FETCH_SAGA,
      redirectTo: to ? (`/pages/${to || 'project/project'}?` + qs.stringify(params)) : null
    })

  }, [])

  return (
    <View className={styles.landing}>
      <Text className={styles.text}>loading</Text>
    </View>
  )
}

export default Landing
