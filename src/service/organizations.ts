import { sentryRequest, HTTPMethod } from "./base";
import { FetchAllOrganizationsResponse, SentryProject } from "./types";

export async function fetchAllOrganizations(next?: string, result: FetchAllOrganizationsResponse[] = []): Promise<FetchAllOrganizationsResponse[]> {
  const orgs = await sentryRequest<undefined, FetchAllOrganizationsResponse[]>(
    `organizations/${next ? ('?cursor=' + next) : ''}`,
    HTTPMethod.GET
  )

  if (orgs.hasMore && orgs.next) {
    return await fetchAllOrganizations(orgs.next, result)
  }

  return result.concat(orgs.data)
}

export async function fetchAllProjects(
  next?: string,
  result: SentryProject[] = []
): Promise<SentryProject[]> {
  const projects = await sentryRequest<undefined, SentryProject[]>(
    `projects/${next ? ('?cursor=' + next) : ''}`,
    HTTPMethod.GET
  )

  if (projects.hasMore && projects.next) {
    return await fetchAllProjects(projects.next, result)
  }

  return result.concat(projects.data)
}
