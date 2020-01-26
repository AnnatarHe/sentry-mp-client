import { spawn } from "@redux-saga/core/effects";
import { init } from './project'

export default function* rootSaga() {
  yield spawn(init)
}
