// Test correct rendering of the header

import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { formatDate, formatTime } from './dateUtils'
import Header from './Header'

let container = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

const date = formatDate(new Date())
const time = formatTime(new Date())

jest.useFakeTimers()

it("renders header text properly", () => {
  act(() => {
    render(<Header />, container)
    jest.runAllTimers()
  })

  let expected = 'Helsinki Office' + time + 'Popup meeting rooms' + date
  expect(container.textContent).toBe(expected)
})
