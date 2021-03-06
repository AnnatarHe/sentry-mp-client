import React from 'react'
import { SentryIssue } from '@/service/types'
import { View, Text } from 'remax/wechat'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import styles from './issues.module.less'
import { useSelector } from 'react-redux'
import { StoreData } from '@/redux/reducers'
import IssueCard from '../issue-card/issue-card'
import SectionTitle from '../section-title/section-title'

function Issues() {
  const { list, hasReachEnd } = useSelector<StoreData, { list: SentryIssue[], hasReachEnd: boolean}>(s => s.project.issue)
  return (
    <View className={styles.section}>
      <SectionTitle title='🐛 Issues: ' />
      <View className={styles.issues}>
        {list.map(issue => (
          <IssueCard issue={issue} key={issue.id} />
        ))}
      </View>
    </View>
  )
}

export default Issues
