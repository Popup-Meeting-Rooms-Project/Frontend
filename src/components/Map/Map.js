import { useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'

export default function Map({ Data, selected, setSelected }) {
  const [mapValues, setMapValues] = useState([])

  useEffect(() => {
    let toSet = []

    // Since we don't know which floors have rooms in each building, we have to iterate through the array.
    Data.forEach(entry => {
      let floor = entry.building_floor

      // If the floor isn't in the array yet, add it.
      if (!toSet[floor]) {
        toSet[floor] = {building_floor: floor, freeRooms: 0}
      }

      // If the room is available, add it to the count.
      if (entry.detected === false) {
        toSet[floor].freeRooms++
      }
    })
    setMapValues(toSet)
  }, [Data])

  const filterInputHandler = i => selected.includes(i)
    ? setSelected(selected.filter(floor => floor !== i))
    : setSelected([...selected, i])

  const mapBuilder = () => {
    let boxes = []

    for (let i = (mapValues.length - 1); i >= 0; i--) {
      if (mapValues[i]) {
        boxes.push(
          <div key={i}>
            <p className='floor-label' key={i} data-testid={'floor-label-' + i}>
              <span className='floor-number'>{i}. </span>
              <span className='map-floor'>floor</span>
              <Checkbox
                checked={selected.includes(i)}
                onChange={_ => filterInputHandler(i)}
                inputProps={{ 'aria-label': 'Add this floor to filter' }}
                color='default'
                data-testid={'checkbox ' + i}
              />
            </p>
            {changeColor(mapValues[i].freeRooms)}
          </div>)
      }
    }
    return boxes
  }

  const changeColor = amount => {
    switch (amount) {
      case 0:
        return <p className='available-rooms-red' data-testid={'empty-room'}>{amount} available rooms</p>
      case 1:
        return <p className='available-rooms-green' data-testid={'busy-room'}>{amount} available room</p>
      default:
        return <p className='available-rooms-green'>{amount} available rooms</p>
    }
  }

  return (
    <div className='map'>
      {mapBuilder()}
    </div>
  )
}
