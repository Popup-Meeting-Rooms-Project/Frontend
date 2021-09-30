import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'

import sampleData from './placeholderdata.json'

export default function Main() {
    // Data handling (to be moved into own component?)

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        // Sort rooms by number on first run.
        setRooms(sampleData.sort((a, b) => a.room - b.room))
    }, [])

    return (
        <div id="main">
            <RoomList rooms={rooms} />
            <Map Data={rooms} />
        </div>
    )
}