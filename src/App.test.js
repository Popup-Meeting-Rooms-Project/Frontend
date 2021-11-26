// Basic tests of App.js (this was created with create-react-app)

import { render, screen } from '@testing-library/react'
import App from './App'

// Mocking EventSource
beforeAll(() => {
  global.EventSource = jest.fn(() => ({
    readyState: 0,
    close: jest.fn()
  }))

  global.EventSource.CONNECTING = 0
  global.EventSource.OPEN = 1
  global.EventSource.CLOSED = 2
})

test('renders learn react link', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  // DO WE NEED TO MOCK FETCH TOO?

  render(<App />)

  const header = screen.getByText(/Helsinki Office/i)
  expect(header).toBeInTheDocument()

  const tableHeader = screen.getByText(/Floor/i)
  expect(tableHeader).toBeInTheDocument()
})
