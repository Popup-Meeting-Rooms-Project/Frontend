import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

import RoomList from './RoomList'
import placeholderData from '../../assets/placeholderdata.json'

// Let's save the name list of rooms to use in the tests.
const roomNames = placeholderData.map(room => room.room_name)


describe('component', () => {
  it("renders room list properly", () => {
    render(<RoomList rooms={placeholderData} selected={[]} />)

    // Check for basic elements to match.
    expect(screen.getByText('Available only')).toBeInTheDocument()
    expect(screen.getByText('Floor')).toBeInTheDocument()
    expect(screen.getByText('Room Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()

    // Room names passed should appear.
    roomNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })

    // There should be at least one available room.
    expect(screen.getAllByTestId('CheckCircleIcon')).toBeDefined()
  })

  it('handles passed filters properly', () => {
    render(<RoomList rooms={placeholderData} selected={[1]} />)

    // Unselected floors should not appear (we use queryByText when expected can/will be null).
    expect(screen.queryByText('2')).not.toBeInTheDocument()
    expect(screen.queryByText('3')).toBeNull()
    expect(screen.queryByText('4')).not.toBeInTheDocument()
  })
})

describe('Checkbox', () => {
  it('filter works properly', () => {
    render(<RoomList rooms={placeholderData} selected={[]} />)

    const checkbox = screen.getByTestId('checkbox').firstChild

    expect(checkbox).toHaveProperty('checked', false)

    // check for busy icon, click checkbox and check again.
    expect(screen.getAllByTestId('CancelIcon').length).not.toBe(0)

    userEvent.click(checkbox)

    expect(checkbox).toHaveProperty('checked', true)

    expect(screen.queryAllByTestId('CancelIcon').length).toBe(0)
  })
})
