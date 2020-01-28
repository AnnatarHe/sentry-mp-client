import React from 'react'
import { Frame } from '@/service/types'
import { View } from 'remax/wechat'

import styles from './style.module.less'

function IssueExceptionFrame({ frame }: { frame: Frame }) {
  return (
    <View className={styles.raw}>
      {frame.module} in {frame.function} at line {frame.lineNo}
    </View>
  )
}

export default IssueExceptionFrame
