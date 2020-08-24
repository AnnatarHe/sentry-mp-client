import React from 'react'
import { Value } from '@/service/types'
import { View, Text } from 'remax/wechat'
import IssueTag from '../issue-tag/issue-tag'
import IssueExceptionFrame from '../issue-exception-frame/issue-exception-frame'

import styles from './style.module.less'

function IssueException({ value }: { value: Value }) {
  return (
    <View className={styles.container}>
      <Text className={styles.type}>{value.type}</Text>
      <Text className={styles.value}>{value.value}</Text>
      <View className={styles.tags}>
        {Object.keys(value.mechanism || {}).map(k => (
          <IssueTag key={k} name={k} val={(value.mechanism as any)[k]} />
        ))}
      </View>
      <View className={styles.frames}>
        {value.stacktrace?.frames.map((frame, index) => (
          <IssueExceptionFrame frame={frame} key={index} />
        ))}
      </View>
    </View>
  )
}

export default IssueException
