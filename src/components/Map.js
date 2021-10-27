import { useEffect, useState } from 'react'

export default function Map({Data}) {

    const [mapValues, setMapValues] = useState([])


    useEffect(() => {
        let toSet = []

        // Since we don't know which floors have rooms in each building, we have to iterate through the array.
        Data.forEach(entry => {

            // If the floor isn't in the array yet, add it.
            if (!toSet.some(o => o.floor === entry.floor)) { toSet.push({floor: entry.floor, freeRooms: 0}) }

            // If the room is available, add it to the count.
            if (entry.status === true) {
                toSet[entry.floor - 1].freeRooms++
            }

        })

        setMapValues(toSet)
        
    }, [Data])


    const changeColor = (amount) => {
        if (amount === 0) {
           return <p id="availableRoomsRed">{amount} available rooms</p>
        } else {
            return <p id="availableRoomsGreen">{amount} available rooms</p>
        }
    }

    const mapBuilder = () => {
        let boxes = []

        for (let i = mapValues.length; i > 0; i--) {
            boxes.push(<div><p className="floorLabel" key={i}><span id="floorNumber">{i}. </span><span id="mapFloor">floor</span></p>{changeColor(mapValues[i-1].freeRooms)}</div>)
        }

        return boxes
    }

    return (
        <div id="map">
            {mapBuilder()}
        </div>
    )

}
