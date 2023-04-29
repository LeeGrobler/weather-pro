import { useAppSelector } from '../../app/hooks'

const Alert = () => {
  const alert = useAppSelector(state => state.common.alert)

  if (!alert.visible) return null

  const getColor = () => {
    switch (alert.type) {
      case 'info':
        return 'bg-blue-200 text-blue-800'
      case 'warning':
        return 'bg-yellow-200 text-yellow-800'
      case 'error':
        return 'bg-red-200 text-red-800'
      case 'success':
        return 'bg-green-200 text-green-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <>
      <div className="App">
        <h1>Alert Popup Example</h1>
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${getColor()}`}>
          {alert.message}
        </div>
      </div>
    </>
  )
}

export default Alert
