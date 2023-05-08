import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from '../app/store'
import Spinner from '../features/shared/Spinner'

const setLoadingState = (loading: boolean) => {
  store.dispatch({ type: 'common/setLoading', payload: loading })
}

describe('Spinner', () => {
  it('renders the spinner when the loading state is true', () => {
    setLoadingState(true)
    render(
      <Provider store={store}>
        <Spinner />
      </Provider>,
    )

    const spinnerElement = screen.queryByTestId('spinner')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('does not render the spinner when the loading state is false', () => {
    setLoadingState(false)
    render(
      <Provider store={store}>
        <Spinner />
      </Provider>,
    )

    const spinnerElement = screen.queryByTestId('spinner')
    expect(spinnerElement).not.toBeInTheDocument()
  })
})
