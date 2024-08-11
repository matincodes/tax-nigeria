import userprofile from '../../assets/img/face_placeholder.png'
import phone from '../../assets/img/ph_phone-thin.png'
import locationImg from '../../assets/img/system-uicons_location.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import DataTable from '../data-table/data-table'
import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useAuth } from '../../context/AuthContext'

const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

const AgentProfile = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [taxPayerData, setTaxPayerData] = useState([])
  const [loadingTaxPayerData, setLoadingTaxPayerData] = useState(true)

  const navigate = useNavigate()
  const { email } = useParams()
  const { user } = useAuth()

  const columns = useMemo(
    () => [
      {
        accessorKey: 'taxPayer',
        header: 'Tax Payer',
        cell: ({ row }) => {
          return (
            <p className='w-full text-ellipsis text-black font-semibold overflow-hidden whitespace-nowrap'>
              {`${row.original.firstName} ${row.original.lastname}`}
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
    async function fetchData() {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://assettrack.com.ng/api/Agent/ByAgentEmial/${email}`,
        )
        setData(response.data)
      } catch (error) {
        console.error(error)
        navigate('/dashboard/agent')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [email, navigate])

  useEffect(() => {
    const fetchTaxPayerData = async () => {
      try {
        setLoadingTaxPayerData(true)
        const response = await axios.get(
          `https://assettrack.com.ng/api/TaxPayer/ByAgentsEmail/${email}`,
        )
        setTaxPayerData(response.data)
      } catch (error) {
        console.error('Error fetching taxpayer data:', error)
      } finally {
        setLoadingTaxPayerData(false)
      }
    }

    fetchTaxPayerData()
  }, [email])

  if (
    user.role.toLowerCase() === 'agent' &&
    user.email.toLowerCase() !== email.toLowerCase()
  ) {
    return <Navigate to={`/dashboard/agent-profile/${user.email}`} />
  }

  return (
    <div className='w-full p-6 h-full space-y-6'>
      <div className='w-full bg-[#F6F6F6] grid grid-cols-10 p-6'>
        <img src={userprofile} alt='' className='col-span-2 rounded-full' />
        <div className='w-full flex items-center justify-around h-full col-span-8'>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-14'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>
                {!loading ? `${data?.firstName} ${data?.lastName}` : '...'}
              </p>
              <p className='text-base'>Agent</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='text-base flex items-center gap-x-2'>
                <img src={phone} alt='' />
                <span>{!loading ? data?.telephone : '...'}</span>
              </p>
              <p className='text-base flex items-center gap-x-2'>
                <img src={locationImg} alt='' />
                <span>N/A</span>
              </p>
            </div>
          </div>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-24'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Email</p>
              <p className='text-base'>
                {!loading ? data?.emailAddress : '...'}
              </p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Agent ID</p>
              <p className='text-base'>{!loading ? data?.id : '...'}</p>
            </div>
          </div>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start p-2'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Address</p>
              <p className='text-base'>{!loading ? data?.address : '...'}</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Tax Station</p>
              <p className='text-base'>N/A</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex gap-6 items-center'>
        <div className='rounded-lg p-4 gap-3 border border-[#87BB42] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-2xl'>
            {!loading ? NGN.format(data?.wallet?.balance) : '...'}
          </p>
          <p className='text-base'>Balance</p>
        </div>
        <div className='rounded-lg p-4 gap-3 border border-[#938406] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-2xl'>N/A</p>
          <p className='text-base'>Income</p>
        </div>
        <div className='rounded-lg p-4 gap-3 border border-[#4E72D1] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-2xl'>N/A</p>
          <p className='text-base'>Expenses</p>
        </div>
        <div className='rounded-lg p-5 gap-4 bg-[#4E72D1] text-white flex flex-col items-center justify-center w-[180px] h-fit  cursor-pointer'>
          <AiOutlinePlus className='text-2xl' />
          <p className='font-semibold text-base'>Fund Account</p>
        </div>
      </div>

      <div className='flex flex-col items-start justify-start'>
        <h2 className='font-medium text-xl'>Tax Payers in charge</h2>
        <div className='w-full'>
          <DataTable
            data={taxPayerData}
            columns={columns}
            loading={loadingTaxPayerData}
          />
        </div>
      </div>
    </div>
  )
}

export default AgentProfile
