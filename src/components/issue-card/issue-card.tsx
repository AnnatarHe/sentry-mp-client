import React from 'react'
import { View, Text, Navigator } from 'remax/wechat'
import { SentryIssue } from '@/service/types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import styles from './style.module.less'

type IssueCardProps = {
  issue: SentryIssue
}

function IssueCard({ issue }: IssueCardProps) {
  return (
    <Navigator
      className={styles.issue}
      url={`/pages/issue/issue?id=${issue.id}`}
    >
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
    </Navigator>
  )
}

export default IssueCard
