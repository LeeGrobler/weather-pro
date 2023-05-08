import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from '../app/store'
import { showAlert, hideAlert } from '../features/shared/commonSlice'
import Alert from '../features/shared/Alert'

describe('Alert', () => {
  it('renders the alert when the visible state is true', () => {
    store.dispatch(showAlert({ type: 'info', message: 'Test info alert' }))
    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    )

    const alertElement = screen.getByText(/Test info alert/)
    expect(alertElement).toBeInTheDocument()
  })

  it('does not render the alert when the visible state is false', () => {
    store.dispatch(hideAlert())
    render(
      <Provider store={store}>
        <Alert />
      </Provider>,
    )

    const alertElement = screen.queryByText('Test info alert')
    expect(alertElement).not.toBeInTheDocument()
  })
})
