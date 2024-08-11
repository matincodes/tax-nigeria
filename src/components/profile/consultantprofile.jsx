import userprofile from '../../assets/img/face_placeholder.png'
import phone from '../../assets/img/ph_phone-thin.png'
import locationImg from '../../assets/img/system-uicons_location.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import DataTable from '../data-table/data-table'
import { Button } from '../ui/button'
import { useAuth } from '../../context/AuthContext'

const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

const ConsultantProfile = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingAgents, setLoadingAgents] = useState(true)
  const [agentData, setAgentData] = useState([])

  const navigate = useNavigate()
  const { email } = useParams()
  const { user } = useAuth()

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {`${row.original.firstName} ${row.original.lastName}`}
          </div>
        ),
      },
      {
        header: 'Email Address',
        accessorKey: 'emailAddress',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        header: 'Telephone',
        accessorKey: 'telephone',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => (
          <div className='flex place-content-end pr-4'>
            <Button
              text='Profile'
              handleButton={e => {
                e.preventDefault()
                navigate(
                  `/dashboard/agent-profile/${row.original.emailAddress}`,
                )
              }}
            />
          </div>
        ),
      },
    ],
    [navigate],
  )

  useEffect(() => {
    async function fetchAgentData() {
      try {
        setLoadingAgents(true)
        const res = await axios.get(
          `https://assettrack.com.ng/api/Agent/AllByConsult/${email}`,
        )
        setAgentData(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingAgents(false)
      }
    }

    fetchAgentData()
  }, [email])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://assettrack.com.ng/api/Consultant/ConsultantByEmail/${email}`,
        )
        setData(response.data)
      } catch (error) {
        console.error(error)
        navigate('/dashboard/consultant')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [email, navigate])

  if (
    user.role.toLowerCase() === 'consultant' &&
    user.email.toLowerCase() !== email.toLowerCase()
  ) {
    return <Navigate to={`/dashboard/consultant-profile/${user.email}`} />
  }

  return (
    <div className='w-full p-6 h-full space-y-6'>
      <div className='w-full bg-[#F6F6F6] grid grid-cols-10 p-6'>
        <img src={userprofile} alt='' className='col-span-2 rounded-full' />
        <div className='w-full flex items-center justify-around h-full col-span-8'>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-14'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>
                {!loading ? data?.companyName : '...'}
              </p>
              <p className='text-base'>Consultant</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='text-base flex items-center gap-x-2'>
                <img src={phone} alt='' />
                <span>{!loading ? data?.telephoneNo : '...'}</span>
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
              <p className='font-medium text-lg'>Consultant Code</p>
              <p className='text-base'>
                {!loading ? data?.consultantCode : '...'}
              </p>
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
          <p className='font-semibold text-xl'>
            {!loading ? NGN.format(data?.wallet?.balance) : '...'}
          </p>
          <p className='text-base'>Balance</p>
        </div>
        <div className='rounded-lg p-4 gap-3 border border-[#938406] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-xl'>
            {!loading ? NGN.format(data?.amountDeposited) : '...'}
          </p>
          <p className='text-base'>Income</p>
        </div>
        <div className='rounded-lg p-4 gap-3 border border-[#4E72D1] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-xl'>N/A</p>
          <p className='text-base'>Expenses</p>
        </div>
        <div className='rounded-lg p-5 gap-4 bg-[#4E72D1] text-white flex flex-col items-center justify-center w-[180px] h-fit cursor-pointer'>
          <AiOutlinePlus className='text-[28px]' />
          <p className='font-semibold text-base'>Fund Account</p>
        </div>
      </div>

      <div className='flex flex-col items-start justify-start'>
        <h2 className='font-medium text-xl'>Agents in charge</h2>
        <div className='w-full'>
          <DataTable
            data={agentData}
            columns={columns}
            loading={loadingAgents}
          />
        </div>
      </div>
    </div>
  )
}

export default ConsultantProfile
