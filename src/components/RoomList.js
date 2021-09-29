import { useMemo } from 'react'

import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import Tooltip from '@mui/material/Tooltip'

import Table from './Table'


// This is an implementation of the table from Table.js with our data.
function RoomList({rooms}) {
  
  // Memoizing data to be passed
  const data = useMemo(() => rooms, [rooms])

  // Setting status icons (uses Material icons, can be changed to another icon library!)
  const setStatus = (row) => {
    if (row.value === false) {
      return ( 
              <Tooltip title="Occupied">
                 <EventBusyIcon color='error' />
              </Tooltip>
      )} else {
      return ( 
              <Tooltip title="Available">
                <EventAvailableIcon style={{color: '#03D610'}} />
              </Tooltip>
      )}
  }

  // Setting table columns
  const columns = useMemo(() => [
    {
      Header: 'Floor',
      accessor: 'floor',
    },{
      Header: 'Room No',
      accessor: 'room',
      disableFilters: true,
    },{
      Header: 'Status',
      accessor: 'status',
      Cell: row => setStatus(row),
      sortType: 'basic',             // Boolean needs basic sorting. Doesn't work with default (which is alphanum).
      disableFilters: true,
    },{
      Header: 'Temperature',
      accessor: 'temperature',
      Cell: row => <p>{row.value + ' C'}</p>,
      disableFilters: true,
    },{
      Header: 'CO2',
      accessor: 'co2',
      Cell: row => <p>{row.value + ' %'}</p>,
      disableFilters: true,
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