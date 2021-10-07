import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'


export default function Main() {

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])
    

    // Updating rooms data
    /*const updateStatus = (data) => {
        setRooms(rooms =>
            rooms.map(room =>
                (room.roomNo === data.roomNo) ? { ...room, status: data.status } : room))
    }*/

    // useEffect hook for data handling. Back-End URLs are stored in env variables.
    useEffect(() => {

        // Creating an instance of our event source.
        //const eventSource = new EventSource(process.env.REACT_APP_SSE_URL)
        
        fetch(process.env.REACT_APP_API_URL)
            .then(res => res.status === 200 ? res.json() : console.log(res))
            // Data from the BackEnd is sorted, then stored in the state.
            .then(resJSON => setRooms(resJSON.sort((a, b) => a.room - b.room)))
            .catch(err => console.log(err))
        
        // Listening for messages from the Back-End using Server-Sent Events.
        /*eventSource.onmessage = function(event) {
            console.log(event)
            //const dataParsed = JSON.parse(event.data)
            //updateData(dataParsed)
            // updateStatus(JSON.parse(event.data)) THIS COULD BE ONE LINE ONLY
        }*/
    }, [])

    return (
        <div id="main">
            <RoomList rooms={rooms} />
            <Map Data={rooms} />
        </div>
    )
}