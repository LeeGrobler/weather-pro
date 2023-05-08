import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

import { AlertType } from '../models/AlertType'
import { showAlert, hideAlert } from '../features/shared/commonSlice'

export const alert = (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  message: string,
  type?: AlertType,
  timeout?: number,
) => {
  dispatch(showAlert({ message, type }))
  setTimeout(() => dispatch(hideAlert()), timeout || 10000)
}
