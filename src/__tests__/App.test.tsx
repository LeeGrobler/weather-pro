import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'

import App from '../App'
import store from '../app/store'

describe('App', () => {
  it('renders child components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('location')).toBeInTheDocument()
    expect(screen.getByTestId('weather')).toBeInTheDocument()
  })
})
