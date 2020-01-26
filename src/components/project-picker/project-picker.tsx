import React, { useState, useCallback } from 'react'
import { View, Text, Picker } from 'remax/wechat'
import { SentryProject } from '@/service/types'

import styles from './style.module.less'

type PickerProps = {
  projects: SentryProject[]
  onPick: (project: SentryProject) => void
}

function ProjectPicker(props: PickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const onPickerChange = useCallback((e) => {
    const newIndex = e.detail.value
    setCurrentIndex(newIndex)
    props.onPick(props.projects[newIndex])
  }, [currentIndex, props.projects])

  if (props.projects.length === 0) {
    return null
  }

  const p = props.projects[currentIndex]

  return (
    <View className={styles.picker}>
      <Picker mode='selector' range={props.projects} value={currentIndex} onChange={onPickerChange} rangeKey='name'>
        <Text className={styles.name} >{p.organization.name}/{p.name}</Text>
      </Picker>
    </View>
  )
}

export default ProjectPicker
