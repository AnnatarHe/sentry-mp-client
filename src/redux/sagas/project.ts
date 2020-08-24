import { takeLatest, call, put, select } from 'redux-saga/effects'
import { PROJECT_FETCH_SAGA, PROJECT_FETCHED, ISSUES_LOAD_MORE, PROJECT_SELECTED_CHANGE, ISSUE_LOADED } from "../constants/project"
import { fetchAllProjects } from '@/service/organizations'
import { showLoading, hideLoading, showToast, redirectTo, showTabBar } from 'remax/wechat'
import { fetchProjectIssues } from '@/service/project'
import { ProjectStore } from '../reducers/project'
import { SentryProject, SentryServerResponse, SentryIssue } from '@/service/types'

function* initProjectsData(action: any) {
  const onDataFetched = action.onFetched
  // const redirectUrl = action.redirectTo
  yield call(showLoading, {
    title: 'loading...',
    mask: true,
  })

  try {
    const projects = yield call(fetchAllProjects)
    yield put({ type: PROJECT_FETCHED, projects })
    yield put({ type: PROJECT_SELECTED_CHANGE, project: projects[0] })
    yield put({ type: ISSUES_LOAD_MORE })
    yield call(hideLoading)

    if (onDataFetched) {
      yield call(onDataFetched)
    }

    // yield call(redirectTo, {
    //   url: redirectUrl ?? '/pages/project/project'
    // })
  } catch (e) {
    console.error(e)
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

  // yield call(showLoading, {
  //   mask: true,
  //   title: 'Loading'
  // })

  let issues: SentryServerResponse<SentryIssue[]>

  // try {
    issues = yield call(fetchProjectIssues, currentProject.organization.slug, currentProject.slug, nextKey)
  //   yield call(hideLoading)
  // } catch (e) {
  //   yield call(hideLoading)
  //   yield call(showToast, {
  //     icon: 'none',
  //     title: e.toString()
  //   })
  //   throw e
  // }

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
