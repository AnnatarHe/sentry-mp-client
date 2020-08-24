import React, { useEffect, useCallback } from 'react'
import { View, Text, redirectTo, Button, cloud } from 'remax/wechat'
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

  const fetchProject = useCallback(() => {
    const { to, ...params } = props.location.query

    dispatch({
      type: PROJECT_FETCH_SAGA,
      onFetched: () => {
        redirectTo({
          url: to ? (`/pages/${to || 'project/project'}?` + qs.stringify(params)) : '/pages/project/project'
        })
      }
    })
  }, [props.location.query])

  useEffect(() => {
    if (!API_TOKEN) {
      redirectTo({
        url: '/pages/auth/auth'
      })
      return
    }

    fetchProject()
  }, [])
  return (
    <View className={styles.landing}>
      <Text className={styles.text}>加载中..</Text>
      <Button className={styles.retry} onClick={fetchProject}>重试</Button>
    </View>
  )
}

export default Landing
