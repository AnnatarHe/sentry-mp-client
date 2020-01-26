import { takeLatest, call, put } from 'redux-saga/effects'
import { PROJECT_FETCH_SAGA, PROJECT_FETCHED } from "../constants/project"
import { fetchAllProjects, fetchAllOrganizations } from '@/service/organizations'
import { showLoading, hideLoading, showToast, redirectTo } from 'remax/wechat'

function* initProjectsData(action: any) {
  showLoading({
    title: 'loading...',
    mask: true,
  })

  try {
    const projects = yield call(fetchAllProjects)
    yield put({ type: PROJECT_FETCHED, projects })
    yield call(hideLoading)

    yield call(redirectTo, {
      url: '/pages/project/project'
    })
  } catch (e) {
    yield call(hideLoading)
    yield call(showToast, {
      icon: 'none',
      title: e.toString()
    })
  }
}

export function* init() {
  yield takeLatest(PROJECT_FETCH_SAGA, initProjectsData)
}
