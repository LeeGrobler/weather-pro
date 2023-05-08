import { showAlert, hideAlert } from '../../features/shared/commonSlice'
import { useAppDispatch } from '../hooks'
import { AlertType } from '../../models/AlertType'

const useAlert = () => {
  const dispatch = useAppDispatch()

  return {
    alert: (message: string, type?: AlertType, timeout?: number) => {
      dispatch(showAlert({ message, type }))
      setTimeout(() => dispatch(hideAlert()), timeout || 10000)
    },
  }
}

export default useAlert
