import { AiOutlineCloudDownload } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
import DataTable from '../../components/data-table/data-table'
import { useNavigate } from 'react-router-dom'

const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [billingData, setBillingData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredData, setFilteredData] = useState([])

  const { user } = useAuth()
  const navigate = useNavigate()


  const billingColumns = useMemo(
    () => [
      {
        accessorKey: 'year',
        header: 'Year',
        cell: ({ row }) => (
          <p className='text-black font-semibold ml-2'>
            {row.getValue('year')}
          </p>
        ),
      },
      {
        accessorKey: 'taxPayer_Id',
        header: 'Tax Payer ID',
        cell: ({ row }) => <p>{row.getValue('taxPayer_Id')}</p>,
      },
      {
        accessorKey: 'payerFullName',
        header: 'Payer Full Name',
        cell: ({ row }) => (
          <p>{`${row.original.txPayFName} ${row.original.txPayLName}`}</p>
        ),
      },
      {
        accessorKey: 'billAmount',
        header: 'Amount',
        cell: ({ row }) => (
          <p>{NGN.format(row.getValue('billAmount')?.toFixed(2))}</p>
        ),
      },
      {
        accessorKey: 'totalAmountPaid',
        header: 'Amount Paid',
        cell: ({ row }) => (
          <p>{NGN.format(row.getValue('totalAmountPaid')?.toFixed(2))}</p>
        ),
      },
      {
        accessorKey: 'billStatus',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('billStatus')
          let statusClass = ''
          let dotClass = ''

          switch (status) {
            case 'Paid':
              statusClass = 'bg-[#ECFDF3] text-[#14BA6D]'
              dotClass = 'bg-[#14BA6D]'
              break
            case 'Unpaid':
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
        accessorKey: 'billReferenceNo',
        header: 'Reference No',
        cell: ({ row }) => <p>{row.getValue('billReferenceNo')}</p>,
      },
      // {
      //   accessorKey: 'assessmentRef',
      //   header: 'Assessment Reference',
      //   cell: ({ row }) => <p>{row.getValue('assessmentRef')}</p>,
      // },
      {
        accessorKey: 'billDate',
        header: 'Date',
        cell: ({ row }) => (
          <p>{new Date(row.getValue('billDate')).toLocaleDateString()}</p>
        ),
      },
      {
        accessorKey: '',
        header: 'Action',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full outline-none flex justify-center'>
              <img src={ThreeDotIcon} alt='' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    `/dashboard/billing/bill-details/${row.original.id}`,
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
    setLoading(true)
    axios
      .get(
        `https://assettrack.com.ng/api/BillGeneration/ByAgentsEmail/${user.email}`,
      )
      .then(response => {
        setBillingData(response.data)
      })
      .catch(error => {
        console.error('Error fetching billing data:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user.email])

  useEffect(() => {
    const filteredData = billingData.filter(item => {
      const fullName = `${item.txPayFName} ${item.txPayLName}`.toLowerCase()
      return (
        item.year.toString().includes(searchQuery.toLowerCase()) ||
        item.taxPayerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fullName.includes(searchQuery.toLowerCase()) ||
        item.miniTaxStation
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.billAmount.toString().includes(searchQuery.toLowerCase()) ||
        item.totalAmountPaid.toString().includes(searchQuery.toLowerCase()) ||
        item.billStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.billReferenceNo
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.assessmentRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(item.billDate)
          .toLocaleDateString()
          .includes(searchQuery.toLowerCase())
      )
    })

    setFilteredData(filteredData)
  }, [billingData, searchQuery])

  return (
    <div className='w-full p-6 h-full space-y-6'>
      <div className='w-full flex items-center justify-between'>
        <h2 className='font-semibold text-xl'>Billing</h2>
        <div className='flex items-center gap-x-2'>
          <div className='w-80 relative h-11'>
            <CiSearch className='text-xl absolute top-3 left-3' />
            <input
              type='search'
              className='w-full h-11 outline-none border rounded-md pl-10 pr-4'
              placeholder='Search Billing'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button className='border rounded-md px-2 h-11 flex items-center w-fit justify-center gap-x-2'>
            <AiOutlineCloudDownload className='text-[22px]' />
            <p>Export</p>
          </button>
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={billingColumns}
        loading={loading}
      />
    </div>
  )
}

export default Billing
