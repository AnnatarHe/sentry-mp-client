import React from 'react'
import { Text } from 'remax/wechat'

import styles from './style.module.less'

function SectionTitle({ title }: { title: string }) {
  return (
    <Text className={styles.title}>{title}</Text>
  )
}

export default SectionTitle
