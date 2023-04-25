import Weather from './components/Weather'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 uppercase text-gray-400">Weather App Pro</h1>
        <Weather />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
