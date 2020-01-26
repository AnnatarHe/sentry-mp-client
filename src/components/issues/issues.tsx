import React, { useEffect, useCallback, useState, useRef } from 'react'
import { SentryProject, SentryIssue } from '@/service/types'
import { fetchProjectIssues } from '@/service/project'
import { View, Text } from 'remax/wechat'

import styles from './issues.module.less'

type IssuesProps = {
  project: SentryProject
}

function Issues(props: IssuesProps) {
  const [issues, setIssues] = useState([] as SentryIssue[])
  const nextKey = useRef<string | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)
  const hasMoreRef = useRef<boolean>(true)
  const loadMore = useCallback(() => {
    if (!hasMoreRef.current) {
      return
    }

    fetchProjectIssues(props.project.organization.slug, props.project.slug, nextKey.current)
      .then(i => {
        nextKey.current = i.next
        setIssues(o => o.concat(i.data).filter(issue => issue.project.id === props.project.id))
        setHasMore(i.hasMore)
        hasMoreRef.current = i.hasMore
      })
  }, [props.project, hasMore])

  useEffect(() => {
    setHasMore(true)
    hasMoreRef.current = true
    nextKey.current = undefined
    // trick: 没有 setState 的回调，应该提升到 saga 上处理的，这里懒省事先拿 setTimeout 等一下
    loadMore()
  }, [props.project])

  return (
    <View className={styles.issues}>
      {issues.map(issue => (
        <View className={styles.issue} key={issue.id}>
          <Text>{issue.title}</Text>
          <Text>{issue.culprit}</Text>
          <View>
            <Text>{issue.shortId}</Text>
            <Text> 3 hours ago — 2 months old </Text>
          </View>
          <View>
            <Text> 共计：{issue.count}</Text>
            <Text> 用户：{issue.userCount}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Issues
