// Test correct rendering of the header

import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { formatDate, formatTime } from './dateUtils'
import Header from './Header'

const date = formatDate(new Date())
const time = formatTime(new Date())

it('renders header text properly', () => {
  render(<Header />)

  jest.useFakeTimers()

  act(() => jest.runAllTimers())

  let expected = 'Helsinki Office' + time + 'Popup meeting rooms' + date

  expect(screen.getByTestId('top').textContent).toBe(expected)
})
