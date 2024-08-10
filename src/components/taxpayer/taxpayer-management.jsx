import { AiOutlinePlus, AiOutlineCloudDownload } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
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
            <p className='w-full text-ellipsis text-black font-semibold overflow-hidden whitespace-nowrap'>
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
        accessorKey: 'taxPayerId',
        header: 'Tax ID',
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
        accessorKey: 'assessmentStatus',
        header: 'Assessment Status',
        cell: ({ row }) => {
          const status = row.getValue('assessmentStatus')
          let statusClass = ''
          let dotClass = ''

          switch (status) {
            case 'Done':
              statusClass = 'bg-[#ECFDF3] text-[#14BA6D]'
              dotClass = 'bg-[#14BA6D]'
              break
            case 'NotDone':
              statusClass = 'bg-[#F2F4F7] text-[#6C778B]'
              dotClass = 'bg-[#6C778B]'
              break
            default:
              statusClass = 'bg-[#F2F4F7] text-[#6C778B]'
              dotClass = 'bg-[#6C778B]'
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
                    `/dashboard/taxpayer/taxpayer-details/${row.original.id}`,
                    {
                      state: { data: row.original },
                    },
                  )
                }
              >
                View
              </DropdownMenuItem>
              {user.role === 'agent' &&
                row.original.assessmentStatus === 'NotDone' && (
                  <DropdownMenuItem
                    onClick={() =>
                      navigate(
                        `/dashboard/assessment/${row.original.taxPayerId}`,
                      )
                    }
                  >
                    Assessment
                  </DropdownMenuItem>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [navigate, user.role],
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUrl = user => {
          if (user.role === 'admin') {
            return 'https://assettrack.com.ng/api/TaxPayer'
          } else if (user.role === 'consultant') {
            return `https://assettrack.com.ng/api/TaxPayer/ByConsultantEmail/${user.email}`
          } else {
            return `https://assettrack.com.ng/api/TaxPayer/ByAgentsEmail/${user.email}`
          }
        }

        const response = await axios.get(getUrl(user))
        setTaxPayerData(response.data)
      } catch (error) {
        console.error('Error fetching taxpayer data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    // Filter data based on search query
    const filteredResults = taxpayerdata.filter(item => {
      const fullName = `${item.firstName} ${item.lastname}`.toLowerCase()
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.identificationNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.identityTypeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.taxPayerId.toLowerCase().includes(searchQuery.toLowerCase())
      )
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
            <button
              className='text-white rounded-md px-2 h-11 flex items-center justify-center gap-x-2 w-fit  bg-[#4E72D1]'
              onClick={() => navigate('/dashboard/onboarding')}
            >
              <AiOutlinePlus className='text-[22px]' />
              <p>Add New Payer</p>
            </button>
          )}
        </div>
      </div>

      <DataTable data={filteredData} columns={columns} loading={loading} />
    </div>
  )
}

export default TaxPayerManagement
