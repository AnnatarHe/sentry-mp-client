import React from 'react'
import { View, Text } from 'remax/wechat'

import styles from './style.module.less'

function IssueTag({ name, val }: { name: string, val: string }) {
  return (
    <View className={styles.tag}>
      <Text className={styles.name}>{name}</Text>
      <Text className={styles.val}>{val.toString()}</Text>
    </View>
  )
}

export default IssueTag
