import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import store from '../app/store'
import Location from '../features/location/Location'
import { updateCity } from '../features/location/locationSlice'

describe('Location', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Location />
      </Provider>,
    )
  })

  it('renders the PlacesSearch component', () => {
    const searchInput = screen.getByPlaceholderText('City')
    expect(searchInput).toBeInTheDocument()
  })

  it('updates the city when a place is selected', async () => {
    const { rerender } = render(
      <Provider store={store}>
        <Location />
      </Provider>,
    )

    act(() => {
      store.dispatch(updateCity('Amsterdam'))

      rerender(
        <Provider store={store}>
          <Location />
        </Provider>,
      )
    })

    const searchInput = screen.getAllByDisplayValue('Amsterdam')
    expect(searchInput).toBeTruthy()
  })
})
