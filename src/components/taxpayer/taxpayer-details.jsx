import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import phone from '../../assets/img/ph_phone-thin.png'
import locationImg from '../../assets/img/system-uicons_location.png'
import userprofile from '../../assets/img/face_placeholder.png'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import DataTable from '../../components/data-table/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'

import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
import { useAuth } from '../../context/AuthContext'

const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

const TaxpayerDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const taxpayer = location?.state?.data
  const [billDetails, setBillDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null)

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
        accessorKey: 'billAmount',
        header: 'Amount',
        cell: ({ row }) => (
          <p className='ml-2'>
            {NGN.format(row.getValue('billAmount')?.toFixed(2))}
          </p>
        ),
      },
      {
        accessorKey: 'totalAmountPaid',
        header: 'Amount Paid',
        cell: ({ row }) => (
          <p className='ml-2'>
            {NGN.format(row.getValue('totalAmountPaid')?.toFixed(2))}
          </p>
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
        cell: ({ row }) => (
          <p className='ml-2'>{row.getValue('billReferenceNo')}</p>
        ),
      },
      {
        accessorKey: 'billDate',
        header: 'Date',
        cell: ({ row }) => (
          <p className='ml-2'>
            {new Date(row.getValue('billDate')).toLocaleDateString()}
          </p>
        ),
      },
    ],
    [],
  )

  if (user.role.toLowerCase() === 'agent')
    billingColumns.push({
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
                navigate(`/dashboard/billing/bill-details/${row.original.id}`, {
                  state: { data: row.original },
                })
              }
            >
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    })

  useEffect(() => {
    async function fetchBillDetails() {
      axios
        .get(
          `https://assettrack.com.ng/api/TaxPayer/OnlyTaxpayerPics/${taxpayer?.taxPayerId}`,
        )
        .then(response => {
          setImage(response.data)
        })
        .catch(error => {
          console.error(error)
        })

      try {
        setLoading(true)
        const response = await axios.get(
          `https://assettrack.com.ng/api/BillGeneration/AllBillByTaxPayerID/${taxpayer?.taxPayerId}`,
        )
        setBillDetails(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchBillDetails()
  }, [taxpayer?.taxPayerId, taxpayer?.id])

  if (!taxpayer) return <Navigate to='/dashboard/taxpayer' />

  return (
    <div className='w-full p-6 h-full space-y-6'>
      <div className='w-full bg-[#F6F6F6] grid grid-cols-10 p-6'>
        <img
          src={image?.taxpayerPics ?? userprofile}
          alt=''
          className='col-span-2 rounded-full object-cover w-[200px] h-[200px]'
        />
        <div className='w-full flex items-center justify-around h-full col-span-8'>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-14'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>{`${taxpayer?.firstName} ${taxpayer?.lastname}`}</p>
              <p className='text-base'>Taxpayer</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='text-base flex items-center gap-x-2'>
                <img src={phone} alt='' />
                <span>{taxpayer?.phoneNumber}</span>
              </p>
              <p className='text-base flex items-center gap-x-2'>
                <img src={locationImg} alt='' />
                <span>{taxpayer?.address}</span>
              </p>
            </div>
          </div>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-24'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Email</p>
              <p className='text-base'>{taxpayer?.email}</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Tax ID</p>
              <p className='text-base'>{taxpayer?.taxPayerId}</p>
            </div>
          </div>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start p-2 pr-24'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Identity Type</p>
              <p className='text-base'>{taxpayer?.identityTypeName}</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Date of Birth</p>
              <p className='text-base'>{taxpayer?.dob}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-start justify-start'>
        <h2 className='font-medium text-xl'>Billings</h2>
        <div className='w-full'>
          <DataTable
            data={billDetails}
            columns={billingColumns}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default TaxpayerDetails
