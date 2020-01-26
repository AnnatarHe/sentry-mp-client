import { SentryIssue, SentryProject } from "@/service/types"
import { PROJECT_FETCHED } from "../constants/project"

export type ProjectStore = {
  projects: SentryProject[]
}

const init: ProjectStore = {
  projects: []
}

export function projectReducer(state: ProjectStore = init, action: any) {
  switch (action.type) {
    case PROJECT_FETCHED:
      return {
        ...state,
        projects: action.projects
      }
    default:
      return state
  }
}
