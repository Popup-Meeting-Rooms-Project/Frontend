import { useState, useMemo, useEffect } from 'react'

/* import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import EventBusyIcon from '@material-ui/icons/EventBusy' */

import Table from './Table'


function RoomList() {

  // Data logic can be moved later on to own component.
  
  // Rooms data will be stored in a state
  const [rooms, setRooms] = useState([])

  // useEffect hook for populating data at first render. Later on can be used with the Axios call.
  useEffect(() => setRooms([
    {roomNo: 101, status: 0, temp: 22, co2: 2},
    {roomNo: 102, status: 1, temp: 25, co2: 9},
    {roomNo: 103, status: 0, temp: 22, co2: 0},
    {roomNo: 104, status: 0, temp: 21, co2: 0},
  ]), [])


  // Setting table data
  const data = useMemo(() => rooms, [rooms]);

  // Setting status icons (needs Icons! Previously w/ MaterialUI)
  /* const setStatus = (row) => {
    if (row.value === 1) {
      return <EventBusyIcon color='error' />
    } else {
      return <EventAvailableIcon style={{color: '#03D610'}} />
    }
  } */

  // Setting table columns
  const columns = useMemo(() => [
    {
      Header: 'Room No',
      accessor: 'roomNo', 
    },{
      Header: 'Status',
      accessor: 'status',
      //Cell: row => setStatus(row),    (!) no icons displayed atm.
    },{
      Header: 'Temperature',
      accessor: 'temp',
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