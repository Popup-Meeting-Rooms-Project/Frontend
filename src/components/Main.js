import { useState, useEffect } from 'react'

import RoomList from './RoomList'
import Map from './Map'


export default function Main() {

    // Rooms data will be stored in a state
    const [rooms, setRooms] = useState([])

    // Selected floors used for filtering
    // We save and load the state with localStorage so it persists between sessions.
    const [selected, setSelected] = useState(() => {
        try {
            // String stored in localStorage needs to be parsed first.
            let saved = JSON.parse(window.localStorage.getItem('selected'))
            // If there was an array saved, set that as selected, otherwise set an empty array.
            return (Object.prototype.toString.call(saved) === '[object Array]') ? saved : []
        } catch (e) {
            console.log("Error!")           // USED DURING DEVELOPMENT ONLY!
            return []
        }
    })

    // useEffect hook for saving selected status to localStorage. Objects must be -JSON- stringified!
    useEffect(() => window.localStorage.setItem('selected', JSON.stringify(selected)), [selected])

    //window.localStorage.clear()         // USEFUL FOR DEBUGGING, TO BE REMOVED LATER
    
    // Function for updating rooms data
    /*const updateStatus = (data) => {
        setRooms(rooms =>
            rooms.map(room =>
                (room.roomNo === data.roomNo) ? { ...room, status: data.status } : room))
    }*/


    // useEffect hook for data handling, runs only at first. Back-End URLs are stored in env variables.
    useEffect(() => {

        // Creating an instance of our event source.
        //const eventSource = new EventSource(process.env.REACT_APP_SSE_URL)
        
        fetch(process.env.REACT_APP_API_URL)
            .then(res => res.status === 200 ? res.json() : console.log(res))
            // Data from the BackEnd is sorted, then stored in the state.
            .then(resJSON => setRooms(resJSON.sort((a, b) => a.room_number - b.room_number)))
            .catch(err => console.log(err))

        // Listening for messages from the Back-End using Server-Sent Events.
        //eventSource.onmessage = function(event) {
            //console.log(event)
            //const dataParsed = JSON.parse(event.data)
            //updateData(dataParsed)
            // updateStatus(JSON.parse(event.data)) THIS COULD BE ONE LINE ONLY
        //}
    }, [])


    return (
        <div id="main">
            <RoomList rooms={rooms} selected={selected} />
            <Map Data={rooms} setSelected={setSelected} />
        </div>
    )
}