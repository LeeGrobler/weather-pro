import { useAppSelector } from '../../app/hooks'

function Spinner() {
  const loading = useAppSelector(state => state.common.loading)

  if (!loading) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white p-4 rounded-lg">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default Spinner
