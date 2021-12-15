import React from 'react'
import { render, screen } from '@testing-library/react'

import Map from './Map'
import placeholderData from '../../assets/placeholderdata.json'

describe('Map component', () => {
  it("renders text properly", () => { // trickier not being one single element.
    render(<Map Data={placeholderData} selected={[]} />)

    for (var i = 1; i < 5; i++) {
      expect(screen.getByTestId('floor-label-' + i)).toBeInTheDocument()
      const childNodes = screen.getByTestId('floor-label-' + i).childNodes
      expect(childNodes[0].textContent).toBe(i + '. ')
      expect(childNodes[1].textContent).toBe('floor')
    }
  })

  it("handles available rooms properly", () => {
    render(<Map Data={placeholderData} selected={[]} />)

    expect(screen.getByTestId('empty-room').firstChild.textContent).toBe('0')
    expect(screen.getByTestId('empty-room').lastChild.textContent).toBe(' available rooms')
  })

  it("displays text in the right colors", () => {
    render(<Map Data={placeholderData} selected={[]} />)
    
    expect(screen.getByTestId('empty-room')).toHaveStyle({color: 'rgb(210 99 96)'})
    expect(screen.getByTestId('busy-room')).toHaveStyle({color: 'rgb(34 192 152)'})
  })

  it("handles passed filters properly", () => {
    const {rerender} = render(<Map Data={placeholderData} selected={[]} />) // Disabled first.

    for (var i = 1; i < 5; i++) {  
      expect(screen.getByTestId('checkbox ' + i).firstChild).toHaveProperty('checked', false)
    }

    rerender(<Map Data={placeholderData} selected={[2,3]} />)

    expect(screen.getByTestId('checkbox 1').firstChild).toHaveProperty('checked', false)
    expect(screen.getByTestId('checkbox 2').firstChild).toHaveProperty('checked', true)
    expect(screen.getByTestId('checkbox 3').firstChild).toHaveProperty('checked', true)
    expect(screen.getByTestId('checkbox 4').firstChild).toHaveProperty('checked', false)

    rerender(<Map Data={placeholderData} selected={[1]} />)

    expect(screen.getByTestId('checkbox 1').firstChild).toHaveProperty('checked', true)
    for (var i = 2; i < 5; i++) {  
      expect(screen.getByTestId('checkbox ' + i).firstChild).toHaveProperty('checked', false)
    }
  })
})
