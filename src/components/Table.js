import { useTable } from 'react-table'

import { Table as MaterialTable, TableBody, TableHead, TableRow, TableCell, tableCellClasses } from '@mui/material'
import { styled } from '@mui/system'

// This is a simple table component

// Style for table cells
const StyledTableCell = styled(TableCell)( {
    [`&.${tableCellClasses.root}`]: {
        width: '20%',
    },
    [`&.${tableCellClasses.sizeMedium}`]: {
        padding: '0.4em 0 0.1em 0',
        minWidth: '34%',
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FFD700',
      color: '#0B0500',
      fontSize: 16,
      padding: '0.5rem 1.9rem  0.25rem 0',
      textAlign: 'center',
    },
    [`&.${tableCellClasses.body}`]: {
        textAlign: 'center',
    },
})

// Style for tablerows
const StyledTableRow = styled(TableRow)( {
      backgroundColor: '#F9FCFD',
      borderColor:'#003E51',
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
})

// Creating a default prop getter
const defaultPropGetter = () => ({})


// We pass columns and data to build the table with as props
// getCellProps will be used for styling
const Table = ({columns, data, getCellProps = defaultPropGetter}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <div>

            {/* Row used for filtering. */}
            <MaterialTable {...getTableProps()} >
                <TableBody>
                {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <StyledTableCell {...column.getHeaderProps()} >
                                    {column.canFilter ? column.render('Filter') : null}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MaterialTable>

            {/* Our "rooms" table. */}
            <MaterialTable stickyHeader {...getTableProps()} >
            
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <StyledTableCell {...column.getHeaderProps()} >
                                    {column.render('Header')}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody {...getTableBodyProps()} >
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <StyledTableRow {...row.getRowProps()} >
                                {row.cells.map(cell => {
                                    return (
                                        <StyledTableCell {...cell.getCellProps([
                                            getCellProps(cell)
                                          ])} >
                                            {cell.render('Cell')}
                                        </StyledTableCell>
                                    )}
                                )}
                            </StyledTableRow>
                        )}
                    )}
                </TableBody>
            
            </MaterialTable>
        </div>
    )
}

export default Table