import { useMemo, useState, useEffect } from 'react'

import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { Tooltip, FormControlLabel, Checkbox } from '@mui/material'

import Table from './Table'

// This is an implementation of the table from Table.js with our data.
function RoomList({rooms, selected}) {

  // We create a state to store the checkbox condition and status filtering.
  // We save and load the state with localStorage so it persists between sessions.
  const [checked, setChecked] = useState(() => {
    try {
      let saved = JSON.parse(window.localStorage.getItem('checked'))
      return (typeof saved === 'boolean') ? saved : false
    } catch (e) {
        return false
    }
  })


  // useEffect hook for saving selected status to localStorage.
  useEffect(() => window.localStorage.setItem('checked', checked), [checked])


  // We filter and memoize the data to be passed
  const data = useMemo(() => {
    if (checked) {
      return selected.length === 0
        ? rooms.filter(room => room.status === checked)
        : rooms.filter(room => selected.includes(room.floor) && room.status === checked)
    } else if (selected && selected.length !== 0) {
      return rooms.filter(room => (selected.includes(room.floor)))
    } else {
      return rooms
    }
  }, [rooms, selected, checked])


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
    },{
      Header: 'Status',
      accessor: 'status',
      Cell: row => setStatus(row),
    },/*{
      Header: 'Temperature',
      accessor: 'temperature',
      Cell: row => <p>{row.value + ' C'}</p>,
      disableFilters: true,
    },{
      Header: 'CO2',
      accessor: 'co2',
      Cell: row => <p>{row.value + ' %'}</p>,
      disableFilters: true,
    },*/
  ], [])


  // Using react-table v7 (component Table.js)
  return (
    <div>

      <FormControlLabel
        label='Available only'
        style={{display: 'flex', padding: '0.5em 0.5em 0 0', marginBottom: '-0.4em', justifyContent: 'flex-end'}}
        control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} color='default' />}
      />

      <Table 
        columns={columns}
        data={data}
      />

    </div>
  )
}

export default RoomList