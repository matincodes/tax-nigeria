import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import InnerTable from '../inner-table/inner-table'

const ConsultantPage = () => {
  const [consultantData, setConsultantData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        header: 'Company Name',
        accessorKey: 'companyName',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        header: 'Telephone Number',
        accessorKey: 'telephoneNo',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
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
        header: 'Amount Deposited',
        accessorKey: 'amountDeposited',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        header: 'Wallet Balance',
        accessorKey: 'wallet.balance',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: 'action',
        header: () => <div className='text-right pr-7'>Action</div>,
        cell: () => (
          <div className='flex place-content-end pr-4'>
            <Button
              text='Profile'
              handleButton={e => {
                e.preventDefault()
                navigate('/dashboard/consultant-profile')
              }}
            />
          </div>
        ),
      },
    ],
    [navigate],
  )

  useEffect(() => {
    async function fetchConsultantData() {
      try {
        setLoading(true)
        const res = await axios.get('https://assettrack.com.ng/api/Consultant')
        setConsultantData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultantData()
  }, [])

  return (
    <div className='w-full font-manrope p-[30px]'>
      {/* Top Part */}
      <div className='flex gap-6 items-center p-[10px]'>
        <b className='text-[20px] text-[#4C4C4C]'>Consultants</b>
        <Button
          text='Add New'
          iconposition='left'
          icon='+'
          handleButton={() => navigate('/dashboard/taxconsultant-registration')}
        />
        <Button text='Export Members (CSV)' />
      </div>
      {/* Top Part */}

      <InnerTable data={consultantData} columns={columns} loading={loading} />
    </div>
  )
}

export default ConsultantPage
