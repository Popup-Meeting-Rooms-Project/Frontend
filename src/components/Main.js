import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'

import sampleData from './placeholderdata.json'

export default function Main() {
    // Data handling (to be moved into own component?)

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])

    /*// Updating rooms data
    const updateData = (data) => {
        const dataParsed = JSON.parse(data)
        setRooms(rooms => rooms.map(room => (room.roomNo === dataParsed.roomNo) ? dataParsed : room))
    } */

    // Creating an instance of our event source.
    // const eventSource = new EventSource(process.env.REACT_APP_API_URL + '/updates')

    // useEffect hook for populating data at first render. Using hard-coded data atm.
    useEffect(() => {

        /* Fetching Data from the Back End.
        fetch(`process.env.REACT_APP_API_URL + '/all'`)
            .then(res => res.status === 200 ? res.json() : console.log(res))
            .then(resJSON => setRooms(resJSON.data))
            .catch(err => console.log(err))
        */
        
        // Listening for messages from the Back-End using Server-Sent Events.
        /*eventSource.onmessage = function(event) {
            console.log(event)
            // setRooms(event.data)
            // updateData(event.data)
        }*/

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