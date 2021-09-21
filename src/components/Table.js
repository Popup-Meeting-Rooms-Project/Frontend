import { useTable, useSortBy } from 'react-table'

import MaterialTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

// This is a simple table component


// Creating a default prop getter
const defaultPropGetter = () => ({});

// We pass columns and data to build the table with as props
// getCellProps will be used for styling
const Table = ({columns, data, getCellProps = defaultPropGetter}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)

    return (
        <div>
            <MaterialTable stickyHeader {...getTableProps()} >
            
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} >
                                    {column.render('Header')}
                                    {column.id !== 'selected' ? (
                                        <TableSortLabel
                                            active={column.isSorted}
                                            direction={column.isSortedDesc ? 'desc' : 'asc'} />
                                    ) : null }
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