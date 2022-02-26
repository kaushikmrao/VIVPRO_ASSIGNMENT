import { useTable, useSortBy, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { columns } from './columns'
import './Table.css'

function Table({ data }) {
    const tableInstance = useTable({
      columns,
      data      
    }, 
    useSortBy,
    usePagination
    )
  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
    } = tableInstance
  
    return (
      <>
        <BTable striped bordered size="sm" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : '▲▼'}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </BTable>
        <div className="page-btns">
          <Button 
            variant="secondary" 
            size="sm" 
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            Previous
          </Button> 
          <Button 
            variant="secondary" 
            size="sm" 
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            Next
          </Button> 
        </div>
      </>
    )
}

export default Table;
