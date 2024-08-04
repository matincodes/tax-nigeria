import { AiOutlinePlus, AiOutlineCloudDownload } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
import { BsDot } from 'react-icons/bs'
import { useEffect, useMemo, useState } from 'react'
import DataTable from '../data-table/data-table'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const TaxPayerManagement = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [taxpayerdata, setTaxPayerData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([])

  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        accessorKey: 'taxPayer',
        header: 'Tax Payer',
        cell: ({ row }) => {
          return (
            <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>
              {`${row.original.firstName} ${row.original.lastname} ${row.original.othername}`}
            </p>
          )
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
        cell: ({ cell }) => (
          <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>
            {cell.getValue()}
          </p>
        ),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        cell: ({ cell }) => (
          <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>
            {cell.getValue()}
          </p>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ cell }) => (
          <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>
            {cell.getValue()}
          </p>
        ),
      },
      {
        accessorKey: 'identificationNumber',
        header: 'Identification Number',
        cell: ({ cell }) => (
          <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>
            {cell.getValue()}
          </p>
        ),
      },
      {
        accessorKey: 'identityTypeName',
        header: 'Identity Type',
        cell: ({ cell }) => (
          <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>
            {cell.getValue()}
          </p>
        ),
      },
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full outline-none flex justify-center'>
              <img src={ThreeDotIcon} alt='' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/dashboard/taxpayer/${row.original.id}`,
                    {
                      state: { data: row.original },
                    },
                  )
                }
              >
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [navigate],
  )

  useEffect(() => {
    // Simulating API call or data fetch
    const fetchData = async () => {
      try {
        const response = await axios.get(
          user.role === 'admin'
            ? 'https://assettrack.com.ng/api/TaxPayer'
            : `https://assettrack.com.ng/api/TaxPayer/ByPayerAnyCriteria/${user.email}`,
        )
        setTaxPayerData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching taxpayer data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [user.email, user.role])

  useEffect(() => {
    // Filter data based on search query
    const filteredResults = taxpayerdata.filter(item => {
      const fullName = `${item.firstName} ${item.lastname}`.toLowerCase()
      return fullName.includes(searchQuery.toLowerCase())
    })
    setFilteredData(filteredResults)
  }, [searchQuery, taxpayerdata])

  return (
    <div className='w-full p-6  h-full space-y-6'>
      <div className='w-full flex items-center justify-between'>
        <h2 className='font-semibold text-xl'>Tax Payer Management</h2>
        <div className='flex items-center gap-x-2'>
          <div className='w-80 relative h-11'>
            <CiSearch className='text-xl absolute top-3 left-3' />
            <input
              type='search'
              className='w-full h-11 outline-none border rounded-md pl-10 pr-4 '
              placeholder='Search Tax Payer'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button className='border rounded-md px-2 h-11 flex items-center w-fit justify-center gap-x-2'>
            <AiOutlineCloudDownload className='text-[22px]' />
            <p>Export</p>
          </button>
          {user.role === 'agent' && (
            <button className='text-white rounded-md px-2 h-11 flex items-center justify-center gap-x-2 w-fit  bg-[#4E72D1]'>
              <AiOutlinePlus className='text-[22px]' />
              <p>Add New Tax Payer</p>
            </button>
          )}
        </div>
      </div>

      <DataTable data={filteredData} columns={columns} loading={loading} />
    </div>
  )
}

export default TaxPayerManagement
