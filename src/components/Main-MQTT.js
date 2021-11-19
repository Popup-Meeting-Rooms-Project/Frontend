import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'

import { connect } from 'mqtt'
import { Breakpoint } from 'react-socks'

// This Main component implements MQTT for fetching data updates
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

  // Updating rooms status
  const updateStatus = (data) => {
    setRooms(rooms =>
      rooms.map(room =>
        (room.id === data.id) ? { ...room, detected: data.detected } : room))
  }

  // Fetching initial data and updates are handled with useEffect hook.
  useEffect(() => {

    // Back-End URLs are stored in env variables.
    // Creating MQTT client.
    const client  = connect(process.env.REACT_APP_MQTT_URL)

    // fetching the full list using the REST API first.
    fetch(process.env.REACT_APP_API_URL)
      .then(res => res.status === 200 ? res.json() : console.log(res))
      .then(resJSON => setRooms(resJSON))
      // Updates are done via MQTT.
      .then(() => {
        if (client) {
          client.on('connect', () => {        
            client.subscribe(process.env.REACT_APP_MQTT_TOPIC)
          })
          client.on('error', (err) => {
            console.log('ERROR: ' + err)
            client.end()
          })
          // Message needs to be stringified! Should then be a JSON object (formatted according to docs).
          client.on('message', (_topic, message, _packet) => updateStatus(JSON.parse(message.toString())))
        }
      })
      .catch(err => console.log(err))
  }, [])

  // Data passed as props to both list and floor map
  return (
    <div className='main'>
      <RoomList rooms={rooms} selected={selected} />
      <Breakpoint medium up>
        <Map Data={rooms} selected={selected} setSelected={setSelected} />
      </Breakpoint>
    </div>
  )
}