import { sentryRequest, HTTPMethod } from "./base"
import { SentryIssue } from "./types"

export async function fetchProjectIssues(org: string, project: string, next?: string) {
  const projects = await sentryRequest<undefined, SentryIssue[]>(
    `/projects/${org}/${project}/issues/?statsPeriod=24h${next ? ('&cursor=' + next) : ''}`,
    HTTPMethod.GET
  )

  return projects
}
