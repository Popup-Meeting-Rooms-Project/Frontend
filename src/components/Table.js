import { useMemo } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'

import { Table as MaterialTable, TextField, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

//import css from '../css/App.css'

// This is a simple table component


// Creating a default prop getter
const defaultPropGetter = () => ({});

// This is used (at the moment!) by the filter/search functionality of the table
const columnFilter = ({ column: { filterValue, setFilter }, }) => (
    <TextField
        placeholder='all'
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        InputProps={{
            startAdornment: <SearchIcon fontSize='small' color='disabled' />,
            style: {height: '1.75em', width: '80%', margin: '0 0.6rem 0.3rem', fontSize: '0.875rem', padding: '0.8rem'} }} />)


// We pass columns and data to build the table with as props
// getCellProps will be used for styling
const Table = ({columns, data, getCellProps = defaultPropGetter}) => {

    const defaultColumn = useMemo(() => ({ Filter: columnFilter }), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data, defaultColumn }, useFilters, useSortBy)

    return (
        <div>
            <MaterialTable stickyHeader {...getTableProps()} >
            
                <TableHead>

                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} >
                                {/* Used for manual filtering. */}
                                {column.canFilter ? column.render('Filter') : null}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}

                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} >
                                {/* Used for sorting. */}
                                {column.id !== 'selected' ? (
                                    <TableSortLabel
                                        active={column.isSorted}
                                        direction={column.isSortedDesc ? 'desc' : 'asc'} />
                                ) : null }
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}

                </TableHead>

                <TableBody {...getTableBodyProps()} >

                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()} >
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps([
                                            getCellProps(cell)
                                          ])} >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )}
                                )}
                            </TableRow>
                        )}
                    )}

                </TableBody>
            
            </MaterialTable>
        </div>
    )
}

export default Table