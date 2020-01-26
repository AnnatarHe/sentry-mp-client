import { combineReducers } from 'redux'
import { projectReducer, ProjectStore } from './project'

export type StoreData = {
  project: ProjectStore
}

export default combineReducers({
  project: projectReducer
})
