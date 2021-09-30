import { useState, useEffect } from 'react'

import RoomList from './RoomList'

import { connect } from 'mqtt'

// This Main component implements MQTT for fetching data
export default function Main() {

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])

    // State used by MQTT client
    //const [connectionStatus, setConnectionStatus] = useState(false);

    const client  = connect(process.env.REACT_APP_MQTT_URL)

    useEffect(() => {
        if (client) {
            client.on('connect', () => {        
                client.subscribe(process.env.REACT_APP_MQTT_TOPIC)
                //setConnectionStatus(true)
            })
            client.on('error', (err) => {
                console.log('ERROR: ' + err)
                client.end()
            })
            // Topic will be room number?
            // Message should be a JSON object (formatted like those used in placeholderdata).
            client.on('message', (_topic, message, _packet) => {
                const room = JSON.parse(message)
                setRooms([...rooms, room])
            })
        }
    }, [client])


    // Data passed as props to both list and floor map
    return (
        <div id="main">
            <RoomList rooms={rooms} />
        </div>
    )
}