import { useState, useMemo, useEffect } from 'react'

import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'

import Table from './Table'
import sampleData from './placeholderdata.json'


function RoomList() {

  // This is an implementation of the table from Table.js with our data.
  // Data logic can be moved later on to own component (for use with the map).
  
  // Rooms data will be stored in a state
  const [rooms, setRooms] = useState([])

  // useEffect hook for populating data at first render. Later on can be used with the Axios call.
  useEffect(() => setRooms(sampleData), [])


  // Setting table data
  const data = useMemo(() => rooms, [rooms]);

  // Setting status icons (uses Material icons, can be changed to another icon library!)
  const setStatus = (row) => {
    if (row.value === false) {
      return <EventBusyIcon color='error' />
    } else {
      return <EventAvailableIcon style={{color: '#03D610'}} />
    }
  }

  // Setting table columns
  const columns = useMemo(() => [
    {
      Header: 'Floor',
      accessor: 'floor',
    },{
      Header: 'Room No',
      accessor: 'room', 
    },{
      Header: 'Status',
      accessor: 'status',
      Cell: row => setStatus(row),
      sortType: 'basic'             // Boolean needs basic sorting. Doesn't work with default (which is alphanum).
    },{
      Header: 'Temperature',
      accessor: 'temperature',
      Cell: row => <p>{row.value + ' C'}</p>,
    },{
      Header: 'CO2',
      accessor: 'co2',
      Cell: row => <p>{row.value + ' %'}</p>,
    },
  ], [])


  // Using react-table v7 (component Table.js)
  return (
    <div>
        <Table 
          columns={columns}
          data={data}
        />
    </div>
  )
}

export default RoomList