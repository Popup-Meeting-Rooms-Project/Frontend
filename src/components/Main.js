import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'

import sampleData from './placeholderdata.json'

export default function Main() {
    // Data handling (to be moved into own component?)

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        setRooms(sampleData)
    }, [])

    return (
        <div id="main">
            <RoomList rooms={rooms} />
            <Map Data={rooms} />
        </div>
    )
}