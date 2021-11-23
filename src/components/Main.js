import { useState, useEffect } from 'react'
import { Breakpoint } from 'react-socks'

import RoomList from './RoomList'
import Map from './Map'

// We can verify the data is in the correct format before populating, so the app doesn't crash when rendering the components.
const verifyData = data => {
  let isValid = true
  data.forEach(room => {
    if (!room.id || typeof(room.id) !== 'number') { isValid = false }
    if (!room.room_name || typeof(room.room_name) !== 'string') { isValid = false }
    if (!room.building_floor || typeof(room.building_floor) !== 'number') { isValid = false }
    if (typeof(room.detected) === 'undefined' || typeof(room.detected) !== 'boolean') { isValid = false }
  })
  if (!isValid) {
    console.log('Something is wrong with the source data.')
  }
  return isValid
}

export default function Main() {
  // Rooms data will be stored in a state
  const [rooms, setRooms] = useState([])

  // Selected floors used for filtering
  // We save and load the state with localStorage so it persists between sessions.
  const [selected, setSelected] = useState(() => {
    try {
      // String stored in localStorage needs to be parsed first.
      const saved = JSON.parse(window.localStorage.getItem('selected'))
      // If there was an array saved, set that as selected, otherwise set an empty array.
      return (Object.prototype.toString.call(saved) === '[object Array]') ? saved : []
    } catch (e) {
      console.log('Error!') // USED DURING DEVELOPMENT ONLY!
      return []
    }
  })

  // useEffect hook for saving selected status to localStorage. Objects must be -JSON- stringified!
  useEffect(() => window.localStorage.setItem('selected', JSON.stringify(selected)), [selected])

  // window.localStorage.clear() // USEFUL FOR DEBUGGING, TO BE REMOVED LATER

  // Function for updating rooms data
  const updateStatus = (data) => {
      setRooms(rooms =>
          rooms.map(room =>
              (room.id === data.id) ? { ...room, detected: data.detected } : room))
  }

  // useEffect hook for data handling, runs only at first. Back-End URLs are stored in env variables.
  useEffect(() => {
    // Creating an instance of our event source.
    const eventSource = new EventSource(process.env.REACT_APP_SSE_URL)

    fetch(process.env.REACT_APP_API_URL)
      .then(res => res.status === 200 ? res.json() : console.log(res))
      .then(resJSON => {
        if (resJSON && verifyData(resJSON)) {
          setRooms(resJSON)
        }
      })
      .catch(err => console.log(err))

    // Listening for messages from the Back-End using Server-Sent Events.
    eventSource.onmessage = event => updateStatus(JSON.parse(event.data))
  }, [])

  return (
    <div className='main'>
      <RoomList rooms={rooms} selected={selected} />
      <Breakpoint medium up>
        <Map Data={rooms} selected={selected} setSelected={setSelected} />
      </Breakpoint>
    </div>
  )
}
