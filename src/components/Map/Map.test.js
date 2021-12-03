import { render, screen } from '@testing-library/react'

import Map from './Map'
import placeholderData from '../../assets/placeholderdata.json'

let container = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  container.remove()
  container = null
})

it("renders Map properly", () => {
  render(<Map Data={placeholderData} selected={[]} />, container)

  // Checking text components (trickier not being one single element).

  // First with floor list.
  for (var i = 1; i < 5; i++) {
    expect(screen.getByTestId('floor-label-' + i)).toBeInTheDocument()
    const childNodes = screen.getByTestId('floor-label-' + i).childNodes
    expect(childNodes[0].textContent).toBe(i + '. ')
    expect(childNodes[1].textContent).toBe('floor')
  }
  //expect(screen.getByTestId('floor-label-4').firstChild.textContent).toBe('4. ')

  // Checking available rooms text.
  expect(screen.getByTestId('empty-room').firstChild.textContent).toBe('0')
  expect(screen.getByTestId('empty-room').lastChild.textContent).toBe(' available rooms')
  
  // Check text color.
  expect(screen.getByTestId('empty-room')).toHaveStyle({color: 'rgb(210 99 96)'})
  expect(screen.getByTestId('busy-room')).toHaveStyle({color: 'rgb(34 192 152)'})

  // Check filters are disabled.
  for (var i = 1; i < 5; i++) {  
    expect(screen.getByTestId('checkbox ' + i).firstChild).toHaveProperty('checked', false)
  }

  // Click and have it enabled?
})


it("handles passed filters properly", () => {
  render(<Map Data={placeholderData} selected={[1]} />, container)

  expect(screen.getByTestId('checkbox 1').firstChild).toHaveProperty('checked', true)
})
