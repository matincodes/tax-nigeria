import Cloud from '../../assets/img/download-cloud-02.svg'
import Button from '../button/button'
import DataTable from '../data-table/data-table'
import { taxStationsData } from '../../data/taxStationsData'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const columns = [
  {
    accessorKey: 'lga',
    header: () => (
      <div className='flex items-center'>
        <span>Local Government</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
        >
          <path
            d='M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992'
            stroke='#667085'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    ),
    cell: ({ row }) => (
      <div className='font-medium text-nowrap text-black'>
        {row.getValue('lga')}
      </div>
    ),
  },
  {
    accessorKey: 'station',
    header: () => (
      <div className='flex items-center'>
        <span>Station Name</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
        >
          <path
            d='M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992'
            stroke='#667085'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: 'consultant',
    header: () => (
      <div className='flex items-center'>
        <span>Consultant (In Charge)</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
        >
          <path
            d='M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992'
            stroke='#667085'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: 'consultantId',
    header: () => (
      <div className='flex items-center'>
        <span>Consultant ID</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
        >
          <path
            d='M6.00065 1.33325V10.6666M6.00065 10.6666L10.6673 5.99992M6.00065 10.6666L1.33398 5.99992'
            stroke='#667085'
            strokeWidth='1.33333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      let statusClass = ''
      let dotClass = ''

      switch (status) {
        case 'Active':
          statusClass = 'bg-emerald-50 text-emerald-700'
          dotClass = 'bg-emerald-500'
          break
        case 'Inactive':
          statusClass = 'bg-gray-100 text-gray-800'
          dotClass = 'bg-gray-800'
          break
        default:
          statusClass = 'bg-gray-100 text-gray-800'
          dotClass = 'bg-gray-800'
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
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className='w-full outline-none flex justify-center'>
          <img src={ThreeDotIcon} alt='' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => alert(`Viewing ${row.original.lga}`)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert(`Editing ${row.original.taxPayer}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert(`Deleting ${row.original.taxPayer}`)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const StationManagement = () => {
  const [loading, setLoading] = useState(true)
  const [taxStaions, setTaxStaions] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTaxStaions() {
      try {
        setLoading(true)
        // fetch tax stations
        const res = await axios.get('https://assettrack.com.ng/api/TaxStation')
        setTaxStaions(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTaxStaions()
  }, [])

  return (
    <div className='mt-10 p-4'>
      <div className='flex gap-2 justify-end pr-5'>
        <button className='h-10 px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-center items-center gap-2 inline-flex'>
          <img src={Cloud} alt='export' className='w-5 h-5 relative' />
          <span className='text-slate-700 text-sm font-medium'>Export</span>
        </button>
        <Button
          text='Add New Station'
          iconposition='left'
          icon='+'
          handleButton={() => navigate('/dashboard/taxstation-registration')}
        />
      </div>
      <div className='pl-3'>
        <DataTable data={taxStationsData} columns={columns} loading={loading} />
      </div>
    </div>
  )
}

export default StationManagement
