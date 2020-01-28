import React from 'react'
import { Entry } from '@/service/types'
import { View, Text } from 'remax/wechat'
import IssueException from '../issue-exception/issue-exception'

import styles from './style.module.less'
import SectionTitle from '../section-title/section-title'

function IssueEntry({ entry }: { entry: Entry }) {
  const d = entry.data
  return (
    <View>
      {entry.type === 'exception' && d.values && d.values.map((val, idx) => (
        <View className={styles.exceptions} key={idx}>
          <SectionTitle title='💥 Exception: ' />
          <IssueException value={val} key={idx} />
        </View>
      ))}
      {entry.type === 'request' && (
        <View className={styles.request}>
          <SectionTitle title='🕸 Request: ' />
          <Text>{entry.data.url}</Text>
          <Text>Headers:</Text>
          <View>
            {entry.data.headers.map((h) => (
              <View key={h[0]}>
                <Text>{h[0]}</Text>
                <Text>{h[1]}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

    </View>
  )
}

export default IssueEntry
