import React, { useCallback, useState, useEffect, Fragment } from 'react'
import { View, Navigator, useReachBottom } from 'remax/wechat'
import { useSelector, useDispatch } from 'react-redux'
import { StoreData } from '@/redux/reducers'
import { SentryProject, SentryIssue } from '@/service/types'
import NavigationBar from '@/components/navigationbar/navigationbar'

import styles from './project.module.less'
import './project.less'
import ProjectPicker from '@/components/project-picker/project-picker'
import Issues from '@/components/issues/issues'
import { ProjectStore } from '@/redux/reducers/project'
import { PROJECT_SELECTED_CHANGE, ISSUE_LOADED, ISSUES_LOAD_MORE } from '@/redux/constants/project'

function Project(props: any) {
  const dispatch = useDispatch()
  const { projects } = useSelector<StoreData, ProjectStore>(s => s.project)

  const onPick = useCallback((project: SentryProject) => {
    dispatch({ type: PROJECT_SELECTED_CHANGE, project })
    dispatch({ type: ISSUES_LOAD_MORE, project })
  }, [projects])

  useReachBottom(() => {
    dispatch({ type: ISSUES_LOAD_MORE })
  })

  return (
    <View className={styles.page + ' project-page'}>
      <NavigationBar
        hasHolder={true}
        left={
          <View className={styles.header}>
            <Navigator url='/pages/settings/settings'> ⚙️ </Navigator>
            <ProjectPicker projects={projects} onPick={onPick} />
          </View>
        }
      />
      <View className={styles.body}>
        <Issues />
      </View>
    </View>
  )
}

export default Project
