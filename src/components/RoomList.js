import { useMemo, useState, useEffect } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Tooltip, FormControlLabel, Checkbox } from '@mui/material'

import Table from './Table'

// This is an implementation of the table from Table.js with our data.
function RoomList ({ rooms, selected }) {
  // We create a state to store the checkbox condition and status filtering.
  // This is also stored in localStorage for persistence.
  const [checked, setChecked] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('checked'))
      // Default to false, if stored item isn't boolean.
      return (typeof saved === 'boolean') ? saved : false
    } catch (e) {
      // Default to false if any errors arise.
      return false
    }
  })

  // useEffect hook for saving selected status to localStorage.
  useEffect(() => window.localStorage.setItem('checked', checked), [checked])

  // We filter and memoize the data to be passed
  const data = useMemo(() => {
    if (checked) {
      return selected.length === 0
        ? rooms.filter(room => room.detected !== checked)
        : rooms.filter(room => selected.includes(room.building_floor) && room.detected !== checked)
    } else if (selected && selected.length !== 0) {
      return rooms.filter(room => (selected.includes(room.building_floor)))
    } else {
      return rooms
    }
  }, [rooms, selected, checked])

  // Setting status icons (uses Material icons, can be changed to another icon library!)
  const setStatus = (row) => {
    if (row.value === true) {
      return (
        <Tooltip title='Occupied'>
          <CancelIcon style={{ color: '#EF6E52' }} />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title='Available'>
          <CheckCircleIcon style={{ color: '#19D492' }} />
        </Tooltip>
      )
    }
  }

  // Setting table columns
  const columns = useMemo(() => [
    {
      Header: 'Floor',
      accessor: 'building_floor',
    }, {
      Header: 'Room Name',
      accessor: 'room_name',
    }, {
      Header: 'Status',
      accessor: 'detected',
      Cell: row => setStatus(row),
    }/*, {
      Header: 'Temperature',
      accessor: 'temperature',
      Cell: row => <p>{row.value + ' C'}</p>,
      disableFilters: true,
    }, {
      Header: 'CO2',
      accessor: 'co2',
      Cell: row => <p>{row.value + ' %'}</p>,
      disableFilters: true,
    },  */
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
