// Tests of App.js (base was created automatically with create-react-app)

import { render } from '@testing-library/react'
//import { generateImage } from 'jsdom-screenshot'
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

test('dark mode works', () => {
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

  render(<App />)
/*
  const defaultScreen = await generateImage()
  expect(defaultScreen).toMatchImageSnapshot()
  $('#mode').click()
  const darkModeScreen = await generateImage()
  !expect(darkModeScreen).toMatchImageSnapshot()
  $('#mode').click()
  const lightModeScreen = await generateImage()
  expect(lightModeScreen).toMatchImageSnapshot()

  expect(defaultScreen).toMatchImageSnapshot()*/
})
