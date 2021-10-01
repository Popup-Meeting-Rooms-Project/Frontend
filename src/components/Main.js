import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'


export default function Main() {
    // Data handling (to be moved into own component?)

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])

    /*// Updating rooms data
    const updateData = (data) => {
        const dataParsed = JSON.parse(data)
        setRooms(rooms => rooms.map(room => (room.roomNo === dataParsed.roomNo) ? dataParsed : room))
    } */

    // Back-End URL is stored in an env variable.
    const url = process.env.REACT_APP_API_URL

    // Creating an instance of our event source.
    // const eventSource = new EventSource(url + '/updates')

    // useEffect hook for populating data at first render. Using hard-coded data atm.
    useEffect(() => {
        
        fetch(url + '/json')
            .then(res => res.status === 200 ? res.json() : console.log(res))
            // Data from the BackEnd is sorted, then stored in the state.
            .then(resJSON => setRooms(resJSON.sort((a, b) => a.room - b.room)))
            .catch(err => console.log(err))
        
        // Listening for messages from the Back-End using Server-Sent Events.
        /*eventSource.onmessage = function(event) {
            console.log(event)
            // setRooms(event.data)
            // updateData(event.data)
        }*/
    }, [url])

    return (
        <div id="main">
            <RoomList rooms={rooms} />
            <Map Data={rooms} />
        </div>
    )
}