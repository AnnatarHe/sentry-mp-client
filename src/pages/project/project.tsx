import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, Image } from 'remax/wechat'
import { useSelector } from 'react-redux'
import { StoreData } from '@/redux/reducers'
import { SentryProject, SentryIssue } from '@/service/types'
import NavigationBar from '@/components/navigationbar/navigationbar'

import styles from './project.module.less'
import './project.less'
import ProjectPicker from '@/components/project-picker/project-picker'
import Issues from '@/components/issues/issues'

function Project(props: any) {
  const [currentProject, setCurrentProject] = useState<SentryProject | null>(null)
  const projects = useSelector<StoreData, SentryProject[]>(s => s.project.projects)

  const onPick = useCallback((project: SentryProject) => {
    setCurrentProject(project)
  }, [projects])

  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      setCurrentProject(projects[0])
    }
  }, [currentProject, projects])

  return (
    <View className={styles.page + ' project-page'}>
      <NavigationBar
        hasHolder={true}
        left={<ProjectPicker projects={projects} onPick={onPick} />}
      />
      <View className={styles.body}>
        <Text className={styles.title}>Issue:</Text>
        {currentProject && <Issues project={currentProject} />}
      </View>
    </View>
  )
}

export default Project
