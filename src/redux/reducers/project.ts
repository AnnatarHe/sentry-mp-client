import { SentryIssue, SentryProject } from "@/service/types"
import { PROJECT_FETCHED, PROJECT_SELECTED_CHANGE, ISSUE_LOADED } from "../constants/project"

export type ProjectStore = {
  projects: SentryProject[]
  project: SentryProject | null
  issue: {
    list: SentryIssue[]
    nextKey?: string
    hasReachEnd: boolean
  }
}

const init: ProjectStore = {
  projects: [],
  project: null,
  issue: {
    list: [],
    nextKey: undefined,
    hasReachEnd: false
  }
}

export function projectReducer(state: ProjectStore = init, action: any) {
  switch (action.type) {
    case PROJECT_FETCHED:
      return {
        ...state,
        projects: action.projects
      }
    case PROJECT_SELECTED_CHANGE:
      return {
        ...state,
        project: action.project,
        issue: {
          list: [],
          nextKey: undefined,
          hasReachEnd: false
        }
      }
    case ISSUE_LOADED:
      console.log('issue loaded', action)
      return {
        ...state,
        issue: {
          list: [...state.issue.list, ...action.issues],
          nextKey: action.next,
          hasReachEnd: action.hasMore
        }
      }
    default:
      return state
  }
}
