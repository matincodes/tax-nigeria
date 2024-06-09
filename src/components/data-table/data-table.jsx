import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cardPeopleData } from '../../data/taxCardData';


const columns = [
  {
    accessorKey: 'taxPayer',
    header: 'Tax Payer',
    cell: ({ row }) => (
      <div className='font-medium text-nowrap text-black'>
        {row.getValue('taxPayer')}
      </div>
    ),
  },
  {
    accessorKey: 'businessType',
    header: 'Business Type',
  },
  {
    accessorKey: 'taxID',
    header: 'Tax ID',
  },
  {
    accessorKey: 'cardType',
    header: 'Card Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      let statusClass = ''
      let dotClass = ''

      switch (status) {
        case 'Collected':
          statusClass = 'bg-emerald-50 text-emerald-700'
          dotClass = 'bg-emerald-500'
          break
        case 'Eligible':
          statusClass = 'bg-yellow-300 bg-opacity-50 text-lime-600'
          dotClass = 'bg-lime-500'
          break
        case 'Not Eligible':
          statusClass = 'bg-red-600 bg-opacity-75 text-white'
          dotClass = 'bg-white'
          break
        default:
          statusClass = 'bg-gray-100 text-gray-800'
          break
      }

      return (
        <div
          className={`pl-1.5 pr-2 py-0.5 ${statusClass} rounded-2xl justify-center items-center gap-1.5 inline-flex`}
        >
          <div className='w-2 h-2 relative'>
            <div
              className={`w-1.5 h-1.5 left-[1px] top-[1px] absolute rounded-full ${dotClass}`}
            />
          </div>
          <div className='text-center text-xs font-semibold leading-[18px]'>
            {status}
          </div>
        </div>
      )
    },
  },
]

const DataTable = () => {
  const table = useReactTable({
    cardPeopleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='mt-5'>
      <div className='mt-5 rounded-xl border'>
        <Table className='min-w-full divide-y divide-gray-200'>
          <TableHeader className='h-11 bg-gray-50'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='bg-white divide-y divide-gray-200'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='mt-4 flex justify-between items-center w-full'>
        <Select
          onValueChange={value => table.setPageSize(Number(value))}
          value={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Select page size' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Pagination className=''>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {table.getPageOptions().map((page, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => table.setPageIndex(page)}
                  isActive={table.getState().pagination.pageIndex === page}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default DataTable
