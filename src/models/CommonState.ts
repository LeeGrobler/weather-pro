import { AlertType } from './AlertType'

export default interface CommonState {
  loading: boolean
  alert: {
    message: string
    type: AlertType
    visible?: boolean
  }
}
