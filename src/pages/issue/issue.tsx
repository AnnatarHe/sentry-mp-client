import React, { useState, useEffect } from 'react'
import { View, Text, useShareAppMessage } from 'remax/wechat'
import NavigationBar from '@/components/navigationbar/navigationbar'
import { retrieveIssue, retrieveIssueLatestEvent } from '@/service/project'
import { SentryIssueDetail, SentryEvent } from '@/service/types'
import IssueCard from '@/components/issue-card/issue-card'
import IssueTag from '@/components/issue-tag/issue-tag'
import IssueEntry from '@/components/issue-entry/issue-entry'
import styles from './issue.module.less'
import SectionTitle from '@/components/section-title/section-title'

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
    Promise.all([
      retrieveIssue(id),
      retrieveIssueLatestEvent(id)
    ]).then(data => {
      setIssueData(data[0])
      setIssueEvent(data[1])
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

  return (
    <View className={styles.issuePage}>
      <NavigationBar
        hasHolder
        left={
          <View className={styles.titleBox}>
            <Text className={styles.title}>
              {issueData?.title ?? 'Loading...'}
            </Text>
          </View>
        }
      />

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
