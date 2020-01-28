import { sentryRequest, HTTPMethod } from "./base"
import { SentryIssue, SentryIssueDetail, SentryEvent } from "./types"

export async function fetchProjectIssues(org: string, project: string, next?: string) {
  const projects = await sentryRequest<undefined, SentryIssue[]>(
    `projects/${org}/${project}/issues/?statsPeriod=24h${next ? ('&cursor=' + next) : ''}`,
    HTTPMethod.GET
  )

  return projects
}

export async function retrieveIssue(id: string) {
  const issue = await sentryRequest<undefined, SentryIssueDetail>(
    `issues/${id}/`,
    HTTPMethod.GET
  )

  return issue.data
}

export async function retrieveIssueLatestEvent(id: string) {
  const event = await sentryRequest<undefined, SentryEvent>(
    `issues/${id}/events/latest/`,
    HTTPMethod.GET
  )

  return event.data
}
