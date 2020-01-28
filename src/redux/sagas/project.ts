import { takeLatest, call, put, select } from 'redux-saga/effects'
import { PROJECT_FETCH_SAGA, PROJECT_FETCHED, ISSUES_LOAD_MORE, PROJECT_SELECTED_CHANGE, ISSUE_LOADED } from "../constants/project"
import { fetchAllProjects } from '@/service/organizations'
import { showLoading, hideLoading, showToast, redirectTo, showTabBar } from 'remax/wechat'
import { fetchProjectIssues } from '@/service/project'
import { ProjectStore } from '../reducers/project'
import { SentryProject } from '@/service/types'

function* initProjectsData() {
  showLoading({
    title: 'loading...',
    mask: true,
  })

  try {
    const projects = yield call(fetchAllProjects)
    yield put({ type: PROJECT_FETCHED, projects })
    yield put({ type: PROJECT_SELECTED_CHANGE, project: projects[0] })
    yield put({ type: ISSUES_LOAD_MORE })
    yield call(hideLoading)

    yield call(redirectTo, {
      url: '/pages/project/project'
    })
  } catch (e) {
    yield call(hideLoading)
    yield call(showToast, {
      icon: 'none',
      title: e.errMsg
    })
  }
}

export function* loadIssue(action: any) {
  const { project, issue: { nextKey, hasReachEnd } }: ProjectStore = yield select(s => s.project)
  const currentProject: SentryProject | null = action.project ?? project
  if (!currentProject) {
    return
  }

  if (hasReachEnd) {
    yield call(showToast, {
      icon: 'none',
      title: '被你看到底了'
    })
    return
  }

  const issues = yield call(fetchProjectIssues, currentProject.organization.slug, currentProject.slug, nextKey)

  console.log('issue will load', issues)

  yield put({
    type: ISSUE_LOADED,
    issues: issues.data,
    hasMore: issues.hasMore,
    next: issues.next
  })
}

export function* init() {
  yield takeLatest(PROJECT_FETCH_SAGA, initProjectsData)
  yield takeLatest(ISSUES_LOAD_MORE, loadIssue)
}
