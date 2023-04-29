import { createSlice } from '@reduxjs/toolkit'

import CommonState from '../../models/CommonState'
import { AlertType } from '../../models/AlertType'

const initialState = (): CommonState => {
  return {
    loading: false,
    alert: {
      message: '',
      type: 'error',
      visible: false,
    },
  }
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState(),
  reducers: {
    setLoading(state, { payload }: { payload: boolean }) {
      state.loading = payload
    },
    showAlert: (state, { payload }: { payload: { message: string; type?: AlertType } }) => {
      state.alert.message = payload.message
      state.alert.type = payload.type || 'error'
      state.alert.visible = true
    },
    hideAlert: state => {
      state.alert = initialState().alert
    },
  },
})

export const { setLoading, showAlert, hideAlert } = commonSlice.actions

export default commonSlice.reducer
