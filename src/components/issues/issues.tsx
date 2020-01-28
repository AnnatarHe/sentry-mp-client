import React from 'react'
import { SentryIssue } from '@/service/types'
import { View, Text } from 'remax/wechat'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import styles from './issues.module.less'
import { useSelector } from 'react-redux'
import { StoreData } from '@/redux/reducers'

function Issues() {
  const { list, hasReachEnd } = useSelector<StoreData, { list: SentryIssue[], hasReachEnd: boolean}>(s => s.project.issue)
  return (
    <View className={styles.section}>
      <Text className={styles.sectionTitle}>Issue:</Text>
      <View className={styles.issues}>
        {list.map(issue => (
          <View className={styles.issue} key={issue.id}>
            <Text className={styles.title}>{issue.title}</Text>
            <Text className={styles.culprit}>{issue.culprit}</Text>
            <View className={styles.info}>
              <Text>{issue.shortId}</Text>
              <Text>
                 🙄{formatDistanceToNow(new Date(issue.lastSeen))} —
                 🤡 {formatDistanceToNow(new Date(issue.firstSeen))}
              </Text>
            </View>
            <View className={styles.countInfo}>
              <Text className={styles.count}> 共计：{issue.count}</Text>
              <Text className={styles.userCount}> 用户：{issue.userCount}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Issues
