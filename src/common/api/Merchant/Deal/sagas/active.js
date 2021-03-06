import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.active.request())

    const response = yield call(api.merchant.deal.active, request)

    yield put(
      Routines.active.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.active.failure(e))
  } finally {
    yield put(Routines.active.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.active.TRIGGER, trigger, api)
}
