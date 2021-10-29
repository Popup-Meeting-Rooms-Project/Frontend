import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'

import { connect } from 'mqtt'

// This Main component implements MQTT for fetching data updates
export default function Main() {

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])


    // Updating rooms status
    const updateStatus = (data) => {
        setRooms(rooms =>
            rooms.map(room =>
                (room.roomId === data.roomId) ? { ...room, status: data.status } : room))
    }


    // Fetching initial data and updates are handled with useEffect hook.
    useEffect(() => {

        // Back-End URLs are stored in env variables.
        // Creating MQTT client.
        const client  = connect(process.env.REACT_APP_MQTT_URL)

        // fetching the full list using the REST API first.
        fetch(process.env.REACT_APP_API_URL)
            .then(res => res.status === 200 ? res.json() : console.log(res))
            // Next, data from the BackEnd is sorted, then stored in the state.
            .then(resJSON => setRooms(resJSON.sort((a, b) => a.room - b.room)))
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
        <div id="main">
            <RoomList rooms={rooms} />
            <Map Data={rooms} />
        </div>
    )
}