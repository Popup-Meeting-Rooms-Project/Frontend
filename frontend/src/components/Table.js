import { useTable } from "react-table"

/* import MaterialTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow' */

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
    } = useTable({ columns, data })

    return (
        <div>
            <table {...getTableProps()} >

                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()} >
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} >
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps([
                                            getCellProps(cell)
                                          ])} >
                                            {cell.render('Cell')}
                                        </td>
                                    )}
                                )}
                            </tr>
                        )}
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default Table