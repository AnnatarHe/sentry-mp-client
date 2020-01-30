import React, { useState, useEffect } from 'react'
import { View, Text, useShareAppMessage, navigateBack, redirectTo, showLoading, hideLoading } from 'remax/wechat'
import NavigationBar from '@/components/navigationbar/navigationbar'
import { retrieveIssue, retrieveIssueLatestEvent } from '@/service/project'
import { SentryIssueDetail, SentryEvent } from '@/service/types'
import IssueCard from '@/components/issue-card/issue-card'
import IssueTag from '@/components/issue-tag/issue-tag'
import IssueEntry from '@/components/issue-entry/issue-entry'
import SectionTitle from '@/components/section-title/section-title'

import './issue.less'
import styles from './issue.module.less'
import { useNavigateUp } from '@/components/navigationbar/navigation-hooks'

type IssuePageProps = {
  location: {
    query: {
      id: string
    }
  }
}

function TagsInfo({ issue }: { issue: SentryEvent }) {
  return (
    <View className={styles.tagInfo}>
      <SectionTitle title='🔖 Tags ' />
      <View className={styles.tags}>
        {issue.tags.map(tag => (
          <IssueTag key={tag.key} name={tag.key} val={tag.value} />
        ))}
      </View>
    </View>
  )
}

function useIssueData(id: string) {
  const [issueData, setIssueData] = useState<SentryIssueDetail | null>(null)
  const [issueEvent, setIssueEvent] = useState<SentryEvent | null>(null)

  useEffect(() => {
    showLoading({ mask: true, title: 'Loading...' })
    Promise.all([
      retrieveIssue(id),
      retrieveIssueLatestEvent(id)
    ]).then(data => {
      setIssueData(data[0])
      setIssueEvent(data[1])
    }).finally(() => {
      hideLoading()
    })
  }, [id])

  return {
    issueData,
    issueEvent
  }
}

function IssuePage(props: IssuePageProps) {
  const { issueData, issueEvent } = useIssueData(props.location.query.id)

  useShareAppMessage(() => {
    return {
      title: `似乎有个 bug，过来看看?`,
      path: `/pages/landing/landing?to=issue/issue&id=${issueData?.id}`
    }
  })

  const onNavigateUp = useNavigateUp()

  return (
    <View className={styles.issuePage + ' issue-page'}>
      <NavigationBar
        hasHolder
        onBack={onNavigateUp}
      >
        <Text>
          {issueData?.shortId ?? 'loading'}
        </Text>
      </NavigationBar>

      {issueData && issueEvent && (
        <View className={styles.body}>
          <IssueCard issue={issueData} />
          <View className={styles.divider} />
          <View className={styles.content}>
            <TagsInfo issue={issueEvent} />
            <View>
              {issueEvent?.entries.map((entry, index) => (
                <IssueEntry entry={entry} key={index} />
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default IssuePage
